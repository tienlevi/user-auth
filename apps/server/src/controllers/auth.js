import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import UserSchema from "../models/user.js";
import { accessToken } from "../constants/index.js";

export const register = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
      return res.status(400).json({ error: "All fields are required" });
    }

    const existingUser = await UserSchema.findOne({ email });

    if (existingUser) {
      return res.status(401).json({ message: "This user already registered" });
    }

    const hashPassword = await bcrypt.hash(password, 6);
    await UserSchema.create({ ...req.body, password: hashPassword });
    return res.status(200).json({
      message: "Register success",
      data: { ...req.body, password: hashPassword, verify: false },
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ error: "Server error" });
  }
};

export const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await UserSchema.findOne({ email });
    if (!user) {
      return res.status(404).json({ message: "Email not found" });
    }
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(402).json({ message: "Email or password incorrect" });
    }
    const token = jwt.sign({ id: user._id }, accessToken, { expiresIn: "3h" });
    return res
      .status(200)
      .json({ message: "Login success", data: user, token: token });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ error: "Server error" });
  }
};
