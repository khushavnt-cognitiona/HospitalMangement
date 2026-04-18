import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import { FaUser, FaEnvelope, FaLock, FaUserTag, FaBriefcaseMedical, FaArrowRight } from "react-icons/fa";

const Register = () => {
    const [formData, setFormData] = useState({
        username: "",
        email: "",
        password: "",
        name: "",
        role: "PATIENT",
    });
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);
    const { register } = useAuth();
    const navigate = useNavigate();

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError("");
        try {
            await register(formData);
            navigate("/login");
        } catch (err) {
            setError(err.response?.data?.message || "Registration failed. Please try again.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="d-flex min-vh-100 bg-white animate-fade-in">
            {/* Left Side: Branding (Visible on large screens) */}
            <div className="d-none d-lg-flex col-lg-5 bg-primary-gradient flex-column justify-content-center p-5 text-white position-relative overflow-hidden">
                <div className="position-absolute top-0 start-0 w-100 h-100 opacity-10" style={{ backgroundImage: 'radial-gradient(circle at 2px 2px, white 1px, transparent 0)', backgroundSize: '40px 40px' }}></div>
                
                <div className="position-relative z-1 mb-5">
                    <div className="d-flex align-items-center gap-3 mb-4">
                        <div className="bg-white p-2 rounded-3 text-primary">
                            <FaBriefcaseMedical size={32} />
                        </div>
                        <h1 className="fw-bold mb-0">HMS<span className="opacity-75">Pro</span></h1>
                    </div>
                    <h2 className="display-5 fw-bold mb-4">Join the Next Generation of Digital Healthcare</h2>
                    <ul className="list-unstyled fs-5 opacity-75 d-flex flex-column gap-3">
                        <li className="d-flex align-items-center gap-2">✓ Automated Patient Records</li>
                        <li className="d-flex align-items-center gap-2">✓ Smart Appointment Scheduling</li>
                        <li className="d-flex align-items-center gap-2">✓ Secure Cloud Infrastructure</li>
                    </ul>
                </div>

                <div className="mt-auto d-flex gap-4 fs-6 opacity-50 z-1">
                    <span>© 2026 HMSPro Systems</span>
                </div>
            </div>

            {/* Right Side: Register Form */}
            <div className="col-12 col-lg-7 d-flex flex-column align-items-center justify-content-center p-4 p-md-5">
                <div className="w-100" style={{ maxWidth: '520px' }}>
                    <div className="text-center mb-5">
                        <h2 className="fw-bold fs-1 mb-2">Create Account</h2>
                        <p className="text-muted">Register your profile to start using the clinical portal.</p>
                    </div>

                    {error && (
                        <div className="alert alert-danger border-0 rounded-4 p-3 small mb-4 animate-slide-up">
                            ⚠️ {error}
                        </div>
                    )}

                    <form onSubmit={handleSubmit} className="animate-slide-up">
                        <div className="row g-4 mb-4">
                            <div className="col-md-6">
                                <label className="form-label-premium">Full Name</label>
                                <div className="position-relative">
                                    <span className="position-absolute translate-middle-y top-50 start-0 ps-3 text-muted">
                                        <FaUser size={14} />
                                    </span>
                                    <input type="text" name="name" className="form-control-premium ps-5" placeholder="John Doe" onChange={handleChange} required />
                                </div>
                            </div>
                            <div className="col-md-6">
                                <label className="form-label-premium">I am a...</label>
                                <div className="position-relative">
                                    <span className="position-absolute translate-middle-y top-50 start-0 ps-3 text-muted">
                                        <FaUserTag size={14} />
                                    </span>
                                    <select name="role" className="form-control-premium ps-5 appearance-none" onChange={handleChange} required>
                                        <option value="PATIENT">Patient</option>
                                        <option value="DOCTOR">Doctor</option>
                                        <option value="NURSE">Nurse</option>
                                    </select>
                                </div>
                            </div>
                        </div>

                        <div className="form-group-premium mb-4">
                            <label className="form-label-premium">Username</label>
                            <div className="position-relative">
                                <span className="position-absolute translate-middle-y top-50 start-0 ps-3 text-muted">
                                    <FaUser size={14} />
                                </span>
                                <input type="text" name="username" className="form-control-premium ps-5" placeholder="johndoe_20" onChange={handleChange} required />
                            </div>
                        </div>

                        <div className="form-group-premium mb-4">
                            <label className="form-label-premium">Email Address</label>
                            <div className="position-relative">
                                <span className="position-absolute translate-middle-y top-50 start-0 ps-3 text-muted">
                                    <FaEnvelope size={14} />
                                </span>
                                <input type="email" name="email" className="form-control-premium ps-5" placeholder="john@example.com" onChange={handleChange} required />
                            </div>
                        </div>

                        <div className="form-group-premium mb-5">
                            <label className="form-label-premium">Create Password</label>
                            <div className="position-relative">
                                <span className="position-absolute translate-middle-y top-50 start-0 ps-3 text-muted">
                                    <FaLock size={14} />
                                </span>
                                <input type="password" name="password" className="form-control-premium ps-5" placeholder="••••••••" onChange={handleChange} required />
                            </div>
                        </div>

                        <button 
                            type="submit" 
                            className="btn btn-premium btn-premium-primary w-100 py-3 fs-5"
                            disabled={loading}
                        >
                            {loading ? (
                                <span className="spinner-border spinner-border-sm me-2" role="status"></span>
                            ) : (
                                <span className="d-flex align-items-center justify-content-center gap-2">
                                    Create My Account <FaArrowRight size={14} />
                                </span>
                            )}
                        </button>
                    </form>

                    <div className="text-center mt-5">
                        <p className="text-muted">
                            Already registered? <Link to="/login" className="text-primary fw-bold text-decoration-none">Sign in to your account</Link>
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Register;
