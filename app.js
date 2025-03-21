import express from "express";
import cookieParser from "cookie-parser";
import { PORT } from "./config/env.js";
import auth from "./Routes/auth.js";
import connectToDB from "./dataBase/mongodb.js";
import Users from "./Routes/Users.js";
import errorMiddeleware from "./middelewar/error.js";
import Player from "./Routes/Players.js";
import { apiLimiter } from "./middelewar/rateLimiter.js";

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

// Apply rate limiter
app.use(apiLimiter);

// The auth route
app.use("/auth", auth);

// The user route
app.use("/users", Users);

// The player route
app.use("/Player", Player);

// Error handler
app.use(errorMiddeleware);

app.get("/", (req, res) => {
  res.send("Welcome to the subscription tracker API");
});

connectToDB().then(() => {
  app.listen(PORT, () => {
    console.log(`Fantasy running at http://localhost:${PORT}`);
  });
});
