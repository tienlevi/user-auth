import jwt from "jsonwebtoken";
import "dotenv/config";
import { accessToken } from "../constants/index.js";

async function authToken(req, res, next) {
  try {
    const headers = req.headers["authorization"];
    const token = headers && headers.split(" ")[1];
    if (!token) {
      return res.status(401).json({ message: "Auth denined" });
    }
    jwt.verify(token, accessToken, (err, body) => {
      console.log(err);
      if (err) return res.status(403).json({ message: "Error verify" });
      req.body = body;
      // next();
      return res.status(200).json({ body });
    });
  } catch (error) {
    console.log(error);
    req.status(500).json({ message: "Interval error" });
  }
}

export default authToken;
