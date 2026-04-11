import React from 'react';
import { NavLink } from 'react-router-dom';
import { FaStethoscope, FaCalendarCheck, FaClipboardList, FaUserCircle, FaHistory } from 'react-icons/fa';
import '../../styles/patient-ui.css'; 

const DoctorSubNav = () => {
  const navItems = [
    { name: 'Overview', icon: <FaStethoscope />, path: '/doctor/dashboard' },
    { name: 'Appointments', icon: <FaCalendarCheck />, path: '/doctor/appointments' },
    { name: 'EHR Records', icon: <FaClipboardList />, path: '/doctor/records' },
    { name: 'Clinical History', icon: <FaHistory />, path: '/doctor/history' },
    { name: 'Profile', icon: <FaUserCircle />, path: '/doctor/profile' }
  ];

  return (
    <div className="patient-subnav-wrapper">
      <div className="patient-subnav-container">
        {navItems.map((item, index) => (
          <NavLink
            key={index}
            to={item.path}
            className={({ isActive }) => 
              `patient-nav-pill ${isActive ? 'active' : ''} text-decoration-none d-flex align-items-center gap-2`
            }
          >
            <span className="icon">{item.icon}</span>
            <span className="d-none d-md-inline">{item.name}</span>
          </NavLink>
        ))}
      </div>
    </div>
  );
};

export default DoctorSubNav;
