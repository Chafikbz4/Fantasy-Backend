import Player from "../models/player.js";

// get all players
export const GetPlayers = async (req, res, next) => {
  try {
    const players = await Player.find();
    res.status(201).json({
      succes: true,
      data: {
        players: players,
      },
    });
  } catch (error) {
    next(error);
  }
};

// Creat a player
export const CreatPlayer = async (req, res, next) => {
  try {
    const { name } = req.body;
    const player = await Player.create({
      name,
    });
    res
      .status(201)
      .json({ succes: true, message: "player created succesfyly" });
  } catch (error) {
    next(error);
  }
};

// update player points
export const UpdatePlayer = async (req, res, next) => {
  try {
    const { redcart, yellowcart, manOfMatch } = req.body;
    const player = await Player.findById(req.params.id);
    if (!player) {
      res.status(401).json({ message: "There is no Palayer" });
    }
    let newPoints = player.points;
    newPoints = newPoints + -2 * Number(yellowcart) + -4 * Number(redcart);
    if (manOfMatch) {
      newPoints = newPoints + 10;
    }
    const updatedPlayer = await Player.findByIdAndUpdate(
      req.params.id,
      { points: newPoints },
      { new: true } // Return updated document
    );

    res.status(200).json({ success: true, data: updatedPlayer });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

//delete player
export const DeletPlayer = async (req, res, next) => {
  try {
    const player = await Player.findById(req.params.id);
    if (!player) {
      res.status(401).json({ message: "no player Found" });
    }

    await Player.findByIdAndDelete(req.params.id); // Delete player

    res
      .status(200)
      .json({ success: true, message: "Player deleted successfully" });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};
