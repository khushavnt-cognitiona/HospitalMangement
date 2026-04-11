import React, { useState, useEffect } from 'react';
import { Row, Col, Card, Form, InputGroup, Badge, Button, Spinner } from 'react-bootstrap';
import { FaSearch, FaUserInjured, FaTimes, FaFileMedical, FaNotesMedical } from 'react-icons/fa';
import patientService from '../../services/patientService';
import recordService from '../../services/recordService';
import DoctorLayout from '../../components/doctor/DoctorLayout';

const EHRRecords = () => {
  const [search, setSearch] = useState('');
  const [patientsList, setPatientsList] = useState([]);
  const [selected, setSelected] = useState(null);
  const [loading, setLoading] = useState(true);
  const [fetchingDetails, setFetchingDetails] = useState(false);
  const [patientHistory, setPatientHistory] = useState([]);

  useEffect(() => {
    fetchPatients();
  }, []);

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
        title="Electronic Health Records" 
        subtitle="Manage longitudinal patient medical histories and clinical documentation."
    >
        <div className="mt-4">
            <Row className="g-4">
                <Col lg={selected ? 4 : 12}>
                    <div className="mb-4">
                        <InputGroup className="overflow-hidden rounded-pill border shadow-sm bg-white" style={{ maxWidth: 450 }}>
                            <InputGroup.Text className="bg-white border-0"><FaSearch className="text-muted" /></InputGroup.Text>
                            <Form.Control 
                                className="border-0 shadow-none ps-0" 
                                style={{ fontSize: '0.9rem' }}
                                value={search} 
                                onChange={e => setSearch(e.target.value)} 
                                placeholder="Search by name, ID, or condition..." 
                            />
                        </InputGroup>
                    </div>

                    <div className="vstack gap-3">
                        {loading ? (
                            <div className="text-center py-5"><Spinner animation="border" variant="primary" /></div>
                        ) : filtered.length > 0 ? filtered.map(p => {
                            const isSelected = selected?.id === p.id;
                            return (
                                <Card 
                                    key={p.id} 
                                    onClick={() => handleSelectPatient(p)}
                                    className={`border-0 shadow-sm rounded-4 overflow-hidden cursor-pointer transition-all ${isSelected ? 'border-start border-primary border-4 bg-primary bg-opacity-10' : 'bg-white'}`}
                                >
                                    <div className="p-3">
                                        <div className="d-flex justify-content-between align-items-start">
                                            <div className="d-flex align-items-center gap-3">
                                                <div className={`avatar rounded-circle d-flex align-items-center justify-content-center ${isSelected ? 'bg-primary text-white' : 'bg-light text-primary'}`} style={{ width: 48, height: 48 }}>
                                                    <FaUserInjured size={20} />
                                                </div>
                                                <div>
                                                    <div className="fw-bold text-dark">{p.name || 'Patient'}</div>
                                                    <div className="text-muted small" style={{ fontSize: '0.75rem' }}>ID: {p.id} · {p.gender}</div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </Card>
                            );
                        }) : (
                            <div className="text-center py-5 text-muted small">No patient records match your search.</div>
                        )}
                    </div>
                </Col>

                {selected && (
                    <Col lg={8}>
                        <Card className="border-0 shadow-sm rounded-4 overflow-hidden bg-white">
                            <Card.Header className="bg-white border-0 py-4 px-4 d-flex justify-content-between align-items-center">
                                <h5 className="fw-bold text-dark mb-0 d-flex align-items-center gap-2">
                                    <FaFileMedical className="text-primary" /> Clinical Review
                                </h5>
                                <Button variant="light" size="sm" onClick={() => setSelected(null)} className="rounded-circle border-0"><FaTimes /></Button>
                            </Card.Header>

                            <Card.Body className="px-4 pb-4">
                                <div className="bg-light rounded-4 p-4 mb-4 d-flex align-items-center gap-4">
                                    <div className="avatar bg-white border rounded-circle d-flex align-items-center justify-content-center shadow-sm" style={{ width: 80, height: 80 }}>
                                        <FaUserInjured size={36} className="text-primary" />
                                    </div>
                                    <div className="flex-grow-1">
                                        <h4 className="fw-bold mb-1 text-dark">{selected.name}</h4>
                                        <div className="d-flex gap-3 small text-muted fw-medium">
                                            <span><strong className="text-dark">Gender:</strong> {selected.gender || '--'}</span>
                                            <span><strong className="text-dark">Phone:</strong> {selected.phone || 'Not set'}</span>
                                        </div>
                                    </div>
                                </div>

                                <h6 className="fw-bold text-muted text-uppercase mb-3 d-flex align-items-center gap-2" style={{ fontSize: '0.75rem' }}>
                                    <FaNotesMedical /> Clinical Records & History
                                </h6>
                                {fetchingDetails ? (
                                    <div className="text-center py-4"><Spinner size="sm" /></div>
                                ) : patientHistory.length > 0 ? (
                                    <div className="vstack gap-3 mb-4">
                                        {patientHistory.map((rec, i) => (
                                            <div key={i} className="p-3 rounded-4 border bg-white border-start border-primary border-4">
                                                <div className="d-flex justify-content-between">
                                                    <div className="fw-bold text-dark mb-1">{rec.diagnosis || 'Clinical Update'}</div>
                                                    <small className="text-muted">{new Date(rec.createdAt).toLocaleDateString()}</small>
                                                </div>
                                                <div className="p-2 bg-light rounded small">{rec.treatmentProtocol || rec.notes}</div>
                                            </div>
                                        ))}
                                    </div>
                                ) : (
                                    <div className="p-4 bg-light rounded-4 text-center mb-4 border border-dashed text-muted small">
                                        No historical clinical records found.
                                    </div>
                                )}
                            </Card.Body>
                        </Card>
                    </Col>
                )}
            </Row>
        </div>
    </DoctorLayout>
  );
};

export default EHRRecords;
