import React from "react";
import { Card, Button } from "react-bootstrap";
import { FaHeartbeat, FaFileMedical } from "react-icons/fa";

const LatestEHR = ({ records = [] }) => {
    return (
        <Card className="card-premium border-0 p-4 h-100 bg-white shadow-sm d-flex flex-column">
            <h4 className="fw-black text-dark mb-5 d-flex align-items-center gap-2">
                <FaVibrantHeartbeat /> Latest EHR
            </h4>
            
            <div className="flex-grow-1 d-flex flex-column align-items-center justify-content-center py-5">
                <div className="bg-light rounded-circle d-flex align-items-center justify-content-center mb-4 transition-all hover-lift shadow-inner" style={{ width: '90px', height: '90px' }}>
                    <FaFileMedical size={40} className="text-muted opacity-25" />
                </div>
                <p className="text-muted fw-bold text-center px-4">No clinical records available.</p>
            </div>
            
            <Button variant="outline-primary" className="rounded-pill fw-bold py-3 mt-4 text-uppercase ls-1 hover-lift shadow-sm">
                Access Full Medical Vault
            </Button>
        </Card>
    );
};

// Reusable Vibrant Icon
const FaVibrantHeartbeat = () => (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#dc3545" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" className="animate-pulse">
        <path d="M22 12h-4l-3 9L9 3l-3 9H2" />
    </svg>
);

export default LatestEHR;
