import { connect } from "mongoose";
import dotenv from "dotenv";

dotenv.config();

const DATABASE_URL = process.env.DATABASE_URL as string;

export const connectDatabase = async () => {
  try {
    await connect(DATABASE_URL);
    console.log("Connected to MongoDB");
  } catch (error) {
    console.error("MongoDB connection error:", error);
    process.exit(1);
  }
};
