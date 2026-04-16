import axiosInstance from "../api/axiosInstance";

const getPatientById = async (id) => {
  try {
    const response = await axiosInstance.get(`patients/${id}`);
    return response.data;
  } catch (error) {
    console.error(`Error fetching patient with ID ${id}:`, error);
    throw error;
  }
};

const updatePatient = async (id, patientData) => {
  try {
    const response = await axiosInstance.put(`patients/${id}`, patientData);
    return response.data;
  } catch (error) {
    console.error(`Error updating patient with ID ${id}:`, error);
    throw error;
  }
};

const getPatientByUserId = async (userId) => {
  try {
    const response = await axiosInstance.get(`patients/user/${userId}`);
    return response.data;
  } catch (error) {
    console.error(`Error fetching patient for user ID ${userId}:`, error);
    throw error;
  }
};

export default {
  getPatientById,
  updatePatient,
  getPatientByUserId,
};
