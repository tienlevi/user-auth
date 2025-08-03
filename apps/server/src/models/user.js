import { Schema, model } from "mongoose";

const User = new Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
  },
  { timestamps: true, versionKey: false }
);

const UserSchema = model("users", User);

export default UserSchema;
