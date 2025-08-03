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
app.use("/v1", userRouter);
app.use("/v1", authRouter);
app.use("/", async (req, res) => {
  return res.json(200).json({ message: "Hello world" });
});

app.get("/", (_req, res) => {
  res.status(200).send("OK");
});

Connect();

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
