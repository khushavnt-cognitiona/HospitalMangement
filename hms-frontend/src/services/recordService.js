import axiosInstance from "../api/axiosInstance";

const recordService = {
  createRecord: async (data) => {
    try {
      const response = await axiosInstance.post("/records", data);
      return response.data;
    } catch (error) {
      console.error("Error creating record:", error);
      throw error;
    }
  },
  getPatientRecords: async (patientId) => {
    try {
      const response = await axiosInstance.get(`/records/patient/${patientId}`);
      return response.data;
    } catch (error) {
      console.error(`Error fetching records for patient ID ${patientId}:`, error);
      throw error;
    }
  },
  getRecordById: async (id) => {
    try {
      const response = await axiosInstance.get(`/records/${id}`);
      return response.data;
    } catch (error) {
      console.error(`Error fetching record with ID ${id}:`, error);
      throw error;
    }
  },
  uploadRecordFile: async (formData) => {
    try {
      const response = await axiosInstance.post("/records/upload", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      return response.data;
    } catch (error) {
      console.error("Error uploading record file:", error);
      throw error;
    }
  },
  getRecordFiles: async (recordId) => {
    try {
      const response = await axiosInstance.get(`/records/${recordId}/files`);
      return response.data;
    } catch (error) {
      console.error(`Error fetching files for record ID ${recordId}:`, error);
      throw error;
    }
  },
};

export default recordService;
