import React from 'react';
import { Card, Button, Badge } from 'react-bootstrap';
import { FaUserMd, FaStar, FaCheckCircle, FaTimesCircle } from 'react-icons/fa';
import { Link } from 'react-router-dom';

// import defaultDoctorImg from '../assets/images/default-doctor.jpg';
const defaultDoctorImg = "https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?w=400&h=300&fit=crop";

const DoctorCard = ({ doctor }) => {
  const isAvailable = doctor.isAvailable !== false; 

  return (
    <div className="doctor-card-wrapper h-100">
      <Card className="h-100 border-0 shadow-sm transition-hover" style={{ borderRadius: 20, overflow: 'hidden' }}>
        <div style={{ position: 'relative', height: 220, overflow: 'hidden' }}>
          <Card.Img
            variant="top"
            src={doctor.profileImage || doctor.image || defaultDoctorImg}
            style={{ width: '100%', height: '100%', objectFit: 'cover' }}
          />
          <div style={{ position: 'absolute', top: 12, right: 12 }}>
            <Badge bg={isAvailable ? 'success' : 'danger'} className="rounded-pill px-3 py-2">
              {isAvailable ? <><FaCheckCircle className="me-1" /> Available</> : <><FaTimesCircle className="me-1" /> Busy</>}
            </Badge>
          </div>
          <div style={{
            position: 'absolute', bottom: 12, left: 12,
            background: 'rgba(255,255,255,0.9)', borderRadius: 12, padding: '4px 8px',
            fontSize: 12, fontWeight: 700, color: '#1a3a6e'
          }}>
            <FaStar className="text-warning me-1" /> {doctor.rating || '4.5'}
          </div>
        </div>

        <Card.Body className="p-4 d-flex flex-column">
          <div className="mb-3">
            <h5 className="fw-bold text-dark mb-1">{doctor.user?.name || doctor.name}</h5>
            <p className="text-primary small fw-bold mb-0">{doctor.specialization}</p>
          </div>

          <div className="d-flex justify-content-between align-items-center bg-light rounded-3 p-2 mb-3 small">
            <span className="text-muted"><FaUserMd className="me-1" /> {doctor.experienceYears || doctor.experience || '5+'} yrs</span>
            <span className="fw-bold text-dark">₹{doctor.consultationFee || doctor.fee || '500'}</span>
          </div>

          <Button 
            as={Link} 
            to={isAvailable ? "/patient/book" : "#"} 
            variant={isAvailable ? "primary" : "secondary"}
            className="w-100 rounded-pill fw-bold mt-auto"
            disabled={!isAvailable}
          >
            {isAvailable ? "Book Appointment" : "Currently Unavailable"}
          </Button>
        </Card.Body>
      </Card>
    </div>
  );
};

export default DoctorCard;
