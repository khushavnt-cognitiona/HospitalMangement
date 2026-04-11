import React, { useState, useEffect } from 'react';
import { Row, Col, Card, Form, InputGroup, Badge, Button, Spinner } from 'react-bootstrap';
import { FaUsers, FaSearch, FaUserInjured, FaTimes, FaFileMedical, FaNotesMedical, FaCheckCircle, FaExclamationTriangle } from 'react-icons/fa';
import patientService from '../../services/patientService';
import recordService from '../../services/recordService';
import DoctorLayout from '../../components/doctor/DoctorLayout';

const statusColors = { 
    Active: 'primary', 
    Critical: 'danger', 
    Stable: 'success',
    'In-Patient': 'info',
    'Out-Patient': 'secondary'
};

const PatientDetailsPage = () => {
    const [search, setSearch] = useState('');
    const [patientsList, setPatientsList] = useState([]);
    const [selected, setSelected] = useState(null);
    const [loading, setLoading] = useState(true);
    const [fetchingDetails, setFetchingDetails] = useState(false);
    const [patientHistory, setPatientHistory] = useState([]);

    useEffect(() => {
        const fetchPatients = async () => {
            try {
                const response = await patientService.getAllPatients();
                setPatientsList(response.data || response || []); 
            } catch (err) {
                console.error("Failed to fetch patients", err);
            } finally {
                setLoading(false);
            }
        };
        fetchPatients();
    }, []);

    const handleSelectPatient = async (p) => {
        if (selected?.id === p.id) {
            setSelected(null);
            setPatientHistory([]);
            return;
        }
        
        setSelected(p);
        setFetchingDetails(true);
        try {
            const history = await recordService.getPatientHistory(p.id);
            setPatientHistory(history || []);
        } catch (err) {
            console.error("Failed to fetch patient history", err);
        } finally {
            setFetchingDetails(false);
        }
    };

    const filtered = (Array.isArray(patientsList) ? patientsList : []).filter(p =>
        (p.name || '').toLowerCase().includes(search.toLowerCase()) ||
        (p.id?.toString() || '').toLowerCase().includes(search.toLowerCase())
    );

    return (
        <DoctorLayout 
            title="Care Central: Patient Explorer" 
            subtitle="In-depth patient demographics and longitudinal medical history records."
        >
            <div className="mt-4">
                <Row className="g-4">
                    <Col lg={selected ? 5 : 12}>
                        <div className="mb-4">
                            <InputGroup className="overflow-hidden rounded-pill border shadow-sm bg-white" style={{ maxWidth: 450 }}>
                                <InputGroup.Text className="bg-white border-0"><FaSearch className="text-muted" /></InputGroup.Text>
                                <Form.Control 
                                    className="border-0 shadow-none ps-0 py-2 small"
                                    value={search} 
                                    onChange={e => setSearch(e.target.value)} 
                                    placeholder="Filter global patient records..." 
                                />
                            </InputGroup>
                        </div>

                        <div className="vstack gap-2">
                            {loading ? (
                                <div className="text-center py-5"><Spinner animation="grow" variant="success" size="sm" /></div>
                            ) : filtered.length > 0 ? filtered.map(p => {
                                const isSelected = selected?.id === p.id;
                                return (
                                    <Card 
                                        key={p.id} 
                                        onClick={() => handleSelectPatient(p)}
                                        className={`border-0 shadow-sm p-3 cursor-pointer transition-all ${isSelected ? 'border-start border-success border-4 bg-light shadow' : 'bg-white'}`}
                                    >
                                        <div className="d-flex justify-content-between align-items-start">
                                            <div className="d-flex align-items-center gap-3">
                                                <div className="avatar bg-success bg-opacity-10 text-success rounded-circle d-flex align-items-center justify-content-center" style={{ width: 42, height: 42 }}>
                                                    <FaUserInjured size={18} />
                                                </div>
                                                <div>
                                                    <div className="fw-bold text-dark small">{p.name || 'Anonymous'}</div>
                                                    <div className="text-muted" style={{ fontSize: '0.7rem' }}>ID: {p.id} · {p.gender} · {p.age || '--'}y</div>
                                                </div>
                                            </div>
                                            <Badge bg="success" className="bg-opacity-10 text-success border border-success rounded-pill fw-bold" style={{ fontSize: '0.6rem' }}>Stable</Badge>
                                        </div>
                                    </Card>
                                );
                            }) : (
                                <div className="text-center py-5 text-muted small fw-bold">No patient files found.</div>
                            )}
                        </div>
                    </Col>

                    {selected && (
                        <Col lg={7}>
                            <Card className="border-0 shadow-sm h-100 p-4 sticky-top rounded-4 bg-white" style={{ top: '100px' }}>
                                <div className="d-flex justify-content-between align-items-center mb-4 pb-2 border-bottom">
                                    <h5 className="fw-bold mb-0 text-success d-flex align-items-center gap-2">
                                        <FaFileMedical /> Clinical Portfolio
                                    </h5>
                                    <Button variant="light" size="sm" onClick={() => setSelected(null)} className="rounded-circle border-0"><FaTimes /></Button>
                                </div>

                                <div className="bg-light rounded-4 p-4 mb-4 d-flex align-items-center gap-4">
                                    <div className="avatar bg-white border rounded-circle d-flex align-items-center justify-content-center shadow-lg" style={{ width: 70, height: 70 }}>
                                        <FaUserInjured size={32} className="text-success" />
                                    </div>
                                    <div className="flex-grow-1">
                                        <h4 className="fw-bold mb-1 text-dark">{selected.name}</h4>
                                        <div className="d-flex gap-3 small text-muted font-monospace">
                                            <span><strong>BLOOD:</strong> O+</span>
                                            <span><strong>STATUS:</strong> STABLE</span>
                                        </div>
                                    </div>
                                </div>

                                <Row className="g-3 mb-5">
                                    <Col md={6}>
                                        <label className="text-muted small fw-bold d-block text-uppercase mb-2" style={{ fontSize: '0.65rem' }}>Primary Diagnosis</label>
                                        <div className="bg-light bg-opacity-50 border rounded-3 p-3 small fw-bold d-flex align-items-center gap-2">
                                            <FaExclamationTriangle className="text-warning" /> General Observation
                                        </div>
                                    </Col>
                                    <Col md={6}>
                                        <label className="text-muted small fw-bold d-block text-uppercase mb-2" style={{ fontSize: '0.65rem' }}>Last Identity Check</label>
                                        <div className="bg-light bg-opacity-50 border rounded-3 p-3 small d-flex align-items-center gap-2">
                                            <FaCheckCircle className="text-success" /> {new Date().toLocaleDateString()}
                                        </div>
                                    </Col>
                                </Row>

                                <h6 className="fw-bold mb-4 d-flex align-items-center gap-2 text-dark">
                                    <FaNotesMedical className="text-success" /> Clinical Interaction Log
                                </h6>
                                {fetchingDetails ? (
                                    <div className="text-center py-5"><Spinner size="sm" variant="success" /></div>
                                ) : patientHistory.length > 0 ? (
                                    <div className="vstack gap-3 mb-4">
                                        {patientHistory.map((rec, i) => (
                                            <div key={i} className="p-3 rounded-4 border bg-white border-start border-success border-4 shadow-sm">
                                                <div className="d-flex justify-content-between mb-2">
                                                    <div className="fw-bold text-dark">{rec.diagnosis || 'Clinical Update'}</div>
                                                    <small className="badge bg-light text-dark border">{new Date(rec.createdAt).toLocaleDateString()}</small>
                                                </div>
                                                <div className="p-2 bg-light rounded text-muted small">{rec.notes || rec.treatmentProtocol}</div>
                                            </div>
                                        ))}
                                    </div>
                                ) : (
                                    <div className="p-5 bg-light rounded-4 text-center mb-4 border border-dashed">
                                        <FaFileMedical size={30} className="mb-3 opacity-25" />
                                        <p className="small text-muted mb-0 fw-bold">No historical treatment logs found for this patient.</p>
                                    </div>
                                )}
                            </Card>
                        </Col>
                    )}
                </Row>
            </div>
            <style>{`
                .cursor-pointer { cursor: pointer; }
                .transition-all { transition: all 0.2s cubic-bezier(0.4, 0, 0.2, 1); }
            `}</style>
        </DoctorLayout>
    );
};

export default PatientDetailsPage;
