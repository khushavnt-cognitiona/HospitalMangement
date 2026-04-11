import axiosInstance from '../api/axiosInstance';

const notificationService = {
    sendNotification: async (notificationData) => {
        try {
            const response = await axiosInstance.post('/notifications/send', notificationData);
            return response.data;
        } catch (error) {
            console.error('Notification Service Error:', error);
            return null;
        }
    },
};

export default notificationService;
