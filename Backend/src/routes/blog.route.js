import { Router } from "express";
import { upload } from "../middlewares/multer.middleware.js";
import { allBlogs, createNewPost } from "../controllers/blog.controller.js";
const blogRouter=Router();
blogRouter.route('/create-post').post(
    upload.single('file'),
    createNewPost
)
blogRouter.route('/all-blog').get(
    allBlogs
)

export default blogRouter;