import "dotenv/config";
import cors from "cors";
import express from "express";
import userRouter from "./routers/user.js";
import authRouter from "./routers/auth.js";
import Connect from "./config/connect.js";

const app = express();
const port = 3000;

app.use(
  cors({
    origin: process.env.CORS_ORIGIN || "",
    methods: ["GET", "POST", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
    credentials: true,
  })
);

app.use(express.json());
app.use("/api/v1", userRouter);
app.use("/api/v1", authRouter);

app.get("/", (_req, res) => {
  res.status(200).send("OK");
});

Connect();

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
