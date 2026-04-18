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
      // Create a clean payload for the ProfileDTO
      // We only send fields that have values to avoid 400 errors or overwriting with empty strings
      const payload = {};
      
      Object.keys(formData).forEach(key => {
        if (formData[key] !== "" && formData[key] !== null && formData[key] !== undefined) {
          payload[key] = formData[key];
        }
      });

      // Special handling for numeric age
      if (formData.age !== "" && formData.age !== null) {
        payload.age = parseInt(formData.age, 10);
      } else {
        delete payload.age;
      }

      const updatedProfile = await userService.updateProfile(payload);
      updateUserData(updatedProfile);
      setMessage({ type: "success", text: "Profile updated successfully!" });
      setTimeout(() => navigate("/profile"), 1500);
    } catch (error) {
      const errorMsg = error.response?.data?.message || error.message || "Profile update failed.";
      setMessage({ type: "danger", text: errorMsg });
    } finally {
      setSaving(false);
    }
  };

  if (loading) return (
    <div className="d-flex justify-content-center align-items-center min-vh-100">
      <Spinner animation="border" variant="primary" />
    </div>
  );

  return (
    <Container className="py-4">
      <Row className="justify-content-center">
        <Col md={10} lg={8}>
          <div className="d-flex align-items-center gap-3 mb-4">
            <Button as={Link} to="/profile" variant="link" className="text-muted p-0">
              <FaArrowLeft size={20} />
            </Button>
            <h3 className="fw-bold text-main mb-0">Edit Identity Profile</h3>
          </div>

          <Card className="patient-content-card">
            <Card.Body className="p-4 p-md-5">
              {message.text && (
                <Alert variant={message.type} className="rounded-3 shadow-sm border-0 mb-4">
                  {message.text}
                </Alert>
              )}

              <Form onSubmit={handleSubmit}>
                <div className="text-center mb-5">
                  <div className="position-relative d-inline-block">
                    <div className="p-1 bg-white rounded-circle shadow-sm border border-2 border-slate-100">
                        <Image 
                        src={imagePreview || `https://ui-avatars.com/api/?name=${encodeURIComponent(formData.name)}&background=0076ff&color=fff&size=120`} 
                        roundedCircle 
                        className="shadow-sm"
                        style={{ width: '120px', height: '120px', objectFit: 'cover' }}
                        />
                    </div>
                    <label 
                      htmlFor="profile-upload" 
                      className="position-absolute bottom-0 end-0 bg-primary text-white p-2 rounded-circle shadow-lg cursor-pointer d-flex align-items-center justify-content-center"
                      style={{ width: '36px', height: '36px', border: '2px solid white' }}
                    >
                      <FaCamera size={14} />
                      <input type="file" id="profile-upload" hidden accept="image/*" onChange={handleImageChange} />
                    </label>
                  </div>
                </div>

                <div className="text-primary fw-bold small text-uppercase ls-1 mb-4">Personal Information</div>
                <Row className="g-3 mb-4">
                  <Col md={6}>
                    <Form.Group>
                      <Form.Label className="small fw-bold text-muted text-uppercase">Full Name</Form.Label>
                      <Form.Control type="text" name="name" value={formData.name} onChange={handleChange} required className="bg-app border-0 py-2 rounded-3" />
                    </Form.Group>
                  </Col>
                  <Col md={6}>
                    <Form.Group>
                      <Form.Label className="small fw-bold text-muted text-uppercase">Date of Birth</Form.Label>
                      <Form.Control type="date" name="dateOfBirth" value={formData.dateOfBirth} onChange={handleChange} className="bg-app border-0 py-2 rounded-3" />
                    </Form.Group>
                  </Col>
                  <Col md={6}>
                    <Form.Group>
                      <Form.Label className="small fw-bold text-muted text-uppercase">Phone Number</Form.Label>
                      <Form.Control type="text" name="phone" value={formData.phone} onChange={handleChange} className="bg-app border-0 py-2 rounded-3" />
                    </Form.Group>
                  </Col>
                  <Col md={6}>
                    <Form.Group>
                      <Form.Label className="small fw-bold text-muted text-uppercase">Blood Group</Form.Label>
                      <Form.Select name="bloodGroup" value={formData.bloodGroup} onChange={handleChange} className="bg-app border-0 py-2 rounded-3">
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

                <div className="text-primary fw-bold small text-uppercase ls-1 mb-4">Location & Emergency</div>
                <Row className="g-3 mb-4">
                  <Col md={6}>
                    <Form.Group>
                      <Form.Label className="small fw-bold text-muted text-uppercase">Emergency Contact</Form.Label>
                      <Form.Control type="text" name="emergencyContact" value={formData.emergencyContact} onChange={handleChange} className="bg-app border-0 py-2 rounded-3" />
                    </Form.Group>
                  </Col>
                  <Col md={6}>
                    <Form.Group>
                      <Form.Label className="small fw-bold text-muted text-uppercase">Known Allergies</Form.Label>
                      <Form.Control type="text" name="knownAllergies" value={formData.knownAllergies} onChange={handleChange} className="bg-app border-0 py-2 rounded-3" />
                    </Form.Group>
                  </Col>
                  <Col md={12}>
                    <Form.Group>
                      <Form.Label className="small fw-bold text-muted text-uppercase">Residential Address</Form.Label>
                      <Form.Control as="textarea" name="address" rows={2} value={formData.address} onChange={handleChange} className="bg-app border-0 py-2 rounded-3" />
                    </Form.Group>
                  </Col>
                </Row>

                {authUser?.role === 'PATIENT' && (
                  <>
                    <div className="text-primary fw-bold small text-uppercase ls-1 mb-4">Clinical Data</div>
                    <Row className="g-3 mb-4">
                      <Col md={4}>
                        <Form.Group>
                          <Form.Label className="small fw-bold text-muted text-uppercase">Age</Form.Label>
                          <Form.Control type="number" name="age" value={formData.age} onChange={handleChange} className="bg-app border-0 py-2 rounded-3" />
                        </Form.Group>
                      </Col>
                      <Col md={8}>
                        <Form.Group>
                          <Form.Label className="small fw-bold text-muted text-uppercase">Gender</Form.Label>
                          <Form.Select name="gender" value={formData.gender} onChange={handleChange} className="bg-app border-0 py-2 rounded-3">
                            <option value="">Select Gender</option>
                            <option value="Male">Male</option>
                            <option value="Female">Female</option>
                            <option value="Other">Other</option>
                          </Form.Select>
                        </Form.Group>
                      </Col>
                      <Col md={12}>
                        <Form.Group>
                          <Form.Label className="small fw-bold text-muted text-uppercase">Medical History</Form.Label>
                          <Form.Control as="textarea" name="medicalHistory" rows={3} value={formData.medicalHistory} onChange={handleChange} className="bg-app border-0 py-2 rounded-3" />
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
                    className="py-3 fw-bold rounded-pill shadow-lg border-0"
                    style={{ background: 'var(--primary)' }}
                  >
                    {saving ? <Spinner animation="border" size="sm" /> : <><FaSave className="me-2" /> Save Changes</>}
                  </Button>
                </div>
              </Form>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default EditProfile;
