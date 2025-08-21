import instance from "@/config/axios";
import IUser from "@/interfaces/user";

export const getAuthToken = async (token: string) => {
  const response = await instance.get("/auth", {
    headers: { Authorization: `bearer ${token}` },
  });
  return response.data;
};

export const register = async (data: IUser) => {
  const response = await instance.post("/register", data);
  return response.data;
};

export const loginAuth = async (data: { email: string; password: string }) => {
  const response = await instance.post("/login", data);
  return response.data;
};
