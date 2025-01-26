import mongoose from "mongoose";

let isConnected = false; // Track the connection state

const connectToDatabase = async () => {
  if (isConnected) {
    console.log("MongoDB already connected!");
    return;
  }

  if (!process.env.MONGODB_URI) {
    console.error("Invalid Config: MONGODB_URI is not defined");
    throw new Error("MONGODB_URI is not defined");
  }

  try {
    await mongoose.connect(process.env.MONGODB_URI);
    isConnected = true;
    console.log("Connected to MongoDB");
  } catch (error) {
    console.error("Error connecting to MongoDB:", error);
    throw error;
  }
};

export default connectToDatabase;
