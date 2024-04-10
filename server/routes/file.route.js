import express from "express";
import {
  createFile,
  getAllFile,
  updateFile,
  getFileById,
  getUserAllFileById,
  shareFileToUser,
} from "../controllers/file.controller.js";
import { isLoggedInUser } from "../middleware/auth.middleware.js";

const fileRoute = express.Router();
fileRoute.post("/create", isLoggedInUser, createFile);
fileRoute.put("/update", updateFile);
fileRoute.get("/all_files", getAllFile);
fileRoute.post("/get_file_by_id", getFileById);
fileRoute.get("/get_user_file_by_id", isLoggedInUser, getUserAllFileById);
fileRoute.post("/share_file_to_user", shareFileToUser);

export default fileRoute;
