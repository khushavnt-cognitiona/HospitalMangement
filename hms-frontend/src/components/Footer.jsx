import React from 'react';
import { Container, Row, Col, Form, Button } from 'react-bootstrap';
import { FaHospital, FaPhoneAlt, FaEnvelope, FaMapMarkerAlt, FaFacebookF, FaTwitter, FaLinkedinIn, FaInstagram, FaArrowRight } from 'react-icons/fa';
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer style={{ backgroundColor: '#0d1b2a', color: '#e0e1dd' }} className="pt-5 pb-3 font-sans w-100">
      <Container fluid className="px-lg-5">
        <Row className="gy-4 mb-5">
          <Col lg={4} md={6}>
            <div className="d-flex align-items-center mb-4">
              <div className="bg-primary rounded p-2 me-3 d-flex align-items-center justify-content-center">
                <FaHospital size={28} color="white" />
              </div>
              <h3 className="mb-0 fw-bold text-white">
                Hospital<span className="text-warning">Manager</span>
              </h3>
            </div>
            <p className="opacity-75 mb-4 pe-lg-4" style={{ lineHeight: '1.7' }}>
              Providing compassionate care and advanced medical technology. Your health is our priority, and we're committed to delivering the best healthcare experience for you and your family.
            </p>
            <div className="d-flex gap-3">
              <a href="#" className="text-white bg-primary bg-opacity-25 rounded-circle d-flex align-items-center justify-content-center transition-all hover-bounce" style={{ width: '40px', height: '40px', transition: 'all 0.3s' }}>
                <FaFacebookF />
              </a>
              <a href="#" className="text-white bg-primary bg-opacity-25 rounded-circle d-flex align-items-center justify-content-center transition-all hover-bounce" style={{ width: '40px', height: '40px', transition: 'all 0.3s' }}>
                <FaTwitter />
              </a>
              <a href="#" className="text-white bg-primary bg-opacity-25 rounded-circle d-flex align-items-center justify-content-center transition-all hover-bounce" style={{ width: '40px', height: '40px', transition: 'all 0.3s' }}>
                <FaLinkedinIn />
              </a>
              <a href="#" className="text-white bg-primary bg-opacity-25 rounded-circle d-flex align-items-center justify-content-center transition-all hover-bounce" style={{ width: '40px', height: '40px', transition: 'all 0.3s' }}>
                <FaInstagram />
              </a>
            </div>
          </Col>

          <Col lg={2} md={6}>
            <h5 className="text-white fw-bold mb-4 position-relative pb-2" style={{ width: 'fit-content' }}>
              Quick Links
              <span className="position-absolute bottom-0 start-0 w-50 border-bottom border-warning border-2"></span>
            </h5>
            <ul className="list-unstyled d-flex flex-column gap-3">
              <li><Link to="/" className="text-decoration-none text-light opacity-75 d-inline-flex align-items-center"><FaArrowRight size={12} className="me-2 text-primary" /> Home</Link></li>
              <li><Link to="/about" className="text-decoration-none text-light opacity-75 d-inline-flex align-items-center"><FaArrowRight size={12} className="me-2 text-primary" /> About Us</Link></li>
              <li><Link to="/doctor" className="text-decoration-none text-light opacity-75 d-inline-flex align-items-center"><FaArrowRight size={12} className="me-2 text-primary" /> Find a Doctor</Link></li>
              <li><Link to="/services" className="text-decoration-none text-light opacity-75 d-inline-flex align-items-center"><FaArrowRight size={12} className="me-2 text-primary" /> Services</Link></li>
              <li><Link to="/contact" className="text-decoration-none text-light opacity-75 d-inline-flex align-items-center"><FaArrowRight size={12} className="me-2 text-primary" /> Contact Us</Link></li>
            </ul>
          </Col>

          <Col lg={3} md={6}>
            <h5 className="text-white fw-bold mb-4 position-relative pb-2" style={{ width: 'fit-content' }}>
              Contact Info
              <span className="position-absolute bottom-0 start-0 w-50 border-bottom border-warning border-2"></span>
            </h5>
            <div className="d-flex flex-column gap-3 opacity-75">
              <div className="d-flex align-items-start">
                <FaMapMarkerAlt className="text-primary mt-1 me-3 flex-shrink-0" size={18} />
                <span>123 Medical Center Blvd,<br/>Health City, HC 10020</span>
              </div>
              <div className="d-flex align-items-center">
                <FaPhoneAlt className="text-primary me-3 flex-shrink-0" size={18} />
                <span>+1 (800) 123-4567</span>
              </div>
              <div className="d-flex align-items-center">
                <FaEnvelope className="text-primary me-3 flex-shrink-0" size={18} />
                <span>contact@hospitalmanager.com</span>
              </div>
            </div>
          </Col>

          <Col lg={3} md={6}>
            <h5 className="text-white fw-bold mb-4 position-relative pb-2" style={{ width: 'fit-content' }}>
              Newsletter
              <span className="position-absolute bottom-0 start-0 w-50 border-bottom border-warning border-2"></span>
            </h5>
            <p className="opacity-75 mb-4">
              Subscribe to our newsletter for the latest health tips and medical news.
            </p>
            <Form className="d-flex">
              <Form.Control 
                type="email" 
                placeholder="Email address" 
                className="rounded-end-0 border-0 bg-secondary bg-opacity-25 text-white shadow-none ps-3" 
              />
              <Button variant="primary" className="rounded-start-0 px-3 fw-bold">
                Subscribe
              </Button>
            </Form>
          </Col>
        </Row>

        <div className="border-top border-secondary border-opacity-25 pt-4 d-flex flex-column flex-md-row justify-content-between align-items-center">
          <p className="mb-0 opacity-75 small">
            &copy; {new Date().getFullYear()} Hospital Manager. All Rights Reserved.
          </p>
          <div className="mt-2 mt-md-0 opacity-75 small">
            <Link to="/privacy" className="text-light text-decoration-none me-3">Privacy Policy</Link>
            <Link to="/terms" className="text-light text-decoration-none">Terms of Service</Link>
          </div>
        </div>
      </Container>
      
      <style>{`
        .hover-bounce:hover {
          background-color: var(--bs-primary) !important;
          transform: translateY(-3px);
        }
        .transition-all {
          transition: all 0.3s ease;
        }
      `}</style>
    </footer>
  );
};

export default Footer;
