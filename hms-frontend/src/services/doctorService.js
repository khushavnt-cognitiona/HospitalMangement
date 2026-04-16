import axiosInstance from "../api/axiosInstance";

const getAllDoctors = async () => {
  try {
    const response = await axiosInstance.get("/doctors");
    return response.data;
  } catch (error) {
    console.error("Error fetching doctors:", error);
    throw error;
  }
};

const getDoctorById = async (id) => {
  try {
    const response = await axiosInstance.get(`/doctors/${id}`);
    return response.data;
  } catch (error) {
    console.error(`Error fetching doctor with ID ${id}:`, error);
    throw error;
  }
};

const updateDoctor = async (id, doctorData) => {
  try {
    const response = await axiosInstance.put(`/doctors/${id}`, doctorData);
    return response.data;
  } catch (error) {
    console.error(`Error updating doctor with ID ${id}:`, error);
    throw error;
  }
};

const getAvailability = async (doctorId, date) => {
  try {
    const response = await axiosInstance.get(`/appointments/slots?doctorId=${doctorId}&date=${date}`);
    return response.data;
  } catch (error) {
    console.error("Error fetching doctor availability:", error);
    throw error;
  }
};

export default {
  getAllDoctors,
  getDoctorById,
  updateDoctor,
  getAvailability,
};
