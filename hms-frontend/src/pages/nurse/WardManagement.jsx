import React, { useState, useEffect } from 'react';
import wardService from '../../services/wardService';
import patientService from '../../services/patientService';
import { Container, Row, Col, Card, Button, Badge, Spinner, Modal, Form, ListGroup } from 'react-bootstrap';
import { FaHospital, FaDoorClosed, FaArrowRotateRight, FaUserPlus, FaCircleExclamation, FaBedPulse } from 'react-icons/fa6';

const WardManagement = () => {
    const [wards, setWards] = useState([]);
    const [selectedWard, setSelectedWard] = useState(null);
    const [beds, setBeds] = useState([]);
    const [patients, setPatients] = useState([]);
    const [loading, setLoading] = useState(true);
    const [serviceDown, setServiceDown] = useState(false);
    const [showAssignModal, setShowAssignModal] = useState(false);
    const [assignData, setAssignData] = useState({ patientId: '' });

    const fetchWards = async () => {
        setLoading(true);
        setServiceDown(false);
        try {
            const [wardData, patientData] = await Promise.all([
                wardService.getAllWards(),
                patientService.getAllPatients()
            ]);
            
            setWards(wardData || []);
            setPatients(patientData.data || patientData || []);
            
            if (wardData && wardData.length > 0) {
                handleWardSelect(wardData[0]);
            }
        } catch (err) {
            console.error("Ward data fetch failed", err);
            setServiceDown(true);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchWards();
    }, []);

    const handleWardSelect = async (ward) => {
        setLoading(true);
        setSelectedWard(ward);
        try {
            const bedData = await wardService.getBedStatusByWard(ward.id);
            setBeds(bedData || []);
        } catch (err) {
            console.error("Bed fetch failed", err);
        } finally {
            setLoading(false);
        }
    };

    const handleAssign = async (e) => {
        e.preventDefault();
        try {
            await wardService.assignBed({ 
                wardId: selectedWard.id, 
                patientId: assignData.patientId 
            });
            setShowAssignModal(false);
            handleWardSelect(selectedWard);
        } catch (err) {
            alert(err.response?.data?.message || "Assignment failed");
        }
    };

    const handleRelease = async (bedId) => {
        if (!window.confirm("Discharge patient and release bed?")) return;
        try {
            await wardService.releaseBed(bedId);
            handleWardSelect(selectedWard);
        } catch (err) {
            alert("Release failed");
        }
    };

    if (loading && wards.length === 0) return (
        <div className="d-flex justify-content-center align-items-center vh-100 bg-light">
            <Spinner animation="border" variant="info" />
        </div>
    );

    if (serviceDown) {
        return (
            <Container className="py-5 text-center">
                <Card className="border-0 shadow-sm p-5 bg-white rounded-4 m-auto" style={{maxWidth: '600px'}}>
                    <FaCircleExclamation className="text-warning display-1 mb-4 mx-auto" />
                    <h3 className="fw-bold text-dark">Ward service is currently unavailable</h3>
                    <p className="text-muted mb-4">
                        We are experiencing connectivity issues with the clinical ward microservice. 
                        Please try again or contact the system administrator.
                    </p>
                    <Button variant="info" className="px-4 py-2 rounded-pill fw-bold text-white shadow-sm" onClick={fetchWards}>
                        <FaArrowRotateRight className="me-2" />Retry Connection
                    </Button>
                </Card>
            </Container>
        );
    }

    return (
        <Container fluid className="py-4 px-md-4" style={{marginTop: '50px', background: '#f8fafc', minHeight: 'calc(100vh - 50px)'}}>
            <h2 className="fw-bold text-dark mb-4 d-flex align-items-center gap-3">
                <div className="p-2 bg-info bg-opacity-10 text-info rounded-3"><FaHospital /></div>
                Ward & Bed Command Center
            </h2>

            <Row className="g-4">
                {/* Wards List */}
                <Col lg={3}>
                    <Card className="border-0 shadow-sm overflow-hidden rounded-4 bg-white sticky-top" style={{ top: '100px', zIndex: 10 }}>
                        <Card.Header className="bg-info text-white py-3 border-0 d-flex align-items-center gap-2">
                           <FaBedPulse /> <h6 className="mb-0 fw-bold">Active Clinical Wards</h6>
                        </Card.Header>
                        <ListGroup variant="flush">
                            {wards.map((w, i) => (
                                <ListGroup.Item 
                                    key={i} 
                                    action
                                    onClick={() => handleWardSelect(w)}
                                    className={`d-flex justify-content-between align-items-center py-3 border-0 border-bottom ${selectedWard?.id === w.id ? 'bg-light-info fw-bold text-info' : ''}`}
                                    style={selectedWard?.id === w.id ? { borderLeft: '4px solid #0dcaf0 !important' } : {}}
                                >
                                    <div>
                                        <div className="text-dark small fw-bold">{w.wardName}</div>
                                        <small className="text-muted text-uppercase" style={{fontSize: '0.6rem'}}>{w.type}</small>
                                    </div>
                                    <Badge bg={w.availableBeds > 0 ? "info" : "secondary"} pill className="fw-bold">
                                        {w.availableBeds}/{w.totalBeds}
                                    </Badge>
                                </ListGroup.Item>
                            ))}
                        </ListGroup>
                    </Card>
                </Col>

                {/* Beds Map */}
                <Col lg={9}>
                    {selectedWard ? (
                        <Card className="border-0 shadow-sm rounded-4 bg-white animate-in">
                            <Card.Header className="bg-white py-4 px-4 border-0 d-flex justify-content-between align-items-center flex-wrap gap-3">
                                <div>
                                    <h5 className="mb-0 fw-bold text-dark">{selectedWard.wardName} - Real-time Status</h5>
                                    <small className="text-muted">Clinical Type: <span className="text-info fw-bold">{selectedWard.type}</span> | Hospital Node: {selectedWard.hospitalId}</small>
                                </div>
                                <Button variant="info" className="rounded-pill fw-bold px-4 text-white shadow-sm transition-all" onClick={() => setShowAssignModal(true)}>
                                    <FaUserPlus className="me-2" />Assign New Patient
                                </Button>
                            </Card.Header>
                            <Card.Body className="bg-light bg-opacity-50 p-4">
                                <Row className="g-3">
                                    {beds.map((bed, i) => (
                                        <Col xs={6} sm={4} md={3} lg={2} key={i}>
                                            <Card className={`h-100 text-center border-0 shadow-sm rounded-4 border-start border-4 transition-all hover-row ${bed.status === 'OCCUPIED' ? 'bg-white border-danger' : 'bg-white border-success'}`}>
                                                <Card.Body className="p-3">
                                                    <FaDoorClosed className={`fs-3 mb-2 ${bed.status === 'OCCUPIED' ? 'text-danger' : 'text-success'}`} />
                                                    <div className="fw-bold text-dark small">Bed {bed.bedNumber}</div>
                                                    <Badge bg={bed.status === 'OCCUPIED' ? 'danger' : 'success'} className="bg-opacity-10 text-capitalize mb-2" style={{ color: bed.status === 'OCCUPIED' ? '#dc3545' : '#198754', fontSize: '0.6rem' }}>
                                                        {bed.status?.toLowerCase()}
                                                    </Badge>
                                                    
                                                    {bed.status === 'OCCUPIED' && (
                                                        <div className="mt-2 pt-2 border-top">
                                                            <Button 
                                                                variant="outline-danger" 
                                                                size="sm" 
                                                                className="w-100 py-1 transition-all rounded-pill"
                                                                style={{fontSize: '0.65rem'}}
                                                                onClick={() => handleRelease(bed.id)}
                                                            >
                                                                Release Bed
                                                            </Button>
                                                        </div>
                                                    )}
                                                </Card.Body>
                                            </Card>
                                        </Col>
                                    ))}
                                    {beds.length === 0 && !loading && (
                                        <Col xs={12} className="text-center py-5">
                                            <FaDoorClosed className="opacity-10 display-1 mb-3" />
                                            <p className="text-muted fw-medium">No bed configuration found for this ward.</p>
                                        </Col>
                                    )}
                                </Row>
                            </Card.Body>
                        </Card>
                    ) : (
                        <Card className="border-0 shadow-sm rounded-4 p-5 text-center bg-white h-100 d-flex align-items-center justify-content-center">
                            <FaHospital size={64} className="text-info opacity-10 mb-4" />
                            <h5 className="fw-bold text-dark">Select a Ward to Begin</h5>
                            <p className="text-muted small">Choose a clinical ward from the left panel to manage patient allocations and bed status.</p>
                        </Card>
                    )}
                </Col>
            </Row>

            <Modal show={showAssignModal} onHide={() => setShowAssignModal(false)} centered className="border-0">
                <Modal.Header closeButton className="border-0 pb-0">
                    <Modal.Title className="fw-bold h5">Patient Allocation</Modal.Title>
                </Modal.Header>
                <Form onSubmit={handleAssign}>
                    <Modal.Body className="pt-3">
                        <div className="alert alert-info border-0 rounded-4 vstack gap-1 py-3 px-4 mb-4">
                           <small className="fw-bold text-uppercase ls-1">Target Ward</small>
                           <h6 className="mb-0 fw-bold">{selectedWard?.wardName}</h6>
                        </div>
                        <Form.Group className="mb-3">
                            <Form.Label className="text-muted small fw-bold text-uppercase ls-1">Registered Patient</Form.Label>
                            <Form.Select 
                                className="border-0 bg-light py-2 rounded-3" 
                                required
                                value={assignData.patientId}
                                onChange={(e) => setAssignData({...assignData, patientId: e.target.value})}
                            >
                                <option value="">Choose Patient...</option>
                                {patients.map((p, i) => (
                                    <option key={i} value={p.id}>{p.name} (ID: {p.id})</option>
                                ))}
                            </Form.Select>
                        </Form.Group>
                    </Modal.Body>
                    <Modal.Footer className="border-0 pt-0 pb-4 justify-content-center">
                        <Button variant="light" onClick={() => setShowAssignModal(false)} className="rounded-pill px-4 fw-bold text-muted border">Cancel</Button>
                        <Button variant="info" type="submit" className="fw-bold px-4 rounded-pill text-white shadow-sm">Confirm Allocation</Button>
                    </Modal.Footer>
                </Form>
            </Modal>

            <style>{`
                .ls-1 { letter-spacing: 0.5px; }
                .bg-light-info { background-color: #e0f7fa !important; }
                .hover-row:hover { transform: translateY(-3px); box-shadow: 0 8px 20px rgba(0,0,0,0.06) !important; }
                .transition-all { transition: all 0.2s ease-in-out; }
                .animate-in { animation: fadeIn 0.4s ease-out; }
                @keyframes fadeIn { from { opacity: 0; transform: translateY(10px); } to { opacity: 1; transform: translateY(0); } }
            `}</style>
        </Container>
    );
};

export default WardManagement;
