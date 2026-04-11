import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Card, Button, Badge, Spinner, Alert, Table } from 'react-bootstrap';
import { FaCheckCircle, FaStar, FaShieldAlt, FaHistory, FaCalendarCheck } from 'react-icons/fa';
import { useAuth } from '../../context/AuthContext';
import subscriptionService from '../../services/subscriptionService';
import PatientLayout from '../../components/patient/PatientLayout';
import '../../styles/patient-ui.css';

const Subscriptions = () => {
    const { auth } = useAuth();
    const [plans, setPlans] = useState([]);
    const [activeSub, setActiveSub] = useState(null);
    const [history, setHistory] = useState([]);
    const [loading, setLoading] = useState(true);
    const [subscribing, setSubscribing] = useState(null);
    const [message, setMessage] = useState({ type: '', text: '' });

    useEffect(() => {
        const fetchData = async () => {
            try {
                const [plansData, activeData, historyData] = await Promise.all([
                    subscriptionService.getAllPlans(),
                    subscriptionService.getActiveSubscription(auth.user.id),
                    subscriptionService.getAllUserSubscriptions(auth.user.id)
                ]);
                setPlans(plansData || []);
                setActiveSub(activeData || null);
                setHistory(historyData || []);
            } catch (err) {
                console.error("Error fetching subscriptions", err);
                setMessage({ type: 'danger', text: 'Failed to load subscription data.' });
            } finally {
                setLoading(false);
            }
        };
        if (auth.user?.id) fetchData();
    }, [auth.user?.id]);

    const handleSubscribe = async (planId) => {
        setSubscribing(planId);
        setMessage({ type: '', text: '' });
        try {
            await subscriptionService.subscribe(planId, auth.user.id);
            const [newActive, newHistory] = await Promise.all([
                subscriptionService.getActiveSubscription(auth.user.id),
                subscriptionService.getAllUserSubscriptions(auth.user.id)
            ]);
            setActiveSub(newActive);
            setHistory(newHistory);
            setMessage({ type: 'success', text: 'Subscription active! Your health shield is now active.' });
        } catch (err) {
            setMessage({ type: 'danger', text: 'Transaction failed.' });
        } finally {
            setSubscribing(null);
        }
    };

    if (loading) return (
        <div className="d-flex justify-content-center align-items-center vh-100 bg-white">
            <Spinner animation="grow" variant="primary" />
        </div>
    );

    const subscriptionContent = (
        <div className="mt-4">
            {message.text && (
                <Alert variant={message.type} className="shadow-sm border-0 mb-5 rounded-4 p-3 d-flex align-items-center gap-3">
                    <FaCheckCircle className="text-success fs-4" />
                    <span>{message.text}</span>
                </Alert>
            )}

            {activeSub && (
                <Card className="border-0 shadow-lg mb-5 bg-primary text-white overflow-hidden position-relative rounded-4">
                    <div className="card-body p-4 d-flex align-items-center justify-content-between position-relative z-1">
                        <div>
                            <h5 className="mb-1 opacity-75 small uppercase tracking-wider ls-1">YOUR CURRENT SHIELD</h5>
                            <h3 className="fw-bold mb-0">{activeSub.planName}</h3>
                            <p className="mb-0 mt-2 small">
                                <FaCalendarCheck className="me-2" /> 
                                Valid until: {new Date(activeSub.endDate).toLocaleDateString()}
                            </p>
                        </div>
                        <div className="text-end">
                            <Badge bg="light" text="primary" className="px-3 py-2 fs-6 rounded-pill shadow-sm">ACTIVE</Badge>
                        </div>
                    </div>
                </Card>
            )}

            <Row className="g-4 mb-5">
                {plans.map((plan) => (
                    <Col key={plan.id} lg={4} md={6}>
                        <Card className={`h-100 border-0 shadow-sm rounded-4 plan-card`}>
                            <Card.Body className="p-4 d-flex flex-column bg-white rounded-4">
                                <h4 className="fw-bold mb-1 text-dark">{plan.name}</h4>
                                <h2 className="display-6 fw-bold text-primary mb-0">
                                    ₹{plan.price}
                                    <span className="fs-6 text-muted fw-normal ms-1">/ {plan.duration}</span>
                                </h2>
                                <div className="mt-4 pt-3 flex-grow-1 border-top">
                                    <ul className="list-unstyled mb-0">
                                        {(JSON.parse(plan.features || '[]')).map((feature, idx) => (
                                            <li key={idx} className="mb-2 d-flex align-items-start small text-muted">
                                                <FaCheckCircle className="text-success me-2 mt-1" />
                                                {feature}
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                                <Button 
                                    variant={activeSub?.planId === plan.id ? 'success' : 'outline-primary'} 
                                    className="w-100 py-3 fw-bold rounded-pill shadow-sm mt-4 border-2"
                                    onClick={() => handleSubscribe(plan.id)}
                                    disabled={subscribing === plan.id || activeSub?.planId === plan.id}
                                >
                                    {subscribing === plan.id ? <Spinner size="sm" /> : (activeSub?.planId === plan.id ? 'Current Plan' : 'Get Started')}
                                </Button>
                            </Card.Body>
                        </Card>
                    </Col>
                ))}
            </Row>

            {history.length > 0 && (
                <div className="mt-5 pt-4">
                    <h4 className="fw-bold mb-4 d-flex align-items-center gap-2 text-dark">
                        <FaHistory className="text-primary" /> Billing History
                    </h4>
                    <Card className="border-0 shadow-sm overflow-hidden p-0 rounded-4 bg-white">
                        <Table responsive hover className="mb-0">
                            <thead className="bg-light text-muted small text-uppercase">
                                <tr>
                                    <th className="px-4 py-3 border-0">PLAN NAME</th>
                                    <th className="py-3 border-0 text-center">STATUS</th>
                                    <th className="py-3 border-0">START DATE</th>
                                    <th className="py-3 border-0">END DATE</th>
                                </tr>
                            </thead>
                            <tbody>
                                {history.map((sub, i) => (
                                    <tr key={i}>
                                        <td className="px-4 py-3 fw-bold text-dark">{sub.planName}</td>
                                        <td className="py-3 text-center">
                                            <Badge bg={sub.active ? 'success' : 'secondary'} className="rounded-pill p-2 px-3 fw-bold bg-opacity-10 text-success border border-success">
                                                {sub.active ? 'Active' : 'Expired'}
                                            </Badge>
                                        </td>
                                        <td className="py-3 text-muted">{new Date(sub.startDate).toLocaleDateString()}</td>
                                        <td className="py-3 text-muted">{new Date(sub.endDate).toLocaleDateString()}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </Table>
                    </Card>
                </div>
            )}
            <style>{`
                .ls-1 { letter-spacing: 0.1em; }
                .plan-card:hover { transform: translateY(-8px); transition: all 0.3s; box-shadow: 0 1rem 3rem rgba(0,0,0,0.1) !important; }
            `}</style>
        </div>
    );

    return auth.role === 'PATIENT' ? (
        <PatientLayout title="Healthcare Protection" subtitle="Unlock priority care and premium health shields.">
            {subscriptionContent}
        </PatientLayout>
    ) : (
        <Container className="py-5 bg-light min-vh-100">
            <h1 className="fw-bold text-dark mb-4">Healthcare Subscriptions</h1>
            {subscriptionContent}
        </Container>
    );
};

export default Subscriptions;
