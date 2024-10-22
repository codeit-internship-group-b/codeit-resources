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
const PORT = process.env.PORT;
const CORS_ORIGIN = process.env.CORS_ORIGIN?.split(",");

const corsOptions = {
  origin: CORS_ORIGIN,
};

app.use(cors(corsOptions));
app.use(json());
app.set("port", PORT);

// 도메인 호스팅 확인용
app.use("/", (req, res) => {
  console.log("hello");
  res.send(`<button style="
          padding: 10px 20px;
          font-size: 16px;
          cursor: pointer;
          background-color: #f0f0f0;
          border: 1px solid #ccc;
          border-radius: 5px;
          transition: background-color 0.3s ease;
        " 
        onmouseover="this.style.backgroundColor='#ddd'"
        onmouseout="this.style.backgroundColor='#f0f0f0'"
        onclick="alert('I told you not to click!')">
          Don't click me
        </button>`);
});

app.use("/", router);

// errorHandler 항상 실행
app.use(errorHandler);

app.listen(PORT, () => {
  console.log("Server is running on your env port");
});
