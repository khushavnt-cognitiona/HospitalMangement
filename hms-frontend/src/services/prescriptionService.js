import axiosInstance from "../api/axiosInstance";

const prescriptionService = {
  createPrescription: async (data) => {
    try {
      const response = await axiosInstance.post("prescriptions", data);
      return response.data;
    } catch (error) {
      console.error("Error creating prescription:", error);
      throw error;
    }
  },
  getPrescriptionsByPatientId: async (patientId) => {
    try {
      const response = await axiosInstance.get(`prescriptions/patient/${patientId}`);
      return response.data;
    } catch (error) {
      console.error(`Error fetching prescriptions for patient ID ${patientId}:`, error);
      throw error;
    }
  },
  getPrescriptionsByDoctorId: async (doctorId) => {
    try {
      const response = await axiosInstance.get(`prescriptions/doctor/${doctorId}`);
      return response.data;
    } catch (error) {
      console.error(`Error fetching prescriptions for doctor ID ${doctorId}:`, error);
      throw error;
    }
  },
  getPrescriptionById: async (id) => {
    try {
      const response = await axiosInstance.get(`prescriptions/${id}`);
      return response.data;
    } catch (error) {
      console.error(`Error fetching prescription with ID ${id}:`, error);
      throw error;
    }
  },
};

export default prescriptionService;
