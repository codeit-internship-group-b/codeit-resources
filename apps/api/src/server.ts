import cors from "cors";
import * as dotenv from "dotenv";
import express from "express";
import { connectDatabase } from "./database";

dotenv.config();
connectDatabase();

const app = express();
const PORT = process.env.PORT || 8080;
const corsOptions = {
  origin: ["http://localhost:3000/"],
};

app.use(cors(corsOptions));
app.use(express.json());
app.set("port", PORT);

// 여기서 middleware 추가?
// app.use("/users", adminOnly, userRouter);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
