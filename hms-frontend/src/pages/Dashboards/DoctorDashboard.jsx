import React, { useState, useEffect } from 'react';
import api from '../../services/api';
import { useAuth } from '../../context/AuthContext';

const DoctorDashboard = () => {
    const { user } = useAuth();
    const [appointments, setAppointments] = useState([]);
    const [activeAppt, setActiveAppt] = useState(null);
    const [prescription, setPrescription] = useState({ medicines: '', diagnosis: '', notes: '' });

    useEffect(() => {
        fetchAppointments();
    }, []);

    const fetchAppointments = async () => {
        try {
            // In a real app, you'd fetch by doctor ID
            // For now, let's fetch all and filter or use a specific endpoint
            const response = await api.get('/appointments/doctor/2'); // Assuming Dr. Smith is ID 2
            setAppointments(response.data);
        } catch (err) { console.error(err); }
    };

    const handlePrescribe = async (e) => {
        e.preventDefault();
        try {
            await api.post('/prescriptions', {
                appointmentId: activeAppt.id,
                ...prescription
            });
            fetchAppointments();
            setActiveAppt(null);
            setPrescription({ medicines: '', diagnosis: '', notes: '' });
            alert('Prescription created successfully!');
        } catch (err) { console.error(err); }
    };

    return (
        <div className="container py-4">
            <h2 className="mb-4 text-center fw-bold text-dark">Doctor's Schedule</h2>
            
            <div className="row">
                <div className="col-md-8">
                    <div className="card shadow-sm border-0 rounded-4">
                        <div className="card-header bg-white border-0 py-3">
                            <h5 className="mb-0 fw-bold">Upcoming Appointments</h5>
                        </div>
                        <div className="table-responsive">
                            <table className="table table-hover align-middle mb-0">
                                <thead className="table-light">
                                    <tr>
                                        <th>Patient</th>
                                        <th>Time</th>
                                        <th>Status</th>
                                        <th>Action</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {appointments.map(appt => (
                                        <tr key={appt.id}>
                                            <td>{appt.patient.user.name}</td>
                                            <td>{new Date(appt.slotTime).toLocaleString()}</td>
                                            <td><span className={`badge ${appt.status === 'BOOKED' ? 'bg-primary' : 'bg-success'}`}>{appt.status}</span></td>
                                            <td>
                                                {appt.status === 'BOOKED' && (
                                                    <button className="btn btn-outline-primary btn-sm rounded-pill px-3" onClick={() => setActiveAppt(appt)}>Prescribe</button>
                                                )}
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>

                <div className="col-md-4">
                    {activeAppt ? (
                        <div className="card shadow-sm border-0 rounded-4">
                            <div className="card-body p-4">
                                <h5 className="fw-bold mb-3">Prescription for {activeAppt.patient.user.name}</h5>
                                <form onSubmit={handlePrescribe}>
                                    <div className="mb-3">
                                        <label className="form-label">Diagnosis</label>
                                        <textarea className="form-control rounded-3" rows="2" value={prescription.diagnosis} onChange={e => setPrescription({...prescription, diagnosis: e.target.value})} required placeholder="e.g. Common Cold" />
                                    </div>
                                    <div className="mb-3">
                                        <label className="form-label">Medicines</label>
                                        <textarea className="form-control rounded-3" rows="3" value={prescription.medicines} onChange={e => setPrescription({...prescription, medicines: e.target.value})} required placeholder="e.g. Paracetamol 500mg (1-1-1)" />
                                    </div>
                                    <div className="mb-3">
                                        <label className="form-label">Additional Notes</label>
                                        <textarea className="form-control rounded-3" rows="2" value={prescription.notes} onChange={e => setPrescription({...prescription, notes: e.target.value})} placeholder="e.g. Bed rest for 3 days" />
                                    </div>
                                    <button className="btn btn-success w-100 rounded-3 fw-bold">Sign & Submit</button>
                                    <button onClick={() => setActiveAppt(null)} className="btn btn-link w-100 text-muted mt-2">Cancel</button>
                                </form>
                            </div>
                        </div>
                    ) : (
                        <div className="alert alert-info rounded-4 shadow-sm border-0">
                            Select a patient from the list to start prescribing.
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default DoctorDashboard;
