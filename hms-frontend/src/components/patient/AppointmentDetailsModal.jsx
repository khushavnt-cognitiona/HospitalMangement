import React from 'react';
import { Modal, Button, Badge } from 'react-bootstrap';
import { FaUserMd, FaCalendarAlt, FaClock, FaHeartbeat, FaTimes } from 'react-icons/fa';

const AppointmentDetailsModal = ({ show, onHide, appointment }) => {
    if (!appointment) return null;

    const apptDate = new Date(appointment.appointmentDate || appointment.slotTime || appointment.appointmentTime);

    return (
        <Modal 
            show={show} 
            onHide={onHide} 
            centered 
            size="md" 
            className="appointment-detail-modal"
            contentClassName="bg-transparent border-0"
        >
            <div className="digital-ticket">
                {/* Header Section */}
                <div className="ticket-header-gradient p-5">
                    <div className="d-flex justify-content-between align-items-center mb-3">
                        <div className="bg-white bg-opacity-20 p-2 rounded-3">
                            <FaHeartbeat size={40} className="text-white" />
                        </div>
                        <Badge bg="light" text="dark" className="px-3 py-2 rounded-pill fw-900 shadow-sm border-0">
                            APT-{appointment.id}
                        </Badge>
                    </div>
                    <h3 className="fw-900 mb-0">PASS CONFIRMED</h3>
                    <p className="opacity-75 small uppercase tracking-tighter mt-1 mb-0">Hospital Management System</p>
                </div>

                {/* Separation Notch */}
                <div className="ticket-notch-container">
                    <div className="ticket-notch-left"></div>
                    <div className="ticket-dashed-line"></div>
                    <div className="ticket-notch-right"></div>
                </div>

                {/* Body Content */}
                <div className="pass-body">
                    <div className="pass-info-grid mb-5">
                        <div className="info-item">
                            <label>Medical Specialist</label>
                            <span className="d-flex align-items-baseline gap-2">
                                <FaUserMd className="text-primary small" /> {appointment.doctorName || appointment.doctor?.user?.name || 'Dr. Specialist'}
                            </span>
                        </div>
                        <div className="info-item">
                            <label>Status</label>
                            <Badge className={`rounded-pill px-3 py-1 ${appointment.status === 'CONFIRMED' || appointment.status === 'COMPLETED' || appointment.status === 'BOOKED' ? 'bg-success bg-opacity-10 text-success' : 'bg-warning bg-opacity-10 text-warning'}`}>
                                {appointment.status}
                            </Badge>
                        </div>
                        <div className="info-item">
                            <label>Visit Date</label>
                            <span className="d-flex align-items-baseline gap-2">
                                <FaCalendarAlt className="text-primary small" /> {apptDate.toLocaleDateString('en-US', { day: '2-digit', month: 'short', year: 'numeric' })}
                            </span>
                        </div>
                        <div className="info-item">
                            <label>Time Slot</label>
                            <span className="d-flex align-items-baseline gap-2">
                                <FaClock className="text-primary small" /> {appointment.appointmentTime || apptDate.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                            </span>
                        </div>
                    </div>

                    <div className="info-item mb-5 p-4 rounded-4 bg-light border-0 shadow-none">
                        <label className="mb-2">Clinical Narrative</label>
                        <p className="text-dark fw-700 small mb-0 lh-base">
                            {appointment.symptoms || appointment.reason || 'Routine medical checkup and follow-up.'}
                        </p>
                    </div>

                    <div className="qr-mockup-container mb-5" style={{ display: 'flex', justifyContent: 'center' }}>
                        <div className="qr-mockup" style={{ width: '90px', height: '90px', display: 'grid', gridTemplateColumns: 'repeat(5, 1fr)', gap: '4px' }}>
                            {[...Array(25)].map((_, i) => (
                                <div key={i} style={{ background: '#0f172a', opacity: Math.random() > 0.5 ? 1 : 0.1, borderRadius: '2px' }}></div>
                            ))}
                        </div>
                        <p className="text-muted small fw-800 text-uppercase d-block mt-2 opacity-50 text-center" style={{ fontSize: '0.6rem', letterSpacing: '2px' }}>Scan at Reception</p>
                    </div>

                    <div className="d-flex flex-column gap-3">
                        <Button className="btn-premium-grad border-0 py-3 shadow-lg" onClick={onHide}>
                            <FaTimes className="me-2" /> DISMISS RECORD
                        </Button>
                        <div className="d-flex gap-2">
                            <Button variant="outline-dark" className="flex-grow-1 border-2 fw-800 rounded-pill py-2 small">PRINT</Button>
                            <Button variant="outline-dark" className="flex-grow-1 border-2 fw-800 rounded-pill py-2 small">DOWNLOAD</Button>
                        </div>
                    </div>
                </div>
            </div>
        </Modal>
    );
};

export default AppointmentDetailsModal;
