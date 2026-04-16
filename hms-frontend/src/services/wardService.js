import axiosInstance from "../api/axiosInstance";

const wardService = {
  createWard: async (data) => {
    try {
      const response = await axiosInstance.post("/wards", data);
      return response.data;
    } catch (error) {
      console.error("Error creating ward:", error);
      throw error;
    }
  },
  getAllWards: async () => {
    try {
      const response = await axiosInstance.get("/wards");
      return response.data;
    } catch (error) {
      console.error("Error fetching wards:", error);
      throw error;
    }
  },
  getWardById: async (id) => {
    try {
      const response = await axiosInstance.get(`/wards/${id}`);
      return response.data;
    } catch (error) {
      console.error(`Error fetching ward with ID ${id}:`, error);
      throw error;
    }
  },
  assignBed: async (data) => {
    try {
      const response = await axiosInstance.post("/beds/assign", data);
      return response.data;
    } catch (error) {
      console.error("Error assigning bed:", error);
      throw error;
    }
  },
  releaseBed: async (bedId) => {
    try {
      const response = await axiosInstance.post(`/beds/release/${bedId}`);
      return response.data;
    } catch (error) {
      console.error(`Error releasing bed with ID ${bedId}:`, error);
      throw error;
    }
  },
  getWardBeds: async (wardId) => {
    try {
      const response = await axiosInstance.get(`/beds/status/ward/${wardId}`);
      return response.data;
    } catch (error) {
      console.error(`Error fetching beds for ward ID ${wardId}:`, error);
      throw error;
    }
  },
};

export default wardService;
