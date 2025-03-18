import { json, Router } from "express";
import { isAuth } from "../middelewar/AuthMidddelware.js";
import {
  getUserdata,
  getUsers,
  getUserteam,
} from "../controlles/usercontrole.js";

const Users = Router();

//get all users with classment (sorted)

Users.get("/", isAuth, getUsers);

//get user data
Users.get("/:id", isAuth, getUserdata);

//get user Team
Users.get("/:id/Team", isAuth, getUserteam);

//update user team
Users.put("/:id/Team", isAuth, (req, res) => {
  res.status(201).json({ message: "update user Team" });
});

export default Users;
