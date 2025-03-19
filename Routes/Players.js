import { Router } from "express";
import { isAuth } from "../middelewar/AuthMidddelware.js";
import {
  CreatPlayer,
  DeletPlayer,
  GetPlayers,
  ResetPlayer,
  UpdatePlayer,
} from "../controlles/playercontrolle.js";

const Player = Router();
// get all players
Player.get("/", isAuth, GetPlayers);

// Creat Player
Player.post("/admin/Creat-Player", isAuth, CreatPlayer);

// update Player
Player.put("/admin/Update-Player/:id", isAuth, UpdatePlayer);

//reset players Points To 0

Player.put("/admin/Reset-Players/", isAuth, ResetPlayer);

// delete player
Player.delete("admin/Delet-Player/:id", isAuth, DeletPlayer);

export default Player;
