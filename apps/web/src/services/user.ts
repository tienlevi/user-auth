import instance from "@/config/axios";
import IUser from "@/interfaces/user";

export const getUsers = async () => {
  const response = await instance.get(`/users`);
  return response.data;
};

export const getUserById = async (id: string): Promise<IUser> => {
  const response = await instance.get(`/user/${id}`);
  return response.data;
};
