import nodemailer from "nodemailer";
import "dotenv/config";

const transporter = nodemailer.createTransport({
  service: "gmail",
  port: 465,
  secure: false,
  auth: {
    user: process.env.EMAIL || "",
    pass: process.env.PASSWORD || "",
  },
});

export default transporter;
