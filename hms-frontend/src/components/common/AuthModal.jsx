import React, { useState } from 'react';
import { Modal, Button, Form, Tab, Tabs, Alert, Spinner } from 'react-bootstrap';
import { FaUser, FaLock, FaEnvelope, FaUserPlus, FaSignInAlt } from 'react-icons/fa';
import { useAuth } from '../../context/AuthContext';
import authService from '../../services/authService';
import { useNavigate } from 'react-router-dom';

const AuthModal = ({ show, handleClose }) => {
    const { login } = useAuth();
    const navigate = useNavigate();
    const [key, setKey] = useState('login');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    
    // Login State
    const [loginData, setLoginData] = useState({ email: '', password: '' });
    
    // Signup State (Patient Only)
    const [signupData, setSignupData] = useState({ 
        name: '', email: '', password: '', phone: '', role: 'PATIENT' 
    });

    const onLoginSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError('');
        try {
            const data = await authService.login(loginData);
            login(data.role, data);
            handleClose();
            navigate(`/${data.role.toLowerCase()}/dashboard`);
        } catch (err) {
            setError(err.response?.data?.message || 'Login failed. Please check credentials.');
        } finally {
            setLoading(false);
        }
    };

    const onSignupSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError('');
        try {
            await authService.register(signupData);
            setError('Account created successfully! Please login.');
            setKey('login');
        } catch (err) {
            setError(err.response?.data?.message || 'Signup failed.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <Modal show={show} onHide={handleClose} centered size="md" className="auth-modal">
            <Modal.Header closeButton className="border-0 pb-0">
                <Modal.Title className="fw-bold text-primary">
                    {key === 'login' ? 'Welcome Back!' : 'Start Your Journey'}
                </Modal.Title>
            </Modal.Header>
            <Modal.Body className="px-4 pb-4">
                {error && <Alert variant={error.includes('success') ? 'success' : 'danger'} className="py-2 small">{error}</Alert>}
                
                <Tabs
                    id="auth-tabs"
                    activeKey={key}
                    onSelect={(k) => { setKey(k); setError(''); }}
                    className="mb-4 custom-tabs"
                    justify
                >
                    <Tab eventKey="login" title={<span><FaSignInAlt className="me-2"/>Login</span>}>
                        <Form onSubmit={onLoginSubmit}>
                            <Form.Group className="mb-3">
                                <Form.Label className="small fw-bold">Email Address</Form.Label>
                                <div className="position-relative">
                                    <FaEnvelope className="position-absolute translate-middle-y text-muted" style={{ top: '50%', left: '15px' }} />
                                    <Form.Control 
                                        type="email" 
                                        placeholder="name@example.com" 
                                        className="ps-5 py-2 border-0 bg-light"
                                        required
                                        onChange={(e) => setLoginData({...loginData, email: e.target.value})}
                                    />
                                </div>
                            </Form.Group>
                            <Form.Group className="mb-4">
                                <Form.Label className="small fw-bold">Password</Form.Label>
                                <div className="position-relative">
                                    <FaLock className="position-absolute translate-middle-y text-muted" style={{ top: '50%', left: '15px' }} />
                                    <Form.Control 
                                        type="password" 
                                        placeholder="••••••••" 
                                        className="ps-5 py-2 border-0 bg-light"
                                        required
                                        onChange={(e) => setLoginData({...loginData, password: e.target.value})}
                                    />
                                </div>
                            </Form.Group>
                            <Button variant="primary" type="submit" className="w-100 py-2 fw-bold rounded-pill shadow-sm" disabled={loading}>
                                {loading ? <Spinner animation="border" size="sm" /> : 'Sign In'}
                            </Button>
                        </Form>
                    </Tab>
                    <Tab eventKey="signup" title={<span><FaUserPlus className="me-2"/>Sign Up</span>}>
                        <div className="text-center mb-3">
                            <span className="badge bg-info-subtle text-info p-2 px-3 rounded-pill border border-info">Patient Registration Only</span>
                            <p className="text-muted small mt-2">Doctor and Staff accounts require manual Admin approval.</p>
                        </div>
                        <Form onSubmit={onSignupSubmit}>
                            <Form.Group className="mb-3">
                                <Form.Label className="small fw-bold">Full Name</Form.Label>
                                <div className="position-relative">
                                    <FaUser className="position-absolute translate-middle-y text-muted" style={{ top: '50%', left: '15px' }} />
                                    <Form.Control 
                                        type="text" 
                                        placeholder="Enter your name" 
                                        className="ps-5 py-2 border-0 bg-light"
                                        required
                                        onChange={(e) => setSignupData({...signupData, name: e.target.value})}
                                    />
                                </div>
                            </Form.Group>
                            <Form.Group className="mb-3">
                                <Form.Label className="small fw-bold">Email Address</Form.Label>
                                <div className="position-relative">
                                    <FaEnvelope className="position-absolute translate-middle-y text-muted" style={{ top: '50%', left: '15px' }} />
                                    <Form.Control 
                                        type="email" 
                                        placeholder="email@example.com" 
                                        className="ps-5 py-2 border-0 bg-light"
                                        required
                                        onChange={(e) => setSignupData({...signupData, email: e.target.value})}
                                    />
                                </div>
                            </Form.Group>
                            <Form.Group className="mb-4">
                                <Form.Label className="small fw-bold">Create Password</Form.Label>
                                <div className="position-relative">
                                    <FaLock className="position-absolute translate-middle-y text-muted" style={{ top: '50%', left: '15px' }} />
                                    <Form.Control 
                                        type="password" 
                                        placeholder="••••••••" 
                                        className="ps-5 py-2 border-0 bg-light"
                                        required
                                        onChange={(e) => setSignupData({...signupData, password: e.target.value})}
                                    />
                                </div>
                            </Form.Group>
                            <Button variant="success" type="submit" className="w-100 py-2 fw-bold rounded-pill shadow-sm" disabled={loading}>
                                {loading ? <Spinner animation="border" size="sm" /> : 'Join as Patient'}
                            </Button>
                        </Form>
                    </Tab>
                </Tabs>
            </Modal.Body>
            <style>{`
                .custom-tabs .nav-link { border: none !important; color: #6c757d; font-weight: 600; padding: 12px; }
                .custom-tabs .nav-link.active { color: #0d6efd; border-bottom: 2px solid #0d6efd !important; background: transparent !important; }
                .auth-modal .modal-content { border-radius: 20px; border: none; }
            `}</style>
        </Modal>
    );
};

export default AuthModal;
