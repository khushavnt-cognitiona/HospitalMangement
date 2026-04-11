import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import patientService from '../../services/patientService';
import appointmentService from '../../services/appointmentService';
import recordService from '../../services/recordService';
import { useAuth } from '../../context/AuthContext';
import { Button, Row, Col, Badge, Card, Spinner } from 'react-bootstrap';
import { FaCalendarCheck, FaFileMedical, FaShieldAlt, FaUserMd, FaHeartbeat, FaCalendarAlt } from 'react-icons/fa';
import PatientLayout from '../../components/patient/PatientLayout';
import '../../styles/patient-ui.css';

const PatientDashboard = () => {
    const { user } = useAuth();
    const navigate = useNavigate();
    const [profile, setProfile] = useState(null);
    const [appointments, setAppointments] = useState([]);
    const [records, setRecords] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (!user?.id) {
            // Set a timeout to clear loading if user doesn't load quickly
            const timer = setTimeout(() => setLoading(false), 2000);
            return () => clearTimeout(timer);
        }
        
        const fetchDashboardData = async () => {
            try {
                // Step 1: Resolve the Patient ID from the User ID
                const patientProfile = await patientService.getPatientByUserId(user.id);
                setProfile(patientProfile);
                
                if (patientProfile && patientProfile.id) {
                    const patientId = patientProfile.id;

                    // Step 2: Fetch clinical data using the resolved Patient ID
                    const results = await Promise.allSettled([
                        appointmentService.getPatientAppointments(patientId),
                        recordService.getPatientRecords(patientId)
                    ]);

                    if (results[0].status === 'fulfilled') setAppointments((results[0].value.data || results[0].value).slice(0, 5));
                    if (results[1].status === 'fulfilled') setRecords((results[1].value.data || results[1].value).slice(0, 3));
                }
            } catch (err) {
                console.error("Critical error in dashboard fetch:", err);
                // Handle the case where no patient profile exists for this user
            } finally {
                setLoading(false);
            }
        };
        fetchDashboardData();

        const pollInterval = setInterval(fetchDashboardData, 30000); // Polling every 30s instead of 15s to reduce load
        return () => clearInterval(pollInterval);
    }, [user?.id]);

    if (loading) return (
        <div className="d-flex flex-column justify-content-center align-items-center min-vh-100 bg-light">
            <Spinner animation="grow" variant="primary" />
            <p className="mt-3 fw-bold text-primary">Synchronizing your health data...</p>
        </div>
    );

    return (
        <PatientLayout 
            title="Health Control Center" 
            subtitle={`Hello, ${profile?.name || user?.name || 'Patient'}. Every clinical record is synchronized and ready.`}
        >
            {/* Stats Cards Row */}
            <Row className="g-4 mb-5">
                {[
                    { label: 'Total Visits', value: appointments.length, icon: <FaCalendarCheck />, color: 'bg-blue' },
                    { label: 'Health Records', value: records.length, icon: <FaFileMedical />, color: 'bg-green' },
                    { label: 'Coverage Plan', value: 'PRO+', icon: <FaShieldAlt />, color: 'bg-cyan' }
                ].map((stat, idx) => (
                    <Col md={4} key={idx} className="animate-in" style={{ animationDelay: `${idx * 0.1}s` }}>
                        <div className={`patient-stat-card ${stat.color}`}>
                            <span className="stat-card-label">{stat.label}</span>
                            <h2 className="stat-card-value text-white">{stat.value}</h2>
                            <div className="stat-card-icon">{stat.icon}</div>
                        </div>
                    </Col>
                ))}
            </Row>

            <Row className="g-4">
                {/* Upcoming Appointments Section */}
                <Col lg={8} className="animate-in" style={{ animationDelay: '0.3s' }}>
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
                                                    <div className="fw-800 text-dark mb-1">{new Date(appt.appointmentDate || appt.appointmentTime).toLocaleDateString('en-US', { day: '2-digit', month: 'short' })}</div>
                                                    <Badge className={`rounded-pill px-3 py-1 ${appt.status === 'CONFIRMED' || appt.status === 'COMPLETED' ? 'bg-success bg-opacity-10 text-success' : 'bg-warning bg-opacity-10 text-warning'}`}>
                                                        {appt.status}
                                                    </Badge>
                                                </td>
                                                <td>
                                                    <Button variant="link" className="p-0 text-primary fw-bold text-decoration-none">Details</Button>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        ) : (
                            <div className="empty-state-container">
                                <div className="empty-state-icon">
                                    <FaCalendarAlt />
                                </div>
                                <h5 className="fw-bold text-dark">No upcoming sessions</h5>
                                <p className="text-muted small mb-4">You haven't booked any appointments yet. Start your journey today.</p>
                                <Button variant="outline-primary" className="rounded-pill px-4 fw-bold border-2" onClick={() => navigate('/patient/book')}>
                                    Schedule First Appointment
                                </Button>
                            </div>
                        )}
                    </div>
                </Col>

                {/* Latest EHR Sidebar Section */}
                <Col lg={4} className="animate-in" style={{ animationDelay: '0.4s' }}>
                    <div className="patient-content-card">
                        <div className="patient-card-header">
                            <h4 className="patient-card-title">Latest EHR</h4>
                            <FaHeartbeat className="text-danger opacity-50" />
                        </div>
                        
                        <div className="p-4">
                            {records.length > 0 ? (
                                <div className="records-timeline">
                                    {records.map((record, i) => (
                                        <div key={i} className="mb-4 d-flex gap-3 align-items-start">
                                            <div className="bg-primary bg-opacity-10 p-2 rounded-3 text-primary">
                                                <FaFileMedical />
                                            </div>
                                            <div>
                                                <h6 className="mb-0 fw-800 text-dark">{record.recordType || 'Clinical Journal'}</h6>
                                                <p className="text-muted small mb-1 fw-bold">{record.description?.substring(0, 40)}...</p>
                                                <small className="text-primary fw-bold" style={{ fontSize: '0.7rem' }}>
                                                    {new Date(record.createdAt).toLocaleDateString()}
                                                </small>
                                            </div>
                                        </div>
                                    ))}
                                    <Button variant="light" className="w-100 rounded-pill fw-bold text-primary py-2 mt-2">View Full Vault</Button>
                                </div>
                            ) : (
                                <div className="text-center py-5">
                                    <div className="bg-light w-60 h-60 rounded-circle mx-auto mb-3 d-flex align-items-center justify-content-center" style={{ width: '60px', height: '60px' }}>
                                        <FaFileMedical className="text-muted opacity-30" size={24} />
                                    </div>
                                    <h6 className="fw-bold text-dark">No clinical records</h6>
                                    <p className="text-muted small px-3">Your electronic health records will appear here after your first visit.</p>
                                </div>
                            )}
                        </div>

                        {/* Health Tip Section */}
                        <div className="m-4 mt-0 p-4 rounded-4 bg-primary bg-opacity-5 border border-primary border-opacity-10">
                            <div className="d-flex align-items-center gap-2 mb-2">
                                <div className="bg-warning rounded-circle p-1" style={{ fontSize: '0.5rem' }}>✨</div>
                                <span className="text-primary fw-800 small text-uppercase letter-spacing-1">Health Tip</span>
                            </div>
                            <p className="small text-dark fw-bold mb-0">Remember to stay hydrated! Drinking 8 glasses of water daily boosts immunity.</p>
                        </div>
                    </div>
                </Col>
            </Row>
        </PatientLayout>
    );
};

export default PatientDashboard;
