import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { FaPrescriptionBottleAlt, FaPlus, FaCheckCircle, FaTrash, FaStethoscope, FaHistory } from 'react-icons/fa';
import DoctorLayout from '../../components/doctor/DoctorLayout';
import { useAuth } from '../../context/AuthContext';
import prescriptionService from '../../services/prescriptionService';
import doctorService from '../../services/doctorService';
import { Spinner, Card, Button, Form, Table, Alert, Badge, Col } from 'react-bootstrap';

const PrescriptionNotes = () => {
  const { auth } = useAuth();
  const [form, setForm] = useState({ 
    patientId: '', 
    appointmentId: '',
    doctorId: '',
    date: new Date().toISOString().split('T')[0], 
    diagnosis: '', 
    medications: [{ name: '', dosage: '', duration: '' }], 
    notes: '' 
  });
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState('');
  const [allRx, setAllRx] = useState([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const location = useLocation();

  useEffect(() => {
    if (location.state) {
        const { patientId, name, symptoms, appointmentId, doctorId } = location.state;
        setForm(f => ({
            ...f,
            patientId: patientId || '',
            appointmentId: appointmentId || '',
            doctorId: doctorId || '',
            patientName: name || '', 
            diagnosis: symptoms || ''
        }));
    }
  }, [location.state]);

  const loadPrescriptions = async () => {
    try {
        setLoading(true);
        const docProfile = await doctorService.getProfileByUserId(auth.user.id);
        if (docProfile && docProfile.id) {
            const data = await prescriptionService.getPrescriptionsByDoctorId(docProfile.id);
            setAllRx(data || []);
            if (!form.doctorId) {
                setForm(f => ({ ...f, doctorId: docProfile.id }));
            }
        }
    } catch (err) {
        console.error("Fetch Prescriptions Error:", err);
    } finally {
        setLoading(false);
    }
  };

  useEffect(() => {
    if (!auth.user?.id) return;
    loadPrescriptions();
  }, [auth.user?.id]);

  const addMed = () => setForm(f => ({ ...f, medications: [...f.medications, { name: '', dosage: '', duration: '' }] }));
  const removeMed = i => setForm(f => ({ ...f, medications: f.medications.filter((_, idx) => idx !== i) }));
  const updateMed = (i, field, val) => setForm(f => ({ ...f, medications: f.medications.map((m, idx) => idx === i ? { ...m, [field]: val } : m) }));

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.patientId || !form.diagnosis || !form.appointmentId) { 
        setError('Missing critical consultation data (Patient/Appointment ID).'); 
        return; 
    }

    try {
        setSaving(true);
        setError('');
        
        const payload = {
            doctorId: Number(form.doctorId),
            patientId: Number(form.patientId),
            appointmentId: Number(form.appointmentId),
            notes: form.notes,
            medicines: form.medications.map(m => ({
                name: m.name,
                dosage: m.dosage,
                duration: m.duration
            })).filter(m => m.name && m.dosage)
        };

        await prescriptionService.createPrescription(payload);
        setSubmitted(true);
        loadPrescriptions();

        setTimeout(() => {
            setSubmitted(false);
            setForm(f => ({ 
                ...f, 
                diagnosis: '', 
                medications: [{ name: '', dosage: '', duration: '' }], 
                notes: '' 
            }));
        }, 2000);
    } catch (err) {
        console.error("Save Prescription Error:", err);
        setError(err.response?.data?.message || "Failed to save prescription. Please check service connectivity.");
    } finally {
        setSaving(false);
    }
  };

  return (
    <DoctorLayout 
        title="Prescription & Clinical Notes" 
        subtitle="Digitize prescriptions and patient consultation summaries"
    >
        <div className="mt-4">
            <div className="row g-4 mb-5">
                <div className="col-lg-7">
                    <Card className="shadow-sm border-0 p-4 rounded-4 bg-white animate-in">
                        <h5 className="fw-bold mb-4 d-flex align-items-center gap-2">
                           <div className="p-2 bg-primary bg-opacity-10 text-primary rounded-3"><FaStethoscope size={18} /></div>
                           New Prescription Entry
                        </h5>
                        {submitted && (
                            <Alert variant="success" className="border-0 shadow-sm py-2 px-3 fw-bold small mb-4 rounded-pill d-inline-flex align-items-center gap-2">
                                <FaCheckCircle /> Saved successfully!
                            </Alert>
                        )}
                        {error && <Alert variant="danger" className="py-2 small fw-bold mb-3 border-0 rounded-4 shadow-sm">{error}</Alert>}

                        <Form onSubmit={handleSubmit} className="custom-rx-form">
                            <div className="row g-3">
                                <Col md={7}>
                                    <Form.Label className="small fw-bold text-muted text-uppercase ls-1">Patient</Form.Label>
                                    <div className="form-control bg-light border-0 fw-bold py-2 px-3 rounded-3 text-primary">
                                        {form.patientName ? `${form.patientName} (ID: ${form.patientId})` : "Select from Appointments"}
                                    </div>
                                </Col>
                                <Col md={5}>
                                    <Form.Label className="small fw-bold text-muted text-uppercase ls-1">Session Date</Form.Label>
                                    <Form.Control type="date" className="bg-light border-0 rounded-3 py-2" value={form.date} onChange={e => setForm(f => ({ ...f, date: e.target.value }))} />
                                </Col>
                                <Col xs={12}>
                                    <Form.Label className="small fw-bold text-muted text-uppercase ls-1">Diagnosis / Reason</Form.Label>
                                    <Form.Control type="text" className="bg-light border-0 rounded-3 py-2" value={form.diagnosis} onChange={e => setForm(f => ({ ...f, diagnosis: e.target.value }))} placeholder="e.g. Hypertension, Seasonal Flu" />
                                </Col>

                                <Col xs={12} className="mt-4">
                                    <div className="d-flex justify-content-between align-items-center mb-3">
                                        <h6 className="fw-bold mb-0 text-dark">Medication Regimen</h6>
                                        <Button size="sm" variant="outline-success" onClick={addMed} className="rounded-pill px-3 fw-bold d-flex align-items-center gap-2 border-2">
                                            <FaPlus size={10} /> Add Medicine
                                        </Button>
                                    </div>
                                    <div className="table-responsive rounded-4 border overflow-hidden">
                                        <Table borderless size="sm" className="align-middle mb-0">
                                            <thead className="bg-light">
                                                <tr className="small text-muted text-uppercase fw-bold ls-1" style={{fontSize: '0.65rem'}}>
                                                    <th className="ps-3 py-3">Drug Name</th>
                                                    <th className="py-3">Dosage</th>
                                                    <th className="py-3">Duration</th>
                                                    <th className="pe-3"></th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {form.medications.map((med, i) => (
                                                    <tr key={i} className="border-top">
                                                        <td className="ps-3 py-2"><Form.Control className="form-control-sm bg-light border-0 rounded-3" value={med.name} onChange={e => updateMed(i, 'name', e.target.value)} placeholder="Name" /></td>
                                                        <td className="py-2"><Form.Control className="form-control-sm bg-light border-0 rounded-3" value={med.dosage} onChange={e => updateMed(i, 'dosage', e.target.value)} placeholder="e.g. 1-0-1" /></td>
                                                        <td className="py-2"><Form.Control className="form-control-sm bg-light border-0 rounded-3" value={med.duration} onChange={e => updateMed(i, 'duration', e.target.value)} placeholder="e.g. 5 days" /></td>
                                                        <td className="text-end pe-3">
                                                            {i > 0 && <Button variant="link" onClick={() => removeMed(i)} className="text-danger p-0 border-0"><FaTrash size={12} /></Button>}
                                                        </td>
                                                    </tr>
                                                ))}
                                            </tbody>
                                        </Table>
                                    </div>
                                </Col>

                                <Col xs={12} className="mt-4">
                                    <Form.Label className="small fw-bold text-muted text-uppercase ls-1">Clinical Observations & Advice</Form.Label>
                                    <Form.Control as="textarea" className="bg-light border-0 rounded-4 p-3" value={form.notes} onChange={e => setForm(f => ({ ...f, notes: e.target.value }))} placeholder="Write your clinical notes here..." rows={4} />
                                </Col>

                                <Col xs={12} className="pt-3">
                                    <Button type="submit" disabled={saving} variant="success" className="w-100 py-3 fw-bold shadow-lg rounded-pill border-0 transition-all hover-scale" style={{ background: 'linear-gradient(to right, #198754, #157347)' }}>
                                        {saving ? (
                                            <>
                                                <Spinner animation="border" size="sm" className="me-2" />
                                                Recording Consultation...
                                            </>
                                        ) : 'Generate & Save Prescription'}
                                    </Button>
                                </Col>
                            </div>
                        </Form>
                    </Card>
                </div>

                <div className="col-lg-5">
                    <h5 className="fw-bold text-dark mb-4 d-flex align-items-center gap-2">
                        <div className="p-2 bg-success bg-opacity-10 text-success rounded-3"><FaHistory size={16} /></div>
                        Recent Digital Records
                    </h5>
                    <div className="vstack gap-3 animate-in" style={{ animationDelay: '0.1s' }}>
                        {loading ? (
                            <div className="text-center py-5 bg-white rounded-4 shadow-sm">
                                <Spinner animation="grow" variant="success" size="sm" />
                                <div className="text-muted small mt-2 fw-bold ls-1">Syncing medical history...</div>
                            </div>
                        ) : allRx.length > 0 ? allRx.map((rx, i) => (
                            <Card key={rx.id || i} className="border-0 shadow-sm border-start border-success border-4 p-3 rounded-4 bg-white hover-shadow transition-all">
                                <Card.Body className="p-0">
                                    <div className="d-flex justify-content-between mb-2">
                                        <span className="fw-bold text-dark">{rx.patientName || 'Patient'}</span>
                                        <Badge bg="light" text="muted" className="border">{rx.createdAt ? new Date(rx.createdAt).toLocaleDateString() : 'Today'}</Badge>
                                    </div>
                                    <div className="small text-muted mb-2 lh-sm">🩺 <span className="fw-bold text-dark">{rx.notes?.substring(0, 80) || 'Clinical Note'}...</span></div>
                                    <div className="small text-success fw-bold d-flex align-items-center gap-2">
                                        <FaPrescriptionBottleAlt size={12} />
                                        {rx.medicines?.map(m => m.name).join(', ') || 'No medications listed'}
                                    </div>
                                </Card.Body>
                            </Card>
                        )) : (
                            <div className="card border-0 shadow-sm p-5 text-center text-muted small bg-white rounded-4">
                               <FaHistory size={32} className="opacity-25 mb-3 mx-auto" />
                               <p className="mb-0 fw-bold">No historical prescriptions found.</p>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
        <style>{`
            .ls-1 { letter-spacing: 0.5px; }
            .hover-scale { transition: transform 0.2s; }
            .hover-scale:hover { transform: scale(1.01); }
            .custom-rx-form .form-control:focus { background-color: #fff !important; box-shadow: 0 0 0 3px rgba(25, 135, 84, 0.1) !important; border-color: #198754 !important; }
        `}</style>
    </DoctorLayout>
  );
};

export default PrescriptionNotes;
