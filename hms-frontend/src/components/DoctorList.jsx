import React, { useState, useEffect, useMemo } from 'react';
import { Container, Row, Col, Form, InputGroup, Spinner } from 'react-bootstrap';
import { FaSearch, FaStethoscope, FaFilter } from 'react-icons/fa';
import { useGlobalState } from '../context/GlobalContext';
import DoctorCard from './DoctorCard';

const DoctorList = () => {
  const { state, fetchInitialData } = useGlobalState();
  const [searchTerm, setSearchTerm] = useState('');
  const [specialization, setSpecialization] = useState('All');
  const [onlyAvailable, setOnlyAvailable] = useState(false);

  const { doctors, loading, error } = state;

  useEffect(() => {
    if (doctors.length === 0 && !loading) {
      fetchInitialData();
    }
  }, [doctors.length, fetchInitialData, loading]);

  const filteredDoctors = useMemo(() => {
    return doctors.filter((doc) => {
      const docName = doc.user?.name || doc.name || '';
      const matchesSearch = docName.toLowerCase().includes(searchTerm.toLowerCase()) || 
                           doc.specialization.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesSpec = specialization === 'All' || doc.specialization === specialization;
      const matchesAvailable = !onlyAvailable || doc.isAvailable !== false;
      return matchesSearch && matchesSpec && matchesAvailable;
    });
  }, [doctors, searchTerm, specialization, onlyAvailable]);

  const specializations = useMemo(() => {
    const specs = Array.from(new Set(doctors.map((d) => d.specialization)));
    return ['All', ...specs];
  }, [doctors]);

  if (loading && doctors.length === 0) {
    return (
      <div className="flex-center py-5 animate-fade-in" style={{ minHeight: '60vh', flexDirection: 'column' }}>
        <Spinner animation="border" variant="primary" />
        <p className="mt-4 fw-semibold text-muted">Curating our medical team...</p>
      </div>
    );
  }

  if (error && doctors.length === 0) {
    return (
      <div className="flex-center py-5 animate-slide-up" style={{ minHeight: '60vh', flexDirection: 'column' }}>
        <div className="p-4 bg-danger-light text-danger rounded-4 mb-4">
            <h5 className="mb-0 fw-bold">Unable to load doctors</h5>
        </div>
        <p className="text-muted mb-4">{error}</p>
        <button className="btn btn-premium btn-premium-primary px-5" onClick={() => window.location.reload()}>Retry Connection</button>
      </div>
    );
  }

  return (
    <div className="app-container py-5 animate-slide-up">
      {/* Premium Header Section */}
      <header className="mb-5">
        <div className="d-flex align-items-center gap-2 mb-3">
          <span className="badge bg-primary-light text-primary px-3 py-2 rounded-pill small fw-bold text-uppercase letter-spacing-wide">
            <FaStethoscope className="me-1" /> Specialist Network
          </span>
        </div>
        <h1 className="fw-bold fs-1 mb-2">Consult with Top Doctors</h1>
        <p className="text-muted fs-5">Access a network of verified medical professionals across multiple specializations.</p>
      </header>

      {/* Filter & Search Bar */}
      <div className="premium-card p-4 mb-5 shadow-sm border-0">
        <Row className="g-3 align-items-center">
            <Col lg={4}>
                <div className="position-relative">
                    <span className="position-absolute translate-middle-y top-50 start-0 ps-3 text-muted">
                        <FaSearch size={14} />
                    </span>
                    <input
                        type="text"
                        placeholder="Search by name or specialty..."
                        className="form-control-premium ps-5"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                </div>
            </Col>
            <Col lg={3}>
                <div className="position-relative">
                    <span className="position-absolute translate-middle-y top-50 start-0 ps-3 text-muted">
                        <FaFilter size={14} />
                    </span>
                    <select 
                        className="form-control-premium ps-5"
                        value={specialization}
                        onChange={(e) => setSpecialization(e.target.value)}
                    >
                        {specializations.map(s => <option key={s} value={s}>{s === 'All' ? 'All Specializations' : s}</option>)}
                    </select>
                </div>
            </Col>
            <Col lg={3} className="px-lg-4">
                <Form.Check 
                    type="switch"
                    id="available-switch"
                    label="Only Available Now"
                    className="fw-semibold text-dark fs-6"
                    checked={onlyAvailable}
                    onChange={(e) => setOnlyAvailable(e.target.checked)}
                />
            </Col>
            <Col lg={2} className="text-lg-end">
                <span className="text-muted small fw-bold">{filteredDoctors.length} Results Found</span>
            </Col>
        </Row>
      </div>

      <Row className="g-4">
        {filteredDoctors.map((doc) => (
          <Col lg={3} md={6} sm={12} key={doc.id}>
            <DoctorCard doctor={doc} />
          </Col>
        ))}
        {filteredDoctors.length === 0 && (
          <Col xs={12} className="text-center py-5">
            <div className="bg-light p-5 rounded-5">
                <FaSearch size={48} className="text-muted mb-3 opacity-25" />
                <h3 className="fw-bold text-dark">No Doctors Found</h3>
                <p className="text-muted">Try adjusting your search terms or filters.</p>
                <button className="btn btn-premium btn-premium-outline mt-3" onClick={() => {setSearchTerm(''); setSpecialization('All');}}>Reset Filters</button>
            </div>
          </Col>
        )}
      </Row>
    </div>
  );
};

export default DoctorList;
