import React from 'react';
import { Container, Row, Col, Form, Button } from 'react-bootstrap';
import { FaPaperPlane } from 'react-icons/fa';

const Newsletter = () => {
    return (
        <section className="py-5 bg-primary text-white position-relative overflow-hidden">
            {/* Background design elements */}
            <div className="z-0" style={{ position: 'absolute', top: '-50%', right: '-10%', width: '40%', height: '200%', background: 'rgba(255,255,255,0.05)', transform: 'rotate(-30deg)', pointerEvents: 'none' }}></div>
            <div className="z-0" style={{ position: 'absolute', bottom: '-20%', left: '5%', width: '150px', height: '150px', borderRadius: '50%', background: 'rgba(255,255,255,0.1)', pointerEvents: 'none' }}></div>
            
            <Container className="position-relative z-1 py-4">
                <Row className="align-items-center justify-content-center text-center text-md-start">
                    <Col md={6} lg={5} className="mb-4 mb-md-0">
                        <h3 className="fw-bold mb-3 d-flex align-items-center justify-content-center justify-content-md-start">
                            <FaPaperPlane className="me-3 text-warning" /> Stay Updated!
                        </h3>
                        <p className="opacity-75 mb-0" style={{ fontSize: '1.1rem' }}>
                            Subscribe to our newsletter for the latest medical news, health tips, and exclusive offers on consultations.
                        </p>
                    </Col>
                    
                    <Col md={6} lg={5} className="offset-lg-1">
                        <Form className="d-flex flex-column flex-sm-row gap-2 shadow-sm rounded-pill p-2 bg-white" onSubmit={(e) => e.preventDefault()}>
                            <Form.Control 
                                type="email" 
                                placeholder="Enter your email address..." 
                                className="border-0 shadow-none px-4 rounded-pill flex-grow-1"
                                style={{ height: '50px' }}
                                required
                            />
                            <Button variant="warning" type="submit" className="rounded-pill fw-bold px-4 text-dark" style={{ height: '50px' }}>
                                Subscribe
                            </Button>
                        </Form>
                        <p className="text-white mt-2 mb-0 opacity-50 small text-center text-md-start px-3">
                            We respect your privacy. No spam, ever.
                        </p>
                    </Col>
                </Row>
            </Container>
        </section>
    );
};

export default Newsletter;
