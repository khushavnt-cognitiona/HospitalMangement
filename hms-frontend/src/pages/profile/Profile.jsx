import React, { useState, useEffect } from "react";
import { Container, Row, Col, Card, Badge, Button, Spinner } from "react-bootstrap";
import { useAuth } from "../../context/AuthContext";
import userService from "../../services/userService";
import { 
  FaUser, FaEnvelope, FaPhone, FaMapMarkerAlt, 
  FaCalendarAlt, FaEdit, FaTint, FaShieldAlt, FaPhoneAlt,
  FaNotesMedical, FaUserShield, FaExclamationTriangle
} from "react-icons/fa";
import { Link } from "react-router-dom";

const Profile = () => {
  const { user: authUser } = useAuth();
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const data = await userService.getUserProfile();
        setUser(data);
      } catch (error) {
        console.error("Failed to fetch profile:", error);
        setUser(authUser); // Fallback to auth user
      } finally {
        setLoading(false);
      }
    };
    fetchProfile();
  }, [authUser]);

  if (loading) return (
    <div className="d-flex flex-column justify-content-center align-items-center min-vh-100 bg-alice-blue">
      <Spinner animation="grow" variant="primary" />
      <p className="mt-3 fw-bold text-primary">Accessing Secure Health Records...</p>
    </div>
  );

  if (!user) return <div className="text-center mt-5">Profile Unavailable</div>;

  const formatDate = (dateString) => {
    if (!dateString) return "DD/MM/YYYY";
    try {
      const options = { year: 'numeric', month: 'long', day: 'numeric' };
      return new Date(dateString).toLocaleDateString(undefined, options);
    } catch (e) {
      return dateString;
    }
  };

  return (
    <div className="profile-premium-container py-5">
      <Container className="mt-4 animate-fade-in">
        {/* Top Header Card */}
        <div className="glass-header-card mb-5 p-4 p-md-5">
            <Row className="align-items-center g-4">
                <Col md="auto" className="text-center">
                    <div className="profile-avatar-wrapper shadow-lg mx-auto mx-md-0">
                        <img 
                            src={user.profileImage || `https://ui-avatars.com/api/?name=${encodeURIComponent(user.name)}&background=0ea5e9&color=fff&size=200`} 
                            alt="Profile" 
                            className="profile-img-large"
                            onError={(e) => {
                                e.target.src = `https://ui-avatars.com/api/?name=${encodeURIComponent(user.name)}&background=0ea5e9&color=fff&size=200`;
                            }}
                        />
                        <div className="status-indicator-online"></div>
                    </div>
                </Col>
                <Col md>
                    <div className="d-flex flex-column flex-md-row justify-content-between align-items-center align-items-md-center gap-4 text-center text-md-start">
                        <div className="flex-grow-1">
                            <Badge bg="primary" className="mb-2 px-3 py-2 rounded-pill fw-900 shadow-sm text-uppercase ls-1" style={{ fontSize: '0.65rem', letterSpacing: '0.1em' }}>
                                Verified {user.role}
                            </Badge>
                            <h1 className="name-display fw-black text-slate-900 mb-1 ls-tight">{user.name}</h1>
                            <div className="d-flex align-items-center justify-content-center justify-content-md-start gap-2 text-slate-500 fw-bold">
                                <FaShieldAlt className="text-primary opacity-75" /> 
                                <span className="ls-1">CRN-{user.id || '2026'}</span>
                                <span className="opacity-25 mx-1">|</span>
                                <span className="small text-uppercase">Secure Health ID</span>
                            </div>
                        </div>
                        <div className="mt-2 mt-md-0">
                            <Button as={Link} to="/profile/edit" className="btn-premium-action px-4 py-3 rounded-4 fw-bold d-flex align-items-center gap-2">
                                <FaEdit size={18} /> MODIFY PORTAL DATA
                            </Button>
                        </div>
                    </div>
                </Col>
            </Row>
        </div>

        <Row className="g-4">
          {/* Identity & Contact Card */}
          <Col lg={7}>
            <div className="glass-card h-100 p-4 p-md-5">
              <div className="section-title-wrapper mb-5 d-flex align-items-center gap-3">
                  <div className="title-icon-box"><FaUser /></div>
                  <div>
                    <h4 className="fw-black text-slate-900 mb-0">Identity & Records</h4>
                    <div className="title-accent-line"></div>
                  </div>
              </div>

              <div className="info-modern-grid">
                <div className="info-card-item">
                    <div className="info-label"><FaEnvelope /> EMAIL ADDRESS</div>
                    <div className="info-value text-break">{user.email}</div>
                </div>
                <div className="info-card-item">
                    <div className="info-label"><FaPhone /> MOBILE NUMBER</div>
                    <div className="info-value">{user.phone || "+91 Mobile Not Provided"}</div>
                </div>
                <div className="info-card-item">
                    <div className="info-label"><FaCalendarAlt /> DATE OF BIRTH</div>
                    <div className="info-value">{formatDate(user.dateOfBirth)}</div>
                </div>
                <div className="info-card-item">
                    <div className="info-label"><FaTint /> BLOOD GROUP</div>
                    <div className="info-value text-danger d-flex align-items-center gap-2">
                        {user.bloodGroup || "Not Set"}
                        <Badge bg="danger" className="bg-opacity-10 text-danger border-danger border border-opacity-25 rounded-pill px-2 py-1" style={{ fontSize: '0.6rem' }}>RH FACTOR</Badge>
                    </div>
                </div>
              </div>

              <div className="mt-5 p-4 rounded-4 bg-slate-50 border border-slate-100 shadow-sm relative overflow-hidden">
                  <div className="info-label mb-2"><FaMapMarkerAlt /> RESIDENTIAL ADDRESS</div>
                  <p className="mb-0 text-slate-700 fw-bold lh-base fs-5">{user.address || "No address recorded in the portal."}</p>
                  <FaMapMarkerAlt className="position-absolute end-0 bottom-0 text-primary opacity-5 m-2" size={60} />
              </div>
            </div>
          </Col>

          {/* Clinical & Safety Card */}
          <Col lg={5}>
            <div className="glass-card h-100 p-4 p-md-5 secondary-card">
              <div className="section-title-wrapper mb-5 d-flex align-items-center gap-3">
                  <div className="title-icon-box secondary"><FaNotesMedical /></div>
                  <div>
                    <h4 className="fw-black text-slate-900 mb-0">Clinical Safety</h4>
                    <div className="title-accent-line secondary"></div>
                  </div>
              </div>

              <div className="safety-item-card mb-4 border-start border-4 border-danger border-opacity-50">
                  <div className="d-flex align-items-center gap-3">
                      <div className="safety-icon-box danger shadow-sm">
                          <FaExclamationTriangle />
                      </div>
                      <div className="flex-grow-1">
                          <div className="info-label mb-0">KNOWN ALLERGIES</div>
                          <div className="text-danger fw-black fs-5">{user.knownAllergies || "None Reported"}</div>
                      </div>
                  </div>
              </div>

              <div className="safety-item-card mb-4 border-start border-4 border-warning border-opacity-50">
                  <div className="d-flex align-items-center gap-3">
                      <div className="safety-icon-box warning shadow-sm">
                          <FaPhoneAlt />
                      </div>
                      <div className="flex-grow-1">
                          <div className="info-label mb-0">EMERGENCY CONTACT</div>
                          <div className="text-slate-900 fw-black fs-5">{user.emergencyContact || "Not Registered"}</div>
                      </div>
                  </div>
              </div>

              <div className="mt-4 p-4 rounded-4 bg-primary bg-opacity-10 border border-primary border-opacity-20 flex-grow-1">
                  <div className="d-flex gap-3 align-items-start">
                      <FaNotesMedical className="text-primary mt-1" size={24} />
                      <div>
                          <p className="small fw-bold text-primary mb-1 text-uppercase ls-1">Health Pulse Active</p>
                          <p className="small text-slate-600 mb-0 lh-sm">Your medical profile is encrypted and synced with clinical security protocols.</p>
                      </div>
                  </div>
              </div>
            </div>
          </Col>
        </Row>
      </Container>
      
      <style>{`
        .profile-premium-container {
            min-height: 100vh;
            background: #f8fafc;
            background-image: 
              radial-gradient(at 0% 0%, rgba(2, 132, 199, 0.08) 0, transparent 40%), 
              radial-gradient(at 100% 0%, rgba(13, 148, 136, 0.05) 0, transparent 40%);
        }

        .glass-header-card {
            background: rgba(255, 255, 255, 0.85);
            backdrop-filter: blur(24px);
            border: 1px solid rgba(255, 255, 255, 1);
            border-radius: 3.5rem;
            box-shadow: 0 40px 80px -12px rgba(0, 0, 0, 0.08);
        }

        .glass-card {
            background: white;
            border: 1px solid #f1f5f9;
            border-radius: 3rem;
            box-shadow: 0 10px 40px -10px rgba(0, 0, 0, 0.02);
            transition: all 0.4s cubic-bezier(0.16, 1, 0.3, 1);
            position: relative;
            overflow: hidden;
        }

        .glass-card:hover {
            transform: translateY(-8px);
            box-shadow: 0 40px 60px -15px rgba(0, 0, 0, 0.1);
            border-color: #e2e8f0;
        }

        .profile-avatar-wrapper {
            position: relative;
            width: 200px;
            height: 200px;
            padding: 10px;
            background: white;
            border-radius: 4rem;
            border: 2px dashed #e2e8f0;
        }

        .profile-img-large {
            width: 100%;
            height: 100%;
            object-fit: cover;
            border-radius: 3.5rem;
            background: #f1f5f9;
        }

        .status-indicator-online {
            position: absolute;
            bottom: 20px;
            right: 20px;
            width: 28px;
            height: 28px;
            background: #22c55e;
            border: 5px solid white;
            border-radius: 50%;
            box-shadow: 0 0 15px rgba(34, 197, 94, 0.4);
        }

        .name-display {
            font-size: clamp(2rem, 5vw, 3.5rem);
            letter-spacing: -0.04em;
        }

        .fw-black { font-weight: 900; }
        .ls-1 { letter-spacing: 0.05em; }
        .text-slate-900 { color: #0f172a; }
        .text-slate-500 { color: #64748b; }
        .text-slate-700 { color: #334155; }
        .bg-slate-50 { background: #f8fafc; }

        .btn-premium-action {
            background: #0f172a;
            border: none;
            color: white;
            transition: all 0.3s ease;
            white-space: nowrap;
        }

        .btn-premium-action:hover {
            background: #1e293b;
            transform: translateY(-3px);
            box-shadow: 0 15px 30px rgba(15, 23, 42, 0.25);
        }

        .title-icon-box {
            width: 45px;
            height: 45px;
            background: #e0f2fe;
            color: #0ea5e9;
            border-radius: 1rem;
            display: flex;
            align-items: center;
            justify-content: center;
            font-size: 1.2rem;
        }

        .title-icon-box.secondary {
            background: #e0f2f1;
            color: #0d9488;
        }

        .title-accent-line {
            width: 40px;
            height: 5px;
            background: #0ea5e9;
            border-radius: 10px;
            margin-top: 4px;
        }

        .title-accent-line.secondary { background: #0d9488; }

        .info-modern-grid {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
            gap: 2.5rem 2rem;
        }

        .info-label {
            font-size: 0.7rem;
            font-weight: 900;
            text-transform: uppercase;
            color: #94a3b8;
            letter-spacing: 0.1em;
            margin-bottom: 0.6rem;
            display: flex;
            align-items: center;
            gap: 8px;
        }

        .info-value {
            font-size: 1.15rem;
            font-weight: 800;
            color: #1e293b;
            word-wrap: break-word;
        }

        .safety-item-card {
            padding: 1.75rem;
            background: #f8fafc;
            border-radius: 2rem;
            transition: all 0.3s ease;
        }

        .safety-icon-box {
            width: 55px;
            height: 55px;
            border-radius: 1.2rem;
            display: flex;
            align-items: center;
            justify-content: center;
            font-size: 1.4rem;
        }

        .safety-icon-box.danger { background: #fee2e2; color: #ef4444; }
        .safety-icon-box.warning { background: #fef9c3; color: #ca8a04; }

        @keyframes fadeIn {
            from { opacity: 0; transform: translateY(30px); }
            to { opacity: 1; transform: translateY(0); }
        }

        .animate-fade-in {
            animation: fadeIn 0.9s cubic-bezier(0.16, 1, 0.3, 1);
        }

        @media (max-width: 768px) {
            .glass-header-card { border-radius: 2.5rem; padding: 2rem !important; }
            .profile-avatar-wrapper { width: 150px; height: 150px; border-radius: 3rem; }
            .profile-img-large { border-radius: 2.5rem; }
            .name-display { font-size: 2.2rem; }
            .info-modern-grid { grid-template-columns: 1fr; gap: 2rem; }
        }
      `}</style>
    </div>
  );
};

export default Profile;
