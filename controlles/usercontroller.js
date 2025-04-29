import User from "../models/user.js";
import Player from "../models/player.js";
// Controller to get all users sorted
export const getUsers = async (req, res, next) => {
  try {
    const users = await User.find()
      .sort({ TotaleScore: -1 })
      .select("name weekScore TotaleScore");
    res.status(200).json({
      success: true,
      data: {
        users: users,
      },
    });
    next();
  } catch (error) {
    res.status(401).json({ success: false, message: error.message });
  }
};

//get user data

export const getUserdata = async (req, res, next) => {
  try {
    if (req.user._id.toString() !== req.params.id) {
      return res
        .status(403)
        .json({ message: "Forbidden: You can only view your own profile" });
    }
    const user = await User.findById(req.params.id).select("-password");
    if (!user) {
      const error = new Error("User not found");
      error.statusCode = 404;
      throw error;
    }

    res.status(200).json({ success: true, data: user });
    next;
  } catch (error) {
    res.status(401).json({ success: false, message: error.message });
  }
};

// get user Team

export const getUserteam = async (req, res, next) => {
  try {
    if (req.user._id.toString() !== req.params.id) {
      return res
        .status(403)
        .json({ message: "Forbidden: You can only view your own profile" });
    }
    const user = await User.findById(req.params.id).select(" Team ");
    if (!user) {
      const error = new Error("User not found");
      error.statusCode = 404;
      throw error;
    }

    res.status(200).json({ success: true, data: user });
    next;
  } catch (error) {
    res.status(401).json({ success: false, message: error.message });
  }
};

//update user team
export const UpdateTeam = async (req, res, next) => {
  try {
    // Find the user first
    const user = await User.findById(req.params.id);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Ensure the logged-in user can only update their own team
    if (req.user._id.toString() !== user._id.toString()) {
      return res
        .status(403)
        .json({ message: "Forbidden: You can only update your own team" });
    }

    // Update the user's team and captain ID
    user.Team = req.body.players;
    user.captinId = req.body.captinId;

    // Save the updated user
    await user.save();

    res.status(200).json({ success: true, data: user });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// calculate point

export const PutPoit = async (req, res) => {
  try {
    const users = await User.find();

    for (const user of users) {
      let weekScore = 0;

      // Fetch all players in the user's team
      const players = await Player.find({ _id: { $in: user.Team } });

      for (const player of players) {
        // If the player is the captain, double their points
        if (user.captinId.toString() === player._id.toString()) {
          weekScore += player.points * 2;
        } else {
          weekScore += player.points;
        }
      }

      // Update user scores
      user.weekScore = weekScore;
      user.TotaleScore += weekScore;

      await user.save();
    }

    res
      .status(200)
      .json({ success: true, message: "Scores updated successfully" });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// make the weekpoit is 0

export const RestartWeek = async (req, res) => {
  try {
    // Update all users to set weekScore to 0
    await User.updateMany({}, { weekScore: 0 });

    res
      .status(200)
      .json({ success: true, message: "Week points reset successfully" });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};
