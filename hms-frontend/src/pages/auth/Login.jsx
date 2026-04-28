import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import { FaUser, FaLock, FaBriefcaseMedical, FaArrowRight } from "react-icons/fa";
import authService from "../../services/authService";

const Login = () => {
    const [credentials, setCredentials] = useState({ username: "", password: "" });
    const [otpMode, setOtpMode] = useState(false);
    const [otpSent, setOtpSent] = useState(false);
    const [target, setTarget] = useState("");
    const [otp, setOtp] = useState("");
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);
    const { login, loginWithOtp } = useAuth();
    const navigate = useNavigate();

    const maskTarget = (val) => {
        if (!val) return "";
        if (val.includes("@")) {
            const [local, domain] = val.split("@");
            if (local.length <= 2) return val;
            return `${local.substring(0, 2)}****@${domain}`;
        }
        if (val.length >= 10) {
            return `******${val.substring(val.length - 4)}`;
        }
        return val;
    };

    const handleChange = (e) => {
        setCredentials({ ...credentials, [e.target.name]: e.target.value });
    };

    const handleSendOtp = async () => {
        if (!target || target.trim() === "") {
            setError("Please enter a valid email or phone number");
            return;
        }
        setLoading(true);
        setError("");
        try {
            await authService.sendOtp(target);
            setOtpSent(true);
        } catch (err) {
            setError(err.response?.data?.message || "Failed to send OTP. Please check your contact detail.");
        } finally {
            setLoading(false);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError("");
        try {
            let user;
            if (otpMode) {
                user = await loginWithOtp({ target, otp });
            } else {
                user = await login(credentials);
            }
            
            if (user.role === "ADMIN") navigate("/admin");
            else if (user.role === "DOCTOR") navigate("/doctor");
            else if (user.role === "PATIENT") navigate("/patient/dashboard");
            else if (user.role === "NURSE") navigate("/nurse");
            else navigate("/");
        } catch (err) {
            setError(otpMode ? "Invalid or expired OTP." : "Invalid credentials. Please check your username and password.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="d-flex min-vh-100 bg-white animate-fade-in">
            {/* Left Side: Branding/Promotion */}
            <div className="d-none d-lg-flex col-lg-6 bg-primary-gradient flex-column justify-content-center p-5 text-white position-relative overflow-hidden">
                <div className="position-absolute top-0 start-0 w-100 h-100 opacity-10" style={{ backgroundImage: 'radial-gradient(circle at 2px 2px, white 1px, transparent 0)', backgroundSize: '40px 40px' }}></div>
                
                <div className="position-relative z-1 mb-5">
                    <div className="d-flex align-items-center gap-3 mb-4">
                        <div className="bg-white p-2 rounded-3 text-primary">
                            <FaBriefcaseMedical size={32} />
                        </div>
                        <h1 className="fw-bold mb-0">HMS<span className="opacity-75">Pro</span></h1>
                    </div>
                    <h2 className="display-4 fw-bold mb-4 lh-tight">Comprehensive Healthcare Management for Modern Clinics</h2>
                    <p className="fs-5 opacity-75 max-w-lg">Streamline your patient care, manage medical records, and optimize your hospital operations with our secure Cloud-based SaaS solution.</p>
                </div>

                <div className="mt-auto d-flex gap-4 fs-6 opacity-50 z-1">
                    <span>© 2026 HMSPro Systems</span>
                    <span>Privacy Policy</span>
                    <span>Support</span>
                </div>
            </div>

            {/* Right Side: Login Form */}
            <div className="col-12 col-lg-6 d-flex flex-column align-items-center justify-content-center p-4 p-md-5">
                <div className="w-100" style={{ maxWidth: '420px' }}>
                    <div className="text-center mb-5">
                        <h2 className="fw-bold fs-1 mb-2">Welcome Back</h2>
                        <p className="text-muted">Access your clinical dashboard to continue.</p>
                    </div>

                    <div className="d-flex gap-2 mb-4 p-1 bg-light rounded-4">
                        <button 
                            className={`btn flex-fill rounded-4 py-2 small fw-bold transition-all ${!otpMode ? 'btn-white shadow-sm' : 'text-muted'}`}
                            onClick={() => { setOtpMode(false); setError(""); }}
                        >
                            Credentials
                        </button>
                        <button 
                            className={`btn flex-fill rounded-4 py-2 small fw-bold transition-all ${otpMode ? 'btn-white shadow-sm' : 'text-muted'}`}
                            onClick={() => { setOtpMode(true); setError(""); }}
                        >
                            OTP Login
                        </button>
                    </div>

                    {error && (
                        <div className="alert alert-danger border-0 rounded-4 p-3 small d-flex align-items-center gap-2 mb-4 animate-slide-up">
                            <span className="fs-5">⚠️</span> {error}
                        </div>
                    )}

                    <form onSubmit={handleSubmit} className="animate-slide-up">
                        {otpMode ? (
                            <>
                                <div className="form-group-premium mb-4">
                                    <label className="form-label-premium">Email or Phone</label>
                                    <div className="input-group">
                                        <input
                                            type="text"
                                            className="form-control-premium"
                                            placeholder="patient@gmail.com"
                                            value={target}
                                            onChange={(e) => setTarget(e.target.value)}
                                            required
                                            disabled={otpSent}
                                        />
                                        {!otpSent && (
                                            <button 
                                                type="button" 
                                                className="btn btn-primary px-4 ms-2 rounded-4"
                                                onClick={handleSendOtp}
                                                disabled={loading}
                                            >
                                                Send
                                            </button>
                                        )}
                                    </div>
                                </div>

                                {otpSent && (
                                    <div className="form-group-premium mb-5 animate-slide-up">
                                        <div className="alert alert-info border-0 rounded-4 p-3 small d-flex align-items-center gap-2 mb-4">
                                            <span className="fs-5">📧</span>
                                            We have sent a 6-digit code to your email ({maskTarget(target)})
                                        </div>
                                        <label className="form-label-premium text-primary">Enter 6-digit OTP</label>
                                        <input
                                            type="text"
                                            className="form-control-premium text-center fs-3 fw-bold tracking-widest"
                                            placeholder="● ● ● ● ● ●"
                                            maxLength={6}
                                            value={otp}
                                            onChange={(e) => setOtp(e.target.value.replace(/\D/g, '').slice(0, 6))}
                                            required
                                            autoComplete="one-time-code"
                                            inputMode="numeric"
                                        />
                                        <p className="small text-muted mt-2 text-center">
                                            Didn't receive code? <button type="button" className="btn btn-link small p-0 fw-bold" onClick={handleSendOtp}>Resend</button>
                                        </p>
                                    </div>
                                )}
                            </>
                        ) : (
                            <>
                                <div className="form-group-premium mb-4">
                                    <label className="form-label-premium">Username</label>
                                    <div className="position-relative">
                                        <span className="position-absolute translate-middle-y top-50 start-0 ps-3 text-muted">
                                            <FaUser size={14} />
                                        </span>
                                        <input
                                            type="text"
                                            name="username"
                                            className="form-control-premium ps-5"
                                            placeholder="your_id_24"
                                            value={credentials.username}
                                            onChange={handleChange}
                                            required
                                        />
                                    </div>
                                </div>

                                <div className="form-group-premium mb-5">
                                    <div className="d-flex justify-content-between align-items-center">
                                        <label className="form-label-premium">Password</label>
                                        <a href="#" className="small text-primary fw-semibold text-decoration-none">Forgot?</a>
                                    </div>
                                    <div className="position-relative">
                                        <span className="position-absolute translate-middle-y top-50 start-0 ps-3 text-muted">
                                            <FaLock size={14} />
                                        </span>
                                        <input
                                            type="password"
                                            name="password"
                                            className="form-control-premium ps-5"
                                            placeholder="••••••••"
                                            value={credentials.password}
                                            onChange={handleChange}
                                            required
                                        />
                                    </div>
                                </div>
                            </>
                        )}

                        <button 
                            type="submit" 
                            className="btn btn-premium btn-premium-primary w-100 py-3 fs-5"
                            disabled={loading || (otpMode && !otpSent)}
                        >
                            {loading ? (
                                <span className="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
                            ) : (
                                <span className="d-flex align-items-center justify-content-center gap-2">
                                    {otpMode ? 'Verify & Login' : 'Sign In'} <FaArrowRight size={14} />
                                </span>
                            )}
                        </button>
                    </form>

                    <div className="text-center mt-5">
                        <p className="text-muted">
                            New to HMSPro? <Link to="/register" className="text-primary fw-bold text-decoration-none">Create a clinical account</Link>
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Login;
