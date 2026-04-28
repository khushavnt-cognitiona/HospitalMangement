import React, { useState, useEffect } from 'react';
import axiosInstance from '../../api/axiosInstance';
import { useAuth } from '../../context/AuthContext';

const PatientDashboard = () => {
    const { user } = useAuth();
    const [doctors, setDoctors] = useState([]);
    const [appointments, setAppointments] = useState([]);
    const [booking, setBooking] = useState({ doctorId: '', slotTime: '' });

    useEffect(() => {
        fetchDoctors();
        fetchMyAppointments();
    }, []);

    const fetchDoctors = async () => {
        try {
            const response = await axiosInstance.get('/doctors');
            setDoctors(response.data);
        } catch (err) { console.error(err); }
    };

    const fetchMyAppointments = async () => {
        try {
            const response = await axiosInstance.get('/appointments/patient/4'); // Assuming Patient ID 4
            setAppointments(response.data);
        } catch (err) { console.error(err); }
    };

    const handleBook = async (e) => {
        e.preventDefault();
        try {
            await axiosInstance.post('/appointments/book', {
                doctorId: booking.doctorId,
                patientId: 4, // Patient ID 4
                slotTime: booking.slotTime
            });
            fetchMyAppointments();
            setBooking({ doctorId: '', slotTime: '' });
            alert('Appointment booked successfully!');
        } catch (err) { console.error(err); }
    };

    return (
        <div className="container py-4">
            <h2 className="mb-4 text-center fw-bold text-dark">Patient Portal</h2>
            
            <div className="row">
                <div className="col-md-4">
                    <div className="card shadow-sm border-0 rounded-4">
                        <div className="card-body p-4">
                            <h5 className="fw-bold mb-3 text-primary">Book New Appointment</h5>
                            <form onSubmit={handleBook}>
                                <div className="mb-3">
                                    <label className="form-label text-muted small fw-bold">SELECT DOCTOR</label>
                                    <select className="form-select rounded-3 p-3 shadow-none border-light bg-light" value={booking.doctorId} onChange={e => setBooking({...booking, doctorId: e.target.value})} required>
                                        <option value="">-- Choose Specialist --</option>
                                        {doctors.map(d => (
                                            <option key={d.id} value={d.id}>{d.user.name} ({d.specialization})</option>
                                        ))}
                                    </select>
                                </div>
                                <div className="mb-3">
                                    <label className="form-label text-muted small fw-bold">PREFERRED TIME</label>
                                    <input type="datetime-local" className="form-control rounded-3 p-3 shadow-none border-light bg-light" value={booking.slotTime} onChange={e => setBooking({...booking, slotTime: e.target.value})} required />
                                </div>
                                <button className="btn btn-primary w-100 py-3 rounded-3 fw-bold mt-2 shadow-sm">Confirm Booking</button>
                            </form>
                        </div>
                    </div>
                </div>

                <div className="col-md-8">
                    <div className="card shadow-sm border-0 rounded-4">
                        <div className="card-header bg-white border-0 py-3">
                            <h5 className="mb-0 fw-bold">My Appointment History</h5>
                        </div>
                        <div className="table-responsive">
                            <table className="table table-hover align-middle mb-0">
                                <thead className="table-light">
                                    <tr>
                                        <th>Doctor</th>
                                        <th>Specialty</th>
                                        <th>Time</th>
                                        <th>Status</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {appointments.map(appt => (
                                        <tr key={appt.id}>
                                            <td className="fw-bold">{appt.doctor.user.name}</td>
                                            <td>{appt.doctor.specialization}</td>
                                            <td>{new Date(appt.slotTime).toLocaleString()}</td>
                                            <td>
                                                <span className={`badge rounded-pill pt-2 pb-2 px-3 ${appt.status === 'BOOKED' ? 'bg-primary' : 'bg-success'}`}>
                                                    {appt.status}
                                                </span>
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

export default PatientDashboard;
