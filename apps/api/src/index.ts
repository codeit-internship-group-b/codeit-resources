import cors from "cors";
import * as dotenv from "dotenv";
import express, { Application } from "express";
import roomsRouter from "./controllers/roomController";

dotenv.config();

// mongoose.connect(process.env.DATABASE_URL).then(() => console.log("Connented to DB"));

const app: Application = express();

const corsOptions = {
  origin: ["http://localhost:3000/"],
};

app.use(cors(corsOptions));
app.use(express.json());
app.set("port", process.env.PORT || 8080);

app.use("/rooms", roomsRouter);

app.listen(app.get("port"), () => {
  console.log(app.get("port"), "Server Started!");
});

export default app;
