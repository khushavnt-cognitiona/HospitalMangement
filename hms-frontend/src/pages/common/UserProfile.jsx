import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Card, Form, Button, Alert, Spinner, Image, Badge } from 'react-bootstrap';
import { FaUserCircle, FaEnvelope, FaPhone, FaLink, FaSave, FaIdCard, FaBuilding, FaCamera, FaUserMd, FaHistory, FaMapMarkerAlt, FaBriefcaseMedical } from 'react-icons/fa';
import { useAuth } from '../../context/AuthContext';
import doctorService from '../../services/doctorService';
import patientService from '../../services/patientService';
import staffService from '../../services/staffService';
import adminService from '../../services/adminService';

const UserProfile = () => {
    const { auth, updateUser } = useAuth();
    const [profile, setProfile] = useState(null);
    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);
    const [isNewProfile, setIsNewProfile] = useState(false);
    const [message, setMessage] = useState({ type: '', text: '' });

    const roleServices = {
        DOCTOR: doctorService,
        PATIENT: patientService,
        NURSE: staffService,
        ADMIN: adminService,
        SUPER_ADMIN: adminService,
    };

    useEffect(() => {
        const fetchProfile = async () => {
            try {
                const service = roleServices[auth.role?.toUpperCase()];
                if (!service) throw new Error("Service not found for role: " + auth.role);
                
                const data = await service.getProfileByUserId(auth.user.id);
                setProfile(data);
                setIsNewProfile(false);
            } catch (err) {
                if (err.response?.status === 404 || (err.response?.status === 500 && err.response?.data?.message?.includes('404'))) {
                    setIsNewProfile(true);
                    setProfile({
                        userId: auth.user.id,
                        name: auth.user.name || '',
                        age: '',
                        gender: '',
                        phone: '',
                        address: '',
                        bloodGroup: '',
                        medicalHistory: '',
                        profileImage: auth.user.profileImage || '',
                        bio: '',
                        specialization: '',
                        qualification: '',
                        experienceYears: '',
                        department: '',
                        shiftTiming: ''
                    });
                } else {
                    console.error("Error fetching profile", err);
                    setMessage({ type: 'danger', text: 'Failed to load profile data.' });
                }
            } finally {
                setLoading(false);
            }
        };
        if (auth.user?.id) fetchProfile();
    }, [auth.user?.id, auth.role]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setProfile(prev => ({ ...prev, [name]: value }));
    };

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setProfile(prev => ({ ...prev, profileImage: reader.result }));
            };
            reader.readAsDataURL(file);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setSaving(true);
        setMessage({ type: '', text: '' });
        try {
            const role = auth.role?.toUpperCase();
            const service = roleServices[role];

            if (isNewProfile) {
                const response = await service.createProfile(profile);
                setProfile(response);
                setIsNewProfile(false);
                setMessage({ type: 'success', text: 'Profile created successfully!' });
            } else {
                if (role === 'DOCTOR') await doctorService.updateProfile(profile.id, profile);
                else if (role === 'PATIENT') await patientService.updateProfile(profile.id, profile);
                else if (role === 'NURSE') await staffService.updateStaff(profile.id, profile);
                else if (role === 'ADMIN' || role === 'SUPER_ADMIN') await adminService.updateProfile(auth.user.id, profile);
                setMessage({ type: 'success', text: 'Profile updated successfully!' });
            }
            
            updateUser({ name: profile.name, profileImage: profile.profileImage });
        } catch (err) {
            setMessage({ type: 'danger', text: 'Failed to save profile.' });
        } finally {
            setSaving(false);
        }
    };

    if (loading) return (
        <div className="d-flex justify-content-center align-items-center vh-100"><Spinner animation="border" variant="primary" /></div>
    );

    if (!profile) return <Alert variant="warning" className="m-5">No profile data found.</Alert>;

    return (
        <div className="py-5 min-vh-100 bg-light">
            <Container>
                <Card className="border-0 shadow-lg overflow-hidden rounded-4 mb-4">
                    <div className="p-5 text-white" style={{ background: 'linear-gradient(135deg, #0d6efd 0%, #00d2ff 100%)' }}>
                        <Row className="align-items-center">
                            <Col md="auto" className="text-center text-md-start mb-4 mb-md-0 position-relative">
                                <div className="rounded-circle bg-white p-1 shadow-lg" style={{ width: 150, height: 150, overflow: 'hidden', cursor: 'pointer' }} onClick={() => document.getElementById('image-upload').click()}>
                                    <Image src={profile.profileImage || `https://ui-avatars.com/api/?name=${encodeURIComponent(profile.name)}&background=0d6efd&color=fff`} roundedCircle className="w-100 h-100 object-fit-cover" />
                                    <input type="file" id="image-upload" hidden accept="image/*" onChange={handleImageChange} />
                                </div>
                            </Col>
                            <Col md className="text-center text-md-start">
                                <h1 className="display-5 fw-bold mb-0">{profile.name || 'Set Name'}</h1>
                                <Badge bg="white" text="primary" className="rounded-pill px-3 py-2 small fw-bold mt-2">{profile.specialization || auth.role}</Badge>
                                <p className="lead opacity-75 mb-0 mt-2"><FaEnvelope size={14} /> {auth.user.email}</p>
                            </Col>
                        </Row>
                    </div>
                </Card>

                {message.text && <Alert variant={message.type} className="shadow-sm border-0 mb-4">{message.text}</Alert>}

                <Form onSubmit={handleSubmit}>
                    <Row className="g-4">
                        <Col md={4}>
                            <Card className="border-0 shadow-sm p-4 rounded-4 mb-4 bg-white">
                                <h5 className="fw-bold mb-3 d-flex align-items-center gap-2"><FaLink className="text-primary" /> Profile Bio</h5>
                                <Form.Control as="textarea" rows={4} name="bio" value={profile.bio || ''} onChange={handleChange} className="bg-light border-0 py-3 rounded-3" placeholder="Biography..." />
                            </Card>
                        </Col>
                        <Col lg={8}>
                            <Card className="border-0 shadow-sm p-4 rounded-4 h-100 bg-white">
                                <h5 className="fw-bold mb-4 border-bottom pb-3"><FaIdCard className="text-secondary" /> Personal Details</h5>
                                <Row className="g-4">
                                    <Col md={6}>
                                        <Form.Group>
                                            <Form.Label className="small fw-bold text-muted mb-2">Display Name</Form.Label>
                                            <Form.Control type="text" name="name" value={profile.name || ''} onChange={handleChange} className="rounded-3" required />
                                        </Form.Group>
                                    </Col>
                                    <Col md={6}>
                                        <Form.Group>
                                            <Form.Label className="small fw-bold text-muted mb-2">Primary Phone</Form.Label>
                                            <Form.Control type="text" name="phone" value={profile.phone || ''} onChange={handleChange} className="rounded-3" />
                                        </Form.Group>
                                    </Col>
                                    {auth.role === 'DOCTOR' && (
                                        <>
                                            <Col md={6}>
                                                <Form.Group><Form.Label className="small fw-bold text-muted mb-2">Specialization</Form.Label><Form.Control type="text" name="specialization" value={profile.specialization || ''} onChange={handleChange} className="rounded-3" /></Form.Group>
                                            </Col>
                                            <Col md={6}>
                                                <Form.Group><Form.Label className="small fw-bold text-muted mb-2">Qualification</Form.Label><Form.Control type="text" name="qualification" value={profile.qualification || ''} onChange={handleChange} className="rounded-3" /></Form.Group>
                                            </Col>
                                        </>
                                    )}
                                    {auth.role === 'PATIENT' && (
                                        <>
                                            <Col md={4}><Form.Group><Form.Label className="small fw-bold text-muted mb-2">Age</Form.Label><Form.Control type="number" name="age" value={profile.age || ''} onChange={handleChange} className="rounded-3" /></Form.Group></Col>
                                            <Col md={4}><Form.Group><Form.Label className="small fw-bold text-muted mb-2">Gender</Form.Label><Form.Select name="gender" value={profile.gender || ''} onChange={handleChange} className="rounded-3"><option value="">Select</option><option value="Male">Male</option><option value="Female">Female</option></Form.Select></Form.Group></Col>
                                            <Col md={4}><Form.Group><Form.Label className="small fw-bold text-muted mb-2">Blood Group</Form.Label><Form.Control type="text" name="bloodGroup" value={profile.bloodGroup || ''} onChange={handleChange} className="rounded-3" /></Form.Group></Col>
                                        </>
                                    )}
                                </Row>
                                <div className="text-end mt-4">
                                    <Button type="submit" variant="primary" className="px-5 py-2 rounded-3 fw-bold" disabled={saving}>
                                        {saving ? <Spinner size="sm" /> : <FaSave className="me-2" />} Save Changes
                                    </Button>
                                </div>
                            </Card>
                        </Col>
                    </Row>
                </Form>
            </Container>
        </div>
    );
};

export default UserProfile;
