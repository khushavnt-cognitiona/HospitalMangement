import axios from "axios";

const axiosInstance = axios.create({
  baseURL: "https://hospitalmangement-14.onrender.com/api/v1",
  headers: {
    "Content-Type": "application/json"
  }
});

axiosInstance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");
    
    // PREVENT API CALL BEFORE LOGIN
    // Abort request if no token, except for auth routes (login/register)
    if (!token && !config.url.includes("auth")) {
        return Promise.reject(new axios.Cancel("Request cancelled: No token provided"));
    }

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
    }

    return Promise.reject(error);
  }
);

export default axiosInstance;
