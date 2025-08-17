import UserSchema from "../models/user.js";

export const getUsers = async (req, res) => {
  try {
    const data = await UserSchema.find();
    return res.status(200).json(data);
  } catch (error) {
    console.log(error);
  }
};

export const getUserById = async (req, res) => {
  try {
    const id = req.params.id;
    const data = await UserSchema.findOne({ _id: id });
    return res.status(200).json(data);
  } catch (error) {
    console.log(error);
  }
};
