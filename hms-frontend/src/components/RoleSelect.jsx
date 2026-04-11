import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaUserInjured, FaUserMd, FaUserNurse, FaHospital, FaCheck, FaUserShield } from 'react-icons/fa';

const roles = [
  {
    label: 'Patient',
    icon: FaUserInjured,
    route: '/login',
    color: '#1976d2',
    gradient: 'linear-gradient(135deg, #1a3a6e 0%, #1976d2 100%)',
    bg: 'rgba(25,118,210,0.08)',
    borderColor: 'rgba(25,118,210,0.3)',
    desc: 'Book appointments, view prescriptions & health records',
    features: ['Online appointment booking', 'View prescriptions & health tips', 'Track appointment status'],
  },
  {
    label: 'Doctor',
    icon: FaUserMd,
    route: '/doctor/login',
    color: '#2e7d32',
    gradient: 'linear-gradient(135deg, #1b5e20 0%, #388e3c 100%)',
    bg: 'rgba(46,125,50,0.08)',
    borderColor: 'rgba(46,125,50,0.3)',
    desc: 'Manage appointments, patients & prescriptions',
    features: ['View patient appointments', 'Write prescriptions & notes', 'Access patient health records'],
  },
  {
    label: 'Nurse',
    icon: FaUserNurse,
    route: '/nurse/login',
    color: '#00838f',
    gradient: 'linear-gradient(135deg, #004d56 0%, #00838f 100%)',
    bg: 'rgba(0,131,143,0.08)',
    borderColor: 'rgba(0,131,143,0.3)',
    desc: 'Manage wards, beds & patient assignments',
    features: ['Ward & bed management', 'Patient assignment control', 'Real-time ward status view'],
  },
  {
    label: 'Admin',
    icon: FaUserShield,
    route: '/admin/login',
    color: '#1a237e',
    gradient: 'linear-gradient(135deg, #0d1b3e 0%, #1a237e 100%)',
    bg: 'rgba(26,35,126,0.08)',
    borderColor: 'rgba(26,35,126,0.3)',
    desc: 'Full hospital administration & monitoring',
    features: ['Service health monitoring', 'Manage doctors & staff', 'Financial & audit reports'],
  },
];

const FloatingIcon = ({ style }) => (
  <div style={{
    position: 'absolute',
    color: 'rgba(255,255,255,0.07)',
    fontSize: 60,
    fontWeight: 900,
    fontFamily: 'sans-serif',
    userSelect: 'none',
    pointerEvents: 'none',
    ...style,
  }}>✚</div>
);

const RoleSelect = () => {
  const navigate = useNavigate();
  const [hovered, setHovered] = useState(null);

  return (
    <div style={{
      minHeight: '100vh',
      background: 'linear-gradient(135deg, #0d1b3e 0%, #1a3a6e 50%, #1565c0 100%)',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '48px 16px',
      position: 'relative',
      overflow: 'hidden',
    }}>
      <FloatingIcon style={{ top: '5%',  left: '3%',  fontSize: 120, animation: 'floatRole 6s ease-in-out infinite' }} />
      <FloatingIcon style={{ top: '15%', right: '5%', fontSize: 80,  animation: 'floatRole 8s ease-in-out infinite 1s' }} />
      <FloatingIcon style={{ bottom: '10%', left: '8%', fontSize: 60, animation: 'floatRole 5s ease-in-out infinite 0.5s' }} />
      <FloatingIcon style={{ bottom: '5%', right: '3%', fontSize: 100, animation: 'floatRole 7s ease-in-out infinite 2s' }} />
      <FloatingIcon style={{ top: '45%', left: '1%',  fontSize: 50,  animation: 'floatRole 9s ease-in-out infinite 1.5s' }} />

      <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 8, zIndex: 1 }}>
        <FaHospital size={40} color="#ffc107" />
        <span style={{ fontWeight: 900, fontSize: 32, color: '#fff' }}>
          HMS<span style={{ color: '#ffc107' }}>Select</span>
        </span>
      </div>
      <p style={{ color: 'rgba(255,255,255,0.6)', marginBottom: 52, fontSize: 15, textAlign: 'center', zIndex: 1, maxWidth: 400 }}>
        Select your clinical role to access the unified management portal.
      </p>

      <div style={{
        display: 'flex', gap: 24, flexWrap: 'wrap',
        justifyContent: 'center', maxWidth: 1020, width: '100%', zIndex: 1,
      }}>
        {roles.map(({ label, icon: Icon, route, color, gradient, bg, borderColor, desc, features }) => {
          const isHovered = hovered === label;
          return (
            <div
              key={label}
              onClick={() => navigate(route)}
              onMouseEnter={() => setHovered(label)}
              onMouseLeave={() => setHovered(null)}
              style={{
                flex: '1 1 280px',
                maxWidth: 300,
                background: isHovered ? '#fff' : 'rgba(255,255,255,0.95)',
                borderRadius: 24,
                padding: '36px 28px 32px',
                cursor: 'pointer',
                boxShadow: isHovered
                  ? `0 24px 60px rgba(0,0,0,0.3), 0 0 0 3px ${color}`
                  : '0 8px 32px rgba(0,0,0,0.2)',
                transition: 'all 0.3s ease',
                transform: isHovered ? 'translateY(-10px) scale(1.02)' : 'translateY(0) scale(1)',
                textAlign: 'center',
                border: `2px solid ${isHovered ? color : 'transparent'}`,
              }}
            >
              <div style={{
                width: 88,
                height: 88,
                borderRadius: '50%',
                background: isHovered ? gradient : bg,
                border: `2px solid ${borderColor}`,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                margin: '0 auto 18px',
                transition: 'all 0.3s ease',
                boxShadow: isHovered ? `0 8px 24px ${color}55` : 'none',
              }}>
                <Icon size={36} color={isHovered ? '#fff' : color} />
              </div>

              <h4 style={{ fontWeight: 900, color: '#1a3a6e', marginBottom: 8, fontSize: 20 }}>{label}</h4>
              <p style={{ color: '#666', fontSize: 13, lineHeight: 1.6, marginBottom: 20 }}>{desc}</p>

              <div style={{ textAlign: 'left', marginBottom: 24 }}>
                {features.map((f, i) => (
                  <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 8 }}>
                    <div style={{
                      width: 18, height: 18, borderRadius: '50%',
                      background: isHovered ? color : '#e8f0fe',
                      display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0,
                      transition: 'background 0.3s',
                    }}>
                      <FaCheck size={9} color={isHovered ? '#fff' : color} />
                    </div>
                    <span style={{ fontSize: 12, color: '#555' }}>{f}</span>
                  </div>
                ))}
              </div>

              <button style={{
                background: isHovered ? gradient : '#f0f4f8',
                color: isHovered ? '#fff' : color,
                border: `1.5px solid ${isHovered ? 'transparent' : borderColor}`,
                borderRadius: 12,
                padding: '11px 28px',
                fontWeight: 700,
                fontSize: 14,
                cursor: 'pointer',
                transition: 'all 0.3s',
                width: '100%',
                boxShadow: isHovered ? `0 6px 20px ${color}55` : 'none',
              }}>
                Login as {label}
              </button>
            </div>
          );
        })}
      </div>

      <p style={{ color: 'rgba(255,255,255,0.3)', fontSize: 12, marginTop: 52, zIndex: 1 }}>
        © 2026 HMS Unified System. All rights reserved.
      </p>

      <style>{`
        @keyframes floatRole {
          0%, 100% { transform: translateY(0px) rotate(0deg); }
          50%       { transform: translateY(-18px) rotate(5deg); }
        }
      `}</style>
    </div>
  );
};

export default RoleSelect;
