import type { IUser } from "@/interfaces/user";

export const getContentType = () => ({
  "Content-Type": "application/json",
});

export const getAccessToken = () => {
  return localStorage.getItem("accessToken");
};

export const setUserInfo = (data: IUser) => {
  return localStorage.setItem("user", JSON.stringify(data));
};

export const setAccessToken = (token: string) => {
  return localStorage.setItem("accessToken", token);
};

export const logoutCallback = (callback: () => void) => {
  return callback;
};
