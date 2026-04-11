import axiosInstance from "../api/axiosInstance";

const paymentService = {
  createPayment: async (data) => {
    const response = await axiosInstance.post("/payments/create", data);
    return response.data;
  },
  verifyPayment: async (data) => {
    const response = await axiosInstance.post("/payments/verify", data);
    return response.data;
  },
  getPaymentById: async (id) => {
    const response = await axiosInstance.get(`/payments/${id}`);
    return response.data;
  },
  getPatientPayments: async (patientId) => {
    const response = await axiosInstance.get(`/payments/patient/${patientId}`);
    return response.data;
  },
  getInvoice: async (paymentId) => {
    const response = await axiosInstance.get(`/payments/invoice/${paymentId}`);
    return response.data;
  },
};

export default paymentService;
