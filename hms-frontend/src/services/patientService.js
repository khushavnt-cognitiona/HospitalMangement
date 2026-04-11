import axiosInstance from "../api/axiosInstance";

const getPatientById = async (id) => {
  const response = await axiosInstance.get(`/patients/${id}`);
  return response.data;
};

const updatePatient = async (id, patientData) => {
  const response = await axiosInstance.put(`/patients/${id}`, patientData);
  return response.data;
};

const getPatientByUserId = async (userId) => {
  const response = await axiosInstance.get(`/patients/user/${userId}`);
  return response.data;
};

export default {
  getPatientById,
  updatePatient,
  getPatientByUserId,
};
