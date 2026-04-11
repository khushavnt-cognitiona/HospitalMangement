import React, { useState } from 'react';
import { FaUserPlus, FaUserCheck, FaUserXmark, FaCircleInfo } from 'react-icons/fa6';
import { Container, Row, Col, Card, Alert, Badge, Button, Dropdown, ListGroup } from 'react-bootstrap';
import { useAuth } from '../../context/AuthContext';

const allPatients = [
  { id: 'P001', name: 'John Patient', age: 35, condition: 'Hypertension', ward: 'Ward A', bed: 4 },
  { id: 'P002', name: 'Mary Smith', age: 28, condition: 'Arrhythmia', ward: 'Ward B', bed: 1 },
  { id: 'P003', name: 'Robert Brown', age: 52, condition: 'Heart Failure', ward: 'Ward A', bed: 1 },
  { id: 'P004', name: 'Linda Wilson', age: 44, condition: 'Angina', ward: 'Ward A', bed: 3 },
  { id: 'P005', name: 'James Taylor', age: 61, condition: 'Post-bypass', ward: 'Ward B', bed: 2 },
  { id: 'P006', name: 'Emily Clark', age: 30, condition: 'Pericarditis', ward: 'Ward B', bed: 4 },
  { id: 'P007', name: 'David Martinez', age: 47, condition: 'Knee Replacement', ward: 'Ward C', bed: 1 },
];

const nursesList = [
  { id: 'N001', name: 'Nurse Emily Davis', shift: 'Morning' },
  { id: 'N002', name: 'Nurse Priya Singh', shift: 'Evening' },
  { id: 'N003', name: 'Nurse Karen White', shift: 'Night' },
  { id: 'N004', name: 'Nurse Laura Jones', shift: 'Morning' },
];

const PatientAssignment = () => {
  const { auth } = useAuth();
  const [assignments, setAssignments] = useState({ N001: 'P001', N002: 'P002', N003: null, N004: null });
  const [assigning, setAssigning] = useState(null); 
  const [toast, setToast] = useState('');

  const assignedPatientIds = Object.values(assignments).filter(Boolean);
  const unassignedPatients = allPatients.filter(p => !assignedPatientIds.includes(p.id));

  const assign = (nurseId, patientId) => {
    setAssignments(prev => ({ ...prev, [nurseId]: patientId }));
    setAssigning(null);
    const nurse = nursesList.find(n => n.id === nurseId)?.name;
    const patient = allPatients.find(p => p.id === patientId)?.name;
    setToast(`✅ ${patient} assigned to ${nurse}`);
    setTimeout(() => setToast(''), 3000);
  };

  const unassign = (nurseId) => {
    const patient = allPatients.find(p => p.id === assignments[nurseId])?.name;
    setAssignments(prev => ({ ...prev, [nurseId]: null }));
    setToast(`🔁 ${patient} unassigned`);
    setTimeout(() => setToast(''), 3000);
  };

  return (
    <Container fluid className="py-4 px-md-4" style={{marginTop: '50px', background: '#f8fafc', minHeight: 'calc(100vh - 50px)'}}>
        <h2 className="fw-bold text-dark mb-1 d-flex align-items-center gap-3">
           <div className="p-2 bg-info bg-opacity-10 text-info rounded-3 text-info"><FaUserPlus /></div>
           Patient Care Allocation
        </h2>
        <p className="text-muted small mb-4 ms-5 mt-n2">Assign one patient per nurse • Professional clinical workflow</p>

        <Alert variant="info" className="border-0 shadow-sm d-flex align-items-center gap-3 mb-4 rounded-4 p-3 animate-in">
            <FaCircleInfo className="text-info fs-4" />
            <span className="small fw-medium">Each nurse can only be assigned <strong>one patient at a time</strong>. Unassign current patient before allocating a new one.</span>
        </Alert>

        {toast && (
            <Alert variant="success" className="border-0 shadow-sm py-2 mb-3 fw-bold small rounded-pill px-4 animate-in">
                {toast}
            </Alert>
        )}

        <Row className="g-4 mb-4">
            {nursesList.map(nurse => {
                const assignedPid = assignments[nurse.id];
                const assignedPatient = assignedPid ? allPatients.find(p => p.id === assignedPid) : null;
                return (
                    <Col md={6} lg={4} key={nurse.id}>
                        <Card className="shadow-sm border-0 h-100 p-3 rounded-4 bg-white transition-all hover-shadow">
                            <div className="d-flex align-items-center gap-3 mb-3 border-bottom pb-3">
                                <div className="avatar bg-info bg-opacity-10 text-info rounded-circle d-flex align-items-center justify-content-center fw-bold" style={{ width: 45, height: 45, fontSize: '0.9rem' }}>
                                    {nurse.name[0]}
                                </div>
                                <div className="flex-grow-1">
                                    <div className="fw-bold text-dark small">{nurse.name}</div>
                                    <Badge bg="light" text="muted" pill className="fw-bold border mt-1" style={{fontSize: '0.6rem'}}>{nurse.shift} Shift</Badge>
                                </div>
                                <div className={`badge rounded-pill ${assignedPatient ? 'bg-success' : 'bg-warning'} bg-opacity-10`} style={{ color: assignedPatient ? '#198754' : '#ffc107', fontSize: '0.6rem' }}>
                                    {assignedPatient ? 'Assigned' : 'Available'}
                                </div>
                            </div>

                            {assignedPatient ? (
                                <div className="bg-light-info rounded-4 p-3 mb-2 border-start border-info border-4 shadow-sm animate-in">
                                    <small className="text-muted text-uppercase fw-bold d-block mb-1 ls-1" style={{fontSize: '0.6rem'}}>Current Active Patient</small>
                                    <div className="fw-bold text-dark small mb-1">{assignedPatient.name}</div>
                                    <div className="text-muted" style={{fontSize: '0.7rem'}}>
                                        <span className="fw-bold text-info">#{assignedPatient.id}</span> · {assignedPatient.ward} · Bed {assignedPatient.bed}
                                    </div>
                                    <Button variant="outline-danger" size="sm" onClick={() => unassign(nurse.id)} className="w-100 mt-3 rounded-pill fw-bold border-2 transition-all hover-scale" style={{fontSize: '0.7rem'}}>
                                        <FaUserXmark className="me-1" /> Terminate Assignment
                                    </Button>
                                </div>
                            ) : (
                                <div className="text-center py-2 h-100 d-flex flex-column justify-content-between">
                                    <p className="text-muted small mb-3 italic">Waiting for clinical allocation...</p>
                                    <Dropdown show={assigning === nurse.id} onToggle={() => setAssigning(assigning === nurse.id ? null : nurse.id)}>
                                        <Dropdown.Toggle as={Button} variant="info" className="w-100 rounded-pill fw-bold text-white shadow-sm py-2 transition-all hover-scale" style={{fontSize: '0.75rem'}}>
                                            <FaUserPlus className="me-1" /> New Assignment
                                        </Dropdown.Toggle>
                                        <Dropdown.Menu className="w-100 border-0 shadow-lg rounded-4 p-2 mt-2 animate-in slide-in">
                                            <div className="px-3 py-2 text-muted small fw-bold text-uppercase ls-1 border-bottom">Choose Patient</div>
                                            {unassignedPatients.map(p => (
                                                <Dropdown.Item key={p.id} onClick={() => assign(nurse.id, p.id)} className="rounded-3 py-2 transition-all hover-row">
                                                    <div className="fw-bold text-dark small">{p.name}</div>
                                                    <div className="text-muted d-flex justify-content-between align-items-center" style={{fontSize: '0.65rem'}}>
                                                        <span>{p.ward} · {p.condition}</span>
                                                        <Badge bg="light" text="muted" className="border">PID: {p.id}</Badge>
                                                    </div>
                                                </Dropdown.Item>
                                            ))}
                                            {unassignedPatients.length === 0 && <Dropdown.Item disabled className="text-center italic small p-3">No unassigned patients</Dropdown.Item>}
                                        </Dropdown.Menu>
                                    </Dropdown>
                                </div>
                            )}
                        </Card>
                    </Col>
                );
            })}
        </Row>

        <Card className="shadow-sm border-0 mt-5 rounded-4 overflow-hidden bg-white">
            <Card.Header className="bg-white py-4 px-4 border-0 border-bottom">
                <h6 className="mb-0 fw-bold text-dark d-flex align-items-center gap-2">
                    <FaUserCheck className="text-info" /> Unassigned Patient Waitlist ({unassignedPatients.length})
                </h6>
            </Card.Header>
            <Card.Body className="p-4 bg-light bg-opacity-50">
                <Row className="g-3">
                    {unassignedPatients.map(p => (
                        <Col md={6} lg={4} key={p.id}>
                            <div className="bg-white border rounded-4 p-3 d-flex justify-content-between align-items-center hover-shadow transition-all">
                                <div className="vstack gap-1">
                                    <span className="small fw-bold text-dark">{p.name}</span>
                                    <span className="text-muted" style={{fontSize: '0.65rem'}}>{p.condition}</span>
                                </div>
                                <Badge bg="warning" text="dark" className="bg-opacity-10 px-3 py-2 rounded-pill fw-bold" style={{ color: '#856404', fontSize: '0.65rem' }}>
                                    {p.ward}
                                </Badge>
                            </div>
                        </Col>
                    ))}
                    {unassignedPatients.length === 0 && (
                        <Col xs={12} className="text-center py-4">
                           <div className="p-3 bg-white d-inline-block rounded-circle mb-2"><FaUserCheck className="text-success fs-3" /></div>
                           <p className="text-muted small fw-bold mb-0">All patients currently have assigned nurse care.</p>
                        </Col>
                    )}
                </Row>
            </Card.Body>
        </Card>

        <style>{`
            .ls-1 { letter-spacing: 0.5px; }
            .bg-light-info { background-color: #e0f7fa !important; }
            .hover-row:hover { background-color: #f8f9fa !important; }
            .hover-shadow:hover { box-shadow: 0 8px 15px rgba(0,0,0,0.05) !important; }
            .hover-scale:hover { transform: scale(1.02); }
            .animate-in { animation: fadeIn 0.4s ease-out; }
            .slide-in { animation: slideIn 0.3s ease-out; }
            @keyframes fadeIn { from { opacity: 0; transform: translateY(10px); } to { opacity: 1; transform: translateY(0); } }
            @keyframes slideIn { from { opacity: 0; transform: translateY(5px); } to { opacity: 1; transform: translateY(0); } }
        `}</style>
    </Container>
  );
};

export default PatientAssignment;
