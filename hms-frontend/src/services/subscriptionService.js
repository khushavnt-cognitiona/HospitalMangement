import axiosInstance from "../api/axiosInstance";

const subscriptionService = {
  getPlans: async () => {
    try {
      const response = await axiosInstance.get("plans");
      return response.data;
    } catch (error) {
      console.error("Error fetching subscription plans:", error);
      throw error;
    }
  },

  getActiveSubscription: async (userId) => {
    try {
      const response = await axiosInstance.get(`subscriptions/active/user/${userId}`);
      return response.data;
    } catch (error) {
      console.error(`Error fetching active subscription for user ID ${userId}:`, error);
      throw error;
    }
  },

  subscribe: async (planId, userId) => {
    try {
      const response = await axiosInstance.post("subscriptions", {
        userId,
        planId
      });
      return response.data;
    } catch (error) {
      console.error("Error creating subscription:", error);
      throw error;
    }
  },

  getSubscriptionHistory: async (userId) => {
    try {
      const response = await axiosInstance.get(`subscriptions/user/${userId}`);
      return response.data;
    } catch (error) {
      console.error(`Error fetching subscription history for user ID ${userId}:`, error);
      throw error;
    }
  },

  cancelSubscription: async (subscriptionId) => {
    try {
      const response = await axiosInstance.put(`subscriptions/${subscriptionId}/cancel`);
      return response.data;
    } catch (error) {
      console.error(`Error cancelling subscription with ID ${subscriptionId}:`, error);
      throw error;
    }
  }
};

export default subscriptionService;
