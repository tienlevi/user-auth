import { Schema, model } from "mongoose";

const userSchema = new Schema(
  {
    _id: { type: String },
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
  },
  { timestamps: true, versionKey: false }
);

const User = model("users", userSchema);

export default User;
