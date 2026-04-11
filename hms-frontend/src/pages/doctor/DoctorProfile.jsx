import React, { useState, useEffect, useRef } from 'react';
import { Container, Row, Col, Card, Form, Button, Badge, Spinner, Alert } from 'react-bootstrap';
import { 
    FaUserMd, FaEnvelope, FaPhone, FaGraduationCap, FaStethoscope, 
    FaHistory, FaSave, FaCamera, FaIdCard, FaLink
} from 'react-icons/fa';
import { useAuth } from '../../context/AuthContext';
import doctorService from '../../services/doctorService';
import DoctorLayout from '../../components/doctor/DoctorLayout';

const DoctorProfile = () => {
    const { auth, updateUser } = useAuth();
    const fileInputRef = useRef(null);
    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);
    const [message, setMessage] = useState(null);
    const [formData, setFormData] = useState({
        id: null,
        userId: auth.user.id,
        name: auth.user.name || '',
        email: auth.user.email || '',
        specialization: '',
        qualification: '',
        experienceYears: '',
        consultationFee: '',
        bio: '',
        phone: '',
        profileImage: auth.user.profileImage || ''
    });

    useEffect(() => {
        if (!auth.user?.id) return;
        const fetchProfile = async () => {
            try {
                const data = await doctorService.getProfileByUserId(auth.user.id);
                if (data) {
                    setFormData(prev => ({
                        ...prev,
                        ...data,
                        profileImage: data.profileImage || auth.user.profileImage || ''
                    }));
                }
            } catch (err) {
                if (err.response?.status === 404) {
                    console.info("New doctor profile - creation required.");
                } else {
                    console.error("Fetch Profile Error", err);
                }
            } finally {
                setLoading(false);
            }
        };
        fetchProfile();
    }, [auth.user?.id]);

    const handleImageUpload = (e) => {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setFormData(prev => ({ ...prev, profileImage: reader.result }));
            };
            reader.readAsDataURL(file);
        }
    };

    const handleSave = async (e) => {
        e.preventDefault();
        setSaving(true);
        setMessage(null);
        
        const payload = {
            ...formData,
            experienceYears: parseInt(formData.experienceYears) || 0,
            consultationFee: parseFloat(formData.consultationFee) || 0
        };

        try {
            if (formData.id) {
                await doctorService.updateProfile(formData.id, payload);
                setMessage({ type: 'success', text: '✅ Professional portfolio updated successfully!' });
            } else {
                const res = await doctorService.createProfile(payload);
                if (res?.id) setFormData(prev => ({ ...prev, id: res.id }));
                setMessage({ type: 'success', text: '🎉 Clinical portfolio created successfully!' });
            }
            if (updateUser) updateUser({ name: formData.name, profileImage: formData.profileImage });
        } catch (err) {
            setMessage({ type: 'danger', text: `❌ ${err.response?.data?.message || 'Failed to update profile.'}` });
        } finally {
            setSaving(false);
            window.scrollTo({ top: 0, behavior: 'smooth' });
        }
    };

    if (loading) return (
        <div className="d-flex flex-column justify-content-center align-items-center min-vh-100 bg-white text-primary">
            <Spinner animation="grow" />
            <p className="mt-3 fw-bold">Securing clinical identity...</p>
        </div>
    );

    return (
        <DoctorLayout 
            title="Professional Portfolio" 
            subtitle="Manage your clinical credentials and patient-facing profile."
            showSubNav={false}
        >
            <div style={{ minHeight: '100vh', paddingBottom: '80px', marginTop: '20px' }}>
                <div className="rounded-4 overflow-hidden mb-5 shadow-sm animate-in" style={{ 
                    background: 'linear-gradient(135deg, #0d6efd 0%, #0052cc 100%)', 
                    padding: '60px 40px', color: '#fff'
                }}>
                    <Container>
                        <Row className="align-items-center text-center text-lg-start">
                            <Col lg={8}>
                                <div className="d-flex flex-column flex-lg-row align-items-center gap-4 mb-3">
                                    <div className="position-relative">
                                        <div className="rounded-circle bg-white p-1 shadow-lg border border-4 border-white border-opacity-25" style={{ width: 140, height: 140, overflow: 'hidden' }}>
                                            <img 
                                                src={formData.profileImage || `https://ui-avatars.com/api/?name=${encodeURIComponent(auth.user.name)}&background=0d6efd&color=fff`} 
                                                alt="Profile" className="rounded-circle w-100 h-100 object-fit-cover"
                                            />
                                        </div>
                                        <label 
                                            onClick={() => fileInputRef.current?.click()}
                                            className="position-absolute bottom-0 end-0 bg-primary text-white p-2 rounded-circle shadow border-0 cursor-pointer hover-scale transition-all" 
                                            style={{ width: 40, height: 40, display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 10, cursor: 'pointer' }}
                                        >
                                            <FaCamera size={16} />
                                            <input type="file" ref={fileInputRef} className="d-none" accept="image/*" onChange={handleImageUpload} />
                                        </label>
                                    </div>
                                    <div>
                                        <h1 className="fw-bold mb-1 display-5">Dr. {formData.name}</h1>
                                        <div className="d-flex flex-wrap justify-content-center justify-content-lg-start gap-2 mb-3">
                                            <Badge bg="warning" text="dark" className="px-3 py-2 rounded-pill fw-bold shadow-sm">{formData.specialization || 'Clinical Specialist'}</Badge>
                                            <Badge bg="light" text="primary" className="px-3 py-2 rounded-pill fw-bold border shadow-sm">{formData.experienceYears || '0'} Years Experience</Badge>
                                        </div>
                                        <p className="mb-0 opacity-75 fw-medium fs-6"><FaEnvelope className="me-2"/> {formData.email}</p>
                                    </div>
                                </div>
                            </Col>
                        </Row>
                    </Container>
                </div>

                <Container>
                    {message && <Alert variant={message.type} className="mb-5 shadow-sm border-0 rounded-4 py-3 fw-bold animate-in">{message.text}</Alert>}
                    <Form onSubmit={handleSave}>
                        <Row className="g-4">
                            <Col lg={7}>
                                <Card className="border-0 shadow-sm rounded-4 overflow-hidden mb-4 bg-white">
                                    <Card.Header className="bg-white border-0 py-4 px-4 fw-bold text-dark d-flex align-items-center gap-2 fs-5">
                                        <div className="p-2 bg-primary bg-opacity-10 text-primary rounded-3"><FaStethoscope /></div> Clinical Expertise
                                    </Card.Header>
                                    <Card.Body className="px-4 pb-4">
                                        <Row className="g-3">
                                            <Col md={12}>
                                                <Form.Group className="mb-4">
                                                    <Form.Label className="small fw-bold text-muted text-uppercase ls-1">Full Display Name</Form.Label>
                                                    <div className="input-group-custom">
                                                        <FaUserMd className="field-icon" />
                                                        <Form.Control value={formData.name || ''} onChange={e => setFormData({...formData, name: e.target.value})} className="styled-input" required />
                                                    </div>
                                                </Form.Group>
                                            </Col>
                                            <Col md={6}>
                                                <Form.Group className="mb-4">
                                                    <Form.Label className="small fw-bold text-muted text-uppercase ls-1">Specialization</Form.Label>
                                                    <div className="input-group-custom">
                                                        <FaIdCard className="field-icon" />
                                                        <Form.Control value={formData.specialization || ''} onChange={e => setFormData({...formData, specialization: e.target.value})} className="styled-input" required />
                                                    </div>
                                                </Form.Group>
                                            </Col>
                                            <Col md={6}>
                                                <Form.Group className="mb-4">
                                                    <Form.Label className="small fw-bold text-muted text-uppercase ls-1">Qualification</Form.Label>
                                                    <div className="input-group-custom">
                                                        <FaGraduationCap className="field-icon" />
                                                        <Form.Control value={formData.qualification || ''} onChange={e => setFormData({...formData, qualification: e.target.value})} className="styled-input" />
                                                    </div>
                                                </Form.Group>
                                            </Col>
                                            <Col md={12}>
                                                <Form.Group className="mb-3">
                                                    <Form.Label className="small fw-bold text-muted text-uppercase ls-1">Professional Bio</Form.Label>
                                                    <Form.Control as="textarea" rows={4} value={formData.bio || ''} onChange={e => setFormData({...formData, bio: e.target.value})} className="styled-input pt-3" placeholder="Tell your patients about your medical background and care philosophy..." />
                                                </Form.Group>
                                            </Col>
                                        </Row>
                                    </Card.Body>
                                </Card>

                                <Card className="border-0 shadow-sm rounded-4 overflow-hidden bg-white">
                                    <Card.Header className="bg-white border-0 py-4 px-4 fw-bold text-dark d-flex align-items-center gap-2 fs-5">
                                        <div className="p-2 bg-success bg-opacity-10 text-success rounded-3"><FaPhone /></div> Contact & Connectivity
                                    </Card.Header>
                                    <Card.Body className="px-4 pb-4">
                                        <Row className="g-3">
                                            <Col md={6}>
                                                <Form.Group className="mb-4">
                                                    <Form.Label className="small fw-bold text-muted text-uppercase ls-1">Official Phone</Form.Label>
                                                    <div className="input-group-custom">
                                                        <FaPhone className="field-icon" />
                                                        <Form.Control value={formData.phone || ''} onChange={e => setFormData({...formData, phone: e.target.value})} className="styled-input" />
                                                    </div>
                                                </Form.Group>
                                            </Col>
                                            <Col md={6}>
                                                <Form.Group className="mb-4">
                                                    <Form.Label className="small fw-bold text-muted text-uppercase ls-1">Consultation Fee (INR)</Form.Label>
                                                    <div className="input-group-custom">
                                                        <span className="field-icon fw-bold">₹</span>
                                                        <Form.Control type="number" value={formData.consultationFee || ''} onChange={e => setFormData({...formData, consultationFee: e.target.value})} className="styled-input" required />
                                                    </div>
                                                </Form.Group>
                                            </Col>
                                        </Row>
                                    </Card.Body>
                                </Card>
                            </Col>

                            <Col lg={5}>
                                <Card className="border-0 shadow-sm rounded-4 bg-white mb-4 overflow-hidden">
                                    <Card.Body className="p-4 text-center">
                                        <h6 className="fw-bold text-dark mb-4 d-flex align-items-center gap-2 justify-content-center"><FaHistory className="text-warning" /> Clinical Experience</h6>
                                        <div className="mb-4">
                                            <h2 className="fw-bold mb-0 text-primary display-4">{formData.experienceYears || '0'}</h2>
                                            <small className="text-muted text-uppercase fw-bold ls-1" style={{ fontSize: '0.7rem' }}>Years Active in Field</small>
                                        </div>
                                        <Form.Range min={0} max={40} value={formData.experienceYears || 0} onChange={e => setFormData({...formData, experienceYears: e.target.value})} className="doctor-range" />
                                    </Card.Body>
                                </Card>
                                <Button variant="primary" type="submit" disabled={saving} className="w-100 py-3 rounded-pill fw-bold shadow-lg d-flex align-items-center justify-content-center gap-2 border-0 transition-all hover-scale" style={{ background: 'linear-gradient(to right, #0d6efd, #0052cc)' }}>
                                    {saving ? <Spinner size="sm" /> : <FaSave />} {saving ? 'Synchronizing Profile...' : 'Save & Update Portfolio'}
                                </Button>
                            </Col>
                        </Row>
                    </Form>
                </Container>

                <style>{`
                    .ls-1 { letter-spacing: 0.8px; }
                    .cursor-pointer { cursor: pointer; }
                    .input-group-custom { position: relative; }
                    .field-icon { position: absolute; left: 16px; top: 18px; color: #adb5bd; z-index: 5; transition: color 0.3s; }
                    .styled-input { padding-left: 48px !important; padding-top: 14px !important; padding-bottom: 14px !important; border: 2px solid #edf2f7 !important; border-radius: 14px !important; font-size: 1rem !important; transition: all 0.3s !important; background: #fcfdfe !important; height: auto !important; }
                    .styled-input:focus { background: #fff !important; border-color: #0d6efd !important; box-shadow: 0 0 0 4px rgba(13, 110, 253, 0.1) !important; }
                    .styled-input:focus + .field-icon { color: #0d6efd; }
                    .doctor-range::-webkit-slider-thumb { background: #0d6efd !important; height: 20px; width: 20px; }
                    .hover-scale:hover { transform: scale(1.02); }
                `}</style>
            </div>
        </DoctorLayout>
    );
};

export default DoctorProfile;
