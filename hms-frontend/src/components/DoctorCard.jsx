import React from 'react';
import { Card, Badge } from 'react-bootstrap';
import { FaUserMd, FaStar, FaCheckCircle, FaTimesCircle, FaCalendarAlt } from 'react-icons/fa';
import { Link } from 'react-router-dom';

const defaultDoctorImg = "https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?w=400&h=300&fit=crop";

const DoctorCard = ({ doctor }) => {
  const isAvailable = doctor.isAvailable !== false; 
  const docName = doctor.user?.name || doctor.name || "Doctor";

  return (
    <div className="h-100 animate-fade-in">
      <Card className="premium-card h-100 overflow-hidden border-0 shadow-sm transition-all duration-300 hover-shadow-lg">
        <div className="position-relative" style={{ height: '200px', overflow: 'hidden' }}>
          <Card.Img
            variant="top"
            src={doctor.profileImage || doctor.image || defaultDoctorImg}
            style={{ width: '100%', height: '100%', objectFit: 'cover', transition: 'transform 0.5s ease' }}
            className="doctor-card-img"
          />
          <div className="position-absolute top-0 start-0 w-100 h-100 bg-gradient-to-t from-black/60 to-transparent"></div>
          
          <div className="position-absolute top-3 end-3">
            <Badge bg={isAvailable ? 'success' : 'danger'} className="rounded-pill px-3 py-2 fw-bold shadow-sm" style={{ backdropFilter: 'blur(4px)', backgroundColor: isAvailable ? 'rgba(16, 185, 129, 0.9)' : 'rgba(239, 68, 68, 0.9)' }}>
              {isAvailable ? <><FaCheckCircle className="me-1" /> Available</> : <><FaTimesCircle className="me-1" /> Busy</>}
            </Badge>
          </div>

          <div className="position-absolute bottom-3 start-3 d-flex align-items-center gap-2">
            <div className="bg-white/90 rounded-3 px-2 py-1 small fw-bold text-dark d-flex align-items-center gap-1 shadow-sm" style={{ backdropFilter: 'blur(4px)' }}>
              <FaStar className="text-warning" /> {doctor.rating || '4.5'}
            </div>
          </div>
        </div>

        <Card.Body className="p-4 d-flex flex-column bg-white">
          <div className="mb-3">
            <h5 className="fw-bold text-dark mb-1 fs-5">{docName}</h5>
            <p className="text-primary small fw-semibold text-uppercase letter-spacing-wide mb-0">{doctor.specialization}</p>
          </div>

          <div className="row g-2 mb-4">
            <div className="col-6">
              <div className="p-2 rounded-3 bg-light border border-light-subtle text-center">
                <div className="extra-small text-muted text-uppercase fw-bold mb-1">Exp.</div>
                <div className="small fw-bold text-dark">{doctor.experienceYears || doctor.experience || '5+'} Years</div>
              </div>
            </div>
            <div className="col-6">
              <div className="p-2 rounded-3 bg-light border border-light-subtle text-center">
                <div className="extra-small text-muted text-uppercase fw-bold mb-1">Fee</div>
                <div className="small fw-bold text-primary">₹{doctor.consultationFee || doctor.fee || '500'}</div>
              </div>
            </div>
          </div>

          <Link 
            to={isAvailable ? "/patient/book" : "#"} 
            className={`btn btn-premium w-100 mt-auto py-2 fw-bold d-flex align-items-center justify-content-center gap-2 ${isAvailable ? 'btn-premium-primary' : 'btn-secondary opacity-50 cursor-not-allowed'}`}
          >
            {isAvailable ? <><FaCalendarAlt size={14} /> Book Appointment</> : "Consultation Full"}
          </Link>
        </Card.Body>
      </Card>
      
      <style>{`
        .doctor-card-img:hover {
          transform: scale(1.1);
        }
        .bg-gradient-to-t {
          background: linear-gradient(to top, rgba(0,0,0,0.6) 0%, transparent 100%);
        }
      `}</style>
    </div>
  );
};

export default DoctorCard;
