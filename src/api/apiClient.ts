import axios from "axios";

const instance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_MAIN_SERVER,
  headers: {
    "Content-Type": "application/json",
  },
});

export { instance };
