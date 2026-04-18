import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Carousel, Container, Row, Col, Card, Accordion } from "react-bootstrap";
import { FaUserMd, FaHeartbeat, FaStethoscope, FaHospitalAlt, FaAmbulance, FaClock, FaUserPlus, FaSearchPlus, FaCalendarCheck, FaSmileBeam, FaBrain, FaTooth, FaBone, FaLungs, FaQuoteLeft, FaStar, FaAward, FaShieldAlt } from "react-icons/fa";
import axiosInstance from "../../api/axiosInstance";

const heroBg1 = "https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?q=80&w=2000";
const heroBg2 = "https://images.unsplash.com/photo-1581595220892-b0739db3ba8c?q=80&w=2000";
const departmentBg = "https://images.unsplash.com/photo-1581594549595-35f6edc7b762?q=80&w=2000";
const testimonial1 = "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=200&h=200&fit=crop";
const testimonial2 = "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=200&h=200&fit=crop";
const testimonial3 = "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&h=200&fit=crop";
const defaultDoctor = "https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?w=400&h=300&fit=crop";

const LandingPage = () => {
  const [doctors, setDoctors] = useState([]);

  useEffect(() => {
    const fetchDoctors = async () => {
      try {
        const response = await axiosInstance.get('doctors');
        setDoctors(response.data.slice(0, 4));
      } catch (error) {
        console.error("Failed to fetch doctors:", error);
      }
    };
    fetchDoctors();
  }, []);

  return (
    <div className="animate-fade-in">
        <main style={{ overflowX: "hidden" }}>
            {/* HERO CAROUSEL */}
            <Carousel fade nextLabel="" prevLabel="" indicators={true} className="w-100 hero-carousel">
                <Carousel.Item style={{ height: "80vh", position: "relative", backgroundColor:"#000" }}>
                    <div className="position-absolute top-0 start-0 w-100 h-100 bg-dark opacity-50" style={{ zIndex: 1 }}></div>
                    <img
                        className="d-block w-100 h-100 object-fit-cover"
                        src={heroBg1}
                        alt="Advanced Healthcare"
                    />
                    <Carousel.Caption className="d-flex flex-column justify-content-center align-items-start text-start position-absolute w-100 h-100 start-0 top-0 bottom-0" style={{ zIndex: 2, padding: "0 10%" }}>
                        <div className="animate-slide-up" style={{ maxWidth: '800px' }}>
                            <span className="badge bg-primary-light text-primary px-3 py-2 rounded-pill mb-4 fw-bold small letter-spacing-wide">ADVANCED CLINICAL CARE</span>
                            <h1 className="fw-bold text-white mb-4 display-3 lh-tight">
                                Your Health, <br/><span className="text-primary-gradient bg-clip-text">Our Precision Priority.</span>
                            </h1>
                            <p className="fs-5 text-white-50 mb-5 max-w-lg">
                                Experience unified world-class healthcare. Managed records, instant bookings, and transparent billing at your fingertips.
                            </p>
                            <div className="d-flex gap-4">
                                <Link to="/register" className="btn btn-premium btn-premium-primary px-5 py-3 fs-5">
                                    Start Journey
                                </Link>
                                <Link to="/login" className="btn btn-premium btn-premium-outline text-white border-white px-5 py-3 fs-5">
                                    Member Login
                                </Link>
                            </div>
                        </div>
                    </Carousel.Caption>
                </Carousel.Item>
                
                <Carousel.Item style={{ height: "80vh", position: "relative", backgroundColor:"#0f172a" }}>
                    <div className="position-absolute top-0 start-0 w-100 h-100 bg-dark opacity-50" style={{ zIndex: 1 }}></div>
                    <img
                        className="d-block w-100 h-100 object-fit-cover"
                        src={heroBg2}
                        alt="Emergency Services"
                    />
                    <Carousel.Caption className="d-flex flex-column justify-content-center align-items-start text-start position-absolute w-100 h-100 start-0 top-0 bottom-0" style={{ zIndex: 2, padding: "0 10%" }}>
                        <div className="animate-slide-up" style={{ maxWidth: '800px' }}>
                            <span className="badge bg-danger-light text-danger px-3 py-2 rounded-pill mb-4 fw-bold small letter-spacing-wide">24/7 CRITICAL RESPONSE</span>
                            <h1 className="fw-bold text-white mb-4 display-3 lh-tight">
                                Resilience <br/><span className="text-danger">When It Matters Most.</span>
                            </h1>
                            <p className="fs-5 text-white-50 mb-5 max-w-lg">
                                Integrated emergency units and specialized wards operational 24/7 with real-time health data sync.
                            </p>
                            <Link to="/register" className="btn btn-premium btn-danger px-5 py-3 fs-5">
                                Emergency Access
                            </Link>
                        </div>
                    </Carousel.Caption>
                </Carousel.Item>
            </Carousel>

            {/* TRUST BAR */}
            <div className="bg-white border-bottom py-4 shadow-sm">
                <Container>
                    <Row className="text-center align-items-center g-4">
                        <Col md={4} className="d-flex align-items-center justify-content-center gap-2">
                            <FaAward className="text-primary" /> <span className="fw-bold text-muted small text-uppercase letter-spacing-wide">ISO 9001 Certified Clinic</span>
                        </Col>
                        <Col md={4} className="d-flex align-items-center justify-content-center gap-2 border-start border-end border-light">
                            <FaShieldAlt className="text-primary" /> <span className="fw-bold text-muted small text-uppercase letter-spacing-wide">Encrypted Patient Data</span>
                        </Col>
                        <Col md={4} className="d-flex align-items-center justify-content-center gap-2">
                            <FaAmbulance className="text-primary" /> <span className="fw-bold text-muted small text-uppercase letter-spacing-wide">Rapid Response Network</span>
                        </Col>
                    </Row>
                </Container>
            </div>

            {/* CORE SERVICES */}
            <section className="py-5 my-5">
                <Container>
                    <Row className="g-4">
                        <Col lg={4}>
                            <div className="premium-card p-5 h-100 border-0 bg-white">
                                <div className="bg-primary-light text-primary rounded-4 flex-center mb-4" style={{ width: '60px', height: '60px' }}>
                                    <FaUserMd size={28} />
                                </div>
                                <h3 className="fw-bold mb-3">Distinguished Experts</h3>
                                <p className="text-muted lh-lg mb-0">Direct access to a vetted network of clinical pioneers across every major specialty.</p>
                            </div>
                        </Col>
                        <Col lg={4}>
                            <div className="premium-card p-5 h-100 border-0 text-white" style={{ background: 'var(--primary-gradient)' }}>
                                <div className="bg-white bg-opacity-20 text-white rounded-4 flex-center mb-4" style={{ width: '60px', height: '60px' }}>
                                    <FaClock size={28} />
                                </div>
                                <h3 className="fw-bold mb-3">Instant Scheduling</h3>
                                <p className="text-white-50 lh-lg mb-0">Seamlessly book and manage consultations through our intelligent digital terminal.</p>
                            </div>
                        </Col>
                        <Col lg={4}>
                            <div className="premium-card p-5 h-100 border-0 bg-white">
                                <div className="bg-danger-light text-danger rounded-4 flex-center mb-4" style={{ width: '60px', height: '60px' }}>
                                    <FaHeartbeat size={28} />
                                </div>
                                <h3 className="fw-bold mb-3">Unified Records</h3>
                                <p className="text-muted lh-lg mb-0">Secure, portable health history that follows you across every clinical encounter.</p>
                            </div>
                        </Col>
                    </Row>
                </Container>
            </section>

            {/* DEPARTMENTS CINEMATIC */}
            <section className="py-5 position-relative bg-dark">
                <div className="position-absolute top-0 start-0 w-100 h-100 opacity-20" style={{ backgroundImage: `url(${departmentBg})`, backgroundSize: 'cover', backgroundPosition: 'center', filter: 'grayscale(100%)' }}></div>
                <div className="position-absolute top-0 start-0 w-100 h-100 bg-gradient-to-b from-dark to-transparent"></div>
                
                <Container className="position-relative z-1 py-5">
                    <div className="text-center mb-5 pb-4">
                        <span className="badge bg-primary-light text-primary px-3 py-2 rounded-pill mb-3 fw-bold small">CLINICAL EXCELLENCE</span>
                        <h2 className="fw-bold text-white display-5">Specialized Care Wings</h2>
                    </div>
                    <Row className="g-4">
                        {[
                            { title: "Cardiology", icon: <FaHeartbeat/>, desc: "Precision cardiac diagnostic and surgical interventions." },
                            { title: "Neurology", icon: <FaBrain/>, desc: "Complex neuro-restorative and stroke therapy." },
                            { title: "Orthopedics", icon: <FaBone/>, desc: "Advanced trauma and elective replacement surgery." },
                            { title: "Pulmonology", icon: <FaLungs/>, desc: "Critical respiratory and lung health management." },
                            { title: "Dental Care", icon: <FaTooth/>, desc: "Cosmetic and restorative oral health solutions." },
                            { title: "General Care", icon: <FaStethoscope/>, desc: "Comprehensive diagnostic and internal medicine." }
                        ].map((dept, i) => (
                            <Col md={6} lg={4} key={i}>
                                <div className="premium-card p-4 border border-secondary border-opacity-20 bg-dark bg-opacity-40 text-white h-100 transition-hover" style={{ backdropFilter: 'blur(10px)' }}>
                                    <div className="text-primary mb-4">
                                        {React.cloneElement(dept.icon, { size: 36 })}
                                    </div>
                                    <h4 className="fw-bold mb-3">{dept.title}</h4>
                                    <p className="text-white-50 small mb-0">{dept.desc}</p>
                                </div>
                            </Col>
                        ))}
                    </Row>
                </Container>
            </section>

            {/* TESTIMONIALS GLASS */}
            <section className="py-5 bg-light position-relative">
                <Container className="py-5">
                    <Row className="align-items-center g-5">
                        <Col lg={4}>
                            <span className="badge bg-primary-light text-primary px-3 py-2 rounded-pill mb-3 fw-bold small">PATIENT VOICES</span>
                            <h2 className="fw-bold display-4 text-dark mb-4">Stories of Recovery</h2>
                            <p className="text-muted fs-5 lh-lg mb-5">Hear from the patients who have experienced the future of integrated healthcare through our system.</p>
                            <Link to="/register" className="btn btn-premium btn-premium-primary px-5 py-3">Register Now</Link>
                        </Col>
                        <Col lg={8}>
                            <Row className="g-4">
                                {[
                                    { name: "John Doe", role: "Critical Care", text: "The real-time synchronization of my vital data across the dashboard saved my family so much stress.", pic: testimonial1 },
                                    { name: "Maria Garcia", role: "Surgery", text: "Dr. Jenkins was exceptional, and the transparent billing portal is exactly what hospitals need today.", pic: testimonial2 }
                                ].map((test, i) => (
                                    <Col md={12} key={i}>
                                        <div className="premium-card p-5 border-0 bg-white shadow-sm flex-center gap-4 text-start">
                                            <img src={test.pic} alt={test.name} className="rounded-circle shadow-sm border border-4 border-white" style={{ width: '80px', height: '80px', objectFit: 'cover' }} />
                                            <div>
                                                <FaQuoteLeft className="text-primary opacity-20 mb-3" size={24} />
                                                <p className="fw-medium text-dark fs-5 mb-3 italic">"{test.text}"</p>
                                                <div className="d-flex align-items-center justify-content-between">
                                                    <h6 className="fw-bold mb-0">{test.name} <span className="fw-normal text-muted ms-2">• {test.role}</span></h6>
                                                    <div className="text-warning small"><FaStar/><FaStar/><FaStar/><FaStar/><FaStar/></div>
                                                </div>
                                            </div>
                                        </div>
                                    </Col>
                                ))}
                            </Row>
                        </Col>
                    </Row>
                </Container>
            </section>

            {/* CTA */}
            <section className="py-5 my-5">
                <Container>
                    <div className="rounded-5 p-5 text-center text-white position-relative overflow-hidden" style={{ background: 'var(--primary-gradient)' }}>
                        <FaStethoscope size={300} className="position-absolute text-white opacity-10" style={{ right: '-50px', bottom: '-80px', transform: 'rotate(-20deg)' }} />
                        <div className="position-relative z-10 py-4">
                            <h2 className="display-3 fw-bold mb-4">Ready for Smarter Care?</h2>
                            <p className="fs-5 opacity-75 max-w-lg mx-auto mb-5 lh-lg">Join thousands of patients who manage their clinical records, appointments, and billing through our unified medical infrastructure.</p>
                            <Link to="/register" className="btn btn-premium btn-light text-primary px-5 py-3 fs-5 fw-bold">Create Free Account</Link>
                        </div>
                    </div>
                </Container>
            </section>

            {/* FOOTER */}
            <footer className="bg-dark text-white py-5">
                <Container className="py-5">
                    <Row className="g-5">
                        <Col lg={4}>
                            <div className="d-flex align-items-center gap-2 mb-4">
                                <FaHospitalAlt className="text-primary" size={24} />
                                <h4 className="fw-bold mb-0">HMS<span className="opacity-50">Pro</span></h4>
                            </div>
                            <p className="text-white-50 lh-lg pe-lg-5">A state-of-the-art monolithic healthcare management system designed for clinical precision and operational excellence.</p>
                        </Col>
                        <Col sm={6} lg={4}>
                            <h5 className="fw-bold mb-4">Facility Links</h5>
                            <div className="row">
                                <div className="col-6">
                                    <ul className="list-unstyled d-flex flex-column gap-3 text-white-50">
                                        <li><Link to="/login" className="text-white-50 text-decoration-none hover-white">Patient Portal</Link></li>
                                        <li><Link to="/login" className="text-white-50 text-decoration-none hover-white">Doctor Login</Link></li>
                                        <li><Link to="/login" className="text-white-50 text-decoration-none hover-white">Staff Terminal</Link></li>
                                    </ul>
                                </div>
                                <div className="col-6">
                                    <ul className="list-unstyled d-flex flex-column gap-3 text-white-50">
                                        <li>Cardiology</li>
                                        <li>Neurology</li>
                                        <li>Emergency</li>
                                    </ul>
                                </div>
                            </div>
                        </Col>
                        <Col sm={6} lg={4}>
                            <h5 className="fw-bold mb-4">Contact Terminal</h5>
                            <p className="text-white-50 mb-4 fw-medium">123 Clinical Plaza, Medical Square<br/>New York, NY 10001</p>
                            <h4 className="fw-bold">1-800-HMS-PRO</h4>
                        </Col>
                    </Row>
                    <div className="border-top border-white border-opacity-10 mt-5 pt-4 text-center text-white-50 small">
                        &copy; 2026 HMSPro Systems. Digital Health Infrastructure by Khushavnt-Cognitiona.
                    </div>
                </Container>
            </footer>
        </main>
    </div>
  );
};

export default LandingPage;
