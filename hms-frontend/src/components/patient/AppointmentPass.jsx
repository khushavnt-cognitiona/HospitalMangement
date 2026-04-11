import React from 'react';
import { Container, Button, Badge } from 'react-bootstrap';
import { FaCheckCircle, FaCalendarCheck, FaChevronLeft } from 'react-icons/fa';

const AppointmentPass = ({ bookedId, selectedDoctor, form, navigate }) => {
    return (
        <Container className="premium-pass-container">
            <div className="digital-ticket animate-in">
                <div className="ticket-header-gradient">
                    <FaCheckCircle size={50} className="mb-3 text-white" />
                    <h3 className="fw-900 mb-0">PASS CONFIRMED</h3>
                    <p className="opacity-75 small uppercase tracking-tighter mt-1">Hospital Management System</p>
                    <Badge bg="light" text="dark" className="mt-2 px-3 py-2 rounded-pill fw-900 shadow-sm">
                        #{bookedId}
                    </Badge>
                </div>

                <div className="ticket-notch-container">
                    <div className="ticket-notch-left"></div>
                    <div className="ticket-dashed-line"></div>
                    <div className="ticket-notch-right"></div>
                </div>

                <div className="pass-body">
                    <div className="pass-info-grid">
                        <div className="info-item">
                            <label>Specialist</label>
                            <span>{selectedDoctor?.name || 'Dr. Clinic'}</span>
                        </div>
                        <div className="info-item">
                            <label>Specialization</label>
                            <span>{selectedDoctor?.specialization || 'Clinical Specialist'}</span>
                        </div>
                        <div className="info-item">
                            <label>Date</label>
                            <span>{new Date(form.date).toLocaleDateString([], { month: 'short', day: 'numeric', year: 'numeric' })}</span>
                        </div>
                        <div className="info-item">
                            <label>Time Slot</label>
                            <span className="text-info">{form.time}</span>
                        </div>
                    </div>

                    <div className="info-item mb-4">
                        <label>Clinical Narrative</label>
                        <p className="text-dark fw-700 small mb-0">{form.reason || 'Routine clinical checkup'}</p>
                    </div>

                    <div className="qr-mockup-container" style={{ display: 'flex', justifyContent: 'center', margin: '2rem 0' }}>
                        <div className="qr-mockup" style={{ width: '100px', height: '100px', display: 'grid', gridTemplateColumns: 'repeat(5, 1fr)', gap: '4px' }}>
                            {[...Array(25)].map((_, i) => (
                                <div key={i} style={{ background: '#0f172a', opacity: Math.random() > 0.5 ? 1 : 0.1, borderRadius: '2px' }}></div>
                            ))}
                        </div>
                    </div>

                    <div className="pass-actions d-flex flex-column gap-3">
                        <Button className="btn-premium-grad border-0 py-3 d-flex align-items-center justify-content-center gap-2">
                            <FaCalendarCheck size={18} /> Download Digital Pass
                        </Button>
                        <div className="d-flex gap-2">
                            <Button variant="outline-dark" className="flex-grow-1 border-2 fw-800 rounded-pill py-2 small">
                                Print
                            </Button>
                            <Button variant="outline-dark" className="flex-grow-1 border-2 fw-800 rounded-pill py-2 small">
                                Email
                            </Button>
                        </div>
                        <Button 
                            variant="link" 
                            className="text-muted text-decoration-none fw-800 mt-2"
                            onClick={() => navigate('/patient/dashboard')}
                        >
                            <FaChevronLeft size={10} className="me-1" /> Return to Dashboard
                        </Button>
                    </div>
                </div>
            </div>
        </Container>
    );
};

export default AppointmentPass;
