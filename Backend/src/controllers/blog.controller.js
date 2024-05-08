import jwt from "jsonwebtoken";
import { User } from "../models/user.model.js";
import { Blog } from "../models/blog.model.js";
import { uploadFile } from "../utils/cloudinary.utils.js";
import asyncHandler from 'express-async-handler'

const createNewPost = asyncHandler(async (req, res) => {
    const data = req.body;
    // console.log(data);
    const token = req.cookies?.accessToken;
    if (!token) {
        let err = new Error('Invalid Access');
        err.statusCode = 501;
        throw err;
    }
    const decodedToken = await jwt.verify(token, process.env.ACCESS_TOKEN_KEY);
    const user = await User.findById(decodedToken.id);
    if (!user) {
        let err = new Error('Network Error');
        err.statusCode = 404;
        throw err;
    }
    const ImgURL = await uploadFile(req.file.path);
    // console.log("ImgURl: ", ImgURL);
    const newBlog = await Blog.create(
        {
            topic: data.topic,
            title: data.title,
            summary: data.summary,
            content: data.content,
            author: user._id,
            image: ImgURL.url
        }
    )
    if (!newBlog) {
        let err = new Error('Network Error');
        err.statusCode = 404;
        throw err;
    }
    return res
        .status(201)
        .json("ok");
})

const allBlogs = asyncHandler(async (req, res) => {
    const blogs = await Blog.find().select('-content').populate('author',['name']);
    // console.log(blogs);
    if (!blogs) {
        let err = new Error("Unable to fetch from Database");
        err.statusCode = 404;
        throw err;
    }
    return res
        .status(201)
        .json(blogs);
})
export {
    createNewPost,
    allBlogs
}