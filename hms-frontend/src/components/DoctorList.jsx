import React, { useState, useEffect, useMemo } from 'react';
import { Container, Row, Col, Form, InputGroup, Button, Spinner } from 'react-bootstrap';
import { FaSearch, FaStethoscope } from 'react-icons/fa';
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
      <div className="text-center py-5">
        <Spinner animation="border" variant="primary" />
        <p className="mt-3 text-muted">Fetching real-time doctor list...</p>
      </div>
    );
  }

  if (error && doctors.length === 0) {
    return (
      <div className="text-center py-5">
        <p className="text-danger">{error}</p>
        <Button variant="outline-primary" onClick={() => window.location.reload()}>Retry</Button>
      </div>
    );
  }

  return (
    <Container className="py-5">
      <div className="d-flex justify-content-between align-items-end mb-5 border-bottom pb-4">
        <div>
          <span style={{
            background: 'rgba(13,110,253,0.08)',
            color: '#1976d2',
            borderRadius: 20,
            padding: '5px 14px',
            fontSize: 12,
            fontWeight: 700,
            letterSpacing: 1,
            textTransform: 'uppercase',
            display: 'inline-flex',
            alignItems: 'center',
            gap: 6,
            marginBottom: 10,
          }}>
            <FaStethoscope size={11} /> Medical Team
          </span>
          <h2 style={{ fontWeight: 900, fontSize: 'clamp(22px, 3vw, 34px)', color: '#1a3a6e', margin: 0 }}>
            Our Available Doctors
          </h2>
        </div>
      </div>

      <Row className="mb-5 g-3">
        <Col md={4}>
          <InputGroup className="shadow-sm rounded-pill border-0 overflow-hidden">
            <InputGroup.Text className="bg-white border-0 ps-4"><FaSearch className="text-muted" /></InputGroup.Text>
            <Form.Control
              placeholder="Search doctors by name or specialty..."
              className="border-0 py-3"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </InputGroup>
        </Col>
        <Col md={3}>
          <Form.Select 
            className="shadow-sm rounded-pill border-0 py-3 px-4"
            value={specialization}
            onChange={(e) => setSpecialization(e.target.value)}
          >
            {specializations.map(s => <option key={s} value={s}>{s}</option>)}
          </Form.Select>
        </Col>
        <Col md={3} className="d-flex align-items-center">
          <Form.Check 
            type="switch"
            id="available-switch"
            label="Show only available"
            className="fw-bold text-muted custom-switch"
            checked={onlyAvailable}
            onChange={(e) => setOnlyAvailable(e.target.checked)}
          />
        </Col>
      </Row>

      <Row className="g-4">
        {filteredDoctors.map((doc) => (
          <Col lg={3} md={6} sm={12} key={doc.id}>
            <DoctorCard doctor={doc} />
          </Col>
        ))}
        {filteredDoctors.length === 0 && (
          <Col xs={12} className="text-center py-5">
            <h4 className="text-muted">No doctors found matching your criteria.</h4>
          </Col>
        )}
      </Row>
    </Container>
  );
};

export default DoctorList;
