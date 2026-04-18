import React, { useState, useEffect } from "react";
import { FaBell } from "react-icons/fa";
import { useAuth } from "../../context/AuthContext";
import axiosInstance from "../../api/axiosInstance";

const NotificationBell = () => {
    const [notifications, setNotifications] = useState([]);
    const [unreadCount, setUnreadCount] = useState(0);
    const [isOpen, setIsOpen] = useState(false);
    const { user } = useAuth();

    const fetchNotifications = async () => {
        try {
            const response = await axiosInstance.get(`/notifications/user/${user.id}`);
            const data = response.data;
            setNotifications(data);
            setUnreadCount(data.filter(n => !n.readStatus).length);
        } catch (error) {
            console.error("Error fetching notifications:", error);
        }
    };

    useEffect(() => {
        if (user) {
            fetchNotifications();
            // Optional: Set up polling or WebSocket
            const interval = setInterval(fetchNotifications, 30000);
            return () => clearInterval(interval);
        }
    }, [user]);

    const markAsRead = async (id) => {
        try {
            await axiosInstance.patch(`/notifications/${id}/read`);
            fetchNotifications();
        } catch (error) {
            console.error("Error marking notification as read:", error);
        }
    };

    return (
        <div className="position-relative">
            <button 
                className="btn btn-link text-dark p-2 position-relative" 
                onClick={() => setIsOpen(!isOpen)}
                style={{ textDecoration: 'none' }}
            >
                <FaBell size={20} className={unreadCount > 0 ? "text-primary animate-pulse" : "text-muted"} />
                {unreadCount > 0 && (
                    <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger" style={{ fontSize: '0.6rem' }}>
                        {unreadCount}
                    </span>
                )}
            </button>

            {isOpen && (
                <div className="position-absolute end-0 mt-2 bg-white shadow-lg rounded-4 overflow-hidden z-3" style={{ width: '300px', maxHeight: '400px' }}>
                    <div className="p-3 border-bottom d-flex justify-content-between align-items-center bg-light">
                        <h6 className="mb-0 fw-bold">Notifications</h6>
                        <span className="badge bg-primary-soft text-primary rounded-pill small">{unreadCount} New</span>
                    </div>
                    <div className="overflow-auto" style={{ maxHeight: '330px' }}>
                        {notifications.length === 0 ? (
                            <div className="p-4 text-center text-muted">
                                <p className="small mb-0">No notifications yet</p>
                            </div>
                        ) : (
                            notifications.map((n) => (
                                <div 
                                    key={n.id} 
                                    className={`p-3 border-bottom transition-all cursor-pointer hover-bg-light ${!n.readStatus ? 'bg-primary-fade' : ''}`}
                                    onClick={() => markAsRead(n.id)}
                                >
                                    <div className="d-flex justify-content-between align-items-start mb-1">
                                        <span className={`badge ${n.type === 'EMAIL' ? 'bg-info' : 'bg-primary'} p-1 small`} style={{ fontSize: '0.6rem' }}>
                                            {n.type}
                                        </span>
                                        <span className="text-muted small" style={{ fontSize: '0.65rem' }}>
                                            {new Date(n.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                                        </span>
                                    </div>
                                    <p className={`small mb-0 ${!n.readStatus ? 'fw-bold text-dark' : 'text-muted'}`}>
                                        {n.message}
                                    </p>
                                </div>
                            ))
                        )}
                    </div>
                </div>
            )}
        </div>
    );
};

export default NotificationBell;
