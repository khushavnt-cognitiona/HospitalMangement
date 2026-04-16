import axiosInstance from "../api/axiosInstance";

const paymentService = {
  createPayment: async (data) => {
    try {
      const response = await axiosInstance.post("/payments/create", data);
      return response.data;
    } catch (error) {
      console.error("Error creating payment:", error);
      throw error;
    }
  },
  verifyPayment: async (data) => {
    try {
      const response = await axiosInstance.post("/payments/verify", data);
      return response.data;
    } catch (error) {
      console.error("Error verifying payment:", error);
      throw error;
    }
  },
  getPaymentById: async (id) => {
    try {
      const response = await axiosInstance.get(`/payments/${id}`);
      return response.data;
    } catch (error) {
      console.error(`Error fetching payment with ID ${id}:`, error);
      throw error;
    }
  },
  getPatientPayments: async (patientId) => {
    try {
      const response = await axiosInstance.get(`/payments/patient/${patientId}`);
      return response.data;
    } catch (error) {
      console.error(`Error fetching payments for patient ID ${patientId}:`, error);
      throw error;
    }
  },
  getInvoice: async (paymentId) => {
    try {
      const response = await axiosInstance.get(`/payments/invoice/${paymentId}`);
      return response.data;
    } catch (error) {
      console.error(`Error fetching invoice for payment ID ${paymentId}:`, error);
      throw error;
    }
  },
};

export default paymentService;
