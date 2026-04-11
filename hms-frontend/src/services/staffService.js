import axiosInstance from "../api/axiosInstance";

const staffService = {
  createStaff: async (data) => {
    const response = await axiosInstance.post("/staff", data);
    return response.data;
  },
  getAllStaff: async () => {
    const response = await axiosInstance.get("/staff");
    return response.data;
  },
  getStaffById: async (id) => {
    const response = await axiosInstance.get(`/staff/${id}`);
    return response.data;
  },
  updateStaff: async (id, data) => {
    const response = await axiosInstance.put(`/staff/${id}`, data);
    return response.data;
  },
  getStaffByUserId: async (userId) => {
    const response = await axiosInstance.get(`/staff/user/${userId}`);
    return response.data;
  },
};

export default staffService;
