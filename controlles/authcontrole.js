import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { JWT_SECRET } from "../config/env.js";
import User from "../models/user.js";

export const signUp = async (req, res, next) => {
  try {
    const { name, email, password, role } = req.body;

    // Check if user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({
        success: false,
        message: "User already exists",
      });
    }

    // Hash password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Create user
    const newUserData = {
      name,
      email,
      password: hashedPassword,
    };

    if (role) {
      newUserData.role = role;
    }

    const newUser = await User.create(newUserData);

    // Generate JWT Token
    const token = jwt.sign(
      { userId: newUser._id, tokenVersion: newUser.tokenVersion },
      JWT_SECRET,
      {
        expiresIn: "1d",
      }
    );

    res.status(201).json({
      success: true,
      message: "User created",
      data: {
        token,
        user: newUser,
      },
    });
  } catch (error) {
    next(error);
  }
};

export const signIn = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({
        success: false,
        message: "User do not exists",
      });
    }
    const ispasswordValid = await bcrypt.compare(password, user.password);
    if (!ispasswordValid) {
      return res.status(401).json({
        success: false,
        message: "invalide password",
      });
    }
    const token = jwt.sign({ userId: user._id }, JWT_SECRET, {
      expiresIn: "1d",
    });
    res.status(200).json({
      success: true,
      message: "user signed in succesfully",
      data: {
        token,
        user: user,
      },
    });
  } catch (error) {
    next(error);
  }
};
