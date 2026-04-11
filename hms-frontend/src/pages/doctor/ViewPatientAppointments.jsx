import React, { useState, useEffect } from 'react';
import { FaCalendarAlt, FaSearch, FaCheck, FaTimes, FaEye, FaClipboardList } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import appointmentService from '../../services/appointmentService';
import doctorService from '../../services/doctorService';
import DoctorLayout from '../../components/doctor/DoctorLayout';
import { Spinner, Badge, Button, Form, InputGroup } from 'react-bootstrap';

const statusColors = { 
    CONFIRMED: 'success', 
    PENDING: 'warning', 
    COMPLETED: 'info', 
    CANCELLED: 'danger',
    REJECTED: 'danger'
};

const ViewPatientAppointments = () => {
  const { auth } = useAuth();
  const navigate = useNavigate();
  const [filter, setFilter] = useState('All');
  const [search, setSearch] = useState('');
  const [apts, setApts] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchApts = async () => {
    try {
        const docProfile = await doctorService.getProfileByUserId(auth.user.id);
        if (docProfile && docProfile.id) {
            const data = await appointmentService.getDoctorAppointments(docProfile.id);
            setApts(data || []);
        }
    } catch (err) {
        console.error("Clinical Fetch Error:", err);
    } finally {
        setLoading(false);
    }
  };

  useEffect(() => {
    if (!auth.user?.id) return;
    fetchApts();
    const pollInterval = setInterval(fetchApts, 15000);
    return () => clearInterval(pollInterval);
  }, [auth.user?.id]);

  const updateStatus = async (id, newStatus) => {
    try {
      await appointmentService.updateStatus(id, newStatus);
      setApts(prev => prev.map(a => a.id === id ? { ...a, status: newStatus } : a));
    } catch(err) {
      console.error("Status Update Failed", err);
    }
  };

  const filtered = apts.filter(a => {
    const matchFilter = filter === 'All' || a.status === filter;
    const pName = a.patientName || '';
    const aptId = `APT${a.id}`;
    const matchSearch = pName.toLowerCase().includes(search.toLowerCase()) || aptId.toLowerCase().includes(search.toLowerCase());
    return matchFilter && matchSearch;
  });

  return (
    <DoctorLayout 
        title="Patient Appointments" 
        subtitle="Review and manage your upcoming clinical consultations."
    >
        <div className="mt-4 animate-in">
            <div className="d-flex gap-2 flex-wrap mb-4">
            {['All', 'PENDING', 'CONFIRMED', 'COMPLETED', 'CANCELLED', 'REJECTED'].map(s => (
                <button 
                    key={s} 
                    onClick={() => setFilter(s)} 
                    className={`btn btn-sm rounded-pill px-4 py-2 fw-bold transition-all ${filter === s ? 'btn-primary shadow-sm active-pill' : 'btn-light border text-muted'}`}
                >
                {s}
                </button>
            ))}
            </div>

            <div className="row mb-5">
                <div className="col-md-6">
                    <InputGroup className="bg-white border rounded-pill overflow-hidden shadow-sm p-1">
                        <InputGroup.Text className="bg-transparent border-0 ps-3"><FaSearch className="text-muted" /></InputGroup.Text>
                        <Form.Control 
                            className="border-0 shadow-none py-2" 
                            style={{ fontSize: '0.95rem' }}
                            value={search} 
                            onChange={e => setSearch(e.target.value)} 
                            placeholder="Search by Patient Name or Clinical Order ID..." 
                        />
                    </InputGroup>
                </div>
            </div>

            <div className="card shadow-sm border-0 rounded-4 overflow-hidden mb-5 bg-white">
            <div className="card-body p-0">
                <div className="table-responsive">
                    <table className="table table-hover align-middle mb-0">
                        <thead className="bg-light text-muted small text-uppercase fw-bold ls-1 ivory-header">
                            <tr>
                                <th className="ps-4 border-0 py-3">ID</th>
                                <th className="border-0 py-3">Patient Profile</th>
                                <th className="border-0 py-3">Clinical Observation</th>
                                <th className="border-0 py-3">Schedule</th>
                                <th className="border-0 py-3">Status</th>
                                <th className="text-end pe-4 border-0 py-3">Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {loading && apts.length === 0 ? (
                                <tr>
                                    <td colSpan="6" className="text-center py-5">
                                        <Spinner animation="grow" variant="primary" size="sm" />
                                        <div className="mt-2 text-muted small fw-bold">Synchronizing Clinical Records...</div>
                                    </td>
                                </tr>
                            ) : filtered.length > 0 ? filtered.map(apt => (
                                <tr key={apt.id} className="transition-all hover-row">
                                    <td className="ps-4 text-primary small fw-bold">APT-{apt.id.toString().padStart(4, '0')}</td>
                                    <td>
                                        <div className="d-flex align-items-center gap-3 py-2">
                                            <div className="p-2 rounded-3 bg-primary bg-opacity-10 text-primary d-flex align-items-center justify-content-center fw-bold" style={{ width: 40, height: 40, fontSize: '0.9rem' }}>
                                                {apt.patientName?.[0] || 'P'}
                                            </div>
                                            <div className="fw-bold text-dark small">{apt.patientName}</div>
                                        </div>
                                    </td>
                                    <td className="small text-muted py-3">
                                        <div className="text-truncate px-2 italic text-secondary" style={{ maxWidth: '250px', fontStyle: 'italic' }}>
                                            "{apt.symptoms || 'General Consultation'}"
                                        </div>
                                    </td>
                                    <td className="small">
                                        <div className="fw-bold text-dark">{new Date(apt.appointmentDate).toDateString()}</div>
                                        <div className="text-muted" style={{ fontSize: '0.7rem' }}>{apt.appointmentTime}</div>
                                    </td>
                                    <td>
                                        <Badge bg={statusColors[apt.status] || 'secondary'} className="bg-opacity-10 text-capitalize px-3 py-2 border rounded-pill" style={{ color: `var(--bs-${statusColors[apt.status] || 'secondary'})`, fontSize: '0.7rem' }}>
                                            {apt.status?.toLowerCase()}
                                        </Badge>
                                    </td>
                                    <td className="text-end pe-4">
                                        <div className="d-flex justify-content-end gap-2">
                                            {apt.status === 'PENDING' ? (
                                                <>
                                                    <Button variant="success" size="sm" onClick={() => updateStatus(apt.id, 'CONFIRMED')} className="rounded-pill px-3 fw-bold small transition-all">Accept</Button>
                                                    <Button variant="outline-danger" size="sm" onClick={() => updateStatus(apt.id, 'REJECTED')} className="rounded-pill px-2 hover-scale"><FaTimes size={12} /></Button>
                                                </>
                                            ) : (
                                                <Button 
                                                    onClick={() => navigate('/doctor/prescription', { 
                                                        state: { 
                                                            patientId: apt.patientId, 
                                                            name: apt.patientName, 
                                                            symptoms: apt.symptoms,
                                                            appointmentId: apt.id,
                                                            doctorId: apt.doctorId
                                                        } 
                                                    })}
                                                    variant="light" className="btn-sm border rounded-pill px-3 fw-bold small text-muted hover-shadow">
                                                    <FaEye className="me-1" /> View Results
                                                </Button>
                                            )}
                                        </div>
                                    </td>
                                </tr>
                            )) : (
                                <tr>
                                    <td colSpan="6" className="text-center py-5 text-muted">
                                        <FaClipboardList size={40} className="opacity-25 mb-3" />
                                        <p className="small fw-bold mb-0">No clinical appointments found for this filter.</p>
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
            </div>
        </div>
        <style>{`
            .ls-1 { letter-spacing: 0.5px; }
            .ivory-header { background-color: #f8f9fa !important; }
            .hover-row:hover { background-color: #f8faff !important; }
            .active-pill { transform: scale(1.05); }
            .hover-shadow:hover { box-shadow: 0 4px 12px rgba(0,0,0,0.05) !important; }
            .hover-scale:hover { transform: scale(1.1); }
        `}</style>
    </DoctorLayout>
  );
};

export default ViewPatientAppointments;
