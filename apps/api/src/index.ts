import cors from "cors";
import * as dotenv from "dotenv";
import express from "express";

dotenv.config();

// mongoose.connect(process.env.DATABASE_URL).then(() => console.log("Connented to DB"));

const app = express();

const corsOptions = {
  origin: ["http://localhost:3000/"],
};

app.use(cors(corsOptions));
app.set("port", process.env.PORT || 8080);

app.listen(app.get("port"), () => {
  console.log(app.get("port"), "Server Started!");
});
