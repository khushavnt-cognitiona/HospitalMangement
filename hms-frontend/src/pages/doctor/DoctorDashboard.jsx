import React, { useState, useEffect } from 'react';
import { Row, Col, Card, Button, Badge, Form, InputGroup, Spinner } from 'react-bootstrap';
import { 
    FaUserMd, FaCalendarCheck, FaClock, FaClipboardList, FaSearch, 
    FaCheck, FaTimes, FaStethoscope, FaChartBar, FaUserCircle 
} from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import appointmentService from '../../services/appointmentService';
import doctorService from '../../services/doctorService';
import notificationService from '../../services/notificationService';
import DoctorLayout from '../../components/doctor/DoctorLayout';

const statusColors = { 
    CONFIRMED: 'success', 
    PENDING: 'warning', 
    COMPLETED: 'info', 
    CANCELLED: 'danger',
    REJECTED: 'danger' 
};

const DoctorDashboard = () => {
    const { auth } = useAuth();
    const navigate = useNavigate();
    const [profile, setProfile] = useState(null);
    const [appointments, setAppointments] = useState([]);
    const [loading, setLoading] = useState(true);
    const [search, setSearch] = useState('');
    const [filter, setFilter] = useState('All');

    useEffect(() => {
        if (!auth.user?.id) return;

        const fetchDashboardData = async () => {
            try {
                let doctorProfile = null;
                try {
                    doctorProfile = await doctorService.getProfileByUserId(auth.user.id);
                    setProfile(doctorProfile);
                } catch (profErr) {
                    if (profErr.response?.status === 404) {
                        console.info("Profile not found - new doctor account.");
                        setProfile(null);
                    } else {
                        throw profErr;
                    }
                }

                if (doctorProfile && doctorProfile.id) {
                    const apptsData = await appointmentService.getDoctorAppointments(doctorProfile.id);
                    setAppointments(apptsData || []);
                } else {
                    setAppointments([]);
                }

            } catch (err) {
                console.error("Dashboard Fetch Error", err);
            } finally {
                setLoading(false);
            }
        };
        fetchDashboardData();
        const poll = setInterval(fetchDashboardData, 30000); 
        return () => clearInterval(poll);
    }, [auth.user?.id]);

    const handleStatusUpdate = async (id, status) => {
        try {
            await appointmentService.updateStatus(id, status);
            const updatedApts = appointments.map(a => (a.id === id ? { ...a, status } : a));
            setAppointments(updatedApts);

            const apt = appointments.find(a => a.id === id);
            if (apt) {
                notificationService.sendNotification({
                    patientName: apt.patientName || 'Patient',
                    doctorName: auth.user.name || 'Doctor',
                    appointmentDate: apt.appointmentDate,
                    appointmentTime: apt.appointmentTime,
                    status: status 
                });
            }
        } catch (err) {
            console.error("Status Update Failed", err);
        }
    };

    const filtered = appointments.filter(a => {
        const matchesSearch = (a.patientName || '').toLowerCase().includes(search.toLowerCase()) || 
                               `APT${a.id}`.toLowerCase().includes(search.toLowerCase());
        const matchesFilter = filter === 'All' || a.status === filter;
        return matchesSearch && matchesFilter;
    });

    const stats = {
        total: appointments.length,
        today: appointments.filter(a => new Date(a.appointmentDate).toDateString() === new Date().toDateString()).length,
        pending: appointments.filter(a => a.status === 'PENDING').length,
        confirmed: appointments.filter(a => a.status === 'CONFIRMED').length,
    };

    if (loading) return (
        <div className="d-flex flex-column justify-content-center align-items-center min-vh-100 bg-light text-primary">
            <Spinner animation="grow" />
            <p className="mt-3 fw-bold">Initializing Clinical Hub...</p>
        </div>
    );

    return (
        <DoctorLayout 
            title={`Clinical Hub: Dr. ${auth.user?.name || 'Practitioner'}`}
            subtitle={`${profile?.specialization || 'General Planning'} Specialist · ${profile?.qualification || 'Medical Team Member'}`}
        >
                <Row className="g-4 mb-5">
                    {[
                        { label: 'Total Patients', value: stats.total, icon: FaClipboardList, color: '#0d6efd', sub: 'Clinical reach' },
                        { label: "Today's Visits", value: stats.today, icon: FaCalendarCheck, color: '#198754', sub: 'Active schedule' },
                        { label: 'Pending Reviews', value: stats.pending, icon: FaClock, color: '#f59e0b', sub: 'Action required' },
                        { label: 'Confirmed Consults', value: stats.confirmed, icon: FaCheck, color: '#0dcaf0', sub: 'Ready for diagnosis' }
                    ].map((stat, i) => (
                        <Col key={i} sm={6} lg={3}>
                            <Card className="border-0 shadow-sm rounded-4 h-100 overflow-hidden bg-white hover-shadow transition-all">
                                <Card.Body className="p-4 d-flex align-items-center gap-3">
                                    <div className="p-3 rounded-3 d-flex align-items-center justify-content-center" style={{ background: `${stat.color}15`, color: stat.color, width: 56, height: 56 }}>
                                        <stat.icon size={24} />
                                    </div>
                                    <div>
                                        <h3 className="fw-bold mb-0 text-dark" style={{ lineHeight: 1 }}>{stat.value}</h3>
                                        <div className="small text-muted fw-bold text-uppercase mt-1" style={{ fontSize: '0.65rem', letterSpacing: '0.5px' }}>{stat.label}</div>
                                        <div className="text-muted" style={{ fontSize: '0.65rem', opacity: 0.7 }}>{stat.sub}</div>
                                    </div>
                                </Card.Body>
                            </Card>
                        </Col>
                    ))}
                </Row>

                <Row className="g-4">
                    <Col lg={8}>
                        <Card className="border-0 shadow-sm rounded-4 overflow-hidden bg-white">
                            <Card.Header className="bg-white border-0 py-4 px-4 d-flex justify-content-between align-items-center flex-wrap gap-3">
                                <div>
                                    <h5 className="fw-bold text-dark mb-1">Appointment Management</h5>
                                    <p className="text-muted small mb-0">Control patient statuses and review medical requests</p>
                                </div>
                                <div className="d-flex gap-2">
                                    <Button size="sm" variant={filter === 'All' ? 'primary' : 'light'} 
                                        onClick={() => setFilter('All')} className="rounded-pill px-3 fw-bold border">All</Button>
                                    <Button size="sm" variant={filter === 'PENDING' ? 'primary' : 'light'} 
                                        onClick={() => setFilter('PENDING')} className="rounded-pill px-3 fw-bold border">Pending</Button>
                                </div>
                            </Card.Header>

                            <div className="px-4 pb-3">
                                <InputGroup className="bg-light border-0 rounded-pill overflow-hidden px-2 shadow-none border">
                                    <InputGroup.Text className="bg-transparent border-0"><FaSearch className="text-muted" /></InputGroup.Text>
                                    <Form.Control 
                                        placeholder="Search by Patient Name or Order ID..." 
                                        className="bg-transparent border-0 shadow-none ps-0 py-2 small"
                                        style={{ fontSize: 13 }}
                                        value={search}
                                        onChange={e => setSearch(e.target.value)}
                                    />
                                </InputGroup>
                            </div>

                            <Card.Body className="p-0">
                                <div className="table-responsive">
                                    <table className="table table-hover align-middle mb-0">
                                        <thead className="bg-light text-muted small text-uppercase fw-bold ls-1 ivory-header">
                                            <tr>
                                                <th className="ps-4 border-0">Patient Profile</th>
                                                <th className="border-0">Timing & Date</th>
                                                <th className="border-0">Clinical Observation</th>
                                                <th className="border-0">Status</th>
                                                <th className="text-end pe-4 border-0">Actions</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {filtered.length > 0 ? filtered.map((apt) => (
                                                <tr key={apt.id} className="transition-all">
                                                    <td className="ps-4">
                                                        <div className="d-flex align-items-center gap-3 py-1">
                                                            <div className="p-2 rounded-3 bg-primary bg-opacity-10 text-primary fw-bold small">
                                                                {apt.patientName?.[0] || 'P'}
                                                            </div>
                                                            <div>
                                                                <div className="fw-bold text-dark small">{apt.patientName || 'Anonymous'}</div>
                                                                <div className="text-muted small" style={{ fontSize: '0.65rem' }}>ID: APT-00{apt.id}</div>
                                                            </div>
                                                        </div>
                                                    </td>
                                                    <td className="small">
                                                        <div className="fw-bold text-dark">{new Date(apt.appointmentDate).toDateString()}</div>
                                                        <div className="text-muted small" style={{ fontSize: '0.6rem' }}>{apt.appointmentTime}</div>
                                                    </td>
                                                    <td className="small text-muted py-3" style={{ maxWidth: 200 }}>
                                                        <div className="text-truncate px-2 italic text-secondary" style={{ fontStyle: 'italic' }}>
                                                            "{apt.symptoms || 'General Checkup'}"
                                                        </div>
                                                    </td>
                                                    <td>
                                                        <Badge bg={statusColors[apt.status] || 'secondary'} className="bg-opacity-10 text-capitalize px-3 py-2 border rounded-pill" style={{ color: `var(--bs-${statusColors[apt.status]})`, fontSize: '0.65rem' }}>
                                                            {apt.status?.toLowerCase()}
                                                        </Badge>
                                                    </td>
                                                    <td className="text-end pe-4">
                                                        {apt.status === 'PENDING' ? (
                                                            <div className="d-flex justify-content-end gap-2">
                                                                <Button variant="success" size="sm" className="rounded-pill px-3 fw-bold small" onClick={() => handleStatusUpdate(apt.id, 'CONFIRMED')}>Confirm</Button>
                                                                <Button variant="outline-danger" size="sm" className="rounded-pill px-2" onClick={() => handleStatusUpdate(apt.id, 'REJECTED')}><FaTimes size={10}/></Button>
                                                            </div>
                                                        ) : (
                                                        <Button 
                                                            variant="light" size="sm" className="rounded-pill px-3 fw-bold small border"
                                                            onClick={() => navigate('/doctor/prescription', { 
                                                                state: { 
                                                                    patientId: apt.patientId, 
                                                                    name: apt.patientName, 
                                                                    symptoms: apt.symptoms,
                                                                    appointmentId: apt.id,
                                                                    doctorId: apt.doctorId
                                                                } 
                                                            })}
                                                        >View Results</Button>
                                                        )}
                                                    </td>
                                                </tr>
                                            )) : (
                                                <tr>
                                                    <td colSpan="5" className="text-center py-5">
                                                        <div className="opacity-25 mb-2"><FaClipboardList size={48} /></div>
                                                        <p className="text-muted small mb-0 fw-bold">No matching medical records found.</p>
                                                    </td>
                                                </tr>
                                            )}
                                        </tbody>
                                    </table>
                                </div>
                            </Card.Body>
                        </Card>
                    </Col>

                    <Col lg={4}>
                        <Card className="border-0 shadow-sm rounded-4 mb-4 bg-white">
                            <Card.Header className="bg-white border-0 pt-4 px-4 fw-bold text-dark d-flex align-items-center gap-2">
                                <div className="p-2 bg-success bg-opacity-10 text-success rounded-3"><FaStethoscope size={14} /></div>
                                Clinical Focus - Today
                            </Card.Header>
                            <Card.Body className="px-4 pb-4">
                                {appointments.filter(a => new Date(a.appointmentDate).toDateString() === new Date().toDateString()).slice(0,4).length > 0 ? (
                                    appointments.filter(a => new Date(a.appointmentDate).toDateString() === new Date().toDateString()).slice(0,4).map((apt, i) => (
                                        <div key={i} className="mb-4 d-flex gap-3 position-relative">
                                            <div style={{ width: 10, height: 10, borderRadius: '50%', background: '#ffc107', marginTop: 6, zIndex: 1, border: '2px solid #fff', boxShadow: '0 0 0 4px #ffc10722' }}></div>
                                            <div>
                                                <div className="small fw-bold text-dark mb-0">{apt.appointmentTime} · {apt.patientName}</div>
                                                <div className="text-muted small lh-1" style={{ fontSize: '0.65rem' }}>{apt.symptoms || 'General Checkup'}</div>
                                            </div>
                                        </div>
                                    ))
                                ) : (
                                    <div className="text-center py-4 bg-light rounded-3 mb-3 border border-dashed">
                                        <p className="small text-muted mb-0 fw-medium">No active schedule for today.</p>
                                    </div>
                                )}
                                <Button 
                                    onClick={() => navigate('/doctor/appointments')}
                                    variant="primary" className="w-100 rounded-pill fw-bold py-2 shadow-sm border-0 bg-primary opacity-90"
                                >
                                    View Full Schedule
                                </Button>
                            </Card.Body>
                        </Card>

                        <Card className="border-0 shadow-sm rounded-4 bg-white overflow-hidden p-0">
                             <div className="p-4" style={{ background: 'linear-gradient(45deg, #0d6efd, #0dcaf0)' }}>
                                <FaChartBar size={32} className="text-white opacity-50 mb-3" />
                                <h6 className="fw-bold text-white mb-1">Clinical Efficiency</h6>
                                <p className="text-white small opacity-75 mb-0">Track your weekly patient handling performance.</p>
                             </div>
                             <Card.Body className="p-4">
                                <div className="d-flex justify-content-between align-items-center mb-1">
                                    <span className="small fw-bold text-dark">Optimization Rate</span>
                                    <span className="small fw-bold text-primary">88%</span>
                                </div>
                                <div className="progress rounded-pill bg-light" style={{ height: 6 }}>
                                    <div className="progress-bar rounded-pill bg-primary" style={{ width: '88%' }}></div>
                                </div>
                             </Card.Body>
                        </Card>
                    </Col>
                </Row>
        </DoctorLayout>
    );
};

export default DoctorDashboard;
