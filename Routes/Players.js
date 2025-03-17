import { Router } from "express";

const Player = Router();

Player.get("/", (req, res) => {
  res.status(201).json({ message: "get all Players" });
});

Player.post("/Creat-Player", (req, res) => {
  res.status(201).json({ message: "creat a new player" });
});

Player.put("/Update-Player/:id", (req, res) => {
  res.status(201).json({ message: "update spesifice player" });
});

Player.delete("/Delet-Player/:id", (req, res) => {
  res.status(201).json({ message: "delet a player" });
});

export default Player;
