import React from 'react';
import DoctorSubNav from './DoctorSubNav';
import { Container } from 'react-bootstrap';
import '../../styles/patient-ui.css';

const DoctorLayout = ({ children, title = 'Clinical Hub', subtitle = 'Manage your patient diagnostics and care schedule.', showSubNav = true }) => {
  return (
    <div className="patient-portal-container">
      <Container className="px-lg-5">
        {showSubNav && <DoctorSubNav />}
        
        <div className="patient-page-header animate-in">
          <h1 className="patient-page-title">{title}</h1>
          <p className="patient-page-subtitle">{subtitle}</p>
        </div>

        <div className="patient-page-content animate-in" style={{ animationDelay: '0.1s' }}>
          {children}
        </div>
      </Container>
    </div>
  );
};

export default DoctorLayout;
