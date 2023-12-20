import { User } from "../models/user.js";
import  Jwt  from "jsonwebtoken";

export const isAuthenticated = async (req,res,next)=>{
    const { token } = req.cookies;
    if(!token){
        return res.status(400).json({
            success : false,
            message : "Login first"
        })
    } 
    const decode = Jwt.verify(token, process.env.JWT_SECRETE);
    req.user = await User.findById({_id : decode._id});
    next();
}