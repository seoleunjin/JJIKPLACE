import axios from "axios";

const instance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_MAIN_SERVER,
  headers: {
    "Content-Type": "application/json",
  },
});

const authInstance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_MAIN_SERVER,
  withCredentials: true,
  headers: {
    "Content-Type": "application/json",
  },
});

const userInstance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_MAIN_SERVER,
  withCredentials: true,
});

export { instance, authInstance, userInstance };
