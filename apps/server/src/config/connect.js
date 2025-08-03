import mongoose from "mongoose";

async function Connect() {
  await mongoose
    .connect(process.env.DATABASE_URL || "")
    .then(() => console.log("Connect success with mongoose"))
    .catch((error) => {
      console.log("Error connecting to database:", error);
    });
}

export default Connect;
