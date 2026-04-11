import React, { useState, useEffect } from "react";
import appointmentService from "../../services/appointmentService";
import { useAuth } from "../../context/AuthContext";

const DoctorDashboard = () => {
    const { user } = useAuth();
    const [appointments, setAppointments] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchAppointments = async () => {
            try {
                // Assuming we can find doctor by user id or similar
                // For now, let's assume we have a way to get doctor metadata
                const doctorId = 1; // Placeholder for real doctor ID
                const data = await appointmentService.getDoctorAppointments(doctorId);
                setAppointments(data);
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

    if (loading) return <div className="text-center mt-5"><div className="spinner-border text-primary"></div></div>;

    return (
        <div className="container-fluid">
            <h2 className="mb-4 fw-bold">Doctor Dashboard</h2>
            <div className="row">
                <div className="col-12">
                    <div className="card border-0 shadow-sm rounded-4 p-4">
                        <h4 className="fw-bold mb-4">Upcoming Appointments</h4>
                        <div className="table-responsive">
                            <table className="table table-hover align-middle">
                                <thead className="table-light">
                                    <tr>
                                        <th>Patient Name</th>
                                        <th>Time</th>
                                        <th>Reason</th>
                                        <th>Status</th>
                                        <th>Actions</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {appointments.map((app) => (
                                        <tr key={app.id}>
                                            <td>{app.patient?.user?.name || "N/A"}</td>
                                            <td>{new Date(app.appointmentTime).toLocaleString()}</td>
                                            <td>{app.reason}</td>
                                            <td>
                                                <span className={`badge rounded-pill ${app.status === 'BOOKED' ? 'bg-primary' : 'bg-success'}`}>
                                                    {app.status}
                                                </span>
                                            </td>
                                            <td>
                                                <div className="btn-group">
                                                    <button 
                                                        className="btn btn-sm btn-outline-success"
                                                        onClick={() => handleStatusUpdate(app.id, 'COMPLETED')}
                                                    >
                                                        Complete
                                                    </button>
                                                    <button 
                                                        className="btn btn-sm btn-outline-danger"
                                                        onClick={() => handleStatusUpdate(app.id, 'CANCELLED')}
                                                    >
                                                        Cancel
                                                    </button>
                                                </div>
                                            </td>
                                        </tr>
                                    ))}
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
