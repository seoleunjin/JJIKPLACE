import axios from "axios";

const instanceBase = axios.create({
  baseURL: process.env.api,
});

const instance = axios.create({
  baseURL: process.env.api,
  headers: {
    "Content-Type": "application/json",
  },
});

const authInstance = axios.create({
  baseURL: process.env.api,
  headers: {
    "Content-Type": "application/json",
  },
});

authInstance.interceptors.request.use((config) => {
  const token = localStorage.getItem("accessToken");
  if (token && config.headers) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

const userInstance = axios.create({
  baseURL: process.env.api,
});

userInstance.interceptors.request.use((config) => {
  const token = localStorage.getItem("accessToken");
  if (token && config.headers) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export { instance, authInstance, instanceBase, userInstance };
