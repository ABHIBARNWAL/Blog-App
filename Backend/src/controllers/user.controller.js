import asyncHandler from "express-async-handler";
import { User } from "../models/user.model.js";
import {Blog} from "../models/blog.model.js";
import jwt from "jsonwebtoken";

const register = asyncHandler(async (req, res) => {
    const { name, email, username, phoneno, password, confirmpassword } = req.body;
    console.log(req.body)
    if ([name, email, username, phoneno, password, confirmpassword].some((field) => field?.trim() === "")) {
        let err = new Error('All fields are required');
        err.statusCode = 500;
        throw err;
    }
    if (password != confirmpassword) {
        let err = new Error("Passwords are not matching");
        err.statusCode = 501;
        throw err;
    }
    const newUser = await User.create(
        {
            name,
            email,
            username,
            phoneno,
            password,
        }
    )
    const user = await User.findById(newUser._id).select('-password');
    if (!user) {
        let err = new Error('Unable to connect');
        err.statusCode = 404;
        throw err;
    }
    res.status(201).json("ok");
})

const login = asyncHandler(async (req, res) => {
    const { email, password } = req.body;
    if ([email, password].some((field) => field?.trim() === '')) {
        let err = new Error('All fields are required');
        err.statusCode = 500;
        throw err;
    }
    const user = await User.findOne({ email: email });
    if (!user) {
        let err = new Error('No Such User Exist');
        err.statusCode = 501;
        throw err;

    }
    if (!await user.isPasswordCorrect(password)) {
        let err = new Error('Wrong Password');
        err.statusCode = 502;
        throw err;
    }
    const accessToken = await user.generateAccessToken();
    const refreshToken = await user.generateRefreshToken();
    user.refreshToken = refreshToken;
    await user.save({ validateBeforeSave: false });
    const optn = {
        httpOnly: true,
        secure: true
    }
    return res
        .status(201)
        .cookie("accessToken", accessToken, optn)
        .cookie("refreshToken", refreshToken, optn)
        .json({
            id: user._id,
            username: user.username
        });
})

const refreshAccessToken = asyncHandler(async (req, res) => {
    const refreshToken = req.cookies?.refreshToken || req.body.refreshToken;
    if (!refreshToken) {
        let err = new Error("Login Again")
        err.statusCode = 401;
        throw err;

    }
    const decodedToken = await jwt.verify(refreshToken, process.env.REFRESH_TOKEN_KEY);
    if (!decodedToken) {
        let err = new Error("Invalid Access")
        err.statusCode = 401;
        throw err;
    }
    const user = await User.findById(decodedToken.id).select("-password -refreshToken");
    if (!user) {
        let err = new Error("Unable to fetch User details from Database")
        err.statusCode = 404;
        throw err;
    }
    if (user.refreshToken != refreshToken) {
        let err = new Error("Refresh Token Expired")
        err.statusCode = 401;
        throw err;
    }
    const accessToken = await user.generateAccessToken();
    const newRefreshToken = await user.generateRefreshToken();
    user.refreshToken = newRefreshToken;
    await user.save({ validateBeforeSave: false });
    const optn = {
        httpOnly: true,
        secure: true
    }
    const loggedInuser = await User.findById(user._id).select('-password -refreshToken');
    return res
        .status(201)
        .cookie("accessToken", accessToken, optn)
        .cookie("refreshToken", newRefreshToken, optn)
        .json("ok");
})

const getCurrentUser = asyncHandler(async (req, res) => {
    const accessToken = await jwt.verify(req.cookies.accessToken, process.env.ACCESS_TOKEN_KEY);
    if (!accessToken) {
        refreshAccessToken();
    }
    const user = await User.findById(accessToken.id).select("-password -refreshToken");
    return res
        .status(201)
        .json(user);
})

const logoutUser = asyncHandler(async (req, res) => {
    const token = req.cookies?.accessToken;
    const decodedToken = await jwt.verify(token, process.env.ACCESS_TOKEN_KEY);
    // console.log(token);
    if (!decodedToken) {
        let err = new Error('Invalid Access');
        err.statusCode(501);
        throw err;
    }
    const user = await User.findByIdAndUpdate(
        decodedToken.id,
        {
            $set: {
                refreshToken: undefined
            }
        },
        {
            new: true
        }
    )
    if (!user) {
        let err = new Error("Unable to connect");
        err.status(403);
        throw err;
    }
    const optn = {
        httpOnly: true,
        secure: true
    }
    res
        .status(201)
        .clearCookie("accessToken", optn)
        .clearCookie("refreshToken", optn)
        .json("ok");
})

const getUserInfo = asyncHandler(async (req, res) => {
    const token = req.cookies?.accessToken;
    const decodedToken = await jwt.verify(token, process.env.ACCESS_TOKEN_KEY);
    // console.log(token);
    if (!decodedToken) {
        let err = new Error('Invalid Access');
        err.statusCode(501);
        throw err;
    }
    const {id}=req.params;
    const user=await User.findById(id).select('name username')
    const blogs=await Blog.find({author:id}).populate('author',['name']);
    let response={};
    response.user=user;
    response.blogs=blogs;
    // console.log(response);
    return res
    .status(201)
    .json(response);
})


export {

    register,
    login,
    logoutUser,
    getCurrentUser,
    getUserInfo,
    refreshAccessToken
}