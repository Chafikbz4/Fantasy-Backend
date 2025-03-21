import mongoose from "mongoose";

const playerSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "User name is required"],
      trim: true,
      minLength: 2,
      maxLength: 20,
    },
    availabel: {
      type: Boolean,
      default: true,
    },
    points: {
      type: Number,
      default: 0,
    },
  },
  { timestamps: true }
);

const Player = mongoose.model("Player", playerSchema);

export { playerSchema };
export default Player;
