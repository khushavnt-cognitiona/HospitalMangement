import React, { useState } from 'react';
import { Button } from 'react-bootstrap';
import { FaCalendarAlt, FaUserMd, FaChevronRight, FaPlus } from 'react-icons/fa';
import AppointmentDetailsModal from './AppointmentDetailsModal';

const RecentVisits = ({ appointments, navigate }) => {
    const [showModal, setShowModal] = useState(false);
    const [selectedAppt, setSelectedAppt] = useState(null);

    const handleOpenDetails = (appt) => {
        setSelectedAppt(appt);
        setShowModal(true);
    };

    return (
        <div className="section-card">
            <div className="d-flex justify-content-between align-items-center mb-4">
                <div>
                    <h4 className="section-title mb-0">
                        <FaCalendarAlt className="text-primary" /> Upcoming Appointments
                    </h4>
                    <p className="text-muted small mb-0 fw-semibold">Manage your scheduled clinical sessions</p>
                </div>
                <Button 
                    className="btn-premium btn-premium-primary rounded-pill px-4 d-flex align-items-center gap-2"
                    onClick={() => navigate('/patient/book')}
                >
                    <FaPlus size={14} /> Book New
                </Button>
            </div>
            
            {appointments && appointments.length > 0 ? (
                <div className="table-responsive" style={{ margin: '0 -4px' }}>
                    <table className="premium-table">
                        <thead>
                            <tr className="text-muted small text-uppercase fw-bold letter-spacing-wide">
                                <th className="ps-4 pb-3">Consultant</th>
                                <th className="pb-3">Reason</th>
                                <th className="pb-3">Date</th>
                                <th className="pb-3">Status</th>
                                <th className="pe-4 pb-3 text-end">Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {appointments.map((appt, i) => (
                                <tr key={i} className="animate-in" style={{ animationDelay: `${i * 0.05}s` }}>
                                    <td>
                                        <div className="d-flex align-items-center gap-3">
                                            <div className="profile-avatar-circle" style={{ width: '40px', height: '40px', fontSize: '1rem' }}>
                                                <FaUserMd />
                                            </div>
                                            <div>
                                                <div className="fw-bold text-dark">{appt.doctorName || appt.doctor?.user?.name || 'Specialist'}</div>
                                                <div className="text-muted extra-small fw-bold">Healthcare Provider</div>
                                            </div>
                                        </div>
                                    </td>
                                    <td>
                                        <div className="small fw-semibold text-secondary">{appt.symptoms || appt.reason || 'Medical Consult'}</div>
                                    </td>
                                    <td>
                                        <div className="small fw-bold text-dark">
                                            {new Date(appt.appointmentDate || appt.slotTime || appt.appointmentTime).toLocaleDateString('en-US', { day: '2-digit', month: 'short', year: 'numeric' })}
                                        </div>
                                    </td>
                                    <td>
                                        <span className={`badge rounded-pill px-3 py-1 ${
                                            appt.status === 'CONFIRMED' || appt.status === 'COMPLETED' || appt.status === 'BOOKED' 
                                            ? 'bg-success-light text-success' 
                                            : 'bg-warning-light text-warning'
                                        }`} style={{ fontSize: '0.7rem', fontWeight: '800' }}>
                                            {appt.status}
                                        </span>
                                    </td>
                                    <td className="text-end pe-4">
                                        <Button 
                                            variant="link" 
                                            className="p-2 text-primary hover-scale transition-all"
                                            onClick={() => handleOpenDetails(appt)}
                                        >
                                            <FaChevronRight />
                                        </Button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            ) : (
                <div className="text-center py-5">
                    <div className="bg-light rounded-circle flex-center mx-auto mb-4" style={{ width: '80px', height: '80px', opacity: 0.5 }}>
                        <FaCalendarAlt size={32} className="text-muted" />
                    </div>
                    <h5 className="fw-bold text-dark">No upcoming sessions</h5>
                    <p className="text-muted small mb-4 mx-auto" style={{ maxWidth: '300px' }}>Your medical calendar is currently clear. Keeping up with regular checkups is vital for health.</p>
                    <Button 
                        variant="outline-primary" 
                        className="rounded-pill px-4 fw-bold border-2" 
                        onClick={() => navigate('/patient/book')}
                    >
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
            
            <style>{`
                .bg-success-light { background: #dcfce7 !important; }
                .bg-warning-light { background: #fef9c3 !important; }
                .letter-spacing-wide { letter-spacing: 0.05em; }
                .hover-scale:hover { transform: translateX(4px); }
            `}</style>
        </div>
    );
};

export default RecentVisits;
