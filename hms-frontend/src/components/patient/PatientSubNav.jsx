import React from 'react';
import { NavLink } from 'react-router-dom';
import { FaHome, FaCalendarPlus, FaHistory, FaFileInvoiceDollar, FaShieldAlt, FaUser } from 'react-icons/fa';

const PatientSubNav = () => {
    const navItems = [
        { path: '/patient/dashboard', label: 'Overview', icon: <FaHome /> },
        { path: '/patient/book', label: 'Book Visit', icon: <FaCalendarPlus /> },
        { path: '/patient/appointments', label: 'History', icon: <FaHistory /> },
        { path: '/patient/billing', label: 'Billings', icon: <FaFileInvoiceDollar /> },
        { path: '/patient/plans', label: 'Plans', icon: <FaShieldAlt /> },
        { path: '/patient/profile', label: 'Profile', icon: <FaUser /> }
    ];

    return (
        <div className="patient-subnav-wrapper">
            <div className="patient-subnav-container">
                {navItems.map((item, index) => (
                    <NavLink 
                        key={index} 
                        to={item.path} 
                        className={({ isActive }) => `patient-nav-pill ${isActive ? 'active' : ''}`}
                    >
                        <span className="icon">{item.icon}</span>
                        <span>{item.label}</span>
                    </NavLink>
                ))}
            </div>
        </div>
    );
};

export default PatientSubNav;
