import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Row, Col, Spinner } from 'react-bootstrap';
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
        <div className="d-flex flex-column justify-content-center align-items-center min-vh-100 bg-light">
            <Spinner animation="grow" variant="primary" />
            <p className="mt-3 fw-bold text-primary">Synchronizing clinical data...</p>
        </div>
    );

    return (
        <PatientLayout 
            title="Health Control Center" 
            subtitle={`Hello, ${profile?.name || user?.name || 'Patient'}. Your health dashboard is fully synchronized.`}
        >
            {/* Modular Statistics Section */}
            <Row className="g-4 mb-5">
                <DashboardStats 
                    visitCount={appointments.length} 
                    recordCount={records.length} 
                    plan="PRO+" 
                />
            </Row>

            <Row className="g-4">
                {/* Modular Recent Visits Section */}
                <Col lg={8}>
                    <RecentVisits 
                        appointments={appointments} 
                        navigate={navigate} 
                    />
                </Col>

                {/* Modular EHR & Health Tip Section */}
                <Col lg={4}>
                    <EHRTimeline 
                        records={records} 
                    />
                </Col>
            </Row>
        </PatientLayout>
    );
};

export default PatientDashboard;
