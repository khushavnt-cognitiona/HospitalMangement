import React from 'react';
import { Button } from 'react-bootstrap';
import { FaHeartbeat, FaFileMedical } from 'react-icons/fa';

const EHRTimeline = ({ records }) => {
    return (
        <div className="patient-content-card">
            <div className="patient-card-header">
                <h4 className="patient-card-title">Latest EHR</h4>
                <FaHeartbeat className="text-danger opacity-50" />
            </div>
            <div className="p-4">
                {records.length > 0 ? (
                    <div className="records-timeline">
                        {records.map((record, i) => (
                            <div key={i} className="mb-4 d-flex gap-3 align-items-start">
                                <div className="bg-primary bg-opacity-10 p-2 rounded-3 text-primary">
                                    <FaFileMedical />
                                </div>
                                <div className="flex-grow-1">
                                    <h6 className="mb-0 fw-800 text-dark">{record.recordType || 'Clinical Journal'}</h6>
                                    <p className="text-muted small mb-1 fw-bold">{record.description?.substring(0, 40) || 'Routine clinical entry'}...</p>
                                    <small className="text-primary fw-bold" style={{ fontSize: '0.7rem' }}>
                                        {new Date(record.createdAt || record.date).toLocaleDateString()}
                                    </small>
                                </div>
                            </div>
                        ))}
                        <Button variant="light" className="w-100 rounded-pill fw-bold text-primary py-2 mt-2">View Full Vault</Button>
                    </div>
                ) : (
                    <div className="text-center py-5">
                        <div className="bg-light rounded-circle mx-auto mb-3 d-flex align-items-center justify-content-center" style={{ width: '60px', height: '60px' }}>
                            <FaFileMedical className="text-muted opacity-30" size={24} />
                        </div>
                        <h6 className="fw-bold text-dark">No clinical records</h6>
                        <p className="text-muted small px-3">Your electronic health records will appear here after your first visit.</p>
                    </div>
                )}
            </div>
            
            <div className="m-4 mt-0 p-4 rounded-4 bg-primary bg-opacity-5 border border-primary border-opacity-10">
                <div className="d-flex align-items-center gap-2 mb-2">
                    <div className="bg-warning rounded-circle p-1" style={{ fontSize: '0.5rem' }}>✨</div>
                    <span className="text-primary fw-800 small text-uppercase" style={{ letterSpacing: '1px' }}>Health Tip</span>
                </div>
                <p className="small text-dark fw-bold mb-0">Remember to stay hydrated! Drinking 8 glasses of water daily boosts immunity.</p>
            </div>
        </div>
    );
};

export default EHRTimeline;
