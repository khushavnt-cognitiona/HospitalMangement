import axiosInstance from "../api/axiosInstance";

const createBill = async (billData) => {
  const { patientId, amount, description } = billData;
  const response = await axiosInstance.post(
    `/billing/create?patientId=${patientId}&amount=${amount}&description=${description}`
  );
  return response.data;
};

const processPayment = async (id, razorpayOrderId) => {
  const response = await axiosInstance.post(`/billing/process/${id}?razorpayOrderId=${razorpayOrderId}`);
  return response.data;
};

const getPatientBills = async (patientId) => {
  const response = await axiosInstance.get(`/billing/patient/${patientId}`);
  return response.data;
};

const getAllBills = async () => {
  const response = await axiosInstance.get("/billing");
  return response.data;
};

export default {
  createBill,
  processPayment,
  getPatientBills,
  getAllBills,
};
