import axios from "axios";
import { useAuthStore } from "../store/auth";

const baseURL = process.env.NODE_ENV === "production"
    ? process.env.DOMAIN
    : "http://localhost:4000";

const authApi = axios.create({
  baseURL,
  withCredentials: true,
});

authApi.interceptors.request.use((config) => {
  const {user} = useAuthStore.getState();

  config.headers = {
    Authorization: `Bearer ${user?.token}`,
  };
  return config;
});

export default authApi;
