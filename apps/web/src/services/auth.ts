import instance from "@/config/axios";
import type { IUser } from "@/interfaces/user";

export const register = async (data: IUser) => {
  const response = await instance.post("/register", data);
  return response.data;
};
