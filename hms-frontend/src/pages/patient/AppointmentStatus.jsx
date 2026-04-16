import React, { useState, useEffect } from 'react';
import { FaClipboardList, FaSearch, FaUserMd, FaHeartbeat } from 'react-icons/fa';
import { Button, Row, Col, Badge, Spinner } from 'react-bootstrap';
import axiosInstance from '../../api/axiosInstance';
import paymentService from '../../services/paymentService';
import PatientLayout from '../../components/patient/PatientLayout';
import '../../styles/patient-ui.css';

const DEMO_APPOINTMENTS = [
  { id: 1001, doctorName: 'Dr. Aditi Sharma', specialization: 'Cardiology', appointmentDate: '2026-03-28', appointmentTime: '09:00', symptoms: 'Chest pain', status: 'CONFIRMED' },
  { id: 1002, doctorName: 'Dr. Ramesh Patel', specialization: 'Orthopedics', appointmentDate: '2026-03-30', appointmentTime: '11:30', symptoms: 'Knee pain', status: 'PENDING' },
  { id: 1003, doctorName: 'Dr. Priya Mehta', specialization: 'Dermatology', appointmentDate: '2026-03-20', appointmentTime: '14:00', symptoms: 'Skin rash', status: 'COMPLETED' },
  { id: 1004, doctorName: 'Dr. Sanjay Gupta', specialization: 'Neurology', appointmentDate: '2026-03-15', appointmentTime: '10:00', symptoms: 'Headaches', status: 'CANCELLED' },
];

const statusConfig = {
  All: { color: 'secondary' },
  CONFIRMED: { color: 'primary' },
  PENDING: { color: 'warning' },
  COMPLETED: { color: 'success' },
  CANCELLED: { color: 'danger' },
};

const AppointmentStatus = () => {
  const [filter, setFilter] = useState('All');
  const [search, setSearch] = useState('');
  const [allAppointments, setAllAppointments] = useState([]);
  const [isDemo, setIsDemo] = useState(false);
  const [loading, setLoading] = useState(true);
  const [paying, setPaying] = useState(null);

  useEffect(() => {
    fetchAppointments();
  }, []);

  const fetchAppointments = async () => {
    setLoading(true);
    try {
        const res = await axiosInstance.get('/appointments/my');
        if (res.data && res.data.length > 0) {
          setAllAppointments(res.data);
          setIsDemo(false);
        } else {
          setAllAppointments(DEMO_APPOINTMENTS);
          setIsDemo(true);
        }
    } catch (err) {
        setAllAppointments(DEMO_APPOINTMENTS);
        setIsDemo(true);
    } finally {
        setLoading(false);
    }
  };

  const handlePayment = async (apt) => {
    setPaying(apt.id);
    try {
        const payload = {
            appointmentId: apt.id,
            amount: 500,
            status: 'SUCCESS'
        };
        await paymentService.createPayment(payload);
        alert(`🎉 Payment successful for Appointment #APT-${apt.id}!`);
        fetchAppointments();
    } catch (err) {
        console.error("Payment failed", err);
        alert("Payment service unavailable. This feature requires the monolithic Payment service to be active.");
    } finally {
        setPaying(null);
    }
  };

  const filtered = allAppointments.filter(a => {
    const matchFilter = filter === 'All' || a.status === filter;
    const searchLower = search.toLowerCase();
    const docName = a.doctorName || '';
    const dept = a.specialization || '';
    const aptId = `APT${a.id}`;
    return matchFilter && (docName.toLowerCase().includes(searchLower) || aptId.toLowerCase().includes(searchLower) || dept.toLowerCase().includes(searchLower));
  });

  if (loading) return (
      <div className="d-flex justify-content-center align-items-center vh-100">
          <Spinner animation="grow" variant="primary" />
      </div>
  );

  return (
    <PatientLayout 
        title="My Consultations" 
        subtitle="Track your medical journey and appointment outcomes."
    >
        {isDemo && (
          <div className="alert alert-primary bg-primary bg-opacity-10 border-0 shadow-sm small fw-bold mb-4 rounded-pill d-inline-flex align-items-center gap-2 px-4 py-2">
            <FaHeartbeat className="text-primary" /> System View: Displaying sample records for demonstration.
          </div>
        )}

        <div className="patient-content-card p-4 shadow-sm border-0">
            <div className="d-flex flex-column flex-md-row justify-content-between align-items-md-center gap-3 mb-4">
                <div className="d-flex gap-2 flex-wrap">
                     {Object.entries(statusConfig).map(([status, { color }]) => (
                         <Button 
                            key={status} 
                            size="sm" 
                            variant={filter === status ? color : 'light'}
                            className={`rounded-pill px-3 fw-bold ${filter === status ? 'shadow' : 'text-muted'}`}
                            onClick={() => setFilter(status)}
                         >
                            {status}
                         </Button>
                     ))}
                </div>
                <div className="position-relative" style={{ minWidth: 280 }}>
                     <FaSearch className="position-absolute text-muted" style={{ left: 14, top: 12 }} />
                     <input className="form-control rounded-pill ps-5 border-light bg-light" style={{ fontSize: '0.85rem' }} value={search} onChange={e => setSearch(e.target.value)} placeholder="Search by Consultant or ID..." />
                </div>
            </div>

            <div className="table-responsive">
                <table className="table table-hover align-middle">
                    <thead className="bg-light text-muted small text-uppercase" style={{ fontSize: '0.7rem' }}>
                        <tr>
                            <th className="ps-4 py-3 border-0">Reference ID</th>
                            <th className="border-0 py-3">Consultant</th>
                            <th className="border-0 py-3">Department</th>
                            <th className="border-0 py-3">Schedule</th>
                            <th className="border-0 py-3">Outcome</th>
                        </tr>
                    </thead>
                    <tbody>
                        {filtered.length === 0 ? (
                            <tr><td colSpan="5" className="text-center py-5 text-muted fw-bold">No session records found matching your criteria.</td></tr>
                        ) : (
                            filtered.map(apt => {
                                const colorClass = statusConfig[apt.status]?.color || 'secondary';
                                return (
                                    <tr key={apt.id} style={{ fontSize: '0.9rem' }}>
                                        <td className="ps-4 fw-bold text-primary">#APT-{apt.id}</td>
                                        <td>
                                            <div className="d-flex align-items-center gap-2">
                                                <div className="bg-light p-2 rounded-circle"><FaUserMd className="text-primary" /></div>
                                                <div>
                                                    <div className="fw-bold">{apt.doctorName}</div>
                                                    <small className="text-muted" style={{ fontSize: '0.7rem' }}>Verified Specialist</small>
                                                </div>
                                            </div>
                                        </td>
                                        <td className="text-muted fw-bold small">{apt.specialization || 'Clinical'}</td>
                                        <td>
                                            <div className="fw-bold">{new Date(apt.appointmentDate).toLocaleDateString()}</div>
                                            <small className="text-muted">{apt.appointmentTime}</small>
                                        </td>
                                        <td>
                                            <div className="d-flex align-items-center gap-2">
                                                <Badge className={`rounded-pill px-3 py-2 bg-${colorClass} bg-opacity-10 text-${colorClass}`} style={{ fontWeight: 600 }}>
                                                    {apt.status}
                                                </Badge>
                                                {apt.status === 'CONFIRMED' && (
                                                    <Button 
                                                        size="sm" 
                                                        variant="success" 
                                                        className="rounded-pill px-3 py-1 fw-bold small shadow-sm"
                                                        onClick={() => handlePayment(apt)}
                                                        disabled={paying === apt.id}
                                                    >
                                                        {paying === apt.id ? <Spinner size="sm" /> : 'Pay Now'}
                                                    </Button>
                                                )}
                                            </div>
                                        </td>
                                    </tr>
                                );
                            })
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    </PatientLayout>
  );
};

export default AppointmentStatus;
