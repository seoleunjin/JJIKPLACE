import axios from "axios";

const apiClient = axios.create({
  baseURL: process.env.NEXT_PUBLIC_MAIN_SERVER,
});

export default apiClient;
