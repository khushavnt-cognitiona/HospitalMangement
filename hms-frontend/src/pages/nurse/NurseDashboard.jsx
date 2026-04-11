import React from 'react';
import { Container, Row, Col, Card, Button } from 'react-bootstrap';
import { FaBed, FaUserPlus, FaClipboardList, FaHeartbeat, FaClock, FaUserNurse, FaArrowRight, FaHospital } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

const stats = [
  { icon: FaBed, label: 'Total Beds', value: '48', color: '#0dcaf0', sub: 'Ward capacity' },
  { icon: FaHeartbeat, label: 'Occupancy', value: '35', color: '#dc3545', sub: 'Active patients' },
  { icon: FaClipboardList, label: 'My Patients', value: '6', color: '#0d6efd', sub: 'Assigned to me' },
  { icon: FaUserPlus, label: 'Pending', value: '2', color: '#ffc107', sub: 'New admissions' },
];

const recentActivity = [
  { patient: 'Robert Brown', action: 'Admitted to Ward A - Bed 4', time: '09:15 AM', type: 'admit' },
  { patient: 'Linda Wilson', action: 'BP check completed', time: '10:30 AM', type: 'check' },
  { patient: 'Mary Smith', action: 'Medication administered', time: '11:00 AM', type: 'med' },
  { patient: 'John Patient', action: 'Discharged from Ward B', time: '2:00 PM', type: 'discharge' },
];

const actColors = { admit: '#0d6efd', check: '#198754', med: '#0dcaf0', discharge: '#ffc107' };

const NurseDashboard = () => {
    const { auth } = useAuth();

    return (
        <div style={{ background: '#f8fafc', minHeight: '100vh', paddingBottom: '40px' }}>
            {/* Premium Nurse Header */}
            <div style={{ 
                background: 'linear-gradient(135deg, #0891b2 0%, #0e7490 100%)', 
                padding: '80px 0 60px', 
                color: '#fff',
                borderBottom: '4px solid #22d3ee',
                marginTop: '50px' 
            }}>
                <Container className="px-4">
                    <Row className="align-items-center">
                        <Col md={8}>
                            <div className="d-flex align-items-center gap-4">
                                <div className="p-3 rounded-circle bg-white shadow-sm d-flex align-items-center justify-content-center" style={{ width: 80, height: 80 }}>
                                    <FaUserNurse size={40} className="text-info" />
                                </div>
                                <div>
                                    <h2 className="fw-bold mb-1" style={{ letterSpacing: '-0.5px' }}>Hello, Nurse {auth.user?.name?.split(' ').slice(-1) || 'Practitioner'}</h2>
                                    <p className="mb-0 opacity-90 fw-medium">
                                        <span className="badge bg-info text-dark me-2">Ward Oncology</span>
                                        <FaClock className="me-1" /> Morning Shift · Today's Status
                                    </p>
                                </div>
                            </div>
                        </Col>
                        <Col md={4} className="text-md-end d-none d-md-block">
                            <div className="bg-white bg-opacity-10 backdrop-blur rounded-4 p-3 border border-light border-opacity-25 shadow-sm text-center">
                                <div className="fw-bold opacity-75 small text-uppercase mb-1" style={{ fontSize: '0.65rem' }}>Current Activity</div>
                                <h6 className="mb-0 fw-bold text-warning">86% Occupancy</h6>
                            </div>
                        </Col>
                    </Row>
                </Container>
            </div>

            <Container className="px-4 mt-n4" style={{ position: 'relative', zIndex: 2 }}>
                {/* Statistics Cards */}
                <Row className="g-4 mb-4">
                    {stats.map((stat, i) => (
                        <Col key={i} sm={6} lg={3}>
                            <Card className="border-0 shadow-sm rounded-4 h-100 bg-white hover-shadow transition-all">
                                <Card.Body className="p-4 d-flex align-items-center gap-3">
                                    <div className="p-3 rounded-3 d-flex align-items-center justify-content-center" style={{ background: `${stat.color}15`, color: stat.color, width: 56, height: 56 }}>
                                        <stat.icon size={24} />
                                    </div>
                                    <div>
                                        <h3 className="fw-bold mb-0 text-dark">{stat.value}</h3>
                                        <div className="small text-muted fw-bold text-uppercase" style={{ fontSize: '0.65rem' }}>{stat.label}</div>
                                        <div className="text-muted" style={{ fontSize: '0.65rem', opacity: 0.7 }}>{stat.sub}</div>
                                    </div>
                                </Card.Body>
                            </Card>
                        </Col>
                    ))}
                </Row>

                <Row className="g-4">
                    {/* Activity Timeline */}
                    <Col lg={8}>
                        <Card className="border-0 shadow-sm rounded-4 overflow-hidden bg-white">
                            <Card.Header className="bg-white border-0 py-4 px-4 d-flex justify-content-between align-items-center">
                                <div>
                                    <h5 className="fw-bold text-dark mb-0">Today's Activity Log</h5>
                                    <p className="text-muted small mb-0">Review patient transitions and medical checks</p>
                                </div>
                                <Button variant="light" size="sm" className="rounded-pill px-3 border fw-bold text-muted small">Export Log</Button>
                            </Card.Header>
                            <Card.Body className="p-0">
                                <div className="p-2">
                                    {recentActivity.map((a, i) => (
                                        <div key={i} className="d-flex align-items-center gap-3 p-3 hover-shadow transition-all rounded-3 border-bottom border-light mb-1">
                                            <div className="rounded-circle" style={{ width: 12, height: 12, background: actColors[a.type], boxShadow: `0 0 0 4px ${actColors[a.type]}22` }}></div>
                                            <div className="flex-grow-1">
                                                <div className="fw-bold text-dark" style={{ fontSize: '0.875rem' }}>{a.patient}</div>
                                                <div className="text-muted" style={{ fontSize: '0.75rem' }}>{a.action}</div>
                                            </div>
                                            <div className="text-end">
                                                <div className="small fw-bold text-dark">{a.time}</div>
                                                <div className="badge bg-light text-muted border px-2" style={{ fontSize: '0.6rem' }}>{a.type.toUpperCase()}</div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                                <div className="p-4 text-center border-top">
                                    <Link to="/nurse/wards" className="text-info fw-bold text-decoration-none small">View Full Ward History <FaArrowRight /></Link>
                                </div>
                            </Card.Body>
                        </Card>
                    </Col>

                    {/* Quick Access Sidebar */}
                    <Col lg={4}>
                        <Card className="border-0 shadow-sm rounded-4 bg-white mb-4 overflow-hidden">
                            <Card.Body className="p-4">
                                <h6 className="fw-bold text-dark mb-4">Quick Workflows</h6>
                                <div className="d-grid gap-3">
                                    <Link to="/nurse/wards" className="btn btn-info text-white rounded-pill py-2 fw-bold d-flex align-items-center justify-content-center gap-2 shadow-sm">
                                        <FaBed /> Ward Command Center
                                    </Link>
                                    <Link to="/nurse/assignments" className="btn btn-outline-info rounded-pill py-2 fw-bold d-flex align-items-center justify-content-center gap-2 border-2">
                                        <FaUserPlus /> New Bed Assignment
                                    </Link>
                                </div>
                            </Card.Body>
                        </Card>

                        <Card className="border-0 shadow-sm rounded-4 overflow-hidden p-0" style={{ background: 'linear-gradient(45deg, #0891b2, #06b6d4)' }}>
                             <Card.Body className="p-4 text-white text-center">
                                <div className="p-3 bg-white bg-opacity-20 rounded-circle d-inline-flex mb-3">
                                    <FaHospital size={24} />
                                </div>
                                <h6 className="fw-bold mb-1">Ward Security Status</h6>
                                <p className="small opacity-75 mb-0">Oncology Ward B is under high performance surveillance.</p>
                             </Card.Body>
                        </Card>
                    </Col>
                </Row>
            </Container>

            <style>{`
                .backdrop-blur { backdrop-filter: blur(12px); -webkit-backdrop-filter: blur(12px); }
                .hover-shadow:hover { transform: translateY(-2px); box-shadow: 0 8px 15px rgba(0,0,0,0.05) !important; }
                .transition-all { transition: all 0.2s ease-in-out; }
            `}</style>
        </div>
    );
};

export default NurseDashboard;
