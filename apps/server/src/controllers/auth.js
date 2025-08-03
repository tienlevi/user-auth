import bcrypt from "bcrypt";
import UserSchema from "../models/user.js";

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
    await UserSchema.create(req.body);
    return res.status(200).json({
      message: "Register success",
      data: { ...req.body, password: hashPassword },
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ error: "Server error" });
  }
};
