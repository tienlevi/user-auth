import { Router } from "express";
import authToken from "../middlewares/authToken.js";

const userRouter = Router();

userRouter.get("/auth", authToken, async (req, res) => {
  return res.status(200).json({ message: "Welcome user" });
});

export default userRouter;
