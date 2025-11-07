import { Router } from "express";
import { login, register } from "../controllers/auth.js";
import authToken from "../middlewares/authToken.js";
import { forgotPassword, resetPassword } from "../controllers/password.js";

const authRouter = Router();
authRouter.get("/auth", authToken);
authRouter.post("/register", register);
authRouter.post("/login", login);
authRouter.post("/forgot-password", forgotPassword);
authRouter.post("/reset-password", resetPassword);

export default authRouter;
