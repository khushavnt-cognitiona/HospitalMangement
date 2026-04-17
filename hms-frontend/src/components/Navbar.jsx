import React, { useEffect, useState } from 'react';
import { Navbar, Nav, Container, Button, Dropdown, Image, Badge } from 'react-bootstrap';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import {
  FaHospital, FaHome, FaUserMd, FaSignInAlt, FaCalendarPlus, FaSignOutAlt, 
  FaUserNurse, FaUserCog, FaUser, FaUserInjured
} from 'react-icons/fa';
import { useAuth } from '../context/AuthContext';

const roleConfig = {
    PATIENT: { color: '#1976d2', label: 'Patient', dashPath: '/patient/dashboard', icon: FaUserInjured },
    DOCTOR:  { color: '#2e7d32', label: 'Doctor',  dashPath: '/doctor/dashboard',  icon: FaUserMd },
    NURSE:   { color: '#00838f', label: 'Nurse',   dashPath: '/nurse/dashboard',   icon: FaUserNurse },
    ADMIN:   { color: '#d84315', label: 'Admin',   dashPath: '/admin/dashboard',   icon: FaUserCog },
};

const navLinks = [
  { to: '/', label: 'Home', icon: FaHome },
  { to: '/doctor-list', label: 'Doctors', icon: FaUserMd },
];

const AppNavbar = () => {
    const { user, auth, logout, isAuthenticated } = useAuth();
    const navigate = useNavigate();
    const location = useLocation();
    const [scrolled, setScrolled] = useState(false);

    const role = auth?.role?.toUpperCase() || '';
    const currentRole = roleConfig[role] || { color: '#6c757d', label: role, dashPath: '/', icon: FaUser };

    useEffect(() => {
        const handleScroll = () => setScrolled(window.scrollY > 20);
        window.addEventListener('scroll', handleScroll, { passive: true });
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const handleLogout = () => { logout(); navigate('/'); };

    return (
        <Navbar
            expand="lg"
            variant="dark"
            className={`py-3 ${scrolled ? 'shadow-lg' : ''}`}
            style={{
                background: scrolled 
                    ? 'rgba(15, 23, 42, 0.98)' 
                    : 'linear-gradient(135deg, #0f172a 0%, #1e293b 100%)',
                backdropFilter: 'blur(10px)',
                position: 'sticky',
                top: 0,
                zIndex: 1030,
                transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
                borderBottom: scrolled ? '1px solid rgba(255, 255, 255, 0.08)' : 'none'
            }}
        >
            <Container>
                <Navbar.Brand as={Link} to="/" className="d-flex align-items-center">
                    <FaHospital className="text-white fs-2 me-2" style={{ filter: 'drop-shadow(0 0 8px rgba(255,255,255,0.3))' }} />
                    <div>
                        <div className="fw-bold fs-4 text-white mb-0 lh-1">Hospital</div>
                        <div className="text-info fw-bold small text-uppercase ls-1" style={{ fontSize: '0.65rem', letterSpacing: 2 }}>Manager</div>
                    </div>
                </Navbar.Brand>

                <Navbar.Toggle aria-controls="main-navbar" />
                <Navbar.Collapse id="main-navbar">
                    <Nav className="mx-auto">
                        {navLinks.map(({ to, label }) => (
                            <Nav.Link
                                key={to}
                                as={Link}
                                to={to}
                                className={`mx-2 d-flex align-items-center fw-bold small text-uppercase nav-link-custom ${location.pathname === to ? 'active' : ''}`}
                            >
                                {label}
                            </Nav.Link>
                        ))}
                    </Nav>

                    <Nav className="align-items-center gap-3">
                        {!isAuthenticated ? (
                            <Button as={Link} to="/login" className="btn-portal-login px-4 py-2 fw-black small shadow-sm text-uppercase ls-1">
                                <FaSignInAlt className="me-2" /> Portal Login
                            </Button>
                        ) : (
                            <div className="d-flex align-items-center gap-2 gap-md-3">
                                {role === 'PATIENT' && (
                                    <Button as={Link} to="/patient/book" variant="outline-primary" size="sm" className="btn-book-nav rounded-pill px-3 fw-black small d-none d-lg-flex align-items-center gap-2">
                                        <FaCalendarPlus /> BOOK APPOINTMENT
                                    </Button>
                                )}
                                
                                <Dropdown align="end" className="user-profile-dropdown">
                                    <Dropdown.Toggle as="div" className="d-flex align-items-center gap-3 cursor-pointer user-toggle-pill">
                                        <div className="nav-avatar-container">
                                            <Image 
                                                src={user.profileImage || user.user?.profileImage || `https://ui-avatars.com/api/?name=${encodeURIComponent(user.name || user.user?.name || 'User')}&background=${currentRole.color.replace('#','')}&color=fff`}
                                                roundedCircle
                                                className="nav-profile-img shadow-sm"
                                            />
                                            <div className="nav-status-pulse"></div>
                                        </div>
                                        <div className="d-none d-md-block text-start">
                                            <div className="fw-black text-slate-900 small lh-1 mb-1 ls-tight">
                                                {user.name || user.user?.name || 'Portal User'}
                                            </div>
                                            <Badge bg="none" className="p-0 text-slate-500 font-monospace text-uppercase" style={{ fontSize: '0.6rem', letterSpacing: '1px' }}>
                                                {currentRole.label} ID: {user.id || user.user?.id || '2026'}
                                            </Badge>
                                        </div>
                                    </Dropdown.Toggle>
 
                                    <Dropdown.Menu className="nav-glass-dropdown shadow-2xl border-0 rounded-4 mt-3 py-3 overflow-hidden" style={{ minWidth: '240px' }}>
                                        <div className="px-3 py-2 mb-2">
                                            <div className="fw-black text-slate-400 small text-uppercase ls-2 mb-2" style={{ fontSize: '0.6rem' }}>Clinical Gateway</div>
                                            <div className="d-flex align-items-center gap-3 p-2 bg-slate-50 rounded-4">
                                                <div className="small-avatar">
                                                     <Image 
                                                        src={user.profileImage || user.user?.profileImage || `https://ui-avatars.com/api/?name=${encodeURIComponent(user.name || user.user?.name || 'User')}&background=${currentRole.color.replace('#','')}&color=fff`}
                                                        roundedCircle
                                                        width={32} height={32}
                                                    />
                                                </div>
                                                <div className="overflow-hidden">
                                                    <div className="fw-black text-slate-900 small text-truncate">{user.name || user.user?.name}</div>
                                                    <div className="text-primary fw-bold" style={{ fontSize: '0.65rem' }}>{user.email || user.user?.email}</div>
                                                </div>
                                            </div>
                                        </div>

                                        <Dropdown.Item as={Link} to={currentRole.dashPath} className="nav-dropdown-item py-2 px-3 mx-2 rounded-3">
                                            <div className="d-flex align-items-center gap-3">
                                                <div className="nav-icon-box primary"><currentRole.icon /></div>
                                                <span className="fw-bold small">System Dashboard</span>
                                            </div>
                                        </Dropdown.Item>

                                        <Dropdown.Item as={Link} to={`/${role.toLowerCase()}/profile`} className="nav-dropdown-item py-2 px-3 mx-2 rounded-3">
                                            <div className="d-flex align-items-center gap-3">
                                                <div className="nav-icon-box secure"><FaUser /></div>
                                                <span className="fw-bold small">Health Passport</span>
                                            </div>
                                        </Dropdown.Item>

                                        <Dropdown.Divider className="my-3 opacity-10" />

                                        <Dropdown.Item onClick={handleLogout} className="nav-dropdown-item logout py-2 px-3 mx-2 rounded-3">
                                            <div className="d-flex align-items-center gap-3">
                                                <div className="nav-icon-box danger"><FaSignOutAlt /></div>
                                                <span className="fw-bold small text-danger">Secure Sign Out</span>
                                            </div>
                                        </Dropdown.Item>
                                    </Dropdown.Menu>
                                </Dropdown>
                            </div>
                        )}
                    </Nav>
            </Navbar.Collapse>
            </Container>
            <style>{`
                .nav-link-custom {
                    color: rgba(255, 255, 255, 0.7);
                    transition: all 0.3s ease;
                    position: relative;
                }
                .nav-link-custom:hover, .nav-link-custom.active {
                    color: #fff !important;
                }
                .nav-link-custom::after {
                    content: '';
                    position: absolute;
                    bottom: -5px;
                    left: 50%;
                    width: 0;
                    height: 2px;
                    background: #0ea5e9;
                    transition: all 0.3s ease;
                    transform: translateX(-50%);
                }
                .nav-link-custom:hover::after, .nav-link-custom.active::after {
                    width: 20px;
                }

                .btn-portal-login {
                    background: #0ea5e9;
                    color: white;
                    border: none;
                    border-radius: 100px;
                    transition: all 0.3s ease;
                }
                .btn-portal-login:hover {
                    background: #0284c7;
                    transform: translateY(-2px);
                    box-shadow: 0 10px 20px rgba(14, 165, 233, 0.2);
                }

                .user-toggle-pill {
                    padding: 6px 16px 6px 6px;
                    background: rgba(255, 255, 255, 0.05);
                    border: 1px solid rgba(255, 255, 255, 0.1);
                    border-radius: 100px;
                    transition: all 0.3s ease;
                    color: white !important;
                }
                .user-toggle-pill:hover {
                    background: rgba(255, 255, 255, 0.1);
                    border-color: #0ea5e9;
                    box-shadow: 0 5px 15px rgba(0,0,0,0.2);
                }

                .nav-avatar-container {
                    position: relative;
                }
                .nav-profile-img {
                    width: 42px;
                    height: 42px;
                    object-fit: cover;
                    border: 2px solid rgba(255, 255, 255, 0.2);
                }
                .nav-status-pulse {
                    position: absolute;
                    bottom: 2px;
                    right: 2px;
                    width: 10px;
                    height: 10px;
                    background: #22c55e;
                    border: 2px solid #0f172a;
                    border-radius: 50%;
                }

                .text-slate-900 { color: #fff !important; }
                .text-slate-500 { color: rgba(255, 255, 255, 0.6) !important; }

                .nav-glass-dropdown {
                    background: rgba(15, 23, 42, 0.95) !important;
                    backdrop-filter: blur(20px);
                    border: 1px solid rgba(255, 255, 255, 0.1) !important;
                }

                .nav-dropdown-item {
                    transition: all 0.2s ease;
                    border: 1px solid transparent;
                    color: rgba(255, 255, 255, 0.8) !important;
                }
                .nav-dropdown-item:hover {
                    background: rgba(255, 255, 255, 0.05) !important;
                    border-color: rgba(255, 255, 255, 0.1);
                    color: #fff !important;
                    transform: translateX(4px);
                }

                .nav-icon-box {
                    width: 32px;
                    height: 32px;
                    border-radius: 8px;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    font-size: 0.9rem;
                }
                .nav-icon-box.primary { background: rgba(14, 165, 233, 0.15); color: #0ea5e9; }
                .nav-icon-box.secure { background: rgba(34, 197, 94, 0.15); color: #22c55e; }
                .nav-icon-box.danger { background: rgba(239, 68, 68, 0.15); color: #ef4444; }

                .fw-black { font-weight: 900; }
                .ls-2 { letter-spacing: 2px; }
                .text-slate-400 { color: rgba(255, 255, 255, 0.4); }
                .bg-slate-50 { background: rgba(255, 255, 255, 0.03); }
                .cursor-pointer { cursor: pointer; }
                .ls-tight { letter-spacing: -0.02em; }
                .dropdown-toggle::after { display: none !important; }
            `}</style>
        </Navbar>
    );
};

export default AppNavbar;
