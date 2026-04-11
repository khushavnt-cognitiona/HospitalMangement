import axiosInstance from "../api/axiosInstance";

const subscriptionService = {
  getPlans: async () => {
    const response = await axiosInstance.get("/plans");
    return response.data;
  },

  getActiveSubscription: async (userId) => {
    const response = await axiosInstance.get(`/subscriptions/active/user/${userId}`);
    return response.data;
  },

  subscribe: async (planId, userId) => {
    const response = await axiosInstance.post("/subscriptions", {
      userId,
      planId
    });
    return response.data;
  },

  getSubscriptionHistory: async (userId) => {
    const response = await axiosInstance.get(`/subscriptions/user/${userId}`);
    return response.data;
  },

  cancelSubscription: async (subscriptionId) => {
    const response = await axiosInstance.put(`/subscriptions/${subscriptionId}/cancel`);
    return response.data;
  }
};

export default subscriptionService;
