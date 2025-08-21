import instance from "@/config/axios";

export const getUsers = async () => {
  const response = await instance.get(`/users`);
  return response.data;
};

export const getUserById = async (id: string) => {
  const response = await instance.get(`/user/${id}`);
  return response.data;
};
