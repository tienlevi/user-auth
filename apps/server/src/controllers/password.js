import bcrypt from "bcrypt";
import crypto from "crypto";
import UserSchema from "../models/user.js";
import { sendOTPEmail } from "../templates/email.js";

const generateOTP = () => crypto.randomInt(100000, 999999).toString();

export const forgotPassword = async (req, res) => {
  try {
    const { email } = req.body;

    if (!email) {
      return res.status(400).json({ error: "Email is required" });
    }

    const user = await UserSchema.findOne({ email });

    if (!user) {
      return res
        .status(404)
        .json({ message: "User not found with this email" });
    }

    const otp = generateOTP();

    user.resetPasswordOTP = otp;
    user.resetPasswordExpires = Date.now() + 600000; // 10 minutes

    await user.save();

    try {
      await sendOTPEmail(email, otp, user.name);
      return res.status(200).json({
        message: "Password reset OTP has been sent to your email",
      });
    } catch (emailError) {
      console.error("Email sending error:", emailError);
      user.resetPasswordOTP = undefined;
      user.resetPasswordExpires = undefined;
      await user.save();

      return res.status(500).json({
        error: "Failed to send email. Please try again later.",
      });
    }
  } catch (error) {
    console.error("Forgot password error:", error);
    return res.status(500).json({ error: "Server error" });
  }
};

export const resetPassword = async (req, res) => {
  try {
    const { email, otp, newPassword } = req.body;

    if (!email || !otp || !newPassword) {
      return res.status(400).json({
        error: "Email, OTP, and new password are required",
      });
    }

    const user = await UserSchema.findOne({
      email,
      resetPasswordOTP: otp,
      resetPasswordExpires: { $gt: Date.now() },
    });

    if (!user) {
      return res.status(401).json({
        message: "Invalid or expired OTP",
      });
    }

    const hashPassword = await bcrypt.hash(newPassword, 10);

    user.password = hashPassword;
    user.resetPasswordOTP = undefined;
    user.resetPasswordExpires = undefined;

    await user.save();

    return res.status(200).json({
      message: "Password has been reset successfully",
    });
  } catch (error) {
    console.error("Reset password error:", error);
    return res.status(500).json({ error: "Server error" });
  }
};
