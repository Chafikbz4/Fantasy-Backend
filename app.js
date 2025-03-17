import express from "express";
import cookieParser from "cookie-parser";
import { PORT } from "./config/env.js";
const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.get("/", (req, res) => {
  res.send("welcom to the supbscription tracker api");
});

app.listen(PORT, () => {
  console.log(`Fantasy running at http://localhost:${PORT}`);
});
