import IUser from "@/interfaces/user";

export const getContentType = () => ({
  "Content-Type": "application/json",
});

export const getAccessToken = () => {
  if (typeof window === "undefined") return null;
  return localStorage.getItem("accessToken");
};

export const setUserInfo = (data: IUser) => {
  if (typeof window === "undefined") return;
  return localStorage.setItem("user", JSON.stringify(data));
};

export const setAccessToken = (token: string) => {
  if (typeof window === "undefined") return;
  return localStorage.setItem("accessToken", token);
};

export const logoutCallback = (callback: () => void) => {
  return callback;
};
