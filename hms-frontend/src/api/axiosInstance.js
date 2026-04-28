import axios from "axios";

const API_BASE_URL = import.meta.env.VITE_API_URL || "https://hospitalmangement-14.onrender.com/api/v1/";

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    "Content-Type": "application/json"
  }
});

api.interceptors.request.use(
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

api.interceptors.response.use(
  (response) => response,
  (error) => {
    const status = error.response?.status;

    if (status === 401) {
      console.warn("Session expired or unauthorized. Logging out.");
      localStorage.removeItem("token");
      localStorage.removeItem("user");
      
      if (window.location.pathname !== "/login") {
        window.location.href = "/login?expired=true";
      }
    } else if (status === 403) {
      console.warn("Access forbidden: You do not have permission to access this resource.");
      // We don't log out on 403 because the session might still be valid, 
      // just not for this specific administrative or restricted resource.
    }

    return Promise.reject(error);
  }
);

export default api;
