import express from "express";
import cookieParser from "cookie-parser";
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

//the auth route
app.use("/auth", auth);

//the user route
app.use("/users", Users);

//the player route
app.use("/Player", Player);

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
