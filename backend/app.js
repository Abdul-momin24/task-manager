import express from "express";
import connectDb from "./src/config/mongo.config.js";
import taskServiceRoute from "./src/routes/task.route.js";
import errorHandler from "./src/utils/errorHandler.js";
import cors from "cors";

const app = express();

app.use(express.json())

app.use(express.urlencoded({extended:true}))

app.use(cors({
    origin: true, // Use your frontend URL in production
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true
  }))

app.use("/task", taskServiceRoute)

app.use((req,res,next)=>{
    res.status(404).json({
        message:"Route not founddd"
    })
})

app.use(errorHandler)


app.listen(3000,()=>{
    console.log("server listing on the port 3000");

    connectDb();

})
