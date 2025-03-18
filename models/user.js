import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "User name is required"],
      trim: true,
      minLength: 2,
      maxLength: 20,
    },
    email: {
      type: String,
      required: [true, "User email is reqired"],
      trim: true,
      unique: true,
      lowercase: true,
      match: [/\S+@\S+\.\S+/, "Please enter a valid email address"],
    },
    password: {
      type: String,
      required: [true, "user password is required"],
      trim: true,
      minLength: 6,
    },
    weekScore: {
      type: Number,
      default: 0,
    },
    TotaleScore: {
      type: Number,
      default: 0,
    },
    Team: {
      type: [{ type: mongoose.Schema.Types.ObjectId, ref: "Player" }], // Array of Player references
      default: [], // Starts as an empty array
    },
    captinId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Player",
      default: null,
    },
  },
  { timestamps: true }
);

const User = mongoose.model("User", userSchema);

export default User;
