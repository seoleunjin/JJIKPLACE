import axios from "axios";

// Netlify 프록시 경로를 baseURL로 지정
const baseURL = "/api";

const instanceBase = axios.create({
  baseURL,
});

const instance = axios.create({
  baseURL,
  headers: {
    "Content-Type": "application/json",
  },
});

const authInstance = axios.create({
  baseURL,
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
  baseURL,
});

userInstance.interceptors.request.use((config) => {
  const token = localStorage.getItem("accessToken");
  if (token && config.headers) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export { instance, authInstance, instanceBase, userInstance };
