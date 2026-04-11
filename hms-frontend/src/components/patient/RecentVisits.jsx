import React, { useState } from 'react';
import { Button, Badge } from 'react-bootstrap';
import { FaCalendarAlt, FaUserMd } from 'react-icons/fa';
import AppointmentDetailsModal from './AppointmentDetailsModal';

const RecentVisits = ({ appointments, navigate }) => {
    const [showModal, setShowModal] = useState(false);
    const [selectedAppt, setSelectedAppt] = useState(null);

    const handleOpenDetails = (appt) => {
        setSelectedAppt(appt);
        setShowModal(true);
    };

    return (
        <div className="patient-content-card">
            <div className="patient-card-header">
                <div>
                    <h4 className="patient-card-title">Recent Visits</h4>
                    <p className="text-muted small mb-0 fw-bold">Monitoring your latest clinic activities</p>
                </div>
                <Button 
                    variant="primary" 
                    className="rounded-pill px-4 fw-bold shadow-sm"
                    onClick={() => navigate('/patient/book')}
                >
                    <FaCalendarAlt className="me-2" /> Book New
                </Button>
            </div>
            
            {appointments.length > 0 ? (
                <div className="table-responsive">
                    <table className="table table-hover align-middle mb-0">
                        <thead>
                            <tr>
                                <th>Consultant</th>
                                <th>Clinical Reason</th>
                                <th>Date & Status</th>
                                <th>Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {appointments.map((appt, i) => (
                                <tr key={i}>
                                    <td>
                                        <div className="d-flex align-items-center gap-3">
                                            <div className="bg-light p-2 rounded-circle">
                                                <FaUserMd className="text-primary" />
                                            </div>
                                            <div>
                                                <div className="fw-800 text-dark">{appt.doctorName || appt.doctor?.user?.name || 'Medical Specialist'}</div>
                                                <div className="text-muted small fw-bold">Specialist</div>
                                            </div>
                                        </div>
                                    </td>
                                    <td>
                                        <div className="fw-bold text-secondary">{appt.symptoms || appt.reason || 'Routine Checkup'}</div>
                                    </td>
                                    <td>
                                        <div className="fw-800 text-dark mb-1">
                                            {new Date(appt.appointmentDate || appt.slotTime || appt.appointmentTime).toLocaleDateString('en-US', { day: '2-digit', month: 'short' })}
                                        </div>
                                        <Badge className={`rounded-pill px-3 py-1 ${appt.status === 'CONFIRMED' || appt.status === 'COMPLETED' || appt.status === 'BOOKED' ? 'bg-success bg-opacity-10 text-success' : 'bg-warning bg-opacity-10 text-warning'}`}>
                                            {appt.status}
                                        </Badge>
                                    </td>
                                    <td>
                                        <Button 
                                            variant="link" 
                                            className="p-0 text-primary fw-bold text-decoration-none"
                                            onClick={() => handleOpenDetails(appt)}
                                        >
                                            Details
                                        </Button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            ) : (
                <div className="empty-state-container text-center py-5">
                    <div className="empty-state-icon mb-3 opacity-20">
                        <FaCalendarAlt size={48} />
                    </div>
                    <h5 className="fw-bold text-dark">No upcoming sessions</h5>
                    <p className="text-muted small mb-4">You haven't booked any appointments yet. Start your journey today.</p>
                    <Button variant="outline-primary" className="rounded-pill px-4 fw-bold border-2" onClick={() => navigate('/patient/book')}>
                        Schedule First Appointment
                    </Button>
                </div>
            )}

            {/* Appointment Details Modal */}
            <AppointmentDetailsModal 
                show={showModal}
                onHide={() => setShowModal(false)}
                appointment={selectedAppt}
            />
        </div>
    );
};

export default RecentVisits;
