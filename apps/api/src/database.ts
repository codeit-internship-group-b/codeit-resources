import { connect } from "mongoose";
import { config } from "dotenv";

config();

const DATABASE_URL = process.env.DATABASE_URL;

if (!DATABASE_URL) {
  throw new Error("DATABASE_URL is not defined");
}

export const connectDatabase = async (): Promise<void> => {
  try {
    await connect(DATABASE_URL);
    console.log("Connected to MongoDB");
  } catch (error: unknown) {
    if (error instanceof Error) {
      throw new Error(`MongoDB connection error: ${error.message}`);
    } else {
      throw new Error("Unknown MongoDB connection error");
    }
  }
};
