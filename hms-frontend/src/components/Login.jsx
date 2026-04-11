import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { FaHospital, FaEnvelope, FaLock, FaEye, FaEyeSlash, FaSpinner, FaUserInjured, FaUserMd, FaUserShield, FaUserNurse } from 'react-icons/fa';
import { useAuth } from '../context/AuthContext';
import authService from '../services/authService';

const roles = [
    { id: 'PATIENT', label: 'Patient', icon: FaUserInjured, color: '#1976d2' },
    { id: 'DOCTOR',  label: 'Doctor',  icon: FaUserMd,      color: '#2e7d32' },
    { id: 'NURSE',   label: 'Nurse',   icon: FaUserNurse,   color: '#00838f' },
    { id: 'ADMIN',   label: 'Admin',   icon: FaUserShield,  color: '#d84315' }
];

const Login = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const { login, auth } = useAuth();

    useEffect(() => {
        if (auth.token && auth.role) {
            const dashboardMap = {
                ADMIN: '/admin/dashboard',
                DOCTOR: '/doctor/dashboard',
                PATIENT: '/patient/dashboard',
                NURSE: '/nurse/dashboard'
            };
            navigate(dashboardMap[auth.role.toUpperCase()] || '/', { replace: true });
        }
    }, [auth, navigate]);

    const [activeRole, setActiveRole] = useState(() => {
        const path = location.pathname.toLowerCase();
        if (path.includes('doctor')) return 'DOCTOR';
        if (path.includes('admin')) return 'ADMIN';
        if (path.includes('nurse')) return 'NURSE';
        return 'PATIENT';
    });

    const [form, setForm]         = useState({ email: '', password: '' });
    const [showPass, setShowPass] = useState(false);
    const [loading, setLoading]   = useState(false);
    const [error, setError]       = useState('');

    const activeRoleConfig = roles.find(r => r.id === activeRole);

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!form.email || !form.password) {
            setError('Please enter both email and password.');
            return;
        }

        setLoading(true);
        setError('');

        try {
            const data = await authService.login(form);
            login(data.role, data);
            
            const role = data.role?.toUpperCase();
            const dashboardMap = {
                ADMIN: '/admin/dashboard',
                DOCTOR: '/doctor/dashboard',
                PATIENT: '/patient/dashboard',
                NURSE: '/nurse/dashboard'
            };
            
            navigate(dashboardMap[role] || '/role-select', { replace: true });
        } catch (err) {
            const msg = err.response?.data?.message || 'Login failed. Please check your credentials.';
            setError(msg);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div style={{ minHeight: '100vh', display: 'flex', background: '#f4f7f9' }}>
            <div className="d-none d-lg-flex flex-column justify-content-between p-5"
                style={{ 
                    width: '40%', 
                    background: activeRoleConfig.color,
                    transition: 'background 0.5s ease',
                    position: 'relative',
                    overflow: 'hidden'
                }}>
                <div style={{ position: 'absolute', top: '-10%', right: '-10%', fontSize: '40rem', opacity: 0.1, color: '#fff', pointerEvents: 'none' }}>
                    <activeRoleConfig.icon />
                </div>

                <div className="d-flex align-items-center gap-2" style={{ zIndex: 1 }}>
                    <FaHospital size={30} color="#fff" />
                    <span style={{ fontWeight: 800, fontSize: 24, color: '#fff' }}>Hospital<span style={{ opacity: 0.8 }}>Manager</span></span>
                </div>

                <div style={{ zIndex: 1 }}>
                    <h2 style={{ color: '#fff', fontWeight: 800, fontSize: 42, lineHeight: 1.1, marginBottom: 20 }}>
                        {activeRoleConfig.label} Portal
                    </h2>
                    <p style={{ color: 'rgba(255,255,255,0.85)', fontSize: 18, maxWidth: 380, lineHeight: 1.6 }}>
                        Secure access to your specialized {activeRoleConfig.label.toLowerCase()} dashboard.
                    </p>
                </div>

                <div style={{ zIndex: 1, color: 'rgba(255,255,255,0.5)', fontSize: 13 }}>
                    © 2026 HospitalManager · Enterprise Health Systems
                </div>
            </div>

            <div className="d-flex align-items-center justify-content-center flex-grow-1 p-4">
                <div style={{ width: '100%', maxWidth: 460 }}>
                    <div className="d-flex gap-1 mb-4 p-1" style={{ background: '#e9ecef', borderRadius: 16 }}>
                        {roles.map(role => (
                            <button
                                key={role.id}
                                onClick={() => { setActiveRole(role.id); setError(''); }}
                                style={{
                                    flex: 1,
                                    padding: '10px 5px',
                                    borderRadius: 12,
                                    border: 'none',
                                    fontSize: 13,
                                    fontWeight: 700,
                                    background: activeRole === role.id ? '#fff' : 'transparent',
                                    color: activeRole === role.id ? role.color : '#6c757d',
                                    boxShadow: activeRole === role.id ? '0 4px 12px rgba(0,0,0,0.05)' : 'none',
                                    transition: 'all 0.3s ease',
                                    display: 'flex',
                                    flexDirection: 'column',
                                    alignItems: 'center',
                                    gap: 4
                                }}
                            >
                                <role.icon size={16} />
                                {role.label}
                            </button>
                        ))}
                    </div>

                    <div style={{ background: '#fff', borderRadius: 24, padding: '48px', boxShadow: '0 20px 50px rgba(0,0,0,0.05)' }}>
                        <div className="mb-4">
                            <h3 style={{ fontWeight: 800, color: '#1a3a6e', marginBottom: 8 }}>Welcome Back</h3>
                            <p style={{ color: '#888', fontSize: 15 }}>Please enter your details to sign in.</p>
                        </div>

                        {error && (
                            <div className="alert alert-danger border-0 small fw-bold py-2 px-3 rounded-3 mb-4">{error}</div>
                        )}

                        <form onSubmit={handleSubmit}>
                            <div className="mb-3">
                                <label style={labelStyle}>Email Address</label>
                                <div style={{ position: 'relative' }}>
                                    <FaEnvelope style={inputIcon} />
                                    <input
                                        type="email"
                                        placeholder="you@hospital.com"
                                        value={form.email}
                                        onChange={e => setForm({ ...form, email: e.target.value })}
                                        style={inputStyle}
                                    />
                                </div>
                            </div>

                            <div className="mb-4">
                                <div className="d-flex justify-content-between">
                                    <label style={labelStyle}>Password</label>
                                    <Link to="#" style={{ fontSize: 12, color: activeRoleConfig.color, textDecoration: 'none', fontWeight: 600 }}>Forgot?</Link>
                                </div>
                                <div style={{ position: 'relative' }}>
                                    <FaLock style={inputIcon} />
                                    <input
                                        type={showPass ? 'text' : 'password'}
                                        placeholder="••••••••"
                                        value={form.password}
                                        onChange={e => setForm({ ...form, password: e.target.value })}
                                        style={inputStyle}
                                    />
                                    <button
                                        type="button"
                                        onClick={() => setShowPass(!showPass)}
                                        style={{ position: 'absolute', right: 14, top: '50%', transform: 'translateY(-50%)', background: 'none', border: 'none', cursor: 'pointer', color: '#888' }}
                                    >
                                        {showPass ? <FaEyeSlash /> : <FaEye />}
                                    </button>
                                </div>
                            </div>

                            <button
                                type="submit"
                                disabled={loading}
                                style={{
                                    width: '100%',
                                    background: loading ? '#ccc' : activeRoleConfig.color,
                                    color: '#fff',
                                    border: 'none',
                                    borderRadius: 14,
                                    padding: '16px',
                                    fontWeight: 700,
                                    fontSize: 16,
                                    cursor: loading ? 'not-allowed' : 'pointer',
                                    transition: 'background 0.3s ease',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    gap: 10,
                                    boxShadow: `0 10px 20px ${activeRoleConfig.color}33`
                                }}
                            >
                                {loading ? <FaSpinner className="spin-icon" /> : 'Sign In to Dashboard'}
                            </button>
                        </form>

                        <div className="mt-4 pt-2 text-center border-top">
                            <p style={{ fontSize: 14, color: '#888' }}>
                                New to our hospital? <Link to="/signup" style={{ color: activeRoleConfig.color, fontWeight: 700, textDecoration: 'none' }}>Create Account</Link>
                            </p>
                        </div>
                    </div>
                </div>
            </div>

            <style>{`
                .spin-icon { animation: spin 1s linear infinite; }
                @keyframes spin { 100% { transform: rotate(360deg); } }
            `}</style>
        </div>
    );
};

const inputStyle = {
    width: '100%', padding: '14px 14px 14px 44px', borderRadius: 14,
    border: '1.5px solid #eee', fontSize: 15, outline: 'none',
    background: '#fcfcfc', transition: 'all 0.2s',
};
const inputIcon = {
    position: 'absolute', left: 16, top: '50%',
    transform: 'translateY(-50%)', color: '#cbd5e0', fontSize: 16,
};
const labelStyle = {
    display: 'block', marginBottom: 8, fontWeight: 700, fontSize: 13, color: '#4a5568',
};

export default Login;
