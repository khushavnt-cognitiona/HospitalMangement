import React, { useState, useEffect } from "react";
import appointmentService from "../../services/appointmentService";
import { useAuth } from "../../context/AuthContext";
import { FaUserFriends, FaCalendarCheck, FaCheckCircle, FaClock } from "react-icons/fa";

const DoctorDashboard = () => {
    const { user } = useAuth();
    const [appointments, setAppointments] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchAppointments = async () => {
            try {
                // Placeholder for real doctor ID discovery from authenticated user
                const doctorId = 1; 
                const data = await appointmentService.getDoctorAppointments(doctorId);
                setAppointments(data || []);
            } catch (err) {
                console.error("Failed to fetch appointments", err);
            } finally {
                setLoading(false);
            }
        };
        fetchAppointments();
    }, []);

    const handleStatusUpdate = async (id, status) => {
        try {
            await appointmentService.updateAppointmentStatus(id, status);
            setAppointments(appointments.map(app => 
                app.id === id ? { ...app, status } : app
            ));
        } catch (err) {
            alert("Failed to update status");
        }
    };

    if (loading) return (
        <div className="flex-center" style={{ minHeight: '60vh' }}>
            <div className="spinner-border text-primary" role="status">
                <span className="visually-hidden">Loading...</span>
            </div>
        </div>
    );

    const stats = [
        { label: "Total Patients", value: "24", icon: <FaUserFriends />, color: "#0ea5e9" },
        { label: "Today's Appointments", value: appointments.length, icon: <FaCalendarCheck />, color: "#10b981" },
        { label: "Pending", value: appointments.filter(a => a.status === 'BOOKED').length, icon: <FaClock />, color: "#f59e0b" },
        { label: "Completed", value: "12", icon: <FaCheckCircle />, color: "#6366f1" }
    ];

    return (
        <div className="app-container py-5 animate-fade-in">
            <header className="mb-5">
                <h2 className="mb-1 fw-bold fs-1">Welcome back, Dr. {user?.name.split(' ')[0]}</h2>
                <p className="text-muted">Here's what is happening with your practice today.</p>
            </header>

            {/* Stats Grid */}
            <div className="row g-4 mb-5">
                {stats.map((stat, idx) => (
                    <div key={idx} className="col-12 col-md-6 col-lg-3">
                        <div className="premium-card p-4 h-100">
                            <div className="d-flex align-items-center justify-content-between mb-3">
                                <div className="p-3 rounded-3" style={{ backgroundColor: `${stat.color}15`, color: stat.color }}>
                                    {stat.icon}
                                </div>
                                <span className="badge bg-light text-success small">+12%</span>
                            </div>
                            <h3 className="fs-2 fw-bold mb-0">{stat.value}</h3>
                            <p className="text-muted small fw-semibold text-uppercase mb-0">{stat.label}</p>
                        </div>
                    </div>
                ))}
            </div>

            <div className="row">
                <div className="col-12">
                    <div className="premium-card p-0 overflow-hidden">
                        <div className="p-4 border-bottom d-flex align-items-center justify-content-between bg-light bg-opacity-50">
                            <h4 className="fw-bold mb-0">Upcoming Appointments</h4>
                            <button className="btn btn-sm btn-premium btn-premium-outline">View All</button>
                        </div>
                        <div className="table-responsive">
                            <table className="table-premium mb-0">
                                <thead>
                                    <tr>
                                        <th>Patient Name</th>
                                        <th>Schedule</th>
                                        <th>Condition/Reason</th>
                                        <th>Status</th>
                                        <th className="text-end">Actions</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {appointments.length > 0 ? appointments.map((app) => (
                                        <tr key={app.id}>
                                            <td>
                                                <div className="d-flex align-items-center gap-2">
                                                    <div className="bg-primary-light text-primary rounded-circle p-2 small fw-bold">
                                                        {app.patient?.user?.name?.[0] || 'P'}
                                                    </div>
                                                    <span className="fw-semibold">{app.patient?.user?.name || "N/A"}</span>
                                                </div>
                                            </td>
                                            <td>
                                                <div className="small fw-semibold">{new Date(app.appointmentTime).toLocaleDateString()}</div>
                                                <div className="text-muted extra-small">{new Date(app.appointmentTime).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</div>
                                            </td>
                                            <td><span className="text-muted">{app.reason}</span></td>
                                            <td>
                                                <span className={`badge rounded-pill px-3 py-2 ${app.status === 'BOOKED' ? 'bg-primary-light text-primary' : 'bg-success-light text-success'}`}>
                                                    {app.status}
                                                </span>
                                            </td>
                                            <td className="text-end">
                                                <div className="d-flex justify-content-end gap-2">
                                                    <button 
                                                        className="btn btn-sm btn-outline-success border-0 px-3"
                                                        onClick={() => handleStatusUpdate(app.id, 'COMPLETED')}
                                                        title="Mark as Completed"
                                                    >
                                                        <FaCheckCircle />
                                                    </button>
                                                    <button 
                                                        className="btn btn-sm btn-outline-danger border-0 px-3"
                                                        onClick={() => handleStatusUpdate(app.id, 'CANCELLED')}
                                                        title="Cancel Appointment"
                                                    >
                                                        ×
                                                    </button>
                                                </div>
                                            </td>
                                        </tr>
                                    )) : (
                                        <tr>
                                            <td colSpan="5" className="text-center py-5 text-muted">No appointments scheduled for today.</td>
                                        </tr>
                                    )}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default DoctorDashboard;
