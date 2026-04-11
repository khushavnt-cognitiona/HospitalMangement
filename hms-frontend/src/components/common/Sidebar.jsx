import React from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import authService from '../services/authService';

const Sidebar = () => {
    const { auth, logout } = useAuth();
    const navigate = useNavigate();

    const handleLogout = () => {
        authService.logout();
        logout();
        navigate('/');
    };

    const menuItems = {
        ADMIN: [
            { path: '/admin/dashboard', icon: 'bi-speedometer2', label: 'Dashboard' },
            { path: '/admin/profile', icon: 'bi-person-circle', label: 'My Profile' },
            { path: '/admin/hospitals', icon: 'bi-building', label: 'Hospitals' },
            { path: '/admin/doctors', icon: 'bi-person-badge', label: 'Doctors' },
            { path: '/admin/subscriptions', icon: 'bi-card-list', label: 'Plans' },
        ],
        DOCTOR: [
            { path: '/doctor/dashboard', icon: 'bi-speedometer2', label: 'Dashboard' },
            { path: '/doctor/profile', icon: 'bi-person-circle', label: 'My Profile' },
            { path: '/doctor/history', icon: 'bi-file-earmark-medical', label: 'EHR Records' },
            { path: '/doctor/availability', icon: 'bi-clock', label: 'Availability' },
            { path: '/doctor/subscriptions', icon: 'bi-star', label: 'Subscriptions' },
        ],
        PATIENT: [
            { path: '/patient/dashboard', icon: 'bi-house-heart', label: 'Dashboard' },
            { path: '/patient/profile', icon: 'bi-person-circle', label: 'My Profile' },
            { path: '/patient/book', icon: 'bi-plus-circle', label: 'Book Visit' },
            { path: '/patient/history', icon: 'bi-folder2-open', label: 'Medical History' },
            { path: '/patient/billings', icon: 'bi-credit-card', label: 'Billings' },
            { path: '/patient/subscriptions', icon: 'bi-star', label: 'Subscriptions' },
        ],
        NURSE: [
            { path: '/nurse/dashboard', icon: 'bi-heart-pulse', label: 'Dashboard' },
            { path: '/nurse/profile', icon: 'bi-person-circle', label: 'My Profile' },
            { path: '/nurse/wards', icon: 'bi-hospital', label: 'Ward Management' },
            { path: '/nurse/assignments', icon: 'bi-person-plus', label: 'Patient Assignment' },
        ]
    };

    const currentMenu = menuItems[auth.role?.toUpperCase()] || [];

    return (
        <div className="bg-dark text-white vh-100 d-flex flex-column p-0 shadow-lg" style={{ width: '220px', position: 'fixed', left: 0, top: 0, zIndex: 1000 }}>
            <div className="p-4 text-center border-bottom border-secondary mb-3 bg-gradient" style={{ background: 'rgba(255,255,255,0.05)' }}>
                <h5 className="mb-0 text-info fw-bold tracking-wider">{auth.role} PORTAL</h5>
            </div>
            
            <div className="flex-grow-1 overflow-auto px-3">
                <ul className="nav nav-pills flex-column mb-auto">
                    {currentMenu.map((item, idx) => (
                        <li className="nav-item mb-2" key={idx}>
                            <NavLink 
                                to={item.path} 
                                className={({ isActive }) => 
                                    `nav-link text-white d-flex align-items-center py-2 px-3 rounded-3 transition-all ${isActive ? 'active bg-primary shadow' : 'bg-transparent hover-bg-light-opacity border-0'}`
                                }
                            >
                                <i className={`bi ${item.icon} me-3 fs-5`}></i>
                                <span style={{ fontSize: '0.95rem', fontWeight: 500 }}>{item.label}</span>
                            </NavLink>
                        </li>
                    ))}
                </ul>
            </div>

            <div className="mt-auto p-4 border-top border-secondary bg-gradient" style={{ background: 'rgba(255,255,255,0.02)' }}>
                <div className="d-flex align-items-center mb-3">
                    <div className="bg-info rounded-circle d-flex align-items-center justify-content-center me-3 shadow-sm" style={{ width: 42, height: 42, minWidth: 42 }}>
                        <span className="fw-bold text-dark fs-5">{auth.user?.name?.charAt(0).toUpperCase() || 'U'}</span>
                    </div>
                    <div className="overflow-hidden">
                        <p className="mb-0 fw-bold text-truncate" style={{ fontSize: '0.9rem' }}>{auth.user?.name || 'User'}</p>
                        <small className="text-secondary d-block text-truncate" style={{ fontSize: '0.75rem' }}>{auth.user?.email || auth.role}</small>
                    </div>
                </div>
                <button 
                    onClick={handleLogout}
                    className="btn btn-outline-danger btn-sm w-100 rounded-pill d-flex align-items-center justify-content-center gap-2 py-2 fw-bold shadow-sm"
                    style={{ transition: 'all 0.3s' }}
                >
                    <i className="bi bi-box-arrow-right"></i> Logout
                </button>
            </div>

            <style>{`
                .hover-bg-light-opacity:hover { background: rgba(255,255,255,0.1) !important; }
                .tracking-wider { letter-spacing: 0.1em; }
                .transition-all { transition: all 0.2s ease-in-out; }
                .nav-link.active { transform: translateX(5px); }
            `}</style>
        </div>
    );
};

export default Sidebar;
