import mongoose from "mongoose";
import dotenv from "dotenv";

// Load environment variables
dotenv.config();

const connectDb = async () => {
  try {
    const mongoUrl = process.env.MONGO_URI;
    if (!mongoUrl) {
      throw new Error("MONGO_URI is not defined in environment");
    }

    await mongoose.connect(mongoUrl);
    console.log("✅ MongoDB connected successfully");
  } catch (err) {
    console.error("❌ Error connecting to MongoDB:", err.message);
    process.exit(1);
  }
};

export default connectDb;
