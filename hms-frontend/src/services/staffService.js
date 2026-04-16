import axiosInstance from "../api/axiosInstance";

const staffService = {
  createStaff: async (data) => {
    try {
      const response = await axiosInstance.post("/staff", data);
      return response.data;
    } catch (error) {
      console.error("Error creating staff record:", error);
      throw error;
    }
  },
  getAllStaff: async () => {
    try {
      const response = await axiosInstance.get("staff");
      return response.data;
    } catch (error) {
      console.error("Error fetching all staff:", error);
      throw error;
    }
  },
  getStaffById: async (id) => {
    try {
      const response = await axiosInstance.get(`staff/${id}`);
      return response.data;
    } catch (error) {
      console.error(`Error fetching staff with ID ${id}:`, error);
      throw error;
    }
  },
  updateStaff: async (id, data) => {
    try {
      const response = await axiosInstance.put(`/staff/${id}`, data);
      return response.data;
    } catch (error) {
      console.error(`Error updating staff with ID ${id}:`, error);
      throw error;
    }
  },
  getStaffByUserId: async (userId) => {
    try {
      const response = await axiosInstance.get(`staff/user/${userId}`);
      return response.data;
    } catch (error) {
      console.error(`Error fetching staff for user ID ${userId}:`, error);
      throw error;
    }
  },
};

export default staffService;
