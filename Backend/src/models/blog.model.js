import mongoose, { Schema, model } from "mongoose"
const blogSchema = new Schema(
    {
        topic:{
            type:String,
            required:true
        },
        title: {
            type: String,
            required: true
        },
        summary: {
            type: String,
            required: true
        },
        image: {
            type: String,
            required: true
        },
        author: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User',
            required:true
        },
        content: {
            type: String,
        }

    },
    {
        timestamps: true,
    }
)
export const Blog = new model('Blog', blogSchema);