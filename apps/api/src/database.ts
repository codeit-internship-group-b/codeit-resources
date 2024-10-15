import mongoose from "mongoose";

const DATABASE_URL = process.env.DATABASE_URL as string;

export default async function connectDatabase() {
  try {
    await mongoose.connect(DATABASE_URL);
    console.log("Connected to Database");
  } catch (error) {
    console.error("Error connecting to database", error);
    process.exit(1);
  }
}
