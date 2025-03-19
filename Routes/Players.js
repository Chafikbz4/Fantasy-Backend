import { Router } from "express";
import { isAuth } from "../middelewar/AuthMidddelware.js";
import {
  CreatPlayer,
  DeletPlayer,
  GetPlayers,
  UpdatePlayer,
} from "../controlles/playercontrolle.js";

const Player = Router();

Player.get("/", isAuth, GetPlayers);

Player.post("/Creat-Player", isAuth, CreatPlayer);

Player.put("/Update-Player/:id", isAuth, UpdatePlayer);

Player.delete("/Delet-Player/:id", isAuth, DeletPlayer);

export default Player;
