import ErrorHandler from "../middlewares/error.js";
import { Task } from "../models/task.js";

export const createTask = async (req,res,next)=>{
    try {
        const {title,description} = req.body;
        const task = await Task.create({title : title,description : description, user : req.user})
        res.json({
            success : true,
            message : "Task Added Successfully",
            user : task
        })
    } catch (error) {
        next(error)
    }
}


export const getMyTasks = async (req,res,next)=>{
    try {
        const userId = req.user._id;
        const tasks = await Task.find({user : userId});
    
        res.status(200).json({
            success : true,
            tasks : tasks
        })
    } catch (error) {
        next(error)
    }
}


export const updateTask = async (req,res,next)=>{
    try {
        const taskId =  req.params.id
        const task = await Task.findById({_id : taskId});
        if(!task){
                return next(new ErrorHandler("Task Not Found",404));
        }
        task.isCompleted = !task.isCompleted;
        await task.save();
        res.status(200).json({
            success : true,
            message : "Task updated successfully",
            task : task
        })
    } catch (error) {
        next(error)
    }
}


export const deleteTask = async (req,res,next)=>{
    try {
        const taksId  = req.params.id;
        const task = await Task.findById({_id : taksId});
        if(!task){
            return next(new ErrorHandler("Task Not Found",404));
        }
        await task.deleteOne()
        res.status(200).json({
            success : true,
            message : "Task removed successfully"
        })
    } catch (error) {
        next(error)
    }
}