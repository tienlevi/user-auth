import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import crypto from "crypto";
import UserSchema from "../models/user.js";
import { accessToken } from "../constants/index.js";
import { sendVerificationEmail } from "../templates/email.js";

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

    const verificationToken = crypto.randomBytes(32).toString("hex");
    const verificationTokenExpiry = new Date(Date.now() + 24 * 60 * 60 * 1000); // 24 hours

    const hashPassword = await bcrypt.hash(password, 6);

    const user = await UserSchema.create({
      name,
      email,
      password: hashPassword,
      verify: false,
      verificationToken,
      verificationTokenExpiry,
    });

    await sendVerificationEmail(email, verificationToken, name);

    return res.status(200).json({
      message:
        "Registration successful! Please check your email to verify your account.",
      data: user,
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

export const verifyEmail = async (req, res) => {
  try {
    const { token, email } = req.query;

    if (!token || !email) {
      return res.status(400).json({ message: "Token and email are required" });
    }

    const user = await UserSchema.findOne({ email });

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    if (user.verify) {
      return res.status(400).json({ message: "Email already verified" });
    }

    if (user.verificationToken !== token) {
      return res.status(400).json({ message: "Invalid verification token" });
    }

    if (new Date() > user.verificationTokenExpiry) {
      return res
        .status(400)
        .json({ message: "Verification token has expired" });
    }

    user.verify = true;
    user.verificationToken = undefined;
    user.verificationTokenExpiry = undefined;
    await user.save();

    return res.status(200).json({
      message: "Email verified successfully!",
      data: user,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ error: "Server error" });
  }
};
