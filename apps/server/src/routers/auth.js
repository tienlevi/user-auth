import { Router } from "express";
import { login, register } from "../controllers/auth.js";
import authToken from "../middlewares/authToken.js";

const authRouter = Router();
authRouter.get("/auth", authToken);
authRouter.post("/register", register);
authRouter.post("/login", login);

export default authRouter;
