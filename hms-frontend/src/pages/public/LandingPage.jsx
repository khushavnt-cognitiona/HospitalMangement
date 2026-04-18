import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Carousel, Container, Row, Col, Card, Accordion, Navbar, Nav } from "react-bootstrap";
import { FaUserMd, FaHeartbeat, FaStethoscope, FaHospitalAlt, FaAmbulance, FaClock, FaUserPlus, FaSearchPlus, FaCalendarCheck, FaSmileBeam, FaBrain, FaTooth, FaBone, FaLungs, FaQuoteLeft, FaStar, FaAward, FaShieldAlt, FaHome } from "react-icons/fa";
import axiosInstance from "../../api/axiosInstance";

// Local Asset Imports
// Local Asset Imports (Uncomment after running the download script)
// import heroBg1 from "../../assets/images/hero-bg-1.jpg";
// import heroBg2 from "../../assets/images/hero-bg-2.jpg";
// import departmentBg from "../../assets/images/department-bg.jpg";
// import testimonial1 from "../../assets/images/testimonial-1.jpg";
// import testimonial2 from "../../assets/images/testimonial-2.jpg";
// import testimonial3 from "../../assets/images/testimonial-3.jpg";
// import defaultDoctor from "../../assets/images/default-doctor.jpg";

// Temporary External Fallbacks
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

  const fallbackImages = [
    defaultDoctor,
    defaultDoctor,
    defaultDoctor,
    defaultDoctor
  ];
  return (
    <>
      {/* Main content follows the global Navbar provided by Layout */}

      <main style={{ overflowX: "hidden" }}>
        {/* HERO CAROUSEL */}
        <Carousel fade nextLabel="" prevLabel="" indicators={true} className="shadow-lg w-100">
          <Carousel.Item style={{ height: "85vh", position: "relative", backgroundColor:"#000" }}>
            <div className="position-absolute top-0 start-0 w-100 h-100 bg-dark opacity-50" style={{ zIndex: 1 }}></div>
            <img
              className="d-block w-100 h-100 object-fit-cover"
              src={heroBg1}
              alt="First slide"
              style={{ objectPosition: 'center 25%' }}
            />
            <Carousel.Caption className="d-flex flex-column justify-content-center align-items-start text-start position-absolute w-100 h-100 start-0 top-0 bottom-0" style={{ zIndex: 2, padding: "0 10%" }}>
              <div className="animate-fade-in-up" style={{ maxWidth: '800px' }}>
                <span className="badge bg-primary px-3 py-2 rounded-pill mb-4 fw-bold fs-6 tracking-widest shadow-sm">ADVANCED CARE</span>
                <h1 className="fw-black text-white mb-4 display-3" style={{ textShadow: '2px 4px 8px rgba(0,0,0,0.6)', lineHeight: '1.2' }}>
                  Your Health, <br/><span className="text-primary">Our Uncompromising Priority.</span>
                </h1>
                <p className="fs-5 text-light mb-5 fw-medium opacity-75" style={{ textShadow: '1px 2px 4px rgba(0,0,0,0.5)', maxWidth: '650px' }}>
                  Experience world-class healthcare from the comfort of our state-of-the-art facilities. Book appointments, manage records, and track billing seamlessly.
                </p>
                <div className="d-flex gap-4">
                  <Link to="/register" className="btn btn-primary btn-lg rounded-pill px-5 py-3 fw-bold hover-lift shadow">
                    Create Profile
                  </Link>
                  <Link to="/login" className="btn btn-outline-light border-2 btn-lg rounded-pill px-5 py-3 fw-bold hover-lift shadow-sm bg-dark bg-opacity-25">
                    Patient Portal
                  </Link>
                </div>
              </div>
            </Carousel.Caption>
          </Carousel.Item>
          
          <Carousel.Item style={{ height: "85vh", position: "relative", backgroundColor:"#0f172a" }}>
            <div className="position-absolute top-0 start-0 w-100 h-100 bg-dark opacity-50" style={{ zIndex: 1 }}></div>
            <img
              className="d-block w-100 h-100 object-fit-cover"
              src={heroBg2}
              alt="Second slide"
              style={{ objectPosition: 'center center' }}
            />
            <Carousel.Caption className="d-flex flex-column justify-content-center align-items-start text-start position-absolute w-100 h-100 start-0 top-0 bottom-0" style={{ zIndex: 2, padding: "0 10%" }}>
              <div className="animate-fade-in-up" style={{ maxWidth: '800px' }}>
                <span className="badge bg-danger px-3 py-2 rounded-pill mb-4 fw-bold fs-6 tracking-widest shadow-sm">24/7 EMERGENCY</span>
                <h1 className="fw-black text-white mb-4 display-3" style={{ textShadow: '2px 4px 8px rgba(0,0,0,0.6)', lineHeight: '1.2' }}>
                  Always Ready <br/><span className="text-danger">When You Need Us.</span>
                </h1>
                <p className="fs-5 text-light mb-5 fw-medium opacity-75" style={{ textShadow: '1px 2px 4px rgba(0,0,0,0.5)', maxWidth: '650px' }}>
                  Our emergency response units and specialized intensive care wards are operational round the clock with modern life-saving technologies.
                </p>
                <Link to="/register" className="btn btn-danger btn-lg rounded-pill px-5 py-3 fw-bold hover-lift shadow">
                  Join Our Network
                </Link>
              </div>
            </Carousel.Caption>
          </Carousel.Item>
        </Carousel>

        {/* TRUST BADGES BAR */}
        <div className="bg-primary text-white py-3 shadow-sm position-relative z-index-10">
          <Container>
            <Row className="text-center fw-bold small text-uppercase tracking-widest align-items-center">
              <Col md={4} className="mb-2 mb-md-0"><FaAward size={20} className="me-2 text-warning" /> ISO 9001 Certified</Col>
              <Col md={4} className="mb-2 mb-md-0 border-start border-end border-white-50"><FaShieldAlt size={20} className="me-2 text-warning" /> 100% Secure Data</Col>
              <Col md={4}><FaAmbulance size={20} className="me-2 text-warning" /> 15 Minute Response Time</Col>
            </Row>
          </Container>
        </div>

        {/* CORE FEATURES */}
        <section className="py-5 my-3 bg-light">
          <Container>
            <Row className="g-4 justify-content-center">
              <Col lg={4} md={6} className="hover-lift">
                <Card className="border-0 shadow-sm rounded-4 h-100 bg-white p-2">
                  <Card.Body className="p-4 text-center d-flex flex-column justify-content-center">
                    <div className="bg-primary bg-opacity-10 rounded-circle d-inline-flex align-items-center justify-content-center mb-4 mx-auto text-primary" style={{ width: '80px', height: '80px' }}>
                      <FaUserMd size={35} />
                    </div>
                    <h4 className="fw-bold mb-3 text-dark">Top Specialists</h4>
                    <p className="text-secondary fw-medium px-2">Access a world-class network of clinical professionals dedicated to your recovery.</p>
                  </Card.Body>
                </Card>
              </Col>
              <Col lg={4} md={6} className="hover-lift">
                <Card className="border-0 shadow-lg rounded-4 h-100 p-2" style={{ background: "linear-gradient(135deg, #0d6efd 0%, #0043a8 100%)", color: "white" }}>
                  <Card.Body className="p-4 text-center d-flex flex-column justify-content-center">
                    <div className="bg-white bg-opacity-25 rounded-circle d-inline-flex align-items-center justify-content-center mb-4 mx-auto text-white" style={{ width: '80px', height: '80px', backdropFilter: "blur(5px)" }}>
                      <FaClock size={35} />
                    </div>
                    <h4 className="fw-bold mb-3">Instant Booking</h4>
                    <p className="text-white-50 fw-medium px-2">Skip the waiting room. Schedule and manage your appointments securely from our unified portal.</p>
                  </Card.Body>
                </Card>
              </Col>
              <Col lg={4} md={6} className="hover-lift">
                <Card className="border-0 shadow-sm rounded-4 h-100 bg-white p-2">
                  <Card.Body className="p-4 text-center d-flex flex-column justify-content-center">
                    <div className="bg-danger bg-opacity-10 rounded-circle d-inline-flex align-items-center justify-content-center mb-4 mx-auto text-danger" style={{ width: '80px', height: '80px' }}>
                      <FaAmbulance size={35} />
                    </div>
                    <h4 className="fw-bold mb-3 text-dark">Emergency Care</h4>
                    <p className="text-secondary fw-medium px-2">Swift medical response and digitized electronics health records at the push of a button.</p>
                  </Card.Body>
                </Card>
              </Col>
            </Row>
          </Container>
        </section>

        {/* HOW IT WORKS SECTION */}
        <section className="py-5 bg-white position-relative">
          <div className="position-absolute top-0 end-0 bg-primary opacity-10" style={{ width: "300px", height: "300px", borderRadius: "0 0 0 100%", zIndex: 0 }}></div>
          <Container className="py-5 position-relative z-index-1">
            <div className="text-center mb-5 pb-4">
              <span className="badge bg-primary bg-opacity-10 text-primary px-3 py-2 rounded-pill mb-3 fw-bolder tracking-widest letter-spacing-2">PATIENT JOURNEY</span>
              <h2 className="fw-black text-dark display-5 mb-3">How It Works in 4 Steps</h2>
              <div className="mx-auto rounded" style={{ height: "4px", width: "60px", background: "linear-gradient(90deg, #0d6efd, #0dcaf0)" }}></div>
              <p className="text-muted fw-medium mt-4 mx-auto" style={{ maxWidth: "600px" }}>
                We've simplified the healthcare experience. From registration to recovery, our unified platform guides you every step of the way.
              </p>
            </div>
            
            <Row className="g-4">
              <Col lg={3} md={6}>
                <div className="p-4 bg-white rounded-4 shadow hover-lift border-0 h-100 position-relative overflow-hidden text-start transition-all" style={{ borderTop: "4px solid #0d6efd" }}>
                  <div className="position-absolute fw-black text-primary opacity-10 user-select-none" style={{ right: "-10px", bottom: "-30px", fontSize: "8rem", lineHeight: "1" }}>1</div>
                  <div className="d-inline-flex align-items-center justify-content-center bg-primary bg-gradient text-white rounded-4 mb-4 shadow-sm" style={{ width: "65px", height: "65px" }}>
                    <FaUserPlus size={30} />
                  </div>
                  <h4 className="fw-bold text-dark mb-3 position-relative z-index-1">Register</h4>
                  <p className="text-secondary fw-medium lh-lg position-relative z-index-1">Create your secure medical profile instantly. Your data is encrypted and immediately available across our entire network.</p>
                </div>
              </Col>
              <Col lg={3} md={6} style={{ marginTop: window.innerWidth > 991 ? "30px" : "0" }}>
                <div className="p-4 bg-white rounded-4 shadow hover-lift border-0 h-100 position-relative overflow-hidden text-start transition-all" style={{ borderTop: "4px solid #0dcaf0" }}>
                  <div className="position-absolute fw-black text-info opacity-10 user-select-none" style={{ right: "-10px", bottom: "-30px", fontSize: "8rem", lineHeight: "1" }}>2</div>
                  <div className="d-inline-flex align-items-center justify-content-center bg-info bg-gradient text-white rounded-4 mb-4 shadow-sm" style={{ width: "65px", height: "65px" }}>
                    <FaSearchPlus size={30} />
                  </div>
                  <h4 className="fw-bold text-dark mb-3 position-relative z-index-1">Find Doctor</h4>
                  <p className="text-secondary fw-medium lh-lg position-relative z-index-1">Search from our vast network of verified clinical experts by specialty, experience, and patient ratings.</p>
                </div>
              </Col>
              <Col lg={3} md={6}>
                <div className="p-4 bg-white rounded-4 shadow hover-lift border-0 h-100 position-relative overflow-hidden text-start transition-all" style={{ borderTop: "4px solid #ffc107" }}>
                  <div className="position-absolute fw-black text-warning opacity-10 user-select-none" style={{ right: "-10px", bottom: "-30px", fontSize: "8rem", lineHeight: "1" }}>3</div>
                  <div className="d-inline-flex align-items-center justify-content-center bg-warning bg-gradient text-white rounded-4 mb-4 shadow-sm" style={{ width: "65px", height: "65px" }}>
                    <FaCalendarCheck size={30} />
                  </div>
                  <h4 className="fw-bold text-dark mb-3 position-relative z-index-1">Book Visit</h4>
                  <p className="text-secondary fw-medium lh-lg position-relative z-index-1">Select an available time slot that fits your schedule. Receive instant confirmations and automated reminders.</p>
                </div>
              </Col>
              <Col lg={3} md={6} style={{ marginTop: window.innerWidth > 991 ? "30px" : "0" }}>
                <div className="p-4 bg-white rounded-4 shadow hover-lift border-0 h-100 position-relative overflow-hidden text-start transition-all" style={{ borderTop: "4px solid #198754" }}>
                  <div className="position-absolute fw-black text-success opacity-10 user-select-none" style={{ right: "-10px", bottom: "-30px", fontSize: "8rem", lineHeight: "1" }}>4</div>
                  <div className="d-inline-flex align-items-center justify-content-center bg-success bg-gradient text-white rounded-4 mb-4 shadow-sm" style={{ width: "65px", height: "65px" }}>
                    <FaSmileBeam size={30} />
                  </div>
                  <h4 className="fw-bold text-dark mb-3 position-relative z-index-1">Get Treated</h4>
                  <p className="text-secondary fw-medium lh-lg position-relative z-index-1">Receive world-class care. Your digital prescriptions and test results are instantly synced to your portal.</p>
                </div>
              </Col>
            </Row>
          </Container>
        </section>

        {/* DEPARTMENTS SECTION */}
        <section className="py-5 bg-dark text-white position-relative">
            {/* Cinematic Background Image */}
            <div className="position-absolute top-0 start-0 w-100 h-100 opacity-25" style={{ backgroundImage: `url(${departmentBg})`, backgroundSize: 'cover', backgroundAttachment: 'fixed', backgroundPosition: 'center' }}></div>
            <div className="position-absolute top-0 start-0 w-100 h-100 bg-dark opacity-75"></div>
            
            <Container className="position-relative z-index-1 py-4">
                <div className="text-center mb-5 pb-3">
                    <h6 className="text-warning fw-bolder text-uppercase tracking-widest mb-2 letter-spacing-2">Excellence in Healthcare</h6>
                    <h2 className="fw-black display-5 mb-3 text-white">Our Departments</h2>
                    <div className="mx-auto rounded" style={{ height: "4px", width: "60px", background: "linear-gradient(90deg, #ffc107, #fd7e14)" }}></div>
                </div>
                <Row className="g-4 text-center">
                    {[
                        { title: "Cardiology", icon: <FaHeartbeat size={40}/>, desc: "State-of-the-art heart care and surgery." },
                        { title: "Neurology", icon: <FaBrain size={40}/>, desc: "Advanced neurovascular treatments." },
                        { title: "Orthopedics", icon: <FaBone size={40}/>, desc: "Skeletal repair and rehabilitation." },
                        { title: "Pulmonology", icon: <FaLungs size={40}/>, desc: "Dedicated respiratory disorder care." },
                        { title: "Dental Care", icon: <FaTooth size={40}/>, desc: "Comprehensive cosmetic and oral health." },
                        { title: "General Surgery", icon: <FaStethoscope size={40}/>, desc: "Minimally invasive and standard surgeries." }
                    ].map((dept, idx) => (
                        <Col lg={4} md={6} key={idx}>
                            <Card className="bg-transparent border border-secondary border-opacity-50 hover-lift rounded-4 h-100 transition-all overflow-hidden text-white" style={{ cursor: 'pointer', backdropFilter: 'blur(10px)' }}>
                                <div className="position-absolute w-100 h-100 bg-white opacity-0 hover-opacity-10 transition-all top-0 start-0"></div>
                                <Card.Body className="p-4 py-5 d-flex flex-column align-items-center position-relative">
                                    <div className="d-inline-flex align-items-center justify-content-center text-warning mb-4" style={{ filter: "drop-shadow(0px 0px 8px rgba(255,193,7,0.5))" }}>
                                        {dept.icon}
                                    </div>
                                    <h4 className="fw-bold mb-3">{dept.title}</h4>
                                    <p className="text-white-50 mb-0 fw-medium">{dept.desc}</p>
                                </Card.Body>
                            </Card>
                        </Col>
                    ))}
                </Row>
            </Container>
        </section>

        {/* DOCTOR PROFILES SECTION */}
        <section className="py-5 my-5 bg-light">
          <Container className="pt-4">
            <div className="text-center mb-5 pb-3">
              <h6 className="text-primary fw-bolder text-uppercase tracking-widest mb-2 letter-spacing-2">Our Clinical Experts</h6>
              <h2 className="fw-black text-dark display-5 mb-3">Meet Our Specialists</h2>
              <div className="mx-auto rounded" style={{ height: "4px", width: "60px", background: "linear-gradient(90deg, #0d6efd, #0dcaf0)" }}></div>
            </div>
            
            <Row className="g-4">
              {doctors.length > 0 ? (
                doctors.map((doc, idx) => (
                  <Col lg={3} md={6} key={doc.id || idx}>
                    <Card className="border-0 shadow-sm rounded-4 overflow-hidden align-items-center h-100 bg-white shadow-hover transition-all" style={{ position: "relative" }}>
                      <div className="w-100 overflow-hidden" style={{ height: "260px" }}>
                         <img 
                           src={doc.profileImageUrl || `https://ui-avatars.com/api/?name=${encodeURIComponent(doc.user?.name || doc.user?.username || "Dr")}&background=random&color=fff&size=512`} 
                           className="w-100 h-100 object-fit-cover transition-all hover-zoom" 
                           style={{ objectPosition: "center center" }} 
                           alt={doc.user?.name || doc.user?.username || "Doctor"} 
                         />
                      </div>
                      <Card.Body className="text-center p-4 bg-white position-relative shadow-sm rounded-4" style={{ marginTop: "-40px", width: "90%", zIndex: 5 }}>
                        <h5 className="fw-bold mb-1 text-dark">{doc.user?.name || doc.user?.username || "Dr. Anonymous"}</h5>
                        <p className="fw-black small mb-3 letter-spacing-1 bg-primary bg-opacity-10 text-primary d-inline-block px-2 py-1 rounded">{(doc.specialization || "HOSPITALIST").toUpperCase()}</p>
                        <p className="text-muted small fw-medium mb-0">{doc.profile || doc.qualification || "Highly experienced clinical professional."}</p>
                      </Card.Body>
                    </Card>
                  </Col>
                ))
              ) : (
                <Col className="text-center">
                  <p className="text-muted fw-bold">Loading specialist directory...</p>
                </Col>
              )}
            </Row>
          </Container>
        </section>

        {/* TESTIMONIALS SECTION */}
        <section className="py-5 bg-white position-relative">
            <div className="position-absolute top-50 start-0 translate-middle-y bg-info opacity-10 rounded-circle" style={{ width: "400px", height: "400px", filter: "blur(50px)" }}></div>
            <Container className="py-4 position-relative z-index-1">
                <div className="text-center mb-5 pb-3">
                    <h6 className="text-primary fw-bolder text-uppercase tracking-widest mb-2 letter-spacing-2">Testimonials</h6>
                    <h2 className="fw-black text-dark display-5 mb-3">Patient Success Stories</h2>
                    <div className="mx-auto rounded" style={{ height: "4px", width: "60px", background: "linear-gradient(90deg, #0d6efd, #0dcaf0)" }}></div>
                </div>
                <Row className="g-4">
                    {[
                        { 
                          name: "John Doe", 
                          text: "The emergency care I received was rapid and professional. The new unified portal made tracking my reports so incredibly simple.", 
                          role: "Patient",
                          pic: testimonial1
                        },
                        { 
                          name: "Maria Garcia", 
                          text: "Dr. Jenkins was phenomenal. Booking an appointment was seamless, and the entire hospital experience felt incredibly premium.", 
                          role: "Patient",
                          pic: testimonial2
                        },
                        { 
                          name: "David Smith", 
                          text: "From registration to my surgery, the transparency in billing and access to electronic records put my mind at ease completely.", 
                          role: "Post-Op Patient",
                          pic: testimonial3
                        }
                    ].map((review, i) => (
                        <Col lg={4} md={6} key={i}>
                            <Card className="border-0 shadow-lg p-5 rounded-4 h-100 bg-white hover-lift position-relative overflow-hidden" style={{ transition: "all 0.3s ease" }}>
                                <FaQuoteLeft size={100} className="position-absolute text-primary" style={{ top: "-20px", right: "-10px", opacity: "0.05" }} />
                                <Card.Body className="position-relative z-index-1 p-0 d-flex flex-column">
                                    <div className="d-flex align-items-center mb-4 pb-3 border-bottom border-light">
                                        <div className="rounded-circle overflow-hidden shadow-sm border border-3 border-white me-3" style={{ width: "65px", height: "65px", flexShrink: 0 }}>
                                            <img src={review.pic} alt={review.name} className="w-100 h-100 object-fit-cover" />
                                        </div>
                                        <div>
                                            <h5 className="fw-bold mb-0 text-dark">{review.name}</h5>
                                            <div className="text-warning small d-flex gap-1 mt-1">
                                                <FaStar/><FaStar/><FaStar/><FaStar/><FaStar/>
                                            </div>
                                        </div>
                                    </div>
                                    <p className="fw-medium text-secondary mb-0 fs-5 font-italic lh-lg flex-grow-1">"{review.text}"</p>
                                    <div className="mt-4 pt-3 text-uppercase tracking-widest text-primary fw-bold" style={{ fontSize: "0.75rem" }}>
                                        {review.role}
                                    </div>
                                </Card.Body>
                            </Card>
                        </Col>
                    ))}
                </Row>
            </Container>
        </section>

        {/* STATS BANNER */}
        <section className="py-5 bg-dark text-white shadow-lg overflow-hidden position-relative">
            <div className="position-absolute w-100 h-100 top-0 start-0 bg-primary opacity-10"></div>
            <Container className="py-5 position-relative z-index-1">
                <Row className="text-center g-4">
                    <Col md={3}>
                        <h1 className="display-4 fw-black text-warning mb-2" style={{ textShadow: "0px 2px 10px rgba(255,193,7,0.3)" }}>25+</h1>
                        <h6 className="fw-bold text-uppercase tracking-widest text-white-50">Years of Experience</h6>
                    </Col>
                    <Col md={3}>
                        <h1 className="display-4 fw-black text-warning mb-2" style={{ textShadow: "0px 2px 10px rgba(255,193,7,0.3)" }}>80+</h1>
                        <h6 className="fw-bold text-uppercase tracking-widest text-white-50">Specialist Doctors</h6>
                    </Col>
                    <Col md={3}>
                        <h1 className="display-4 fw-black text-warning mb-2" style={{ textShadow: "0px 2px 10px rgba(255,193,7,0.3)" }}>15k+</h1>
                        <h6 className="fw-bold text-uppercase tracking-widest text-white-50">Happy Patients</h6>
                    </Col>
                    <Col md={3}>
                        <h1 className="display-4 fw-black text-warning mb-2" style={{ textShadow: "0px 2px 10px rgba(255,193,7,0.3)" }}>200+</h1>
                        <h6 className="fw-bold text-uppercase tracking-widest text-white-50">Available Rooms</h6>
                    </Col>
                </Row>
            </Container>
        </section>

        {/* FAQ SECTION */}
        <section className="py-5 my-5">
            <Container>
                <Row className="justify-content-center">
                    <Col lg={8}>
                        <div className="text-center mb-5">
                            <h6 className="text-primary fw-bolder text-uppercase tracking-widest mb-2 letter-spacing-2">Answers</h6>
                            <h2 className="fw-black text-dark display-5 mb-3">Frequently Asked Questions</h2>
                            <div className="mx-auto rounded" style={{ height: "4px", width: "60px", background: "linear-gradient(90deg, #0d6efd, #0dcaf0)" }}></div>
                        </div>
                        <Accordion defaultActiveKey="0" className="shadow-sm rounded-4 overflow-hidden border-0">
                            <Accordion.Item eventKey="0" className="border-bottom">
                                <Accordion.Header><span className="fw-bold px-2 py-1">How can I book an appointment?</span></Accordion.Header>
                                <Accordion.Body className="text-secondary fw-medium lh-lg">
                                    You can instantly book an appointment by creating a Free Medical Profile online. Once logged in to the Patient Dashboard, navigate to 'Book Appointment', select your desired doctor and time slot, and confirm.
                                </Accordion.Body>
                            </Accordion.Item>
                            <Accordion.Item eventKey="1" className="border-bottom">
                                <Accordion.Header><span className="fw-bold px-2 py-1">Are my medical records secure?</span></Accordion.Header>
                                <Accordion.Body className="text-secondary fw-medium lh-lg">
                                    Absolutely. Our system uses enterprise-grade JWT encryption and strict Role-Based Access Controls. Only you and your authorized treating doctors can view your Electronic Health Records (EHR).
                                </Accordion.Body>
                            </Accordion.Item>
                            <Accordion.Item eventKey="2" className="border-bottom">
                                <Accordion.Header><span className="fw-bold px-2 py-1">Do you have an emergency ward?</span></Accordion.Header>
                                <Accordion.Body className="text-secondary fw-medium lh-lg">
                                    Yes, our Intensive Care and Emergency Response units are operational 24/7. In the event of a critical emergency, please proceed directly to the triage center or call our toll-free ambulance hotline immediately.
                                </Accordion.Body>
                            </Accordion.Item>
                        </Accordion>
                    </Col>
                </Row>
            </Container>
        </section>

        {/* CTA Section */}
        <section className="py-5 my-5">
            <Container>
                <div className="rounded-5 p-5 text-center text-white shadow-lg position-relative overflow-hidden" style={{ background: "linear-gradient(135deg, #0a58ca 0%, #0dcaf0 100%)" }}>
                    <FaStethoscope size={250} className="position-absolute text-white opacity-25" style={{ top: "-50px", right: "-30px", transform: "rotate(-15deg)" }} />
                    <div className="position-relative" style={{ zIndex: 10 }}>
                        <h2 className="fw-black display-5 mb-4 px-3" style={{ textShadow: "0px 2px 5px rgba(0,0,0,0.2)" }}>Ready to Prioritize Your Health?</h2>
                        <p className="fs-5 fw-medium mb-5 px-md-5 mx-md-5 text-white-50">Join our unified platform to effortlessly manage your appointments, view test results, and securely communicate with doctors.</p>
                        <Link to="/register" className="btn btn-light text-primary btn-lg rounded-pill px-5 py-3 fw-bolder shadow-lg hover-lift fs-5">
                            Create Free Medical Record
                        </Link>
                    </div>
                </div>
            </Container>
        </section>

        {/* FOOTER */}
        <footer className="bg-dark text-light py-5">
          <Container className="pt-2">
            <Row className="g-5">
              <Col lg={4}>
                <h4 className="fw-bolder text-white mb-4 d-flex align-items-center gap-2">
                    <FaHospitalAlt className="text-danger" /> HMS Portal
                </h4>
                <p className="text-white-50 mb-4 pe-md-5 fw-medium lh-lg">A comprehensive digital health ecosystem integrating patient records, billing workflows, wards, and real-time appointment management.</p>
              </Col>
              <Col lg={2}>
                <h5 className="text-white fw-bold mb-4">Quick Links</h5>
                <ul className="list-unstyled d-flex flex-column gap-3 text-white-50 fw-medium">
                  <li><Link to="/" className="text-white-50 text-decoration-none transition-all">Home</Link></li>
                  <li><Link to="/login" className="text-white-50 text-decoration-none">Patient Login</Link></li>
                  <li><Link to="/login" className="text-white-50 text-decoration-none">Doctor Login</Link></li>
                </ul>
              </Col>
              <Col lg={3}>
                <h5 className="text-white fw-bold mb-4">Departments</h5>
                <ul className="list-unstyled d-flex flex-column gap-3 text-white-50 fw-medium">
                  <li>Cardiology</li>
                  <li>Neurology</li>
                  <li>Orthopedics</li>
                  <li>Pediatrics</li>
                </ul>
              </Col>
              <Col lg={3}>
                <h5 className="text-white fw-bold mb-4">Contact Us</h5>
                <div className="text-white-50 d-flex flex-column gap-3 fw-medium">
                  <p className="mb-0"><strong>Phone:</strong> <br/>+1 (800) 123-4567</p>
                  <p className="mb-0"><strong>Email:</strong> <br/>support@hmsportal.com</p>
                  <p className="mb-0"><strong>Location:</strong> <br/>123 Health Ave, New York</p>
                </div>
              </Col>
            </Row>
            <hr className="border-secondary mb-4 mt-5 opacity-25" />
            <div className="text-center text-white-50 fw-medium">
                <small>&copy; {new Date().getFullYear()} HMS Monolith System. All rights reserved.</small>
            </div>
          </Container>
        </footer>
      </main>
    </>
  );
};

export default LandingPage;
