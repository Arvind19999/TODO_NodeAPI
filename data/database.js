import mongoose from "mongoose";

export const connectDB = ()=>{
    mongoose.connect(process.env.MONGO_URI,{
    dbName:"NodeTodo"
})
.then(()=>{
    console.log("Connected to Database Successfully")
})
.catch((err)=>{
    console.log(err)
})
}