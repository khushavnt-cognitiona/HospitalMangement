import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import authService from '../../services/authService';
import { FaHospital, FaLock, FaUserShield, FaEye, FaEyeSlash } from 'react-icons/fa';

const AdminLogin = () => {
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
        const response = await authService.login({ ...form, role: 'ADMIN' });
        login('ADMIN', response.user, response.token);
        navigate('/admin/dashboard');
    } catch (err) {
        setError(err.response?.data?.message || 'Invalid credentials for Admin access.');
    } finally {
        setLoading(false);
    }
  };

  return (
    <div style={{
      minHeight: '100vh',
      background: 'linear-gradient(135deg, #0d1b3e 0%, #1a237e 50%, #283593 100%)',
      display: 'flex', alignItems: 'center', justifyContent: 'center',
      padding: '24px 16px', position: 'relative', overflow: 'hidden',
    }}>
      {['10%,5%,300px', '80%,70%,200px', '60%,10%,150px'].map((pos, i) => {
        const [left, top, size] = pos.split(',');
        return <div key={i} style={{ position: 'absolute', left, top, width: size, height: size, borderRadius: '50%', background: 'rgba(255,255,255,0.04)', pointerEvents: 'none' }} />;
      })}

      <div style={{ width: '100%', maxWidth: 440, zIndex: 1 }}>
        <div style={{ textAlign: 'center', marginBottom: 36 }}>
          <div style={{ width: 72, height: 72, borderRadius: '50%', background: 'rgba(255,193,7,0.15)', border: '2px solid rgba(255,193,7,0.4)', display: 'inline-flex', alignItems: 'center', justifyContent: 'center', marginBottom: 16 }}>
            <FaHospital size={32} color="#ffc107" />
          </div>
          <h2 style={{ fontWeight: 900, color: '#fff', fontSize: 28, margin: 0 }}>
            Hospital<span style={{ color: '#ffc107' }}>Manager</span>
          </h2>
          <p style={{ color: 'rgba(255,255,255,0.55)', fontSize: 14, marginTop: 6 }}>Strategic Admin Control</p>
        </div>

        <div style={{ background: '#fff', borderRadius: 24, padding: '40px 36px', boxShadow: '0 24px 80px rgba(0,0,0,0.35)' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 28 }}>
            <div style={{ width: 40, height: 40, borderRadius: 12, background: 'rgba(26,35,126,0.08)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <FaUserShield size={20} color="#1a237e" />
            </div>
            <div>
              <h5 style={{ fontWeight: 800, color: '#1a237e', margin: 0, fontSize: 17 }}>Admin Login</h5>
              <p style={{ color: '#888', margin: 0, fontSize: 12 }}>Secure gateway to management hub</p>
            </div>
          </div>

          {error && (
            <div style={{ background: '#fff5f5', border: '1.5px solid #ffcccc', borderRadius: 10, padding: '10px 14px', marginBottom: 20, color: '#c62828', fontSize: 13, fontWeight: 600 }}>
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit}>
            <div style={{ marginBottom: 18 }}>
              <label style={{ fontSize: 11, fontWeight: 700, color: '#555', textTransform: 'uppercase', letterSpacing: 0.5, display: 'block', marginBottom: 7 }}>Email Address</label>
              <input
                type="email" required placeholder="admin@hospital.com"
                value={form.email}
                onChange={e => setForm(f => ({ ...f, email: e.target.value }))}
                style={{ width: '100%', padding: '12px 14px', borderRadius: 10, border: '1.5px solid #e0e9f7', fontSize: 14, outline: 'none', background: '#f8fafc', color: '#1a3a6e' }}
              />
            </div>

            <div style={{ marginBottom: 24 }}>
              <label style={{ fontSize: 11, fontWeight: 700, color: '#555', textTransform: 'uppercase', letterSpacing: 0.5, display: 'block', marginBottom: 7 }}>Password</label>
              <div style={{ position: 'relative' }}>
                <input
                  type={showPw ? 'text' : 'password'} required placeholder="••••••••"
                  value={form.password}
                  onChange={e => setForm(f => ({ ...f, password: e.target.value }))}
                  style={{ width: '100%', padding: '12px 44px 12px 14px', borderRadius: 10, border: '1.5px solid #e0e9f7', fontSize: 14, outline: 'none', background: '#f8fafc', color: '#1a3a6e' }}
                />
                <button type="button" onClick={() => setShowPw(s => !s)} style={{ position: 'absolute', right: 12, top: '50%', transform: 'translateY(-50%)', background: 'none', border: 'none', cursor: 'pointer', color: '#aaa', padding: 0 }}>
                  {showPw ? <FaEyeSlash size={16} /> : <FaEye size={16} />}
                </button>
              </div>
            </div>

            <button type="submit" disabled={loading} style={{
              width: '100%', padding: '13px', borderRadius: 12, border: 'none',
              background: loading ? '#c5cae9' : 'linear-gradient(135deg, #1a237e 0%, #283593 100%)',
              color: '#fff', fontWeight: 800, fontSize: 15, cursor: loading ? 'not-allowed' : 'pointer',
              display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8,
              transition: 'all 0.2s', boxShadow: loading ? 'none' : '0 6px 20px rgba(26,35,126,0.35)',
            }}>
              {loading ? 'Authenticating...' : <><FaLock size={14} /> Sign In as Admin</>}
            </button>
          </form>
        </div>
        <p style={{ textAlign: 'center', color: 'rgba(255,255,255,0.3)', fontSize: 11, marginTop: 28 }}>
          © 2026 HospitalManager · Enterprise Strategic Command
        </p>
      </div>
    </div>
  );
};

export default AdminLogin;
