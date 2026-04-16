import axiosInstance from "../api/axiosInstance";

const bookAppointment = async (bookingData) => {
  try {
    const response = await axiosInstance.post("/appointments/book", bookingData);
    return response.data;
  } catch (error) {
    console.error("Error booking appointment:", error);
    throw error;
  }
};

const getDoctorAppointments = async (doctorId) => {
  try {
    const response = await axiosInstance.get(`/appointments/doctor/${doctorId}`);
    return response.data;
  } catch (error) {
    console.error("Error fetching doctor appointments:", error);
    throw error;
  }
};

const getPatientAppointments = async (patientId) => {
  try {
    const response = await axiosInstance.get(`/appointments/patient/${patientId}`);
    return response.data;
  } catch (error) {
    console.error("Error fetching patient appointments:", error);
    throw error;
  }
};

const updateAppointmentStatus = async (id, status) => {
  try {
    const response = await axiosInstance.patch(`/appointments/${id}/status?status=${status}`);
    return response.data;
  } catch (error) {
    console.error("Error updating appointment status:", error);
    throw error;
  }
};

const getAvailableSlots = async (doctorId, date) => {
  try {
    const response = await axiosInstance.get(`/appointments/slots?doctorId=${doctorId}&date=${date}`);
    return response.data;
  } catch (error) {
    console.error("Error fetching available slots:", error);
    throw error;
  }
};

const lockSlot = async (slotId, userId) => {
  try {
    const response = await axiosInstance.post(`/appointments/slots/${slotId}/lock?userId=${userId}`);
    return response.data;
  } catch (error) {
    console.error("Error locking slot:", error);
    throw error;
  }
};

export default {
  bookAppointment,
  getDoctorAppointments,
  getPatientAppointments,
  updateAppointmentStatus,
  getAvailableSlots,
  lockSlot,
};
