import axiosInstance from "../api/axiosInstance";

const wardService = {
  createWard: async (data) => {
    const response = await axiosInstance.post("/wards", data);
    return response.data;
  },
  getAllWards: async () => {
    const response = await axiosInstance.get("/wards");
    return response.data;
  },
  getWardById: async (id) => {
    const response = await axiosInstance.get(`/wards/${id}`);
    return response.data;
  },
  assignBed: async (data) => {
    const response = await axiosInstance.post("/beds/assign", data);
    return response.data;
  },
  releaseBed: async (bedId) => {
    const response = await axiosInstance.post(`/beds/release/${bedId}`);
    return response.data;
  },
  getWardBeds: async (wardId) => {
    const response = await axiosInstance.get(`/beds/status/ward/${wardId}`);
    return response.data;
  },
};

export default wardService;
