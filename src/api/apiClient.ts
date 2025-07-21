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

// // 기본 interceptors 사용 코드, 위는 authInstance,userInstance 두개 합치려고 축약형
// // authInstance.interceptors.response.use(
// //   (response) => {
// //     // 응답이 성공적일 경우 그대로 반환
// //     return response;
// //   },
// //   (error) => {
// //     // 401(Unauthorized) 응답일 경우 accessToken 제거
// //     if (error.response?.status === 401) {
// //       console.warn("세션 만료 또는 인증 오류로 토큰 제거");
// //       localStorage.removeItem("accessToken");
// //       // 필요 시 로그인 페이지로 이동
// //       window.location.href = "/login";
// //     }
// //     return Promise.reject(error);
// //   }
// // );

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
