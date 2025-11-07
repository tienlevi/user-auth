import { Router } from "express";
import { login, register, verifyEmail } from "../controllers/auth.js";
import authToken from "../middlewares/authToken.js";

const authRouter = Router();
authRouter.get("/auth", authToken);
authRouter.post("/register", register);
authRouter.post("/login", login);
authRouter.get("/verify-email", verifyEmail);

export default authRouter;
