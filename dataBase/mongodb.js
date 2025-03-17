import mongoose from "mongoose";

import { mongoos_URL } from "../config/env.js";
if (!mongoos_URL) {
  throw new Error("Pleas define the monooogs url connection ");
}

const connectToDB = async () => {
  try {
    await mongoose.connect(mongoos_URL);
    console.log("connection id done");
  } catch (error) {
    console.error("Error connecting to the daatbase");
    process.exit(1);
  }
};

export default connectToDB;
