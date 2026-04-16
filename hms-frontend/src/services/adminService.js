import axiosInstance from '../api/axiosInstance';

const adminService = {
    getStats: async () => {
        try {
            const response = await axiosInstance.get('/admin/stats');
            return response.data;
        } catch (error) {
            console.error("Error fetching admin stats:", error);
            throw error;
        }
    },

    getProfileByUserId: async (userId) => {
        try {
            const response = await axiosInstance.get(`/admin/profile/user/${userId}`);
            return response.data;
        } catch (error) {
            console.error(`Error fetching admin profile for user ID ${userId}:`, error);
            throw error;
        }
    },

    updateProfile: async (userId, data) => {
        try {
            const response = await axiosInstance.put(`/admin/profile/user/${userId}`, data);
            return response.data;
        } catch (error) {
            console.error(`Error updating admin profile for user ID ${userId}:`, error);
            throw error;
        }
    },
};

export default adminService;
