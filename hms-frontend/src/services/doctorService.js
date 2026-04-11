import axiosInstance from "../api/axiosInstance";

const getAllDoctors = async () => {
  const response = await axiosInstance.get("/doctors");
  return response.data;
};

const getDoctorById = async (id) => {
  const response = await axiosInstance.get(`/doctors/${id}`);
  return response.data;
};

const updateDoctor = async (id, doctorData) => {
  const response = await axiosInstance.put(`/doctors/${id}`, doctorData);
  return response.data;
};

const getAvailability = async (doctorId, date) => {
  const response = await axiosInstance.get(`/appointments/slots?doctorId=${doctorId}&date=${date}`);
  return response.data;
};

export default {
  getAllDoctors,
  getDoctorById,
  updateDoctor,
  getAvailability,
};
