import cors from "cors";
import * as dotenv from "dotenv";
import express, { Application } from "express";
import roomsRouter from "./controllers/roomController";
import reservationsRouter from "./controllers/reservationControllers";

dotenv.config();

// mongoose.connect(process.env.DATABASE_URL).then(() => console.log("Connented to DB"));

const app: Application = express();

const corsOptions = {
  origin: ["http://localhost:3000/"],
};

app.use(cors(corsOptions));
app.use(express.json());
app.set("port", process.env.PORT || 8080);

// todo 이거 경로 여기다 쓸지 각 파일에 전부 적어줄지 정해야댐
app.use("/rooms", roomsRouter);
app.use("/reservations", reservationsRouter);

app.listen(app.get("port"), () => {
  console.log(app.get("port"), "Server Started!");
});

export default app;
