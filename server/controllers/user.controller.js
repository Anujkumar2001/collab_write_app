import { User } from "../models/user.model.js";
import jwt from "jsonwebtoken";

const signup = async (req, res) => {
  const { name, username, email, password } = req.body;

  const existingUser = await User.findOne({ email });
  if (existingUser) {
    return res.status(400).json({ message: "user already exist" });
  }

  const response = await User.create({ name, email, password, username });

  return res.status(201).json(response);
};

const login = async (req, res) => {
  const { username, password, email } = req.body;
  try {
    const existingUser = await User.findOne({ username });
    if (!existingUser) {
      return res.status(400).json({ message: "user not found" });
    }
    if (existingUser.password === password) {
      const payload = {
        user_id: existingUser._id,
        username: existingUser.username,
      };
      const token = jwt.sign(payload, process.env.JWT_SECRET_KEY, {
        expiresIn: "1d",
      });
      return res.status(200).json({
        _id: existingUser._id,
        username: existingUser.username,
        email: existingUser.email,
        token: token,
      });
    }
  } catch (error) {
    res.status(400).json("invalid details");
  }
};

const getAllUsers = async (req, res) => {
  const allUserData = await User.find();
  allUserData.forEach((el) => {
    el.password = undefined;
  });
  return res.status(200).json(allUserData);
};

export { signup, login, getAllUsers };
