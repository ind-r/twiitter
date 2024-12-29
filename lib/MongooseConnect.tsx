import mongoose from "mongoose";

export default async function connectMongoDB() {
  try {
    const connection = await mongoose.connect(process.env.MONGO_URI as string);
    // console.log("MongoDB connected successfully");
    return connection;
  } catch (error) {
    console.error("MongoDB connection failed:", error);
    return null;
  }
}
