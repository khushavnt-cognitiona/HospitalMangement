import axios from "axios";

const API_BASE_URL = "http://localhost:8080/api/v1";

const axiosInstance = axios.create({
  baseURL: API_BASE_URL,
});

axiosInstance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

axiosInstance.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401 || error.response?.status === 403) {
      console.warn("Session expired or unauthorized. Clearing local storage.");
      localStorage.removeItem("token");
      localStorage.removeItem("user");
      // Force reload to trigger AuthContext update if needed
      if (window.location.pathname !== "/login") {
         window.location.href = "/login";
      }
    }
    return Promise.reject(error);
  }
);

export default axiosInstance;
