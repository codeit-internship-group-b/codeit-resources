import { exit } from "node:process";
import cors from "cors";
import { config } from "dotenv";
import express, { json } from "express";
import { connectDatabase } from "./database";

config();

void connectDatabase().catch((error: unknown) => {
  console.error("Failed to connect to the database:", error);
  exit(1);
});

const app = express();
const PORT = process.env.PORT ?? "8080";
const corsOptions = {
  origin: ["http://localhost:3000/"],
};

app.use(cors(corsOptions));
app.use(json());
app.set("port", PORT);

// 여기서 middleware 추가?
// app.use("/api/v1/users", userRouter);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
