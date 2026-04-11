import axiosInstance from "../api/axiosInstance";

const recordService = {
  createRecord: async (data) => {
    const response = await axiosInstance.post("/records", data);
    return response.data;
  },
  getPatientRecords: async (patientId) => {
    const response = await axiosInstance.get(`/records/patient/${patientId}`);
    return response.data;
  },
  getRecordById: async (id) => {
    const response = await axiosInstance.get(`/records/${id}`);
    return response.data;
  },
  uploadRecordFile: async (formData) => {
    const response = await axiosInstance.post("/records/upload", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    return response.data;
  },
  getRecordFiles: async (recordId) => {
    const response = await axiosInstance.get(`/records/${recordId}/files`);
    return response.data;
  },
};

export default recordService;
