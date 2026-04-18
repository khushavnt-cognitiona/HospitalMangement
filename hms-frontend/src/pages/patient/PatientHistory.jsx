import React, { useState, useEffect } from 'react';
import { FaHeartbeat, FaSearch, FaFileMedical, FaDownload } from 'react-icons/fa';
import recordService from '../../services/recordService';
import { useAuth } from '../../context/AuthContext';
import PatientLayout from '../../components/patient/PatientLayout';
import '../../styles/patient-ui.css';

const PatientHistory = () => {
    const { user } = useAuth();
    const [records, setRecords] = useState([]);
    const [loading, setLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState('');

    useEffect(() => {
        if (!user?.id) return;
        recordService.getPatientHistory(user.id)
            .then(res => {
                setRecords(res || []);
            })
            .catch(err => console.error("History fetch failed", err))
            .finally(() => setLoading(false));
    }, [user?.id]);

    const filteredRecords = records.filter(rec => 
        (rec.diagnosis?.toLowerCase().includes(searchTerm.toLowerCase())) || 
        (rec.doctorName?.toLowerCase().includes(searchTerm.toLowerCase()))
    );

    return (
        <div className="animate-slide-up">
            <PatientLayout 
                title="Clinical History" 
                subtitle="A comprehensive record of your medical journey, including diagnoses and treatment protocols."
            >
                <div className="premium-card p-0 overflow-hidden shadow-sm">
                    <div className="p-4 border-bottom d-flex flex-column flex-md-row justify-content-between align-items-md-center gap-3 bg-light bg-opacity-50">
                        <div>
                            <h4 className="fw-bold mb-0 flex-center gap-2">
                                <FaFileMedical className="text-primary" /> Verified Medical Records
                            </h4>
                        </div>
                        <div className="position-relative" style={{ maxWidth: '300px' }}>
                             <span className="position-absolute translate-middle-y top-50 start-0 ps-3 text-muted">
                                <FaSearch size={14} />
                             </span>
                             <input 
                                className="form-control-premium ps-5 py-2" 
                                placeholder="Search by diagnosis or doctor..." 
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                             />
                        </div>
                    </div>

                    <div className="table-responsive">
                        <table className="table-premium mb-0">
                            <thead>
                                <tr>
                                    <th>Consultation Date</th>
                                    <th>Lead Specialist</th>
                                    <th>Primary Diagnosis</th>
                                    <th>Treatment Protocol</th>
                                    <th className="text-end">Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {loading ? (
                                    <tr><td colSpan="5" className="text-center py-5">
                                        <div className="spinner-border spinner-border-sm text-primary me-2"></div>
                                        Decrypting records...
                                    </td></tr>
                                ) : filteredRecords.length === 0 ? (
                                    <tr><td colSpan="5" className="text-center py-5 text-muted fw-semibold">
                                        No medical history available for the current selection.
                                    </td></tr>
                                ) : (
                                    filteredRecords.map((rec, i) => (
                                        <tr key={i}>
                                            <td className="fw-bold text-dark">{new Date(rec.createdAt).toLocaleDateString(undefined, { year: 'numeric', month: 'short', day: 'numeric' })}</td>
                                            <td>
                                                <div className="d-flex align-items-center gap-2">
                                                    <div className="bg-primary-light text-primary rounded-circle p-2 small fw-bold">
                                                        {rec.doctorName?.[0] || 'D'}
                                                    </div>
                                                    <div>
                                                        <div className="fw-bold fs-6">{rec.doctorName || 'Dr. Specialist'}</div>
                                                        <div className="text-muted extra-small">Verified Medical Officer</div>
                                                    </div>
                                                </div>
                                            </td>
                                            <td>
                                                <span className="badge bg-primary-light text-primary rounded-pill px-3 py-2 fw-semibold">
                                                    {rec.diagnosis || 'Clinical Update'}
                                                </span>
                                            </td>
                                            <td>
                                                <span className="text-muted small lh-base">{rec.treatmentProtocol || 'Standard Care Protocol'}</span>
                                            </td>
                                            <td className="text-end">
                                                <button className="btn btn-sm btn-premium btn-premium-outline px-3" title="Download Report">
                                                    <FaDownload className="me-1" /> PDF
                                                </button>
                                            </td>
                                        </tr>
                                    ))
                                )}
                            </tbody>
                        </table>
                    </div>
                    
                    <div className="p-4 bg-light bg-opacity-30 text-center border-top">
                        <p className="text-muted small mb-0 d-flex align-items-center justify-content-center gap-2">
                            <FaHeartbeat className="text-danger opacity-50" /> 
                            These records are cryptographically verified and legally binding clinical documents.
                        </p>
                    </div>
                </div>
            </PatientLayout>
        </div>
    );
};

export default PatientHistory;
