import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Navbar, Nav, Container, Button, Dropdown } from 'react-bootstrap';
import { FaHome, FaUserMd, FaBed, FaSignInAlt, FaHospital, FaBell } from 'react-icons/fa';
import { useAuth } from '../../context/AuthContext';
import authService from '../../services/authService';
import AuthModal from './AuthModal';

const Header = () => {
    const { auth, logout } = useAuth();
    const navigate = useNavigate();
    const [showAuth, setShowAuth] = useState(false);

    const handleLogout = () => {
        authService.logout();
        logout();
        navigate('/');
    };

    const hideSidebarFor = ['PATIENT', 'DOCTOR'];
    const currentRole = auth.role?.toUpperCase();
    const shouldHideSidebar = !currentRole || hideSidebarFor.includes(currentRole);

    return (
        <>
            <Navbar bg="primary" variant="dark" expand="lg" className="shadow-sm fixed-top py-3" 
                style={{ 
                    transition: 'all 0.3s ease', 
                    marginLeft: !shouldHideSidebar ? '240px' : '0', 
                    width: !shouldHideSidebar ? 'calc(100% - 240px)' : '100%' 
                }}>

                <Container>
                    <Navbar.Brand as={Link} to="/" className="fw-bold fs-4 d-flex align-items-center gap-2">
                        <FaHospital className="text-warning" />
                        <span>Hospital<span className="text-warning">Manager</span></span>
                    </Navbar.Brand>

                    <Navbar.Toggle aria-controls="main-navbar" />
                    
                    <Navbar.Collapse id="main-navbar">
                        <Nav className="mx-auto gap-4">
                            <Nav.Link as={Link} to="/" className="d-flex align-items-center gap-2 text-white opacity-75">
                                <FaHome /> Home
                            </Nav.Link>
                            <Nav.Link as={Link} to="/doctor-list" className="d-flex align-items-center gap-2 text-white opacity-75">
                                <FaUserMd /> Doctor
                            </Nav.Link>
                            <Nav.Link as={Link} to={auth.role === 'PATIENT' ? "/patient/dashboard" : "/role-select"} className="d-flex align-items-center gap-2 text-white opacity-75">
                                <FaBed /> Patients
                            </Nav.Link>
                        </Nav>

                        <div className="d-flex align-items-center gap-3" style={{ marginRight: '30px' }}>
                            {auth.user ? (
                                <>
                                    <div style={{ position: 'relative' }}>
                                        <FaBell size={10} className="text-white opacity-75 cursor-pointer" />
                                        <span className="position-absolute translate-middle badge rounded-pill bg-danger shadow-sm border border-2 border-primary" style={{ top: 0, left: '100%', padding: '3px 6px', fontSize: 10 }}>3</span>
                                    </div>
                                    <Dropdown align="end">
                                        <Dropdown.Toggle variant="transparent" id="user-dropdown" className="border-0 p-0 text-white d-flex align-items-center gap-2 no-caret">
                                            <div className="bg-white rounded-circle d-flex align-items-center justify-content-center shadow-sm overflow-hidden" style={{ width: 35, height: 35, minWidth: 35 }}>
                                                {auth.user?.profileImage ? (
                                                    <img src={auth.user.profileImage} alt="profile" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                                                ) : (
                                                    <span className="fw-bold text-primary small">{auth.user?.name?.charAt(0).toUpperCase() || 'U'}</span>
                                                )}
                                            </div>
                                            <div className="d-none d-lg-block text-start" style={{ lineHeight: 1 }}>
                                                <span className="small d-block fw-bold">{auth.user?.name}</span>
                                                <small className="opacity-75" style={{ fontSize: '0.7rem' }}>{auth.role}</small>
                                            </div>
                                        </Dropdown.Toggle>
                                        <Dropdown.Menu className="shadow-lg border-0 mt-3 py-2 animate-slide-in" style={{ borderRadius: 15, minWidth: 200 }}>
                                            <div className="px-3 py-2 border-bottom mb-2">
                                                <p className="mb-0 small fw-bold text-dark">{auth.user?.name}</p>
                                                <small className="text-muted">{auth.user?.email}</small>
                                            </div>
                                            <Dropdown.Item onClick={() => navigate(`/${auth.role.toLowerCase()}/dashboard`)} className="py-2 px-3 d-flex align-items-center gap-2">
                                                <i className="bi bi-speedometer2"></i> Dashboard
                                            </Dropdown.Item>
                                            <Dropdown.Item onClick={() => navigate(`/${auth.role.toLowerCase()}/profile`)} className="py-2 px-3 d-flex align-items-center gap-2">
                                                <i className="bi bi-person"></i> My Profile
                                            </Dropdown.Item>
                                            <Dropdown.Divider />
                                            <Dropdown.Item onClick={handleLogout} className="py-2 px-3 text-danger d-flex align-items-center gap-2">
                                                <i className="bi bi-box-arrow-right"></i> Logout
                                            </Dropdown.Item>
                                        </Dropdown.Menu>
                                    </Dropdown>
                                </>
                            ) : (
                                <Button 
                                    onClick={() => setShowAuth(true)}
                                    className="fw-bold px-4 rounded-pill d-flex align-items-center gap-2 shadow-sm border-0"
                                    style={{ background: '#ffc107', color: '#1a3a6e' }}
                                >
                                    <FaSignInAlt /> Login
                                </Button>
                            )}
                        </div>
                    </Navbar.Collapse>
                </Container>
            </Navbar>

            <AuthModal show={showAuth} handleClose={() => setShowAuth(false)} />

            <style>{`
                .nav-link:hover { opacity: 1 !important; transform: translateY(-1px); transition: all 0.2s; }
                .navbar { background: #0d6efd !important; }
                .no-caret::after { display: none !important; }
                .animate-slide-in {
                    animation: slideIn 0.3s ease-out;
                }
                @keyframes slideIn {
                    from { opacity: 0; transform: translateY(10px); }
                    to { opacity: 1; transform: translateY(0); }
                }
                .dropdown-item:hover { background-color: #f8f9fa; color: #0d6efd !important; }
            `}</style>
        </>
    );
};

export default Header;
