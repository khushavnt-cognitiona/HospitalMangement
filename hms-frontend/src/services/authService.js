import axiosInstance from "../api/axiosInstance";

const register = async (userData) => {
  try {
    const response = await axiosInstance.post("auth/register", userData);
    if (response.data.token) {
      localStorage.setItem("token", response.data.token);
      localStorage.setItem("user", JSON.stringify(response.data));
    }
    return response.data;
  } catch (error) {
    console.error("Registration error:", error);
    throw error;
  }
};

const login = async (credentials) => {
  try {
    const response = await axiosInstance.post("auth/authenticate", credentials);
    if (response.data.token) {
      localStorage.setItem("token", response.data.token);
      localStorage.setItem("user", JSON.stringify(response.data));
    }
    return response.data;
  } catch (error) {
    console.error("Login error:", error);
    throw error;
  }
};

const sendOtp = async (target) => {
  try {
    const response = await axiosInstance.post("auth/send-otp", { target });
    return response.data;
  } catch (error) {
    console.error("OTP send error:", error);
    throw error;
  }
};

const verifyOtp = async (verificationData) => {
  try {
    const response = await axiosInstance.post("auth/verify-otp", verificationData);
    if (response.data.token) {
      localStorage.setItem("token", response.data.token);
      localStorage.setItem("user", JSON.stringify(response.data));
    }
    return response.data;
  } catch (error) {
    console.error("OTP verification error:", error);
    throw error;
  }
};

const logout = () => {
// ... existing logout code
  localStorage.removeItem("token");
  localStorage.removeItem("user");
};

const getCurrentUser = () => {
  return JSON.parse(localStorage.getItem("user"));
};

export default {
  register,
  login,
  sendOtp,
  verifyOtp,
  logout,
  getCurrentUser,
};
