import mongoose from "mongoose";

const DATABASE_URL = process.env.DATABASE_URL as string;

export const connectDatabase = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI as string);
    console.log("Connected to MongoDB");
  } catch (error) {
    console.error("MongoDB connection error:", error);
    process.exit(1);
  }
};
