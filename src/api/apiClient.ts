// 배포전 사용
import axios, { AxiosError } from "axios";

const instanceBase = axios.create({
  baseURL: process.env.NEXT_PUBLIC_MAIN_SERVER,
});

const instance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_MAIN_SERVER,
  headers: {
    "Content-Type": "application/json",
  },
});

const authInstance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_MAIN_SERVER,
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
  baseURL: process.env.NEXT_PUBLIC_MAIN_SERVER,
});

userInstance.interceptors.request.use((config) => {
  const token = localStorage.getItem("accessToken");
  if (token && config.headers) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// 401 또는 403 에러시 accessToken 토큰 삭제
const handleAuthError = (error: AxiosError) => {
  if (error.response?.status === 401 || error.response?.status === 403) {
    localStorage.removeItem("accessToken");
    // alert("세션 만료 또는 인증 오류");
  }
  return Promise.reject(error);
};
authInstance.interceptors.response.use((res) => res, handleAuthError);
userInstance.interceptors.response.use((res) => res, handleAuthError);

export { instance, authInstance, instanceBase, userInstance };

// 배포 후 사용
// import axios, { AxiosError } from "axios";

// const baseURL = "/api";

// const instanceBase = axios.create({
//   baseURL,
// });

// const instance = axios.create({
//   baseURL,
//   headers: {
//     "Content-Type": "application/json",
//   },
// });

// const authInstance = axios.create({
//   baseURL,
//   headers: {
//     "Content-Type": "application/json",
//   },
// });

// authInstance.interceptors.request.use((config) => {
//   const token = localStorage.getItem("accessToken");
//   if (token && config.headers) {
//     config.headers.Authorization = `Bearer ${token}`;
//   }
//   return config;
// });

// const userInstance = axios.create({
//   baseURL,
// });

// userInstance.interceptors.request.use((config) => {
//   const token = localStorage.getItem("accessToken");
//   if (token && config.headers) {
//     config.headers.Authorization = `Bearer ${token}`;
//   }
//   return config;
// });

// const handleAuthError = (error: AxiosError) => {
//   if (error.response?.status === 401 || error.response?.status === 403) {
//     localStorage.removeItem("accessToken");
//     // alert("세션 만료 또는 인증 오류");
//   }
//   return Promise.reject(error);
// };
// authInstance.interceptors.response.use((res) => res, handleAuthError);
// userInstance.interceptors.response.use((res) => res, handleAuthError);

// export { instance, authInstance, instanceBase, userInstance };
