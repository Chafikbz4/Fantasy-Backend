import { Router } from "express";

const auth = Router();
//sign-up
auth.post("/sign-up", (req, res) => {
  res.status(201).json({ title: "hyyy" });
});
//login
auth.post("/log-in", (req, res) => {
  res.status(201).json({ title: "hyyy" });
});

export default auth;
