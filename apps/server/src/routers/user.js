import { Router } from "express";
import { getUsers, getUserById } from "../controllers/user.js";

const userRouter = Router();

userRouter.get("/users", getUsers);
userRouter.get("/user/:id", getUserById);

export default userRouter;
