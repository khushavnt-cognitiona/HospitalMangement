import axiosInstance from "../api/axiosInstance";

const getUserProfile = async () => {
  try {
    const response = await axiosInstance.get("users/profile");
    return response.data;
  } catch (error) {
    console.error("Error fetching user profile:", error);
    throw error;
  }
};

const updateProfile = async (userData) => {
  try {
    const response = await axiosInstance.put("users/profile", userData);
    return response.data;
  } catch (error) {
    console.error("Error updating user profile:", error);
    throw error;
  }
};

const uploadProfileImage = async (formData) => {
  try {
    const response = await axiosInstance.post("users/profile/image", formData, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    });
    return response.data;
  } catch (error) {
    console.error("Error uploading profile image:", error);
    throw error;
  }
};

export default {
  getUserProfile,
  updateProfile,
  uploadProfileImage
};
