import React from 'react';
import { Container, Row, Col, Accordion } from 'react-bootstrap';

const FAQSection = () => {
    return (
        <section className="py-5" style={{ backgroundColor: '#f8f9fa' }}>
            <Container>
                <Row className="align-items-center">
                    <Col lg={5} className="mb-5 mb-lg-0">
                        <h6 className="text-primary fw-bold text-uppercase" style={{ letterSpacing: '1px' }}>FAQ</h6>
                        <h2 className="display-6 fw-bold text-dark mb-4">Common Questions</h2>
                        <p className="text-muted lead mb-4">
                            Have questions about booking a doctor or our services? Find quick answers here.
                        </p>
                        <div style={{ width: '80px', height: '4px', backgroundColor: '#0d6efd', borderRadius: '2px' }}></div>
                    </Col>

                    <Col lg={7}>
                        <Accordion defaultActiveKey="0" className="shadow-sm rounded custom-accordion">
                            <Accordion.Item eventKey="0" className="border-0 mb-3 rounded overflow-hidden shadow-sm">
                                <Accordion.Header className="fw-bold p-2">How do I book a consultation?</Accordion.Header>
                                <Accordion.Body className="text-muted px-4 py-3 bg-white">
                                    You can easily book a consultation by filtering the doctor list for your desired specialty. Click "Book Appointment", select your preferred time, and you will receive a secure confirmation.
                                </Accordion.Body>
                            </Accordion.Item>
                            
                            <Accordion.Item eventKey="1" className="border-0 mb-3 rounded overflow-hidden shadow-sm">
                                <Accordion.Header className="fw-bold p-2">Can I cancel or reschedule my appointment?</Accordion.Header>
                                <Accordion.Body className="text-muted px-4 py-3 bg-white">
                                    Yes, you can cancel or reschedule up to 24 hours before your appointment time without any penalty. Simply log into your account, go to "My Appointments", and select the desired action.
                                </Accordion.Body>
                            </Accordion.Item>
                            
                            <Accordion.Item eventKey="2" className="border-0 mb-3 rounded overflow-hidden shadow-sm">
                                <Accordion.Header className="fw-bold p-2">Are prescription refills available online?</Accordion.Header>
                                <Accordion.Body className="text-muted px-4 py-3 bg-white">
                                    Many of our specialist doctors can provide prescription refills during consultations, provided they have access to your medical history and determine it is medically appropriate.
                                </Accordion.Body>
                            </Accordion.Item>

                            <Accordion.Item eventKey="3" className="border-0 rounded overflow-hidden shadow-sm">
                                <Accordion.Header className="fw-bold p-2">What insurance plans do you accept?</Accordion.Header>
                                <Accordion.Body className="text-muted px-4 py-3 bg-white">
                                    We accept most major health insurance plans. The specific coverage depends on the individual doctor, which is displayed on their full profile.
                                </Accordion.Body>
                            </Accordion.Item>
                        </Accordion>
                    </Col>
                </Row>
                
                <style>{`
                    .custom-accordion .accordion-button:not(.collapsed) {
                        background-color: #eef2fa;
                        color: #0d6efd;
                        font-weight: bold;
                        box-shadow: none;
                    }
                    .custom-accordion .accordion-button:focus {
                        box-shadow: none;
                        border-color: rgba(0,0,0,.125);
                    }
                `}</style>
            </Container>
        </section>
    );
};

export default FAQSection;
