import axiosInstance from "../api/axiosInstance";

const bookAppointment = async (bookingData) => {
  const response = await axiosInstance.post("/appointments/book", bookingData);
  return response.data;
};

const getDoctorAppointments = async (doctorId) => {
  const response = await axiosInstance.get(`/appointments/doctor/${doctorId}`);
  return response.data;
};

const getPatientAppointments = async (patientId) => {
  const response = await axiosInstance.get(`/appointments/patient/${patientId}`);
  return response.data;
};

const updateAppointmentStatus = async (id, status) => {
  const response = await axiosInstance.patch(`/appointments/${id}/status?status=${status}`);
  return response.data;
};

const getAvailableSlots = async (doctorId, date) => {
  const response = await axiosInstance.get(`/appointments/slots?doctorId=${doctorId}&date=${date}`);
  return response.data;
};

const lockSlot = async (slotId, userId) => {
  const response = await axiosInstance.post(`/appointments/slots/${slotId}/lock?userId=${userId}`);
  return response.data;
};

export default {
  bookAppointment,
  getDoctorAppointments,
  getPatientAppointments,
  updateAppointmentStatus,
  getAvailableSlots,
  lockSlot,
};
