import mongoose from "mongoose";


const connectDb = async()=>{
    try{
        const mongoUrl = "mongodb://localhost:27017/task-manager"

        const conn = await mongoose.connect(mongoUrl);


        console.log("Mongodb connecte ")
    }catch(err){
        console.log("There is the error in connecting to mongodv")
        process.exit(1)
    }
}


export default  connectDb;