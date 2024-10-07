import mongoose from "mongoose"
import express from "express";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import userRoute from "./routes/userRoute.js";
import cors from "cors";

dotenv.config();
const database_URL=process.env.MONGO_URI;
const app = express();

//middlewares
app.use(
  cors({
    origin:'http://localhost:3000',
    methods:['GET','POST','PUT','PATCH','DELETE'],
    credentials: true,
  })
);
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cookieParser());
app.get("/", (req, res) => {
  return res.send("welcome to netfilx page !");
});

//apis
app.use("/api/v1/user", userRoute);

mongoose
  .connect(database_URL)
  .then(() => {
    console.log("connection done !");
  })
  .catch((err) => {
    console.log("error while connecting database")
    console.log(err);
  });

app.listen(process.env.PORT, () => {
  console.log("listening to port http://localhost:8080");
});
