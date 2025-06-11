import mongoose from "mongoose";



const taskSchema = new mongoose.Schema({
    title:{
        type: String,
        required: true

    },
    description:{
        type:String,
        requierd: true,
    },
    status:{
        type:String,
        enum:["todo", "in-progress", "completed"],
        default: "todo",
        required:true
    },
    dueDate:{
        type: Date,
        required: true,
    },
    priority:{
        type:String,
        required:true,
        enum:["high","medium","low"]
    }
},{
    timestamps:true
})



const Task = mongoose.model("task", taskSchema);

export default Task;