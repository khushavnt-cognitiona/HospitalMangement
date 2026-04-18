import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Container, Row, Col, Card, Tooltip, OverlayTrigger } from "react-bootstrap";
import { 
  FaUserMd, FaHeartbeat, FaCalendarCheck, FaFileMedical, FaCreditCard, 
  FaHospital, FaBell, FaLock, FaCheckCircle, FaUsers, FaArrowRight,
  FaShieldAlt, FaBriefcaseMedical, FaUserInjured, FaUserNurse, FaMicroscope
} from "react-icons/fa";
import "../../styles/LandingPage.css";

// Path to a high-quality medical dashboard preview (using Pexels for high reliability)
const dashboardPreview = "https://images.pexels.com/photos/7088530/pexels-photo-7088530.jpeg?auto=compress&cs=tinysrgb&w=1200";

const LandingPage = () => {
    const [counts, setCounts] = useState({
        patients: 0,
        doctors: 0,
        appointments: 0,
        hospitals: 0
    });

    useEffect(() => {
        // Simple counter animation logic
        const target = { patients: 15400, doctors: 850, appointments: 42000, hospitals: 120 };
        const interval = setInterval(() => {
            setCounts(prev => ({
                patients: Math.min(prev.patients + 200, target.patients),
                doctors: Math.min(prev.doctors + 10, target.doctors),
                appointments: Math.min(prev.appointments + 500, target.appointments),
                hospitals: Math.min(prev.hospitals + 2, target.hospitals)
            }));
        }, 30);
        return () => clearInterval(interval);
    }, []);

    const features = [
        { icon: <FaCalendarCheck />, title: "Appointment Booking", desc: "Intuitive scheduling for patients and staff with real-time slot management." },
        { icon: <FaFileMedical />, title: "Patient Records", desc: "Digital EHR system for secure storage and instant retrieval of clinical history." },
        { icon: <FaCreditCard />, title: "Billing System", desc: "Automated invoicing and payment tracking with transparent clinical billing." },
        { icon: <FaHospital />, title: "Ward Management", desc: "Real-time bed availability tracking and patient admission workflows." },
        { icon: <FaBell />, title: "Notifications", desc: "Instant OTP-verified alerts and updates for clinical and billing events." },
        { icon: <FaLock />, title: "Secure Login", desc: "Multi-factor OTP authentication protecting sensitive medical data." }
    ];

    const roles = [
        { title: "Admin", icon: <FaShieldAlt />, capabilities: ["System Config", "Staff Records", "Billing Master", "Inventory Control"] },
        { title: "Doctor", icon: <FaUserMd />, capabilities: ["Consultations", "E-Prescriptions", "Patient History", "Schedule Hub"] },
        { title: "Patient", icon: <FaUserInjured />, capabilities: ["Quick Booking", "Medical Wallet", "History Access", "Bills Portal"] },
        { title: "Nurse", icon: <FaUserNurse />, capabilities: ["Ward Update", "Vital Logs", "Patient Admit", "Medicine Chart"] }
    ];

    return (
        <div className="landing-page-wrapper animate-fade-in">
            {/* HERO SECTION */}
            <section className="hero-section">
                <Container>
                    <Row className="align-items-center">
                        <Col lg={6} className="hero-content">
                            <div className="hero-badge animate-slide-up">
                                <span className="text-primary fw-bold">Enterprise Healthcare</span>
                                <span className="opacity-50">|</span>
                                <span>Version 4.0 Live</span>
                            </div>
                            <h1 className="hero-headline animate-slide-up" style={{ animationDelay: '0.1s' }}>
                                Smart Healthcare <br />Management System
                            </h1>
                            <p className="hero-subtext animate-slide-up" style={{ animationDelay: '0.2s' }}>
                                A powerful monolithic infrastructure to manage patients, appointments, billing, and specialized healthcare workflows in one unified terminal.
                            </p>
                            <div className="d-flex flex-wrap gap-3 animate-slide-up" style={{ animationDelay: '0.3s' }}>
                                <Link to="/register" className="btn-premium btn-premium-primary py-3 px-5">
                                    Get Started Free <FaArrowRight className="ms-2" />
                                </Link>
                                <Link to="/login" className="btn-premium btn-premium-outline py-3 px-5 bg-white">
                                    Book Appointment
                                </Link>
                            </div>
                            <div className="mt-5 d-flex align-items-center gap-4 animate-slide-up" style={{ animationDelay: '0.4s' }}>
                                <div className="d-flex -space-x-2">
                                    {[1,2,3].map(i => (
                                        <img key={i} src={`https://i.pravatar.cc/100?img=${i+10}`} alt="user" className="rounded-circle border border-2 border-white" style={{ width: '40px', height: '40px' }} />
                                    ))}
                                </div>
                                <span className="small text-muted fw-medium">Join 500+ clinics already digitizing care.</span>
                            </div>
                        </Col>
                        <Col lg={6} className="mt-5 mt-lg-0 order-first order-lg-last">
                            <div className="dashboard-preview-container" style={{ background: '#0f172a', minHeight: '300px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                <img 
                                    src="https://images.pexels.com/photos/7088530/pexels-photo-7088530.jpeg?auto=compress&cs=tinysrgb&w=1200" 
                                    alt="HMS Dashboard Preview" 
                                    className="dashboard-img img-fluid"
                                    style={{ width: '100%', height: 'auto', display: 'block' }}
                                    onError={(e) => {
                                        console.log("Image load failed, using fallback");
                                        e.target.src = "https://placehold.co/800x600/0ea5e9/ffffff?text=Premium+HMS+Dashboard";
                                    }}
                                />
                                <div className="position-absolute top-10 start-0 translate-middle-x animate-bounce d-none d-sm-block" style={{ animationDuration: '3s', zIndex: 10 }}>
                                    <div className="glass-panel p-3 rounded-4 shadow-lg border border-white">
                                        <div className="d-flex align-items-center gap-3">
                                            <div className="bg-success-light text-success p-2 rounded-3"><FaCheckCircle /></div>
                                            <div>
                                                <div className="fw-bold small">Direct Sync</div>
                                                <div className="text-muted" style={{ fontSize: '0.7rem' }}>Real-time Data Active</div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </Col>
                    </Row>
                </Container>
            </section>

            {/* FEATURES SECTION */}
            <section className="py-8 bg-white">
                <Container>
                    <div className="text-center mb-8">
                        <span className="section-tag">Powerful Modules</span>
                        <h2 className="section-title">Comprehensive Clinical Toolbox</h2>
                        <p className="text-muted max-w-lg mx-auto">Everything you need to run a high-performance modern healthcare facility.</p>
                    </div>
                    <Row className="g-4">
                        {features.map((feat, i) => (
                            <Col md={6} lg={4} key={i}>
                                <div className="feature-card">
                                    <div className="feature-icon-box">{feat.icon}</div>
                                    <h4 className="fw-bold mb-3">{feat.title}</h4>
                                    <p className="text-muted small lh-lg mb-0">{feat.desc}</p>
                                </div>
                            </Col>
                        ))}
                    </Row>
                </Container>
            </section>

            {/* ROLE-BASED ACCESS */}
            <section className="py-8 bg-app">
                <Container>
                    <Row className="align-items-center g-5">
                        <Col lg={5}>
                            <span className="section-tag">Multi-User Access</span>
                            <h2 className="section-title">Designed for Every Medical Persona</h2>
                            <p className="text-muted lh-lg mb-5">Our portal provides tailored interfaces and tools specifically optimized for different operational roles. Security and efficiency at every level.</p>
                            <div className="p-4 bg-primary-light rounded-4 border border-primary border-opacity-10 d-flex gap-4">
                                <div className="text-primary fs-3"><FaShieldAlt /></div>
                                <div>
                                    <h6 className="fw-bold">Enterprise Security</h6>
                                    <p className="small text-muted mb-0">Role-based access control (RBAC) ensures medical privacy compliance.</p>
                                </div>
                            </div>
                        </Col>
                        <Col lg={7}>
                            <Row className="g-4">
                                {roles.map((role, i) => (
                                    <Col sm={6} key={i}>
                                        <div className="role-card">
                                            <div className="role-card-header">
                                                <div className="role-icon">{role.icon}</div>
                                                <h5 className="fw-bold mb-0">{role.title}</h5>
                                            </div>
                                            <ul className="role-capability-list">
                                                {role.capabilities.map((cap, j) => (
                                                    <li key={j} className="role-capability-item">
                                                        <FaCheckCircle size={12} /> {cap}
                                                    </li>
                                                ))}
                                            </ul>
                                        </div>
                                    </Col>
                                ))}
                            </Row>
                        </Col>
                    </Row>
                </Container>
            </section>

            {/* HOW IT WORKS */}
            <section className="py-8 bg-white overflow-hidden">
                <Container>
                    <div className="text-center mb-8">
                        <span className="section-tag">Clinical Journey</span>
                        <h2 className="section-title">How It Works</h2>
                    </div>
                    <Row className="g-4">
                        {[
                            { step: "1", title: "Secure Onboarding", desc: "Register and verify your identity via our encrypted OTP system." },
                            { step: "2", title: "Smart Scheduling", desc: "Book appointments with top clinical experts across specialties." },
                            { step: "3", title: "Unified Treatment", desc: "Access care and get real-time vital tracking and prescriptions." },
                            { step: "4", title: "Record Management", desc: "Manage billing, medical history, and discharge from one portal." }
                        ].map((item, i) => (
                            <Col lg={3} md={6} key={i}>
                                <div className="step-container">
                                    {i < 3 && <div className="step-line"></div>}
                                    <div className="step-number">{item.step}</div>
                                    <div className="step-card">
                                        <h6 className="fw-bold mb-2">{item.title}</h6>
                                        <p className="small text-muted mb-0">{item.desc}</p>
                                    </div>
                                </div>
                            </Col>
                        ))}
                    </Row>
                </Container>
            </section>

            {/* STATS SECTION */}
            <section className="py-8">
                <Container>
                    <div className="stats-banner shadow-premium">
                        <Row className="g-4 g-lg-0">
                            <Col sm={6} lg={3} className="stat-item border-lg-end border-white border-opacity-20">
                                <span className="stat-value">{counts.patients.toLocaleString()}+</span>
                                <span className="stat-label">Active Patients</span>
                            </Col>
                            <Col sm={6} lg={3} className="stat-item border-lg-end border-white border-opacity-20">
                                <span className="stat-value">{counts.doctors.toLocaleString()}+</span>
                                <span className="stat-label">Specialist Doctors</span>
                            </Col>
                            <Col sm={6} lg={3} className="stat-item border-lg-end border-white border-opacity-20">
                                <span className="stat-value">{counts.appointments.toLocaleString()}+</span>
                                <span className="stat-label">Booked Visits</span>
                            </Col>
                            <Col sm={6} lg={3} className="stat-item">
                                <span className="stat-value">{counts.hospitals.toLocaleString()}+</span>
                                <span className="stat-label">Clinical Partners</span>
                            </Col>
                        </Row>
                    </div>
                </Container>
            </section>

            {/* TESTIMONIALS */}
            <section className="py-8 bg-app">
                <Container>
                    <Row className="g-5 align-items-center">
                        <Col lg={4}>
                            <span className="section-tag">Clinical Feedback</span>
                            <h2 className="section-title">Trusted by the Best in Healthcare</h2>
                            <p className="text-muted lh-lg">Join 12,000+ professionals who have transformed their clinical operations using HMSPro.</p>
                            <div className="d-flex gap-2 text-warning fs-5">
                                {[1,2,3,4,5].map(i => <FaArrowRight style={{ transform: 'rotate(-45deg)', fontSize: '1rem' }} key={i}/>)}
                            </div>
                        </Col>
                        <Col lg={8}>
                            <Row className="g-4">
                                <Col md={6}>
                                    <Card className="premium-card p-4 h-100 border-0">
                                        <div className="d-flex align-items-center gap-3 mb-3">
                                            <img src="https://i.pravatar.cc/150?img=32" alt="doctor" className="rounded-circle" style={{ width: '50px' }} />
                                            <div>
                                                <h6 className="fw-bold mb-0">Dr. Sarah Johnson</h6>
                                                <span className="small text-muted">Senior Surgeon</span>
                                            </div>
                                        </div>
                                        <p className="small text-muted lh-lg mb-0 italic font-serif">"The monolithic architecture gives us insane speed. Real-time patient lookup and prescription syncing have reduced our turnaround time by 40%."</p>
                                    </Card>
                                </Col>
                                <Col md={6}>
                                    <Card className="premium-card p-4 h-100 border-0">
                                        <div className="d-flex align-items-center gap-3 mb-3">
                                            <img src="https://i.pravatar.cc/150?img=12" alt="doctor" className="rounded-circle" style={{ width: '50px' }} />
                                            <div>
                                                <h6 className="fw-bold mb-0">Michael Chen</h6>
                                                <span className="small text-muted">Clinical Director</span>
                                            </div>
                                        </div>
                                        <p className="small text-muted lh-lg mb-0 italic">"Security was our top priority. The OTP authentication and detailed RBAC audit logs make this the most secure portal we've ever used."</p>
                                    </Card>
                                </Col>
                            </Row>
                        </Col>
                    </Row>
                </Container>
            </section>

            {/* CTA SECTION */}
            <section className="py-8">
                <Container>
                    <div className="cta-banner shadow-premium">
                        <div className="cta-content px-4">
                            <h2 className="display-4 fw-bold text-white mb-4">Start Managing Healthcare Smartly Today</h2>
                            <p className="text-white-50 max-w-lg mx-auto mb-5 fs-5">Digitize your clinical records and streamline your patient journey with our all-in-one terminal.</p>
                            <div className="d-flex flex-wrap justify-content-center gap-3">
                                <Link to="/register" className="btn-premium btn-premium-primary py-3 px-5">
                                    Create Free Account
                                </Link>
                                <Link to="/login" className="btn-premium btn-premium-outline py-3 px-5 text-white border-white">
                                    Portal Login
                                </Link>
                            </div>
                        </div>
                    </div>
                </Container>
            </section>

            {/* FOOTER */}
            <footer className="py-8 border-top border-light">
                <Container>
                    <Row className="g-5">
                        <Col lg={4}>
                            <div className="d-flex align-items-center gap-2 mb-4">
                                <div className="bg-primary p-1 rounded-3"><FaBriefcaseMedical className="text-white" /></div>
                                <h4 className="fw-bold mb-0">HMS<span className="text-primary">Pro</span></h4>
                            </div>
                            <p className="text-muted small lh-lg pe-lg-5">A high-fidelity monolithic healthcare management system designed for precision clinical operations and superior patient care.</p>
                        </Col>
                        <Col sm={4} lg={2}>
                            <h6 className="fw-bold mb-4">Navigation</h6>
                            <ul className="list-unstyled d-flex flex-column gap-3 small text-muted">
                                <li><Link to="/" className="text-decoration-none text-muted">Home</Link></li>
                                <li><Link to="/login" className="text-decoration-none text-muted">Sign In</Link></li>
                                <li><Link to="/register" className="text-decoration-none text-muted">Get Started</Link></li>
                            </ul>
                        </Col>
                        <Col sm={4} lg={2}>
                            <h6 className="fw-bold mb-4">Legal</h6>
                            <ul className="list-unstyled d-flex flex-column gap-3 small text-muted">
                                <li>Privacy Policy</li>
                                <li>Terms of Service</li>
                                <li>Security Protocol</li>
                            </ul>
                        </Col>
                        <Col sm={4} lg={4}>
                            <h6 className="fw-bold mb-4">Connect Terminal</h6>
                            <p className="small text-muted mb-4">Digital Health District, Clinical Square 101, <br />New York City, NY</p>
                            <h5 className="fw-bold">1-800-HMS-CORP</h5>
                        </Col>
                    </Row>
                    <div className="mt-8 pt-4 border-top border-light text-center small text-muted">
                        &copy; 2026 HMSPro Infrastructure. Built for Clinical Excellence by Khushavnt-Cognitiona.
                    </div>
                </Container>
            </footer>
        </div>
    );
};

export default LandingPage;
