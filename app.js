import express from "express";
import cookieParser from "cookie-parser";
import cors from "cors";
import { PORT } from "./config/env.js";
import auth from "./Routes/auth.js";
import connectToDB from "./dataBase/mongodb.js";
import Users from "./Routes/Users.js";
import errorMiddeleware from "./middelewar/error.js";
import Player from "./Routes/Players.js";

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(cors());

//the auth route
app.use("/api/auth", auth);

//the user route
app.use("/api/users", Users);

//the player route
app.use("/api/Player", Player);

//error handler
app.use(errorMiddeleware);

app.get("/", (req, res) => {
  res.send("welcom to the supbscription tracker api");
});
connectToDB().then(() => {
  app.listen(PORT, () => {
    console.log(`Fantasy running at http://localhost:${PORT}`);
  });
});
