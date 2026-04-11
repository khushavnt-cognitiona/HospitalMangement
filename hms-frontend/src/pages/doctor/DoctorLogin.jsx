import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import authService from '../../services/authService';
import { FaHospital, FaLock, FaUserMd, FaEye, FaEyeSlash } from 'react-icons/fa';

const DoctorLogin = () => {
  const [form, setForm] = useState({ email: '', password: '' });
  const [showPw, setShowPw] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    try {
        const response = await authService.login({ ...form, role: 'DOCTOR' });
        login('DOCTOR', response.user, response.token);
        navigate('/doctor/dashboard');
    } catch (err) {
        setError(err.response?.data?.message || 'Invalid credentials. Access restricted to medical practitioners.');
    } finally {
        setLoading(false);
    }
  };

  return (
    <div style={{
      minHeight: '100vh',
      background: 'linear-gradient(135deg, #0d47a1 0%, #1565c0 50%, #1976d2 100%)',
      display: 'flex', alignItems: 'center', justifyContent: 'center',
      padding: '24px 16px', position: 'relative', overflow: 'hidden',
    }}>
      {/* decorative blobs */}
      {['5%,15%,300px', '85%,65%,220px', '75%,5%,180px'].map((pos, i) => {
        const [left, top, size] = pos.split(',');
        return <div key={i} style={{ position: 'absolute', left, top, width: size, height: size, borderRadius: '50%', background: 'rgba(255,255,255,0.06)', pointerEvents: 'none' }} />;
      })}

      <div style={{ width: '100%', maxWidth: 440, zIndex: 1 }}>
        <div style={{ textAlign: 'center', marginBottom: 36 }}>
          <div style={{ width: 72, height: 72, borderRadius: '50%', background: 'rgba(255,255,255,0.1)', border: '2px solid rgba(255,255,255,0.2)', display: 'inline-flex', alignItems: 'center', justifyContent: 'center', marginBottom: 16 }}>
            <FaHospital size={32} color="#fff" />
          </div>
          <h2 style={{ fontWeight: 900, color: '#fff', fontSize: 28, margin: 0 }}>
            Clinical<span style={{ color: '#90caf9' }}>Portal</span>
          </h2>
          <p style={{ color: 'rgba(255,255,255,0.6)', fontSize: 14, marginTop: 6 }}>Secure Physician Access</p>
        </div>

        <div style={{ background: '#fff', borderRadius: 24, padding: '40px 36px', boxShadow: '0 24px 80px rgba(0,0,0,0.3)' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 28 }}>
            <div style={{ width: 40, height: 40, borderRadius: 12, background: 'rgba(13,71,161,0.08)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <FaUserMd size={20} color="#0d47a1" />
            </div>
            <div>
              <h5 style={{ fontWeight: 800, color: '#0d47a1', margin: 0, fontSize: 17 }}>Practitioner Sign-In</h5>
              <p style={{ color: '#888', margin: 0, fontSize: 12 }}>Medical records & Schedule hub</p>
            </div>
          </div>

          {error && (
            <div style={{ background: '#fff5f5', border: '1.5px solid #ffcccc', borderRadius: 10, padding: '10px 14px', marginBottom: 20, color: '#c62828', fontSize: 13, fontWeight: 600 }}>
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit}>
            <div style={{ marginBottom: 18 }}>
              <label style={{ fontSize: 11, fontWeight: 700, color: '#555', textTransform: 'uppercase', letterSpacing: 0.5, display: 'block', marginBottom: 7 }}>Professional Email</label>
              <input
                type="email" required placeholder="doctor@hospital.com"
                value={form.email}
                onChange={e => setForm(f => ({ ...f, email: e.target.value }))}
                style={{ width: '100%', padding: '12px 14px', borderRadius: 10, border: '1.5px solid #e0e9f7', fontSize: 14, outline: 'none', background: '#f8fafc', color: '#0d47a1' }}
              />
            </div>

            <div style={{ marginBottom: 24 }}>
              <label style={{ fontSize: 11, fontWeight: 700, color: '#555', textTransform: 'uppercase', letterSpacing: 0.5, display: 'block', marginBottom: 7 }}>Identity Key (Password)</label>
              <div style={{ position: 'relative' }}>
                <input
                  type={showPw ? 'text' : 'password'} required placeholder="••••••••"
                  value={form.password}
                  onChange={e => setForm(f => ({ ...f, password: e.target.value }))}
                  style={{ width: '100%', padding: '12px 44px 12px 14px', borderRadius: 10, border: '1.5px solid #e0e9f7', fontSize: 14, outline: 'none', background: '#f8fafc', color: '#0d47a1' }}
                />
                <button type="button" onClick={() => setShowPw(s => !s)} style={{ position: 'absolute', right: 12, top: '50%', transform: 'translateY(-50%)', background: 'none', border: 'none', cursor: 'pointer', color: '#aaa', padding: 0 }}>
                  {showPw ? <FaEyeSlash size={16} /> : <FaEye size={16} />}
                </button>
              </div>
            </div>

            <button type="submit" disabled={loading} style={{
              width: '100%', padding: '13px', borderRadius: 12, border: 'none',
              background: loading ? '#bbdefb' : 'linear-gradient(135deg, #0d47a1 0%, #1565c0 100%)',
              color: '#fff', fontWeight: 800, fontSize: 15, cursor: loading ? 'not-allowed' : 'pointer',
              display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8,
              transition: 'all 0.2s', boxShadow: loading ? 'none' : '0 6px 20px rgba(13,71,161,0.3)',
            }}>
              {loading ? 'Authenticating...' : <><FaLock size={14} /> Authorize Clinical Access</>}
            </button>
          </form>
        </div>
        <p style={{ textAlign: 'center', color: 'rgba(255,255,255,0.4)', fontSize: 11, marginTop: 28 }}>
          Physician Privacy & Security Compliance · © 2026 HospitalManager
        </p>
      </div>
    </div>
  );
};

export default DoctorLogin;
