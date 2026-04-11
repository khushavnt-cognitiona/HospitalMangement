import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import { FaSearch, FaCalendarCheck, FaClinicMedical } from 'react-icons/fa';

const steps = [
  {
    num: '01',
    icon: <FaSearch size={28} />,
    title: 'Find a Doctor',
    desc: 'Search by specialty, name, or condition to find the perfect specialist for your needs.',
    color: '#1976d2',
    bg: 'rgba(25,118,210,0.12)',
  },
  {
    num: '02',
    icon: <FaCalendarCheck size={28} />,
    title: 'Book Appointment',
    desc: 'Choose a convenient time slot and book instantly for video or in-clinic visits.',
    color: '#7b1fa2',
    bg: 'rgba(123,31,162,0.12)',
  },
  {
    num: '03',
    icon: <FaClinicMedical size={28} />,
    title: 'Get Quality Care',
    desc: 'Connect with your doctor and receive expert medical advice, diagnosis, and prescriptions.',
    color: '#2e7d32',
    bg: 'rgba(46,125,50,0.12)',
  },
];

const HowItWorks = () => {
  return (
    <section style={{
      background: 'linear-gradient(135deg, #f0f6ff 0%, #e8f0fe 50%, #f0f6ff 100%)',
      padding: '80px 0',
      position: 'relative',
      overflow: 'hidden',
    }}>
      <div style={{ position: 'absolute', top: -80, right: -80, width: 300, height: 300, borderRadius: '50%', background: 'rgba(13,110,253,0.05)', pointerEvents: 'none' }} />
      <div style={{ position: 'absolute', bottom: -60, left: -60, width: 220, height: 220, borderRadius: '50%', background: 'rgba(13,110,253,0.04)', pointerEvents: 'none' }} />

      <Container>
        <div className="text-center mb-5">
          <span style={{
            background: 'rgba(13,110,253,0.1)',
            color: '#1976d2',
            borderRadius: 20,
            padding: '6px 18px',
            fontSize: 13,
            fontWeight: 700,
            letterSpacing: 1,
            textTransform: 'uppercase',
            display: 'inline-block',
            marginBottom: 16,
          }}>
            Simple Process
          </span>
          <h2 style={{ fontWeight: 900, fontSize: 'clamp(22px, 4vw, 38px)', color: '#1a3a6e', marginBottom: 12 }}>
            How It Works
          </h2>
          <p style={{ color: '#666', maxWidth: 480, margin: '0 auto', fontSize: 15, lineHeight: 1.7 }}>
            Getting the care you need has never been easier. Follow three simple steps to connect with a doctor.
          </p>
        </div>

        <Row className="g-4 align-items-center position-relative">
          <div style={{
            position: 'absolute',
            top: '80px',
            left: '20%',
            right: '20%',
            height: 2,
            borderTop: '2.5px dashed #c5d8f7',
            zIndex: 0,
            display: 'block',
          }} className="d-none d-md-block" />

          {steps.map((step, i) => (
            <Col md={4} key={i}>
              <div style={{
                background: '#fff',
                borderRadius: 20,
                padding: '36px 28px',
                textAlign: 'center',
                boxShadow: '0 4px 24px rgba(13,110,253,0.08)',
                position: 'relative',
                zIndex: 1,
                transition: 'transform 0.3s ease, box-shadow 0.3s ease',
                cursor: 'default',
                border: '1.5px solid rgba(13,110,253,0.06)',
              }}
              >
                <div style={{
                  position: 'absolute',
                  top: -18,
                  left: '50%',
                  transform: 'translateX(-50%)',
                  width: 36,
                  height: 36,
                  borderRadius: '50%',
                  background: step.color,
                  color: '#fff',
                  fontWeight: 900,
                  fontSize: 13,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  boxShadow: `0 4px 12px ${step.color}55`,
                }}>
                  {i + 1}
                </div>

                <div style={{
                  width: 84,
                  height: 84,
                  borderRadius: '50%',
                  background: step.bg,
                  border: `2px solid ${step.color}30`,
                  display: 'inline-flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  marginBottom: 22,
                  color: step.color,
                  marginTop: 12,
                }}>
                  {step.icon}
                </div>

                <h4 style={{ fontWeight: 800, color: '#1a3a6e', marginBottom: 12 }}>{step.title}</h4>
                <p style={{ color: '#666', lineHeight: 1.7, fontSize: 14, margin: 0 }}>{step.desc}</p>
              </div>
            </Col>
          ))}
        </Row>
      </Container>
    </section>
  );
};

export default HowItWorks;
