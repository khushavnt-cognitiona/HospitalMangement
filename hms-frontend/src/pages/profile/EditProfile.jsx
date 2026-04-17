import React, { useState, useEffect } from "react";
import { Container, Row, Col, Card, Form, Button, Image, Alert, Spinner } from "react-bootstrap";
import { useAuth } from "../../context/AuthContext";
import userService from "../../services/userService";
import { 
  FaCamera, FaSave, FaArrowLeft, FaUser, FaEnvelope, 
  FaPhone, FaMapMarkerAlt, FaTint, FaCalendarAlt,
  FaPhoneAlt, FaExclamationTriangle
} from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";

const EditProfile = () => {
  const { user: authUser, updateUserData } = useAuth();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState({ type: "", text: "" });
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    address: "",
    bloodGroup: "",
    profileImage: "",
    dateOfBirth: "",
    emergencyContact: "",
    knownAllergies: "",
    // Clinical data for patients
    age: "",
    gender: "",
    medicalHistory: ""
  });
  const [imagePreview, setImagePreview] = useState("");

  useEffect(() => {
    const fetchLatestProfile = async () => {
      try {
        const data = await userService.getUserProfile();
        setFormData({
          name: data.name || "",
          email: data.email || "",
          phone: data.phone || "",
          address: data.address || "",
          bloodGroup: data.bloodGroup || "",
          profileImage: data.profileImage || "",
          dateOfBirth: data.dateOfBirth || "",
          emergencyContact: data.emergencyContact || "",
          knownAllergies: data.knownAllergies || "",
          age: data.age || "",
          gender: data.gender || "",
          medicalHistory: data.medicalHistory || ""
        });
        setImagePreview(data.profileImage || "");
      } catch (error) {
        console.error("Failed to fetch profile for editing:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchLatestProfile();
  }, []);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result);
        setFormData({ ...formData, profileImage: reader.result });
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);
    setMessage({ type: "", text: "" });

    try {
      const updatedProfile = await userService.updateProfile(formData);
      updateUserData(updatedProfile);
      setMessage({ type: "success", text: "Security profiling and clinical records updated successfully!" });
      setTimeout(() => navigate("/profile"), 1500);
    } catch (error) {
      setMessage({ type: "danger", text: error.response?.data?.message || "Profile update failed." });
    } finally {
      setSaving(false);
    }
  };

  if (loading) return (
    <div className="d-flex justify-content-center align-items-center min-vh-100 bg-light">
      <Spinner animation="border" variant="primary" />
    </div>
  );

  return (
    <Container className="py-5 mt-4">
      <Row className="justify-content-center">
        <Col md={10} lg={8}>
          <div className="d-flex align-items-center gap-3 mb-4">
            <Button as={Link} to="/profile" variant="link" className="text-secondary p-0">
              <FaArrowLeft size={20} className="fs-4" />
            </Button>
            <h3 className="fw-black text-slate-900 mb-0">Modify Security Profile</h3>
          </div>

          <Card className="border-0 shadow-lg rounded-5 overflow-hidden">
            <Card.Body className="p-4 p-md-5">
              {message.text && (
                <Alert variant={message.type} className="rounded-4 shadow-sm border-0 animate-fade-in mb-4">
                  {message.text}
                </Alert>
              )}

              <Form onSubmit={handleSubmit}>
                {/* Profile Picture Upload */}
                <div className="text-center mb-5">
                  <div className="position-relative d-inline-block">
                    <div className="p-2 bg-white rounded-circle shadow-sm border border-2 border-slate-100">
                        <Image 
                        src={imagePreview || `https://ui-avatars.com/api/?name=${encodeURIComponent(formData.name)}&background=0ea5e9&color=fff&size=150`} 
                        roundedCircle 
                        className="shadow-sm"
                        style={{ width: '150px', height: '150px', objectFit: 'cover' }}
                        />
                    </div>
                    <label 
                      htmlFor="profile-upload" 
                      className="position-absolute bottom-0 end-0 bg-primary text-white p-2 rounded-circle shadow-lg cursor-pointer hover-lift d-flex align-items-center justify-content-center"
                      style={{ width: '45px', height: '45px', border: '4px solid white' }}
                    >
                      <FaCamera />
                      <input 
                        type="file" 
                        id="profile-upload" 
                        hidden 
                        accept="image/*" 
                        onChange={handleImageChange}
                      />
                    </label>
                  </div>
                  <p className="text-muted small mt-2 fw-bold text-uppercase ls-1">Change Identity Image</p>
                </div>

                <div className="form-section-label mb-4 mt-2">Personal Records</div>
                <Row className="g-4 mb-5">
                  <Col md={6}>
                    <Form.Group>
                      <Form.Label className="fw-black text-slate-500 small text-uppercase ls-1 ms-1">
                        <FaUser className="me-2 text-primary" /> Full Name
                      </Form.Label>
                      <Form.Control 
                        type="text" 
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        required
                        className="bg-slate-50 border-0 py-3 px-4 rounded-4 shadow-none focus-ring"
                      />
                    </Form.Group>
                  </Col>
                  
                  <Col md={6}>
                    <Form.Group>
                      <Form.Label className="fw-black text-slate-500 small text-uppercase ls-1 ms-1">
                        <FaCalendarAlt className="me-2 text-primary" /> Date of Birth
                      </Form.Label>
                      <Form.Control 
                        type="date" 
                        name="dateOfBirth"
                        value={formData.dateOfBirth}
                        onChange={handleChange}
                        className="bg-slate-50 border-0 py-3 px-4 rounded-4 shadow-none focus-ring"
                      />
                    </Form.Group>
                  </Col>

                  <Col md={6}>
                    <Form.Group>
                      <Form.Label className="fw-black text-slate-500 small text-uppercase ls-1 ms-1">
                        <FaPhone className="me-2 text-primary" /> Mobile Contact
                      </Form.Label>
                      <Form.Control 
                        type="text" 
                        name="phone"
                        value={formData.phone}
                        onChange={handleChange}
                        className="bg-slate-50 border-0 py-3 px-4 rounded-4 shadow-none focus-ring"
                        placeholder="+91 00000 00000"
                      />
                    </Form.Group>
                  </Col>

                  <Col md={6}>
                    <Form.Group>
                      <Form.Label className="fw-black text-slate-500 small text-uppercase ls-1 ms-1">
                        <FaTint className="me-2 text-danger" /> Blood Group
                      </Form.Label>
                      <Form.Select 
                        name="bloodGroup"
                        value={formData.bloodGroup}
                        onChange={handleChange}
                        className="bg-slate-50 border-0 py-3 px-4 rounded-4 shadow-none focus-ring"
                      >
                        <option value="">Select Group</option>
                        <option value="A+">A+</option>
                        <option value="A-">A-</option>
                        <option value="B+">B+</option>
                        <option value="B-">B-</option>
                        <option value="AB+">AB+</option>
                        <option value="AB-">AB-</option>
                        <option value="O+">O+</option>
                        <option value="O-">O-</option>
                      </Form.Select>
                    </Form.Group>
                  </Col>
                </Row>

                <div className="form-section-label mb-4">Safety & Location</div>
                <Row className="g-4">
                  <Col md={6}>
                    <Form.Group>
                      <Form.Label className="fw-black text-slate-500 small text-uppercase ls-1 ms-1">
                        <FaPhoneAlt className="me-2 text-warning" /> Emergency No.
                      </Form.Label>
                      <Form.Control 
                        type="text" 
                        name="emergencyContact"
                        value={formData.emergencyContact}
                        onChange={handleChange}
                        className="bg-slate-50 border-0 py-3 px-4 rounded-4 shadow-none focus-ring"
                        placeholder="Emergency contact"
                      />
                    </Form.Group>
                  </Col>

                  <Col md={6}>
                    <Form.Group>
                      <Form.Label className="fw-black text-slate-500 small text-uppercase ls-1 ms-1">
                        <FaExclamationTriangle className="me-2 text-danger" /> Known Allergies
                      </Form.Label>
                      <Form.Control 
                        type="text" 
                        name="knownAllergies"
                        value={formData.knownAllergies}
                        onChange={handleChange}
                        className="bg-slate-50 border-0 py-3 px-4 rounded-4 shadow-none focus-ring"
                        placeholder="e.g. Penicillin"
                      />
                    </Form.Group>
                  </Col>

                  <Col md={12}>
                    <Form.Group>
                      <Form.Label className="fw-black text-slate-500 small text-uppercase ls-1 ms-1">
                        <FaMapMarkerAlt className="me-2 text-primary" /> Permanent Address
                      </Form.Label>
                      <Form.Control 
                        as="textarea" 
                        name="address"
                        rows={2}
                        value={formData.address}
                        onChange={handleChange}
                        className="bg-slate-50 border-0 py-3 px-4 rounded-4 shadow-none focus-ring"
                        placeholder="Enter full residential address"
                      />
                    </Form.Group>
                  </Col>
                </Row>

                {/* Patient Specific Clinical Fields */}
                {authUser?.role === 'PATIENT' && (
                  <>
                    <div className="form-section-label mb-4 mt-5">Clinical Identity (Patient Only)</div>
                    <Row className="g-4">
                      <Col md={4}>
                        <Form.Group>
                          <Form.Label className="fw-black text-slate-500 small text-uppercase ls-1 ms-1">
                            Current Age
                          </Form.Label>
                          <Form.Control 
                            type="number" 
                            name="age"
                            value={formData.age}
                            onChange={handleChange}
                            className="bg-slate-50 border-0 py-3 px-4 rounded-4 shadow-none focus-ring"
                            placeholder="Years"
                          />
                        </Form.Group>
                      </Col>
                      <Col md={8}>
                        <Form.Group>
                          <Form.Label className="fw-black text-slate-500 small text-uppercase ls-1 ms-1">
                            Gender
                          </Form.Label>
                          <Form.Select 
                            name="gender"
                            value={formData.gender}
                            onChange={handleChange}
                            className="bg-slate-50 border-0 py-3 px-4 rounded-4 shadow-none focus-ring"
                          >
                            <option value="">Identify Gender</option>
                            <option value="Male">Male</option>
                            <option value="Female">Female</option>
                            <option value="Other">Other/Prefer not to say</option>
                          </Form.Select>
                        </Form.Group>
                      </Col>
                      <Col md={12}>
                        <Form.Group>
                          <Form.Label className="fw-black text-slate-500 small text-uppercase ls-1 ms-1">
                            Medical History Summary
                          </Form.Label>
                          <Form.Control 
                            as="textarea" 
                            name="medicalHistory"
                            rows={3}
                            value={formData.medicalHistory}
                            onChange={handleChange}
                            className="bg-slate-50 border-0 py-3 px-4 rounded-4 shadow-none focus-ring"
                            placeholder="Brief summary of past conditions, surgeries, or chronic illnesses"
                          />
                        </Form.Group>
                      </Col>
                    </Row>
                  </>
                )}

                <div className="d-grid mt-5">
                  <Button 
                    variant="primary" 
                    type="submit" 
                    disabled={saving}
                    className="py-3 fw-black rounded-pill shadow-lg d-flex align-items-center justify-content-center gap-2 border-0"
                    style={{ background: '#0f172a' }}
                  >
                    {saving ? (
                      <>Syncing with Cloud...</>
                    ) : (
                      <><FaSave /> Update Security Records</>
                    )}
                  </Button>
                </div>
              </Form>
            </Card.Body>
          </Card>
        </Col>
      </Row>

      <style>{`
        .fw-black { font-weight: 900; }
        .ls-1 { letter-spacing: 1px; }
        .text-slate-900 { color: #0f172a; }
        .text-slate-500 { color: #64748b; }
        .bg-slate-50 { background: #f8fafc; }
        .rounded-5 { border-radius: 3rem; }
        
        .form-section-label {
            font-size: 0.75rem;
            font-weight: 900;
            color: #0ea5e9;
            text-transform: uppercase;
            letter-spacing: 2px;
            display: flex;
            align-items: center;
            gap: 10px;
        }
        
        .form-section-label::after {
            content: "";
            height: 1px;
            flex-grow: 1;
            background: #e2e8f0;
        }

        .focus-ring:focus {
          background-color: #fff !important;
          border: 1px solid #0ea5e9 !important;
          box-shadow: 0 0 0 0.4rem rgba(14, 165, 233, 0.1) !important;
        }
        
        .hover-lift {
            transition: transform 0.2s ease;
        }
        .hover-lift:hover {
            transform: scale(1.1) translateY(-2px);
        }
      `}</style>
    </Container>
  );
};

export default EditProfile;
