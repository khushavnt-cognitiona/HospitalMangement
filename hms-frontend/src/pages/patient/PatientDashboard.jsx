import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Row, Col } from 'react-bootstrap';
import patientService from '../../services/patientService';
import appointmentService from '../../services/appointmentService';
import recordService from '../../services/recordService';
import { useAuth } from '../../context/AuthContext';
import PatientLayout from '../../components/patient/PatientLayout';
import DashboardStats from '../../components/patient/DashboardStats';
import RecentVisits from '../../components/patient/RecentVisits';
import EHRTimeline from '../../components/patient/EHRTimeline';
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
            setLoading(false);
            return;
        }
        
        const fetchDashboardData = async () => {
            try {
                const patientProfile = await patientService.getPatientByUserId(user.id);
                setProfile(patientProfile);
                
                if (patientProfile && patientProfile.id) {
                    const patientId = patientProfile.id;
                    const results = await Promise.allSettled([
                        appointmentService.getPatientAppointments(patientId),
                        recordService.getPatientRecords(patientId)
                    ]);

                    if (results[0].status === 'fulfilled') {
                        const data = results[0].value.data || results[0].value;
                        setAppointments(Array.isArray(data) ? data : []);
                    }
                    if (results[1].status === 'fulfilled') {
                        const data = results[1].value.data || results[1].value;
                        setRecords(Array.isArray(data) ? data : []);
                    }
                }
            } catch (err) {
                console.error("Dashboard synchronization failure:", err);
            } finally {
                setLoading(false);
            }
        };

        fetchDashboardData();
        const pollInterval = setInterval(fetchDashboardData, 30000);
        return () => clearInterval(pollInterval);
    }, [user?.id]);

    if (loading) return (
        <div className="flex-center animate-fade-in" style={{ minHeight: '80vh', flexDirection: 'column' }}>
            <div className="spinner-border text-primary mb-3" role="status" style={{ width: '3rem', height: '3rem' }}>
                <span className="visually-hidden">Loading...</span>
            </div>
            <p className="fw-semibold text-muted">Synchronizing your medical data...</p>
        </div>
    );

    const patientName = profile?.name || user?.name || 'Patient';

    return (
        <div className="animate-slide-up">
            <PatientLayout 
                title={`Welcome back, ${patientName.split(' ')[0]}`} 
                subtitle="Your health control center is fully synchronized and up to date."
            >
                {/* Modular Statistics Section */}
                <div className="mb-5">
                    <DashboardStats 
                        visitCount={appointments.length} 
                        recordCount={records.length} 
                        plan="PREMIUM+" 
                    />
                </div>

                <Row className="g-4">
                    {/* Modular Recent Visits Section */}
                    <Col lg={8}>
                        <div className="premium-card p-0 h-100 overflow-hidden shadow-sm">
                            <RecentVisits 
                                appointments={appointments} 
                                navigate={navigate} 
                            />
                        </div>
                    </Col>

                    {/* Modular EHR & Health Tip Section */}
                    <Col lg={4}>
                        <div className="premium-card p-4 h-100 shadow-sm">
                            <EHRTimeline 
                                records={records} 
                            />
                        </div>
                    </Col>
                </Row>
            </PatientLayout>
        </div>
    );
};

export default PatientDashboard;
