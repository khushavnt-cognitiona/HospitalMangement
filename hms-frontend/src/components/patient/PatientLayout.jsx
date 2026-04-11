import React from 'react';
import { Container } from 'react-bootstrap';
import PatientSubNav from './PatientSubNav';

const PatientLayout = ({ children, title = 'Health Control Center', subtitle = 'Your medical journey is in sync.', showSubNav = true }) => {
  return (
    <div className="patient-portal-container">
      <Container className="px-lg-5">
        {showSubNav && <PatientSubNav />}
        
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

export default PatientLayout;
