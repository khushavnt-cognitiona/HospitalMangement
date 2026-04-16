import axiosInstance from "../api/axiosInstance";

const createBill = async (billData) => {
  try {
    const { patientId, amount, description } = billData;
    const response = await axiosInstance.post(
      `/billing/create?patientId=${patientId}&amount=${amount}&description=${description}`
    );
    return response.data;
  } catch (error) {
    console.error("Error creating bill:", error);
    throw error;
  }
};

const processPayment = async (id, razorpayOrderId) => {
  try {
    const response = await axiosInstance.post(`/billing/process/${id}?razorpayOrderId=${razorpayOrderId}`);
    return response.data;
  } catch (error) {
    console.error(`Error processing payment for bill ID ${id}:`, error);
    throw error;
  }
};

const getPatientBills = async (patientId) => {
  try {
    const response = await axiosInstance.get(`/billing/patient/${patientId}`);
    return response.data;
  } catch (error) {
    console.error(`Error fetching bills for patient ID ${patientId}:`, error);
    throw error;
  }
};

const getAllBills = async () => {
  try {
    const response = await axiosInstance.get("/billing");
    return response.data;
  } catch (error) {
    console.error("Error fetching all bills:", error);
    throw error;
  }
};

export default {
  createBill,
  processPayment,
  getPatientBills,
  getAllBills,
};
