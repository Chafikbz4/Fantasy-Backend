import User from "../models/user.js";

// Controller to get all users sorted
export const getUsers = async (req, res, next) => {
  try {
    const users = await User.find().select("name weekScore TotaleScore");
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
