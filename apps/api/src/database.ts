import { connect } from "mongoose";

export const connectDatabase = async () => {
  try {
    await connect(process.env.DATABASE_URL as string);
    console.log("Connected to MongoDB");
  } catch (error) {
    console.error("MongoDB connection error:", error);
    process.exit(1);
  }
};
