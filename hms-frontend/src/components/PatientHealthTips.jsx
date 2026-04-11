import React, { useState } from 'react';
import { Container, Row, Col, Card, Badge } from 'react-bootstrap';
import {
    FaHeartbeat, FaBrain, FaChild, FaBone, FaSpa,
    FaSmile, FaArrowRight, FaLeaf
} from 'react-icons/fa';

const tips = [
    {
        dept: 'Cardiology',
        icon: <FaHeartbeat />,
        color: '#e53935',
        bg: '#fff5f5',
        border: '#ffd6d6',
        list: [
            'Check blood pressure daily at the same time.',
            'Limit sodium to less than 2300 mg per day.',
            'Walk briskly for 30 minutes, 5 days a week.',
            'Avoid smoking and secondhand smoke.',
            'Manage stress with yoga or meditation.',
        ],
    },
    {
        dept: 'Neurology',
        icon: <FaBrain />,
        color: '#7b1fa2',
        bg: '#fdf4ff',
        border: '#e8c4f8',
        list: [
            'Sleep 7–9 hours every night for brain health.',
            'Avoid screen time 1 hour before bed.',
            'Stay hydrated — dehydration affects cognition.',
            'Keep a migraine diary for triggers.',
            'Practice cognitive exercises like puzzles.',
        ],
    },
    {
        dept: 'Pediatrics',
        icon: <FaChild />,
        color: '#fb8c00',
        bg: '#fffbf0',
        border: '#ffe0a0',
        list: [
            'Ensure timely vaccinations as per schedule.',
            'Limit sugary drinks; prefer water and milk.',
            'Encourage outdoor play for 1 hour daily.',
            'Monitor growth milestones regularly.',
            'Teach proper handwashing to prevent infection.',
        ],
    },
    {
        dept: 'Orthopedics',
        icon: <FaBone />,
        color: '#1565c0',
        bg: '#f0f6ff',
        border: '#b3d1ff',
        list: [
            'Include calcium-rich foods in daily diet.',
            'Warm up before any exercise or sport.',
            'Maintain correct posture while sitting.',
            'Do strength-training exercises twice a week.',
            'Avoid carrying heavy bags on one shoulder.',
        ],
    },
    {
        dept: 'Dermatology',
        icon: <FaSpa />,
        color: '#2e7d32',
        bg: '#f4fff5',
        border: '#b2dfb3',
        list: [
            'Apply sunscreen SPF 30+ every morning.',
            'Drink 8 glasses of water daily for skin glow.',
            'Moisturize skin within 3 minutes of bathing.',
            'Never sleep with makeup on.',
            'See a dermatologist for any new or changing moles.',
        ],
    },
    {
        dept: 'Psychiatry',
        icon: <FaSmile />,
        color: '#00838f',
        bg: '#f0fdff',
        border: '#a5dfe4',
        list: [
            'Practice mindfulness for 10 minutes daily.',
            'Build a consistent daily routine.',
            'Talk to someone you trust about your feelings.',
            'Limit alcohol and caffeine consumption.',
            'Seek professional help — mental health matters.',
        ],
    },
];

const PatientHealthTips = () => {
    const [active, setActive] = useState(0);
    const current = tips[active];

    return (
        <section className="py-5 bg-white">
            <Container>
                <div className="text-center mb-5">
                    <span className="badge rounded-pill px-3 py-2 mb-2"
                        style={{ background: 'rgba(25,118,210,0.1)', color: '#1976d2', fontSize: 13 }}>
                        <FaLeaf className="me-1" /> Wellness
                    </span>
                    <h2 className="fw-bold text-dark">Health Tips by Department</h2>
                    <p className="text-muted mx-auto" style={{ maxWidth: 480 }}>
                        Expert-curated daily habits and guidelines to help patients stay healthy and prevent complications.
                    </p>
                </div>

                <Row className="g-4 align-items-start">
                    <Col xs={12} md={4} lg={3}>
                        <div className="d-flex d-md-none gap-2 pb-2"
                            style={{ overflowX: 'auto', WebkitOverflowScrolling: 'touch', scrollbarWidth: 'none' }}>
                            {tips.map((t, i) => (
                                <button
                                    key={i}
                                    onClick={() => setActive(i)}
                                    className="border-0 rounded-pill fw-semibold d-flex align-items-center gap-2"
                                    style={{
                                        cursor: 'pointer',
                                        background: active === i ? t.color : '#f0f0f0',
                                        color: active === i ? '#fff' : '#555',
                                        padding: '8px 16px',
                                        fontSize: 13,
                                        whiteSpace: 'nowrap',
                                        flexShrink: 0,
                                        transition: 'all 0.2s ease',
                                        boxShadow: active === i ? `0 3px 10px ${t.color}55` : 'none',
                                    }}
                                >
                                    <span style={{ fontSize: 15 }}>{t.icon}</span>
                                    {t.dept}
                                </button>
                            ))}
                        </div>

                        <div className="d-none d-md-flex flex-column gap-2">
                            {tips.map((t, i) => (
                                <button
                                    key={i}
                                    onClick={() => setActive(i)}
                                    className="d-flex align-items-center gap-3 border-0 text-start px-4 py-3 rounded-3 fw-semibold"
                                    style={{
                                        cursor: 'pointer',
                                        background: active === i ? t.color : '#f8f9fa',
                                        color: active === i ? '#fff' : '#555',
                                        transition: 'all 0.25s ease',
                                        fontSize: 14,
                                        boxShadow: active === i ? `0 4px 14px ${t.color}55` : 'none',
                                    }}
                                >
                                    <span style={{ fontSize: 18 }}>{t.icon}</span>
                                    {t.dept}
                                    {active === i && <FaArrowRight className="ms-auto" style={{ fontSize: 12 }} />}
                                </button>
                            ))}
                        </div>
                    </Col>

                    <Col xs={12} md={8} lg={9}>
                        <Card className="border-0 shadow-sm h-100"
                            style={{
                                borderRadius: 20,
                                border: `2px solid ${current.border}`,
                                background: current.bg,
                                transition: 'all 0.3s ease',
                            }}>
                            <Card.Body className="p-4 p-md-5">
                                <div className="d-flex align-items-center gap-3 mb-4">
                                    <div className="rounded-circle d-flex align-items-center justify-content-center"
                                        style={{ width: 60, height: 60, background: current.color, color: '#fff', fontSize: 26, flexShrink: 0 }}>
                                        {current.icon}
                                    </div>
                                    <div>
                                        <Badge className="rounded-pill mb-1 px-3 py-1"
                                            style={{ background: current.color, fontSize: 12 }}>
                                            Department
                                        </Badge>
                                        <h4 className="fw-bold mb-0" style={{ color: current.color }}>{current.dept}</h4>
                                    </div>
                                </div>

                                <div className="d-flex flex-column gap-3">
                                    {current.list.map((tip, i) => (
                                        <div key={i} className="d-flex align-items-start gap-3 p-3 rounded-3 bg-white shadow-sm">
                                            <div className="rounded-circle d-flex align-items-center justify-content-center fw-bold text-white flex-shrink-0"
                                                style={{ width: 30, height: 30, background: current.color, fontSize: 13 }}>
                                                {i + 1}
                                            </div>
                                            <p className="mb-0 text-dark" style={{ lineHeight: 1.6 }}>{tip}</p>
                                        </div>
                                    ))}
                                </div>
                            </Card.Body>
                        </Card>
                    </Col>
                </Row>
            </Container>
        </section>
    );
};

export default PatientHealthTips;
