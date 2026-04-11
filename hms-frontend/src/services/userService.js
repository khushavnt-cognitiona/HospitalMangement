import axiosInstance from "../api/axiosInstance";

const getUserProfile = async () => {
  const response = await axiosInstance.get("/users/profile");
  return response.data;
};

const updateProfile = async (userData) => {
  const response = await axiosInstance.put("/users/profile", userData);
  // Update local storage user data if successful
  const currentUser = JSON.parse(localStorage.getItem("user"));
  const updatedUser = { ...currentUser, ...response.data };
  localStorage.setItem("user", JSON.stringify(updatedUser));
  return response.data;
};

const uploadProfileImage = async (formData) => {
  const response = await axiosInstance.post("/users/profile/image", formData, {
    headers: {
      'Content-Type': 'multipart/form-data'
    }
  });
  return response.data;
};

export default {
  getUserProfile,
  updateProfile,
  uploadProfileImage
};
