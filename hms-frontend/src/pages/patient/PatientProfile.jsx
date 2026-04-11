import React, { useState, useEffect, useRef } from 'react';
import { 
  FaUser, FaEdit, FaSave, FaTimes, FaPhone, FaEnvelope, 
  FaBirthdayCake, FaMapMarkerAlt, FaFileMedical, FaCamera, FaHeartbeat, FaSearchPlus
} from 'react-icons/fa';
import { useAuth } from '../../context/AuthContext';
import patientService from '../../services/patientService';
import { Button, Row, Col, Spinner, Badge } from 'react-bootstrap';
import PatientLayout from '../../components/patient/PatientLayout';
import '../../styles/patient-ui.css';

const PatientProfile = () => {
  const { auth, updateUser } = useAuth();
  const fileInputRef = useRef(null);
  const [editing, setEditing] = useState(false);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState({ type: '', text: '' });
  const [profileId, setProfileId] = useState(null);
  
  const [form, setForm] = useState({
    name: '', email: '', gender: '', phone: '', dob: '', bloodGroup: '', 
    address: '', weight: '', height: '', bio: '', medicalHistory: '', profileImage: ''
  });

  useEffect(() => {
    if (!auth.user?.id) return;
    fetchProfile();
  }, [auth.user?.id]);

  const fetchProfile = async () => {
    setLoading(true);
    try {
      const response = await patientService.getProfileByUserId(auth.user.id);
      const data = response?.data || (response?.id ? response : null);
      setProfileId(data?.id || null);

      setForm({
        name: data?.name || auth.user?.name || '',
        email: data?.email || auth.user?.email || '',
        phone: data?.phone || '',
        dob: data?.dob || '', 
        gender: data?.gender || '',
        bloodGroup: data?.bloodGroup || '',
        address: data?.address || '',
        weight: data?.weight || '',
        height: data?.height || '',
        bio: data?.bio || '',
        medicalHistory: data?.medicalHistory || '',
        profileImage: data?.profileImage || ''
      });
    } catch (err) {
      console.error("Profile fetch failed:", err);
    } finally {
      setLoading(false);
    }
  };

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setForm(prev => ({ ...prev, profileImage: reader.result }));
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSave = async () => {
    setSaving(true);
    setMessage({ type: '', text: '' });
    try {
      const patientData = {
        userId: auth.user.id,
        name: form.name,
        email: form.email,
        gender: form.gender,
        phone: form.phone,
        dob: form.dob,
        address: form.address,
        bloodGroup: form.bloodGroup,
        weight: parseFloat(form.weight) || 0,
        height: parseFloat(form.height) || 0,
        bio: form.bio,
        medicalHistory: form.medicalHistory,
        profileImage: form.profileImage
      };

      if (profileId) {
        await patientService.updateProfile(profileId, patientData);
        setMessage({ type: 'success', text: '✅ Clinical Profile updated successfully!' });
      } else {
        const response = await patientService.createProfile(patientData);
        if (response?.id) setProfileId(response.id);
        setMessage({ type: 'success', text: '🎉 Clinical Profile created successfully!' });
      }
      
      setEditing(false);
      setTimeout(() => setMessage({ type: '', text: '' }), 5000);
      if (updateUser) updateUser({ name: form.name, profileImage: form.profileImage });
    } catch (err) {
      setMessage({ type: 'danger', text: `❌ Save failed: ${err.response?.data?.message || 'Error'}` });
    } finally {
      setSaving(false);
    }
  };

  if (loading) return (
    <div className="d-flex flex-column justify-content-center align-items-center min-vh-100 bg-light text-primary">
      <Spinner animation="grow" />
      <p className="mt-3 fw-bold">Securing medical identity...</p>
    </div>
  );

  return (
    <PatientLayout 
        title="Medical Identity" 
        subtitle="Manage your clinical profile and emergency data."
        showSubNav={false}
    >
        <div className="d-flex justify-content-end mb-4">
          {!editing ? (
            <Button onClick={() => setEditing(true)} variant="primary" className="rounded-pill px-4 fw-bold shadow">
              <FaEdit className="me-2" /> Edit Profile
            </Button>
          ) : (
            <div className="d-flex gap-2">
              <Button onClick={() => setEditing(false)} variant="light" className="rounded-pill shadow-sm">
                <FaTimes />
              </Button>
              <Button onClick={handleSave} disabled={saving} variant="primary" className="rounded-pill px-4 fw-bold shadow">
                {saving ? <Spinner size="sm" className="me-2" /> : <FaSave className="me-2" />} Save
              </Button>
            </div>
          )}
        </div>

        {message.text && (
          <div className={`alert alert-${message.type} border-0 rounded-4 shadow-sm mb-4 fw-bold p-3 animate-in`}>
            {message.text}
          </div>
        )}

        <Row className="g-4">
          <Col lg={4}>
            <div className="patient-content-card p-4 text-center mb-4 border-0 shadow-sm">
              <div className="position-relative d-inline-block mb-4">
                <div className="rounded-circle overflow-hidden border border-4 border-white shadow-lg mx-auto" style={{ width: 140, height: 140 }}>
                    {form.profileImage ? (
                      <img src={form.profileImage} alt="Profile" className="w-100 h-100 object-fit-cover" />
                    ) : (
                      <div className="w-100 h-100 bg-primary bg-opacity-10 d-flex align-items-center justify-content-center">
                        <FaUser size={60} className="text-primary" />
                      </div>
                    )}
                </div>
                {editing && (
                  <Button variant="primary" size="sm" className="rounded-circle position-absolute bottom-0 end-0 p-2 shadow" onClick={() => fileInputRef.current.click()}>
                    <FaCamera size={14} />
                    <input type="file" ref={fileInputRef} className="d-none" accept="image/*" onChange={handleImageUpload} />
                  </Button>
                )}
              </div>
              <h3 className="fw-bold mb-1 text-dark">{form.name || "Incomplete Profile"}</h3>
              <p className="text-muted small fw-bold">UNIFIED ID: <span className="text-primary">#{auth.user?.id}</span></p>
              
              <Row className="g-2 mt-4">
                <Col xs={6}>
                  <div className="bg-light p-3 rounded-4">
                    <div className="h4 fw-bold text-primary mb-0">{form.bloodGroup || '--'}</div>
                    <div className="text-muted small fw-bold mt-1">BLOOD TYPE</div>
                  </div>
                </Col>
                <Col xs={6}>
                  <div className="bg-light p-3 rounded-4">
                    <div className="h4 fw-bold text-primary mb-0">{form.dob ? (new Date().getFullYear() - new Date(form.dob).getFullYear()) : '--'}</div>
                    <div className="text-muted small fw-bold mt-1">AGE</div>
                  </div>
                </Col>
              </Row>
            </div>

            <div className="patient-content-card p-4 border-0 shadow-sm">
              <h6 className="fw-bold text-muted mb-4 small text-uppercase">Vital Stat Registry</h6>
              <Row className="g-3">
                <Col xs={6}>
                    <label className="text-muted small fw-bold mb-2">Weight (kg)</label>
                    {editing ? (
                      <input type="number" className="form-control rounded-3 border-2" value={form.weight} onChange={e => setForm({...form, weight: e.target.value})} />
                    ) : (
                      <div className="h5 fw-bold mb-0 text-dark">{form.weight || '--'} kg</div>
                    )}
                </Col>
                <Col xs={6}>
                    <label className="text-muted small fw-bold mb-2">Height (cm)</label>
                    {editing ? (
                      <input type="number" className="form-control rounded-3 border-2" value={form.height} onChange={e => setForm({...form, height: e.target.value})} />
                    ) : (
                      <div className="h5 fw-bold mb-0 text-dark">{form.height || '--'} cm</div>
                    )}
                </Col>
              </Row>
            </div>
          </Col>

          <Col lg={8}>
            <div className="patient-content-card p-4 mb-4 border-0 shadow-sm">
              <h6 className="fw-bold text-primary mb-4 small text-uppercase"><FaUser className="me-2" /> Basic Demographics</h6>
              <Row className="g-4">
                <Col md={6}>
                  <label className="text-muted small fw-bold mb-2">Legal Full Name</label>
                  {editing ? (
                    <input className="form-control border-2" value={form.name} onChange={e => setForm({...form, name: e.target.value})} />
                  ) : (
                    <div className="fw-bold p-2 bg-light rounded-3 text-dark">{form.name}</div>
                  )}
                </Col>
                <Col md={6}>
                  <label className="text-muted small fw-bold mb-2">Clinical Email</label>
                  <div className="fw-bold p-2 bg-light rounded-3 text-muted">{form.email}</div>
                </Col>
                <Col md={6}>
                  <label className="text-muted small fw-bold mb-2">Verified Phone</label>
                  {editing ? (
                    <input className="form-control border-2" value={form.phone} onChange={e => setForm({...form, phone: e.target.value})} />
                  ) : (
                    <div className="fw-bold p-2 bg-light rounded-3 text-dark">{form.phone || 'Not set'}</div>
                  )}
                </Col>
                <Col md={6}>
                  <label className="text-muted small fw-bold mb-2">Date of Birth</label>
                  {editing ? (
                    <input type="date" className="form-control border-2" value={form.dob} onChange={e => setForm({...form, dob: e.target.value})} />
                  ) : (
                    <div className="fw-bold p-2 bg-light rounded-3 text-dark">{form.dob || 'Not set'}</div>
                  )}
                </Col>
                <Col md={12}>
                  <label className="text-muted small fw-bold mb-2">Residential Address</label>
                  {editing ? (
                    <textarea className="form-control border-2" rows="2" value={form.address} onChange={e => setForm({...form, address: e.target.value})} />
                  ) : (
                    <div className="fw-bold p-2 bg-light rounded-3 text-dark">{form.address || 'Not set'}</div>
                  )}
                </Col>
              </Row>
            </div>

            <div className="patient-content-card p-4 border-0 shadow-sm">
              <h6 className="fw-bold text-primary mb-4 small text-uppercase"><FaFileMedical className="me-2" /> Medical Background</h6>
              <Row className="g-4">
                <Col md={12}>
                  <label className="text-muted small fw-bold mb-2">Existing Conditions / Clinical History</label>
                  {editing ? (
                    <textarea className="form-control border-2" rows="4" value={form.medicalHistory} onChange={e => setForm({...form, medicalHistory: e.target.value})} placeholder="Past surgeries, chronic conditions, etc." />
                  ) : (
                    <div className="bg-light p-3 rounded-4 fw-bold text-dark" style={{ minHeight: '100px' }}>
                        {form.medicalHistory || 'No recorded history provided.'}
                    </div>
                  )}
                </Col>
                <Col md={12}>
                  <label className="text-muted small fw-bold mb-2">Personal Bio</label>
                  {editing ? (
                    <textarea className="form-control border-2" rows="2" value={form.bio} onChange={e => setForm({...form, bio: e.target.value})} />
                  ) : (
                    <div className="bg-light p-3 rounded-4 fw-bold text-dark">{form.bio || 'Not set'}</div>
                  )}
                </Col>
              </Row>
            </div>
          </Col>
        </Row>
    </PatientLayout>
  );
};

export default PatientProfile;
