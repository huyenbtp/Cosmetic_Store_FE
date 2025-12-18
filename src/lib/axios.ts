import axios from "axios";

const axiosInstance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000/api",
  timeout: 10000,
});

/**
 * Request interceptor
 * - Gắn access token
 */
axiosInstance.interceptors.request.use(
  (config) => {
    if (typeof window !== "undefined") {
      const token = localStorage.getItem("access_token");
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
    }
    return config;
  },
  (error) => Promise.reject(error)
);

/**
 * Response interceptor
 * - Handle lỗi chung
 */
axiosInstance.interceptors.response.use(
  (response) => response.data, // chỉ trả data
  (error) => {
    const message =
      error.response?.data?.message || error.message || "API Error";

    console.error("API Error:", message);

    return Promise.reject(error);
  }
);

export default axiosInstance;