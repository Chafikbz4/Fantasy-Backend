import { json, Router } from "express";

const Users = Router();

//get all users with classment

Users.get("/", (req, res) => {
  res.status(201).json({ message: "get all users" });
});

export default Users;

//get user data
Users.get("/:id", (req, res) => {
  res.status(201).json({ message: "get user data" });
});

//get user Team
Users.get("/:id/Team", (req, res) => {
  res.status(201).json({ message: "user team " });
});

//update user team
Users.put("/:id/Team", (req, res) => {
  res.status(201).json({ message: "update user Team" });
});
