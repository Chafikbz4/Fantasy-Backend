import { Router } from "express";
import { isAuth } from "../middelewar/AuthMidddelware.js";
import {
  getUserdata,
  getUsers,
  getUserteam,
  PutPoit,
  UpdateTeam,
  RestartWeek,
} from "../controlles/usercontroller.js";

const Users = Router();

//get all users with classment (sorted)

Users.get("/", isAuth, getUsers);

//get user data
Users.get("/:id", isAuth, getUserdata);

//get user Team
Users.get("/:id/Team", isAuth, getUserteam);

//update user team
Users.put("/:id/Team", isAuth, UpdateTeam);

// Calcultae the user point
Users.put("/admin/Update-points", isAuth, PutPoit);

Users.put("/admin/ResterWeek", isAuth, RestartWeek);

export default Users;
