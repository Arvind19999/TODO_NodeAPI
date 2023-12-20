import  Jwt  from "jsonwebtoken";


export const sendCookies = (user,res,statusCode = 200,message)=>{
    const token = Jwt.sign({_id : user._id},process.env.JWT_SECRETE) 
    res.status(statusCode).cookie("token",token,{
        httpOnly : true,
        maxAge : 15*60*1000,
        sameSite : process.env.NODE_ENV ==="DEVELOPMENT"? "lax" : "none",
        secure : process.env.NODE_ENV ==="DEVELOPMENT"? false : true
    }).json({
        success: true,
        message: message
    })
}