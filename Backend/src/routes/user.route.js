import { Router } from "express";
import { getCurrentUser, getUserInfo, login, logoutUser, register } from "../controllers/user.controller.js";

const router=Router();
router.route('/register').post(register)
router.route('/login').post(login)
router.route('/profile').get(getCurrentUser)
router.route('/logout').post(logoutUser)
router.route('/:id').get(getUserInfo)
export default router;