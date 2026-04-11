import React, { useState, useEffect } from 'react';
import { FaUserMd, FaStar, FaSearch } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import { Button, Row, Col, Spinner, Badge } from 'react-bootstrap';
import doctorService from '../../services/doctorService';
import PatientLayout from '../../components/patient/PatientLayout';
import '../../styles/patient-ui.css';

const deptColors = { 
    Cardiology: 'danger', 
    Orthopedics: 'primary', 
    Dermatology: 'info', 
    Neurology: 'dark', 
    Pediatrics: 'warning', 
    'General Medicine': 'success' 
};

const PatientDoctorList = () => {
    const navigate = useNavigate();
    const [search, setSearch] = useState('');
    const [deptFilter, setDeptFilter] = useState('All');
    const [doctors, setDoctors] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        doctorService.getAllDoctors()
            .then(res => {
                const liveDoctors = res.map(d => ({
                    id: d.id,
                    name: d.name || 'Dr. Unknown',
                    dept: d.specialization || 'General',
                    img: d.profileImage,
                    exp: d.experienceYears ? d.experienceYears + ' years' : '5+ years',
                    rating: (Math.random() * 0.5 + 4.5).toFixed(1),
                    available: d.available !== false,
                    fees: '₹' + (d.consultationFee || 500)
                }));
                setDoctors(liveDoctors);
                setLoading(false);
            })
            .catch(err => {
                console.error("Failed to load doctors", err);
                setLoading(false);
            });
    }, []);

    const depts = ['All', ...new Set(doctors.map(d => d.dept))];
    const filtered = doctors.filter(d => {
        const matchSearch = d.name.toLowerCase().includes(search.toLowerCase()) || d.dept.toLowerCase().includes(search.toLowerCase());
        const matchDept = deptFilter === 'All' || d.dept === deptFilter;
        return matchSearch && matchDept;
    });

    if (loading) return (
        <div className="d-flex flex-column justify-content-center align-items-center min-vh-100 bg-light">
            <Spinner animation="border" variant="primary" />
            <p className="mt-3 fw-bold text-primary">Locating specialists...</p>
        </div>
    );

    return (
        <PatientLayout 
            title="Clinical Specialists" 
            subtitle="Direct access to our world-class medical experts."
        >
            <div className="patient-content-card p-4 mb-4">
                <Row className="g-3 align-items-center">
                    <Col md={6}>
                        <div className="position-relative">
                             <FaSearch className="position-absolute text-muted" style={{ left: 14, top: 12 }} />
                             <input className="form-control rounded-pill ps-5 border-2 py-2" value={search} onChange={e => setSearch(e.target.value)} placeholder="Search specialty or doctor name..." />
                        </div>
                    </Col>
                    <Col md={4}>
                        <select className="form-select rounded-pill border-2 py-2 fw-bold" value={deptFilter} onChange={e => setDeptFilter(e.target.value)}>
                            {depts.map(d => <option key={d} value={d}>{d === 'All' ? 'All Specializations' : d}</option>)}
                        </select>
                    </Col>
                </Row>
            </div>

            <Row className="row-cols-1 row-cols-md-2 row-cols-lg-3 g-4 mb-5">
                {filtered.map(doc => {
                    const colorClass = deptColors[doc.dept] || 'primary';
                    return (
                        <Col key={doc.id}>
                            <div className="patient-content-card h-100 p-4 transition-all" style={{ transition: 'all 0.3s ease' }}>
                                <div className="d-flex align-items-center gap-3 mb-4">
                                    <div className={`bg-${colorClass} bg-opacity-10 text-${colorClass} rounded-pill d-flex align-items-center justify-content-center fw-bold`} style={{ width: 50, height: 50, fontSize: '1rem', overflow: 'hidden' }}>
                                        {doc.img ? <img src={doc.img} alt={doc.name} className="w-100 h-100 object-fit-cover" /> : doc.name.split(' ').map(n => n[0]).join('')}
                                    </div>
                                    <div>
                                        <h6 className="fw-bold text-dark mb-1">{doc.name}</h6>
                                        <Badge bg={colorClass} className="bg-opacity-10 text-primary border-primary border" style={{ fontSize: '0.65rem' }}>{doc.dept}</Badge>
                                    </div>
                                </div>

                                <div className="d-flex justify-content-between align-items-center mb-4">
                                    <div className="text-muted small fw-bold">EXPERIENCE: {doc.exp}</div>
                                    <div className="fw-bold text-warning d-flex align-items-center gap-1 small"><FaStar size={12} /> {doc.rating}</div>
                                </div>

                                <div className="mt-auto d-flex justify-content-between align-items-center pt-3 border-top">
                                    <div>
                                        <div className="text-muted small text-uppercase" style={{ fontSize: '0.6rem', letterSpacing: '0.5px' }}>Consultation</div>
                                        <div className="fw-bold text-primary h4 mb-0">{doc.fees}</div>
                                    </div>
                                    <div className="text-end">
                                        <Badge bg={doc.available ? 'success' : 'danger'} className="mb-2 d-block bg-opacity-10 text-success border-success border" style={{ fontSize: '0.6rem' }}>
                                            {doc.available ? 'ONLINE' : 'OFFLINE'}
                                        </Badge>
                                        {doc.available && (
                                            <Button size="sm" variant="primary" className="rounded-pill px-4 fw-bold shadow-sm" onClick={() => navigate('/patient/book')}>
                                                BOOK
                                            </Button>
                                        )}
                                    </div>
                                </div>
                            </div>
                        </Col>
                    );
                })}
            </Row>
        </PatientLayout>
    );
};

export default PatientDoctorList;
