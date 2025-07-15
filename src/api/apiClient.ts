import axios from "axios";

// 환경 변수에서 가져온 URL
const BASE_URL = process.env.NEXT_PUBLIC_MAIN_SERVER || "/api";

// 공통 axios 인스턴스
const instanceBase = axios.create({
  baseURL: BASE_URL,
});

const instance = axios.create({
  baseURL: BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

// 인증이 필요한 요청
const authInstance = axios.create({
  baseURL: BASE_URL,
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

// 사용자 인증 기반 요청
const userInstance = axios.create({
  baseURL: BASE_URL,
});

userInstance.interceptors.request.use((config) => {
  const token = localStorage.getItem("accessToken");
  if (token && config.headers) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export { instance, authInstance, instanceBase, userInstance };
