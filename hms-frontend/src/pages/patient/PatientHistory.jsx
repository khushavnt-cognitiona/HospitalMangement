import React, { useState, useEffect } from 'react';
import { FaHeartbeat, FaSearch } from 'react-icons/fa';
import recordService from '../../services/recordService';
import { useAuth } from '../../context/AuthContext';
import PatientLayout from '../../components/patient/PatientLayout';
import '../../styles/patient-ui.css';

const PatientHistory = () => {
    const { auth } = useAuth();
    const [records, setRecords] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (!auth.user?.id) return;
        recordService.getPatientHistory(auth.user.id)
            .then(res => {
                setRecords(res || []);
            })
            .catch(err => console.error("History fetch failed", err))
            .finally(() => setLoading(false));
    }, [auth.user]);

    return (
        <PatientLayout 
            title="Clinical Outcomes" 
            subtitle="Access your verified medical trajectory and consultation records."
        >
            <div className="patient-content-card p-4 shadow-sm border-0">
                <div className="d-flex justify-content-between align-items-center mb-4">
                    <h6 className="fw-bold text-muted mb-0 small text-uppercase">Historical Records</h6>
                    <div className="position-relative" style={{ maxWidth: '250px' }}>
                         <FaSearch className="position-absolute text-muted" style={{ left: 14, top: 12 }} />
                         <input className="form-control rounded-pill ps-5 border-light bg-light" style={{ fontSize: '0.85rem' }} placeholder="Search records..." />
                    </div>
                </div>

                <div className="table-responsive">
                    <table className="table table-hover align-middle">
                        <thead className="bg-light">
                            <tr className="text-muted small text-uppercase" style={{ fontSize: '0.7rem', letterSpacing: '0.05em' }}>
                                <th className="ps-4 py-3 border-0">Timestamp</th>
                                <th className="border-0 py-3">Lead Specialist</th>
                                <th className="border-0 py-3">Diagnosis</th>
                                <th className="border-0 py-3">Protocol</th>
                                <th className="text-end pe-4 border-0 py-3">Status</th>
                            </tr>
                        </thead>
                        <tbody>
                            {loading ? (
                                <tr><td colSpan="5" className="text-center py-5">Loading records...</td></tr>
                            ) : records.length === 0 ? (
                                <tr><td colSpan="5" className="text-center py-5 text-muted">No clinical history found.</td></tr>
                            ) : (
                                records.map((rec, i) => (
                                    <tr key={i} style={{ fontSize: '0.9rem' }}>
                                        <td className="ps-4 fw-bold text-dark py-3">{new Date(rec.createdAt).toLocaleDateString()}</td>
                                        <td className="py-3">
                                            <div className="fw-bold">{rec.doctorName || 'Dr. Specialist'}</div>
                                            <div className="text-muted small" style={{ fontSize: '0.7rem' }}>Verified Consultant</div>
                                        </td>
                                        <td className="py-3">
                                            <span className="badge bg-primary bg-opacity-10 text-primary rounded-pill px-3 py-1" style={{ fontSize: '0.75rem' }}>
                                                {rec.diagnosis || 'Clinical Update'}
                                            </span>
                                        </td>
                                        <td className="text-muted py-3">{rec.treatmentProtocol || 'Standard Protocol'}</td>
                                        <td className="text-end pe-4 py-3">
                                            <span className="text-success small fw-bold d-flex align-items-center justify-content-end gap-1">
                                                <FaHeartbeat className="text-danger" size={12} /> Finalized
                                            </span>
                                        </td>
                                    </tr>
                                ))
                            )}
                        </tbody>
                    </table>
                </div>
                
                <div className="text-center py-4 bg-light bg-opacity-50 mt-3 rounded-3 border border-dashed">
                    <div className="text-muted small fw-bold opacity-75">End of Clinical Records</div>
                </div>
            </div>
        </PatientLayout>
    );
};

export default PatientHistory;
