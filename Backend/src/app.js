import express, { urlencoded } from 'express'
import cors from 'cors'
import cookieParser from 'cookie-parser'

const app=express()
app.use(cors({
    origin:process.env.CORS,
    credentials:true
}))
app.use(express.json({
    limit:"10mb"
}))
app.use(urlencoded({
    extended:true,
    limit:'10mb'
}))
app.use(express.static("public"))
app.use(cookieParser())

// app.post("/register",(req,res)=>{
//     console.log(req.body)
//     res.json(req.body);
// })
// app.get('/' ,(req,res)=>{
//     res.json(req.body);
// })

// All the routes are here
import router from './routes/user.route.js'
app.use('/api',router);

import blogRouter from './routes/blog.route.js'
app.use('/api/blog',blogRouter);


export{app};

