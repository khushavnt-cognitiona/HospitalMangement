import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Card, Button, Badge, Table, Spinner, ProgressBar } from 'react-bootstrap';
import { FaUserShield, FaUserMd, FaUsers, FaChartLine, FaCheckCircle, FaUserClock, FaCog, FaHospital } from 'react-icons/fa';
import doctorService from '../../services/doctorService';
import patientService from '../../services/patientService';

const AdminDashboard = () => {
    const [doctors, setDoctors] = useState([]);
    const [patients, setPatients] = useState([]);
    const [loading, setLoading] = useState(true);
    const [stats, setStats] = useState({ doctors: 0, patients: 0, revenue: 0 });

    useEffect(() => {
        const fetchAdminData = async () => {
            try {
                const [docData, patData] = await Promise.all([
                    doctorService.getAllDoctors(),
                    patientService.getAllPatients()
                ]);
                const docs = docData || [];
                const pats = patData.data || patData || [];
                setDoctors(docs);
                setPatients(pats);
                setStats({
                    doctors: docs.length,
                    patients: pats.length,
                    revenue: docs.filter(d => d.available).length * 15000 // Improved mock calc for verified staff
                });
            } catch (err) {
                console.error("Admin data fetch failed", err);
            } finally {
                setLoading(false);
            }
        };
        fetchAdminData();
    }, []);

    const handleDoctorToggle = async (id) => {
        try {
            await doctorService.toggleAvailability(id);
            const updated = doctors.map(d => d.id === id ? { ...d, available: !d.available } : d);
            setDoctors(updated);
        } catch (err) {
            console.error("Status update failed", err);
        }
    };

    if (loading) return (
        <div className="d-flex justify-content-center align-items-center vh-100 bg-dark">
            <div className="text-center">
                <Spinner animation="grow" variant="warning" />
                <p className="mt-3 fw-bold text-warning opacity-75">Loading Strategic Assets...</p>
            </div>
        </div>
    );

    return (
        <div style={{ background: '#0f172a', minHeight: '100vh', color: '#f8fafc', paddingBottom: '60px' }}>
            <div style={{ 
                background: 'linear-gradient(135deg, #1e293b 0%, #0f172a 100%)', 
                padding: '80px 0 60px', 
                borderBottom: '1px solid rgba(255,255,255,0.1)',
                marginTop: '50px'
            }}>
                <Container className="px-4">
                    <Row className="align-items-center">
                        <Col md={8}>
                            <div className="d-flex align-items-center gap-4">
                                <div className="p-3 rounded-4 bg-warning bg-opacity-10 d-flex align-items-center justify-content-center border border-warning border-opacity-25" style={{ width: 80, height: 80 }}>
                                    <FaUserShield size={40} className="text-warning" />
                                </div>
                                <div>
                                    <h2 className="fw-bold mb-1" style={{ letterSpacing: '-1px' }}>Strategic Command Center</h2>
                                    <p className="mb-0 text-muted fw-medium">
                                        <Badge bg="warning" text="dark" className="me-2">System Admin</Badge>
                                        <span className="opacity-75">Global Infrastructure Oversight · v4.0.1</span>
                                    </p>
                                </div>
                            </div>
                        </Col>
                        <Col md={4} className="text-md-end d-none d-md-block">
                             <Button variant="outline-warning" className="rounded-pill px-4 fw-bold shadow-sm">
                                <FaCog className="me-2" /> System Configuration
                             </Button>
                        </Col>
                    </Row>
                </Container>
            </div>

            <Container className="px-4 mt-n4" style={{ position: 'relative', zIndex: 2 }}>
                <Row className="g-4 mb-5">
                    {[
                        { label: 'Active Clinicians', value: stats.doctors, icon: FaUserMd, color: '#eab308', sub: 'Verified Staff' },
                        { label: 'Patient Universe', value: stats.patients, icon: FaUsers, color: '#38bdf8', sub: 'Registered Users' },
                        { label: 'System Revenue', value: `₹${stats.revenue.toLocaleString()}`, icon: FaChartLine, color: '#22c55e', sub: 'Est. Quarterly' },
                        { label: 'Uptime Status', value: '99.9%', icon: FaCheckCircle, color: '#f43f5e', sub: 'Infrastructure' }
                    ].map((stat, i) => (
                        <Col key={i} sm={6} lg={3}>
                            <Card className="border-0 shadow-lg rounded-4 h-100 bg-secondary bg-opacity-10 backdrop-blur border-white border-opacity-10 p-2">
                                <Card.Body className="p-4 d-flex align-items-center gap-3">
                                    <div className="p-3 rounded-circle d-flex align-items-center justify-content-center" style={{ background: `${stat.color}22`, color: stat.color, width: 56, height: 56 }}>
                                        <stat.icon size={24} />
                                    </div>
                                    <div>
                                        <h3 className="fw-bold mb-0 text-white">{stat.value}</h3>
                                        <div className="small text-muted fw-bold text-uppercase" style={{ fontSize: '0.65rem' }}>{stat.label}</div>
                                        <div className="text-warning text-opacity-75" style={{ fontSize: '0.65rem' }}>{stat.sub}</div>
                                    </div>
                                </Card.Body>
                            </Card>
                        </Col>
                    ))}
                </Row>

                <Row className="g-4 mb-5">
                    <Col lg={8}>
                        <Card className="border-0 shadow-lg rounded-4 overflow-hidden bg-secondary bg-opacity-10 border-white border-opacity-10 h-100">
                            <Card.Body className="p-4">
                                <div className="d-flex justify-content-between align-items-center mb-4">
                                    <h6 className="fw-bold text-uppercase small ls-1 text-muted">Infrastructure Growth</h6>
                                    <Badge bg="primary" className="bg-opacity-25 text-primary px-3 py-2">LIVE DATA</Badge>
                                </div>
                                <div style={{ height: 300, width: '100%', position: 'relative' }}>
                                    <svg viewBox="0 0 800 300" className="w-100 h-100" preserveAspectRatio="none">
                                        <defs>
                                            <linearGradient id="areaGradient" x1="0" y1="0" x2="0" y2="1">
                                                <stop offset="5%" stopColor="#3b82f6" stopOpacity="0.3"/>
                                                <stop offset="95%" stopColor="#3b82f6" stopOpacity="0"/>
                                            </linearGradient>
                                        </defs>
                                        <path d="M0,250 Q100,200 200,220 T400,100 T600,150 T800,50 L800,300 L0,300 Z" fill="url(#areaGradient)" />
                                        <path d="M0,250 Q100,200 200,220 T400,100 T600,150 T800,50" fill="none" stroke="#3b82f6" strokeWidth="4" />
                                        <line x1="0" y1="50" x2="800" y2="50" stroke="rgba(255,255,255,0.05)" />
                                        <line x1="0" y1="150" x2="800" y2="150" stroke="rgba(255,255,255,0.05)" />
                                        <line x1="0" y1="250" x2="800" y2="250" stroke="rgba(255,255,255,0.05)" />
                                    </svg>
                                    <div className="position-absolute bottom-0 start-0 w-100 d-flex justify-content-between px-2 text-muted" style={{ fontSize: '10px' }}>
                                        <span>Mon</span><span>Tue</span><span>Wed</span><span>Thu</span><span>Fri</span><span>Sat</span><span>Sun</span>
                                    </div>
                                </div>
                            </Card.Body>
                        </Card>
                    </Col>
                    
                    <Col lg={4}>
                        <Card className="border-0 shadow-lg rounded-4 overflow-hidden bg-secondary bg-opacity-10 border-white border-opacity-10 h-100">
                            <Card.Body className="p-4">
                                <h6 className="fw-bold text-uppercase small ls-1 text-muted mb-4">Clinical Load</h6>
                                <div className="d-flex justify-content-center align-items-center" style={{ height: 240 }}>
                                    <svg viewBox="0 0 100 100" width="180" height="180">
                                        <circle cx="50" cy="50" r="40" fill="transparent" stroke="#3b82f6" strokeWidth="20" strokeDasharray="160 251" strokeDashoffset="0" />
                                        <circle cx="50" cy="50" r="40" fill="transparent" stroke="#10b981" strokeWidth="20" strokeDasharray="60 251" strokeDashoffset="-160" />
                                        <circle cx="50" cy="50" r="40" fill="transparent" stroke="#f59e0b" strokeWidth="20" strokeDasharray="31 251" strokeDashoffset="-220" />
                                    </svg>
                                </div>
                                <div className="mt-4 vstack gap-2">
                                    {[
                                        { l: 'Outpatient Care', c: '#3b82f6', p: '62%' },
                                        { l: 'Surgery', c: '#10b981', p: '24%' },
                                        { l: 'Critical Care', c: '#ef4444', p: '12%' }
                                    ].map((item, i) => (
                                        <div key={i} className="d-flex justify-content-between small fw-bold">
                                            <span style={{ color: item.c }}>● {item.l}</span>
                                            <span className="text-muted">{item.p}</span>
                                        </div>
                                    ))}
                                </div>
                            </Card.Body>
                        </Card>
                    </Col>
                </Row>

                <Row className="g-4 mb-5">
                    <Col lg={8}>
                        <Card className="border-0 shadow-lg rounded-4 overflow-hidden bg-secondary bg-opacity-10 border-white border-opacity-10 h-100">
                            <Card.Header className="bg-transparent border-0 py-4 px-4 d-flex justify-content-between align-items-center">
                                <div>
                                    <h5 className="fw-bold mb-0">Doctor Verification Hub</h5>
                                    <p className="text-muted small mb-0">Approve or audit clinical credentials</p>
                                </div>
                                <Button variant="warning" size="sm" className="rounded-pill px-4 fw-bold">Manual Audit</Button>
                            </Card.Header>
                            <Card.Body className="p-0">
                                <div className="table-responsive">
                                    <Table hover variant="dark" className="table-borderless align-middle mb-0 bg-transparent">
                                        <thead className="small text-uppercase opacity-50 bg-white bg-opacity-5">
                                            <tr>
                                                <th className="ps-4">Practitioner</th>
                                                <th>Specialization</th>
                                                <th>Auth Status</th>
                                                <th className="text-end pe-4">Verification</th>
                                            </tr>
                                        </thead>
                                        <tbody style={{ borderTop: 'none' }}>
                                            {doctors.map((doc, i) => (
                                                <tr key={i} className="border-bottom border-white border-opacity-5">
                                                    <td className="ps-4 py-3">
                                                        <div className="d-flex align-items-center gap-3">
                                                            <div className="rounded-circle bg-warning bg-opacity-20 d-flex align-items-center justify-content-center text-warning fw-bold" style={{ width: 40, height: 40 }}>
                                                                {doc.name?.[0]}
                                                            </div>
                                                            <div>
                                                                <div className="fw-bold">Dr. {doc.name}</div>
                                                                <div className="text-muted small" style={{ fontSize: '0.7rem' }}>{doc.email}</div>
                                                            </div>
                                                        </div>
                                                    </td>
                                                    <td>
                                                        <Badge bg="secondary" className="bg-opacity-25 text-info px-3 py-2">{doc.specialization}</Badge>
                                                    </td>
                                                    <td>
                                                        <div className="d-flex align-items-center gap-2">
                                                            <div className={`rounded-circle bg-${doc.available ? 'success' : 'warning'}`} style={{ width: 8, height: 8 }}></div>
                                                            <span className="small fw-bold opacity-75">{doc.available ? 'Verified' : 'Pending Audit'}</span>
                                                        </div>
                                                    </td>
                                                    <td className="text-end pe-4">
                                                        <Button 
                                                            variant={doc.available ? "outline-danger" : "warning"} 
                                                            size="sm" 
                                                            className="rounded-pill px-3 fw-bold small"
                                                            onClick={() => handleDoctorToggle(doc.id)}
                                                        >
                                                            {doc.available ? 'Suspend' : 'Authorize'}
                                                        </Button>
                                                    </td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </Table>
                                </div>
                            </Card.Body>
                        </Card>
                    </Col>
                    <Col lg={4}>
                         <Card className="border-0 shadow-lg rounded-4 bg-secondary bg-opacity-10 border-white border-opacity-10 mb-4 h-100">
                            <Card.Header className="bg-transparent border-0 pt-4 px-4 fw-bold">Recent Registrations</Card.Header>
                            <Card.Body className="px-4">
                                {patients.slice(0, 5).map((pat, i) => (
                                    <div key={i} className="d-flex align-items-center gap-3 mb-4 p-3 rounded-4 bg-white bg-opacity-5 hover-shadow transition-all">
                                        <div className="rounded-4 p-2 bg-info bg-opacity-10 text-info border border-info border-opacity-25">
                                            <FaUserClock size={16} />
                                        </div>
                                        <div className="flex-grow-1">
                                            <div className="fw-bold small">{pat.name}</div>
                                            <div className="text-muted" style={{ fontSize: '0.65rem' }}>{pat.email}</div>
                                        </div>
                                        <Badge bg="info" className="bg-opacity-10 text-info">NEW</Badge>
                                    </div>
                                ))}
                            </Card.Body>
                        </Card>

                        <Card className="border-0 shadow-lg rounded-4 overflow-hidden p-0 bg-warning text-dark mt-4">
                             <Card.Body className="p-4 text-center">
                                <FaHospital size={30} className="mb-3 opacity-75" />
                                <h6 className="fw-bold mb-1">Global System Health</h6>
                                <ProgressBar now={92} variant="dark" className="my-3 bg-dark bg-opacity-10" style={{ height: 6 }} />
                                <p className="small fw-bold opacity-75 mb-0">Services operating at 92% efficiency.</p>
                             </Card.Body>
                        </Card>
                    </Col>
                </Row>
            </Container>

            <style>{`
                .ls-1 { letter-spacing: 0.5px; }
                .backdrop-blur { backdrop-filter: blur(12px); -webkit-backdrop-filter: blur(12px); }
                .hover-shadow:hover { transform: translateY(-2px); box-shadow: 0 12px 25px rgba(0,0,0,0.2) !important; background: rgba(255,255,255,0.1) !important; }
                .transition-all { transition: all 0.2s ease; }
            `}</style>
        </div>
    );
};

export default AdminDashboard;
