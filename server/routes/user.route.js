import express from "express";
import { login, signup, getAllUsers } from "../controllers/user.controller.js";

const userRoute = express.Router();
userRoute.post("/signup", signup);
userRoute.post("/login", login);
userRoute.get("/", getAllUsers);

export default userRoute;
