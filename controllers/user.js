import bcrypt from "bcrypt";

import { User } from "../models/user.js"
import { sendCookies } from "../utils/features.js";
import ErrorHandler from "../middlewares/error.js";


export const register = async (req, res,next) => {
    try {
        const { name,email,password } = req.body
        let  user  = await User.findOne({email:email});
        if(user){
            return next(new ErrorHandler("User Already exist",400));
        }
        const hashedPassword = await bcrypt.hash(password,10)
        user  = await User.create({name:name,email:email,password:hashedPassword })
    
        sendCookies(user,res,201,"User Created Successfully")
    } catch (error) {
        next(error)
    }

}


export const login = async (req,res,next)=>{
    try {
        const {email,password} = req.body
        let user = await User.findOne({email:email}).select("+password")
    
        if(!user){
            return next(new ErrorHandler("Invalid Email or Password",400));
        }
        const isMatched = await bcrypt.compare(password,user.password)
        
        if(!isMatched){
            return next(new ErrorHandler("Invalid Email or Password",400));
        }
        sendCookies(user,res,200,`Welcome, ${user.name}`)
    } catch (error) {
        next(error)
    }
}


export const getMyProfile = async (req, res,next) => {
    try {
        res.status(200).json({
            success: true,
            message: "UserProfile is wokring Properly",
            user : req.user,
            token : req.cookies
        })
    } catch (error) {
        next(error)
    }
}


export const logout =(req,res,next)=>{
    try {
        res.status(200)
        .cookie("token","",{
            expires : new Date(Date.now()),
            sameSite : process.env.NODE_ENV ==="DEVELOPMENT"? "lax" : "none",
            secure : process.env.NODE_ENV ==="DEVELOPMENT"? false : true
        })
        .json({
            success : true,
            message : "User Logged Out Successfully"
        })
    } catch (error) {
        next(error)
    }
}




