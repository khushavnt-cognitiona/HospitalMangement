import React, { useState, useEffect, useRef } from 'react';
import { FaUserMd, FaUsers, FaStar, FaAward } from 'react-icons/fa';

const stats = [
  { icon: FaUserMd,  value: 500,  suffix: '+', label: 'Expert Doctors',   color: '#90caf9' },
  { icon: FaUsers,   value: 10000, suffix: '+', label: 'Happy Patients',  color: '#a5d6a7' },
  { icon: FaStar,    value: 4.9,  suffix: '★', label: 'Average Rating',   color: '#ffd54f' },
  { icon: FaAward,   value: 15,   suffix: '+', label: 'Specialties',      color: '#ef9a9a' },
];

function useCountUp(target, duration = 1800, started = false) {
  const [count, setCount] = useState(0);
  useEffect(() => {
    if (!started) return;
    let start = null;
    const isFloat = !Number.isInteger(target);
    const step = (timestamp) => {
      if (!start) start = timestamp;
      const progress = Math.min((timestamp - start) / duration, 1);
      const cur = isFloat
        ? parseFloat((progress * target).toFixed(1))
        : Math.floor(progress * target);
      setCount(cur);
      if (progress < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  }, [started, target, duration]);
  return count;
}

const StatItem = ({ icon: Icon, value, suffix, label, color, started }) => {
  const count = useCountUp(value, 1600, started);
  return (
    <div style={{
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      padding: '24px 32px',
      position: 'relative',
    }}>
      <div style={{
        width: 60,
        height: 60,
        borderRadius: '50%',
        background: `${color}22`,
        border: `2px solid ${color}55`,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: 14,
      }}>
        <Icon size={26} color={color} />
      </div>
      <div style={{
        fontSize: 'clamp(28px, 4vw, 42px)',
        fontWeight: 900,
        color: '#fff',
        lineHeight: 1,
        marginBottom: 6,
        fontVariantNumeric: 'tabular-nums',
      }}>
        {count}{suffix}
      </div>
      <div style={{ fontSize: 13, color: 'rgba(255,255,255,0.65)', fontWeight: 500, textTransform: 'uppercase', letterSpacing: 1 }}>
        {label}
      </div>
    </div>
  );
};

const StatsBanner = () => {
  const [started, setStarted] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setStarted(true); },
      { threshold: 0.3 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section ref={ref} style={{
      background: 'linear-gradient(135deg, #0d1b3e 0%, #1565c0 50%, #1a237e 100%)',
      padding: '20px 0',
      position: 'relative',
      overflow: 'hidden',
    }}>
      <div style={{ position: 'absolute', top: -60, left: -60, width: 200, height: 200, borderRadius: '50%', background: 'rgba(255,255,255,0.03)', pointerEvents: 'none' }} />
      <div style={{ position: 'absolute', bottom: -80, right: -40, width: 280, height: 280, borderRadius: '50%', background: 'rgba(255,193,7,0.05)', pointerEvents: 'none' }} />

      <div style={{
        maxWidth: 1100,
        margin: '0 auto',
        padding: '0 16px',
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
        gap: 0,
      }}>
        {stats.map((s, i) => (
          <React.Fragment key={i}>
            <StatItem {...s} started={started} />
            {i < stats.length - 1 && (
              <div style={{
                display: 'none',
                width: 1,
                background: 'rgba(255,255,255,0.12)',
                alignSelf: 'center',
                height: '60%',
              }} className="stat-divider" />
            )}
          </React.Fragment>
        ))}
      </div>

      <style>{`
        @media (min-width: 576px) {
          .stat-divider { display: block !important; }
        }
      `}</style>
    </section>
  );
};

export default StatsBanner;
