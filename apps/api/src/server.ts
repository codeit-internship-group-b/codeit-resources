import { exit } from "node:process";
import cors from "cors";
import { config } from "dotenv";
import express, { json } from "express";
import { connectDatabase } from "./utils/database";
import router from "./routes";
import { errorHandler } from "./middleware/errorHandler";

config();

void connectDatabase().catch((error: unknown) => {
  console.error("Failed to connect to the database:", error);
  exit(1);
});

const app = express();
const PORT = process.env.PORT ?? 3000;
const CORS_ORIGIN = process.env.CORS_ORIGIN?.split(",") ?? "http://localhost:8080";

const corsOptions = {
  origin: CORS_ORIGIN,
};

app.use(cors(corsOptions));
app.use(json());
app.set("port", PORT);

app.use("/", router);

// errorHandler 항상 실행
app.use(errorHandler);

// 도메인 호스팅 확인용
app.get("/health", (req, res) => {
  res.json({
    status: "healthy",
    timestamp: new Date().toISOString(),
    memory: process.memoryUsage(),
    uptime: process.uptime(),
    version: process.version,
  });
});

app.listen(PORT, () => {
  console.log(`Server is running on ${PORT}`);
});
