import { exit } from "node:process";
import cors from "cors";
import { config } from "dotenv";
import express, { json } from "express";
import { connectDatabase } from "./database";
import router from "./routes";
import { errorHandler } from "./middleware/errorHandler";

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

app.use("/", router);

// errorHandler 항상 실행
app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
