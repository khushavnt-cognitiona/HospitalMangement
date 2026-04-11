import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
    FaHospital, FaUser, FaEnvelope, FaLock, FaEye, FaEyeSlash,
    FaPhone, FaSpinner, FaGoogle, FaApple, FaCheckCircle
} from 'react-icons/fa';
import authService from '../services/authService';

const Signup = () => {
    const navigate = useNavigate();
    const [step, setStep] = useState(1); 
    const [form, setForm] = useState({
        firstName: '', lastName: '', email: '',
        phone: '', password: '', confirmPassword: '',
        role: 'Patient', agreeTerms: false,
    });
    const [showPass, setShowPass]       = useState(false);
    const [showConfirm, setShowConfirm] = useState(false);
    const [loading, setLoading]         = useState(false);
    const [success, setSuccess]         = useState(false);
    const [error, setError]             = useState('');

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        setForm({ ...form, [name]: type === 'checkbox' ? checked : value });
        setError('');
    };

    const validateStep1 = () => {
        if (!form.firstName.trim()) return 'First name is required.';
        if (!form.lastName.trim())  return 'Last name is required.';
        if (!form.email || !/\S+@\S+\.\S+/.test(form.email)) return 'Valid email is required.';
        if (!form.phone || form.phone.length < 10) return 'Valid phone number is required.';
        return '';
    };

    const validateStep2 = () => {
        if (!form.password || form.password.length < 8) return 'Password must be at least 8 characters.';
        if (form.password !== form.confirmPassword) return 'Passwords do not match.';
        if (!form.agreeTerms) return 'Please accept the Terms & Privacy Policy.';
        return '';
    };

    const handleNext = (e) => {
        e.preventDefault();
        const err = validateStep1();
        if (err) { setError(err); return; }
        setStep(2);
        setError('');
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const err = validateStep2();
        if (err) { setError(err); return; }
        
        setLoading(true);
        setError('');

        try {
            const fullName = `${form.firstName.trim()} ${form.lastName.trim()}`;
            const roleForBackend = form.role.toUpperCase() === 'STAFF' ? 'NURSE' : form.role.toUpperCase();

            await authService.register({
                name: fullName,
                email: form.email,
                password: form.password,
                role: roleForBackend,
                phone: form.phone
            });

            setLoading(false);
            setSuccess(true);
            setTimeout(() => navigate('/login'), 2200);
        } catch (err) {
            setLoading(false);
            setError(err.response?.data?.message || 'Registration failed.');
        }
    };

    const passwordStrength = (pwd) => {
        if (!pwd) return { label: '', color: '', width: '0%' };
        const strong = pwd.length >= 8 && /[A-Z]/.test(pwd) && /\d/.test(pwd) && /[^a-zA-Z0-9]/.test(pwd);
        const medium = pwd.length >= 8 && (/[A-Z]/.test(pwd) || /\d/.test(pwd));
        if (strong) return { label: 'Strong', color: '#28a745', width: '100%' };
        if (medium) return { label: 'Medium', color: '#ff9800', width: '60%' };
        return { label: 'Weak', color: '#e53935', width: '30%' };
    };
    const strength = passwordStrength(form.password);

    return (
        <div style={{ minHeight: '100vh', display: 'flex', background: 'linear-gradient(135deg, #0d1b3e 0%, #1a3a6e 50%, #1976d2 100%)' }}>
            <div className="d-none d-lg-flex flex-column justify-content-between p-5"
                style={{ width: '45%', background: 'rgba(0,0,0,0.18)' }}>
                <div className="d-flex align-items-center gap-2">
                    <FaHospital size={30} color="#ffc107" />
                    <span style={{ fontWeight: 800, fontSize: 22, color: '#fff' }}>Hospital<span style={{ color: '#ffc107' }}>Manager</span></span>
                </div>

                <div>
                    <h2 style={{ color: '#fff', fontWeight: 800, fontSize: 36, lineHeight: 1.2 }}>
                        Join Our<br />Healthcare Network.
                    </h2>
                    <p style={{ color: 'rgba(255,255,255,0.65)', marginTop: 16, maxWidth: 340, lineHeight: 1.8 }}>
                        Create your account and take control of your healthcare journey with our trusted platform.
                    </p>
                </div>

                <div className="d-flex flex-column gap-3">
                    {[
                        { step: 1, label: 'Personal Information', desc: 'Your name, email & phone' },
                        { step: 2, label: 'Secure Your Account',  desc: 'Set a strong password' },
                        { step: 3, label: 'Start Your Journey',   desc: 'Access your dashboard' },
                    ].map((s) => (
                        <div key={s.step} className="d-flex align-items-center gap-3">
                            <div style={{
                                width: 36, height: 36, borderRadius: '50%',
                                background: step >= s.step ? '#1976d2' : 'rgba(255,255,255,0.15)',
                                color: '#fff',
                                display: 'flex', alignItems: 'center', justifyContent: 'center',
                                fontWeight: 700, fontSize: 14, flexShrink: 0,
                                border: step >= s.step ? '2px solid #64b5f6' : '2px solid transparent',
                                transition: 'all 0.3s',
                            }}>
                                {s.step}
                            </div>
                            <div>
                                <p style={{ margin: 0, color: step >= s.step ? '#fff' : 'rgba(255,255,255,0.45)', fontWeight: 600, fontSize: 14 }}>{s.label}</p>
                                <p style={{ margin: 0, color: 'rgba(255,255,255,0.35)', fontSize: 12 }}>{s.desc}</p>
                            </div>
                        </div>
                    ))}
                </div>

                <p style={{ color: 'rgba(255,255,255,0.35)', fontSize: 13 }}>© 2026 HospitalManager. All rights reserved.</p>
            </div>

            <div className="d-flex align-items-center justify-content-center flex-grow-1 p-4">
                <div style={{ width: '100%', maxWidth: 480 }}>
                    <div style={{ background: '#fff', borderRadius: 24, padding: '40px 40px', boxShadow: '0 24px 60px rgba(0,0,0,0.3)' }}>
                        {success ? (
                            <div className="text-center py-4">
                                <div style={{ width: 70, height: 70, background: '#e8f5e9', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 20px' }}>
                                    <FaCheckCircle size={36} color="#28a745" />
                                </div>
                                <h4 style={{ fontWeight: 800, color: '#1a3a6e' }}>Account Created!</h4>
                                <p style={{ color: '#888', fontSize: 14 }}>Redirecting you to login...</p>
                            </div>
                        ) : (
                            <>
                                <div className="text-center mb-4">
                                    <h3 style={{ fontWeight: 800, color: '#1a3a6e', marginBottom: 6 }}>Create Account</h3>
                                    <p style={{ color: '#888', fontSize: 14 }}>Step {step} of 2 — {step === 1 ? 'Personal Details' : 'Set Password'}</p>
                                    <div style={{ height: 4, background: '#e0e0e0', borderRadius: 4, marginTop: 10 }}>
                                        <div style={{ height: '100%', background: 'linear-gradient(90deg,#1a3a6e,#1976d2)', borderRadius: 4, width: step === 1 ? '50%' : '100%', transition: 'width 0.4s ease' }} />
                                    </div>
                                </div>

                                {step === 1 && (
                                    <>
                                        <div className="d-flex gap-3 mb-4">
                                            <button style={socialBtn}><FaGoogle color="#ea4335" size={17} /><span>Google</span></button>
                                            <button style={socialBtn}><FaApple color="#333" size={17} /><span>Apple</span></button>
                                        </div>
                                    </>
                                )}

                                {error && <div style={errorBox}>{error}</div>}

                                {step === 1 ? (
                                    <form onSubmit={handleNext}>
                                        <div className="d-flex gap-3 mb-3">
                                            <div style={{ flex: 1 }}>
                                                <label style={labelStyle}>First Name</label>
                                                <div style={{ position: 'relative' }}>
                                                    <FaUser style={inputIcon} />
                                                    <input name="firstName" value={form.firstName} onChange={handleChange} placeholder="John" style={inputStyle} />
                                                </div>
                                            </div>
                                            <div style={{ flex: 1 }}>
                                                <label style={labelStyle}>Last Name</label>
                                                <div style={{ position: 'relative' }}>
                                                    <FaUser style={inputIcon} />
                                                    <input name="lastName" value={form.lastName} onChange={handleChange} placeholder="Doe" style={inputStyle} />
                                                </div>
                                            </div>
                                        </div>
                                        <div className="mb-3">
                                            <label style={labelStyle}>Email Address</label>
                                            <div style={{ position: 'relative' }}>
                                                <FaEnvelope style={inputIcon} />
                                                <input type="email" name="email" value={form.email} onChange={handleChange} placeholder="you@example.com" style={inputStyle} />
                                            </div>
                                        </div>
                                        <div className="mb-4">
                                            <label style={labelStyle}>Register As</label>
                                            <div className="d-flex gap-2">
                                                {['Patient', 'Doctor', 'Staff'].map(r => (
                                                    <button key={r} type="button" onClick={() => setForm({ ...form, role: r })}
                                                        style={{ flex: 1, padding: '10px 8px', borderRadius: 10, border: '1.5px solid', borderColor: form.role === r ? '#1976d2' : '#e0e0e0', background: form.role === r ? '#e3f0ff' : '#fff', color: form.role === r ? '#1976d2' : '#888', fontWeight: 600, fontSize: 13, cursor: 'pointer' }}>
                                                        {r}
                                                    </button>
                                                ))}
                                            </div>
                                        </div>
                                        <button type="submit" style={submitBtn}>Continue →</button>
                                    </form>
                                ) : (
                                    <form onSubmit={handleSubmit}>
                                        <div className="mb-3">
                                            <label style={labelStyle}>Password</label>
                                            <div style={{ position: 'relative' }}>
                                                <FaLock style={inputIcon} />
                                                <input type={showPass ? 'text' : 'password'} name="password" value={form.password} onChange={handleChange} style={inputStyle} />
                                                <button type="button" onClick={() => setShowPass(!showPass)} style={eyeBtn}>{showPass ? <FaEyeSlash /> : <FaEye />}</button>
                                            </div>
                                        </div>
                                        <div className="mb-4 d-flex align-items-start gap-2">
                                            <input type="checkbox" name="agreeTerms" id="terms" checked={form.agreeTerms} onChange={handleChange} style={{ marginTop: 3 }} />
                                            <label htmlFor="terms" style={{ fontSize: 13, color: '#666' }}>I agree to the Terms & Privacy Policy</label>
                                        </div>
                                        <div className="d-flex gap-3">
                                            <button type="button" onClick={() => setStep(1)} style={{ ...submitBtn, background: '#f5f5f5', color: '#333', width: 'auto' }}>Back</button>
                                            <button type="submit" disabled={loading} style={{ ...submitBtn, flex: 1 }}>{loading ? 'Creating...' : 'Create Account'}</button>
                                        </div>
                                    </form>
                                )}
                            </>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

const inputStyle = { width: '100%', padding: '12px 14px 12px 42px', borderRadius: 12, border: '1.5px solid #e0e0e0', fontSize: 14, outline: 'none', background: '#f9fafb' };
const inputIcon = { position: 'absolute', left: 14, top: '50%', transform: 'translateY(-50%)', color: '#9e9e9e', fontSize: 15 };
const labelStyle = { display: 'block', marginBottom: 6, fontWeight: 600, fontSize: 13, color: '#444' };
const socialBtn = { flex: 1, display: 'flex', alignItems: 'center', justifycontent: 'center', gap: 8, padding: '11px', borderRadius: 12, border: '1.5px solid #e0e0e0', background: '#fff', cursor: 'pointer', fontWeight: 600, fontSize: 14, color: '#333' };
const eyeBtn = { position: 'absolute', right: 14, top: '50%', transform: 'translateY(-50%)', background: 'none', border: 'none', cursor: 'pointer', color: '#888' };
const submitBtn = { width: '100%', background: 'linear-gradient(135deg, #1a3a6e, #1976d2)', color: '#fff', border: 'none', borderRadius: 12, padding: '14px', fontWeight: 700, fontSize: 15, cursor: 'pointer' };
const errorBox = { background: '#fff5f5', border: '1px solid #f5c6c6', borderRadius: 10, padding: '10px 14px', marginBottom: 16, color: '#e53935', fontSize: 13, fontWeight: 500 };

export default Signup;
