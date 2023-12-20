import express from "express";
import  { config }   from "dotenv";
import cookieParser from "cookie-parser";
import cors from "cors";

import userRouter from "./routes/user.js"
import taskTouter from "./routes/task.js"
import { errorMiddleware } from "./middlewares/error.js";
export const app = express();


config({
    path : "./data/config.env"
})
// using MiddleWares
app.use(express.json());
app.use(cookieParser());
app.use(cors({
    origin : [process.env.FRONTEND_URI],
    methods : ["GET","POST","PUT","DELETE"],
    credentials : true
}))

app.get("/",(req,res)=>{
    res.json({
        success:true,
        message : "This is testing of APi"
    })
})
app.use("/api/users",userRouter);
app.use("/api/tasks",taskTouter);

//Error Middleware
app.use(errorMiddleware)





