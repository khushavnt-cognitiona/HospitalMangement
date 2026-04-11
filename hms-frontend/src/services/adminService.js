import axiosInstance from '../api/axiosInstance';

const adminService = {
    getStats: () =>
        axiosInstance.get('/api/admin/stats').then((r) => r.data),

    getProfileByUserId: (userId) =>
        axiosInstance.get(`/api/admin/profile/user/${userId}`).then((r) => r.data),

    updateProfile: (userId, data) =>
        axiosInstance.put(`/api/admin/profile/user/${userId}`, data).then((r) => r.data),
};

export default adminService;
