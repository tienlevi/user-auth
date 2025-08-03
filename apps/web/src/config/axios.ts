import { baseURL } from "@/constants";
import { getAccessToken, logoutCallback } from "@/utils/auth";
import axios from "axios";

const instance = axios.create({ baseURL: baseURL, withCredentials: true });
const logout = () => null;

instance.interceptors.request.use(
  (config) => {
    const accessToken = getAccessToken();

    if (config && config.headers && accessToken) {
      config.headers.Authorization = `Bearer ${accessToken}`;
    }

    return config;
  },
  (error) => Promise.reject(error)
);
instance.interceptors.response.use(
  (response) => {
    return response;
  },
  async (error) => {
    if (error.response && error.response.status === 401) {
      const originalRequest = error.config;
      if (originalRequest._retry) {
        return Promise.reject(error);
      }
      originalRequest._retry = true;
      if (logoutCallback) {
        logoutCallback(logout);
      }
      return Promise.reject(error);
    }

    return Promise.reject(error);
  }
);

export default instance;
