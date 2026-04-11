import axiosInstance from "../api/axiosInstance";

const prescriptionService = {
  createPrescription: async (data) => {
    const response = await axiosInstance.post("/prescriptions", data);
    return response.data;
  },
  getPrescriptionsByPatientId: async (patientId) => {
    const response = await axiosInstance.get(`/prescriptions/patient/${patientId}`);
    return response.data;
  },
  getPrescriptionsByDoctorId: async (doctorId) => {
    const response = await axiosInstance.get(`/prescriptions/doctor/${doctorId}`);
    return response.data;
  },
  getPrescriptionById: async (id) => {
    const response = await axiosInstance.get(`/prescriptions/${id}`);
    return response.data;
  },
};

export default prescriptionService;
