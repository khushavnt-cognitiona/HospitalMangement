import React, { useState, useEffect } from 'react';
import { FaCrown, FaReceipt, FaCreditCard } from 'react-icons/fa';
import { Button, Row, Col, Spinner, Badge } from 'react-bootstrap';
import paymentService from '../../services/paymentService';
import subscriptionService from '../../services/subscriptionService';
import { useAuth } from '../../context/AuthContext';
import PatientLayout from '../../components/patient/PatientLayout';
import '../../styles/patient-ui.css';

const BillingPortal = () => {
    const { auth } = useAuth();
    const [payments, setPayments] = useState([]);
    const [plans, setPlans] = useState([]);
    const [activeSub, setActiveSub] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (!auth.user?.id) return;
        const fetchBillingData = async () => {
            try {
                const userId = auth.user.id;
                const [payData, planData, subData] = await Promise.allSettled([
                    paymentService.getPatientPayments(userId),
                    subscriptionService.getAllPlans(),
                    subscriptionService.getActiveSubscription(userId)
                ]);
                
                if (payData.status === 'fulfilled') setPayments(payData.value || []);
                if (planData.status === 'fulfilled') setPlans(planData.value || []);
                if (subData.status === 'fulfilled') setActiveSub(subData.value || null);
                
            } catch (err) {
                console.error("Billing data fetch failed", err);
            } finally {
                setLoading(false);
            }
        };
        fetchBillingData();
    }, [auth.user]);

    const handleUpgrade = async (planId) => {
        try {
            await subscriptionService.subscribe(planId, auth.user.id);
            window.location.reload();
        } catch (err) {
            console.error("Subscription failed", err);
        }
    };

    if (loading) return (
        <div className="d-flex justify-content-center align-items-center vh-100">
            <Spinner animation="grow" variant="primary" />
        </div>
    );

    return (
        <PatientLayout 
            title="Financial Summary" 
            subtitle="Manage your clinical plans and transaction history."
        >
            <Row className="g-4 mb-5">
                <Col md={4}>
                    <div className="patient-stat-card bg-blue shadow-lg">
                        <FaCrown size={24} className="stat-card-icon" style={{ opacity: 0.6 }} />
                        <p className="stat-card-label">Active Membership</p>
                        <h2 className="stat-card-value" style={{ fontSize: '1.8rem' }}>{activeSub?.planName || 'BASIC FREE'}</h2>
                        <p className="mb-0 mt-3 small opacity-75 fw-bold">
                            Valid until: {activeSub?.endDate ? new Date(activeSub.endDate).toLocaleDateString() : 'Lifetime Access'}
                        </p>
                    </div>
                </Col>

                <Col md={8}>
                    <div className="patient-content-card p-4 shadow-sm border-0">
                        <h6 className="fw-bold mb-4 small text-muted text-uppercase">Available Upgrades</h6>
                        <Row className="g-3">
                            {plans.map((plan, i) => (
                                <Col md={4} key={i}>
                                    <div className={`p-4 rounded-4 border-2 text-center h-100 ${plan.name === activeSub?.planName ? 'bg-primary bg-opacity-10 border-primary' : 'bg-light border-transparent'}`}>
                                        <div className="fw-bold mb-2 small text-uppercase text-primary">{plan.name}</div>
                                        <div className="fw-bold h2 mb-1">₹{plan.price}</div>
                                        <div className="text-muted mb-4 small fw-bold">{plan.duration} Coverage</div>
                                        <Button 
                                            size="sm"
                                            variant={plan.name === activeSub?.planName ? 'success' : 'primary'}
                                            className="w-100 rounded-pill fw-bold"
                                            onClick={() => handleUpgrade(plan.id)}
                                            disabled={plan.name === activeSub?.planName}
                                        >
                                            {plan.name === activeSub?.planName ? 'Active' : 'Upgrade'}
                                        </Button>
                                    </div>
                                </Col>
                            ))}
                        </Row>
                    </div>
                </Col>
            </Row>

            <div className="patient-content-card shadow-sm border-0">
                <div className="patient-card-header border-0 pb-0">
                    <h4 className="patient-card-title"><FaReceipt className="text-primary me-2" /> Recent Billing Activity</h4>
                </div>
                <div className="table-responsive p-0">
                    <table className="table table-hover mb-0 align-middle">
                        <thead className="bg-light text-muted small text-uppercase">
                            <tr>
                                <th className="ps-4 py-3 border-0">Timestamp</th>
                                <th className="border-0 py-3">Reference ID</th>
                                <th className="border-0 py-3">Amount</th>
                                <th className="border-0 py-3">Outcome</th>
                                <th className="text-end pe-4 border-0 py-3">Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {payments.map((p, i) => (
                                <tr key={i} style={{ fontSize: '0.9rem' }}>
                                    <td className="ps-4 fw-bold text-dark">{new Date(p.createdAt || p.paymentDate).toLocaleDateString()}</td>
                                    <td className="text-muted" style={{ fontSize: '0.75rem' }}>{p.transactionId || 'TRS-VERIFIED-'+p.id}</td>
                                    <td className="fw-bold">₹{p.amount}</td>
                                    <td>
                                        <Badge className={`rounded-pill py-2 px-3 ${p.status === 'SUCCESS' || p.paymentStatus === 'SUCCESS' ? 'bg-success bg-opacity-10 text-success' : 'bg-danger bg-opacity-10 text-danger'}`} style={{ fontWeight: 600 }}>
                                            {p.status || p.paymentStatus}
                                        </Badge>
                                    </td>
                                    <td className="text-end pe-4">
                                        <Button variant="link" size="sm" className="text-primary text-decoration-none fw-bold p-0">
                                            <FaCreditCard className="me-1" /> INVOICE
                                        </Button>
                                    </td>
                                </tr>
                            ))}
                            {payments.length === 0 && (
                                <tr>
                                    <td colSpan="5" className="text-center py-5 text-muted fw-bold">
                                        No billing history found in your account.
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
        </PatientLayout>
    );
};

export default BillingPortal;
