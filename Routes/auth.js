import { Router } from "express";
import { signIn, signUp } from "../controlles/authcontrole.js";

const auth = Router();
//sign-up
auth.post("/sign-up", signUp);
//login
auth.post("/log-in", signIn);

export default auth;
