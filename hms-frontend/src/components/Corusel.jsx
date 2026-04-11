import React from 'react';
import { Carousel } from 'react-bootstrap';
import { Link } from 'react-router-dom';

const imgStyle = {
  width: '100%',
  height: 'clamp(350px, 60vw, 750px)',
  objectFit: 'cover',
  objectPosition: 'center 20%',
};

const overlayStyle = {
  position: 'absolute',
  inset: 0,
  background: 'linear-gradient(90deg, rgba(255,255,255,0.95) 30%, rgba(255,255,255,0.6) 50%, transparent 100%)',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'flex-start',
  justifyContent: 'center',
  padding: 'clamp(20px, 8%, 100px)',
  zIndex: 1,
};

const slides = [
  {
    img: 'https://images.unsplash.com/photo-1559839734-2b71ea197ec2?ixlib=rb-4.0.3&auto=format&fit=crop&w=1600&q=80',
    title: 'Your Health, Our Priority',
    subtitle: 'Compassionable Care & Advanced Technology',
    description: 'Experience professional medical care with our team of board-certified specialists using state-of-the-art diagnostic tools.',
  },
];

const Corusel = () => {
  return (
    <>
      <Carousel controls={false} indicators={false} fade interval={5000} className="hero-carousel w-100">
        {slides.map((s, i) => (
          <Carousel.Item key={i} className="w-100">
            <img className="d-block w-100" src={s.img} alt={s.title} style={imgStyle} />
            <div style={overlayStyle}>
              <h1 className="hero-title" style={{
                color: '#1a3a6e',
                fontWeight: 900,
                fontSize: 'clamp(38px, 6.5vw, 85px)',
                lineHeight: 1,
                maxWidth: 700,
                marginBottom: 15,
              }}>
                {s.title}
              </h1>
              <h2 className="hero-subtitle" style={{
                color: '#1976d2',
                fontWeight: 600,
                fontSize: 'clamp(20px, 3.5vw, 48px)',
                marginBottom: 20,
                maxWidth: 800,
                opacity: 0.9
              }}>
                {s.subtitle}
              </h2>
              <p className="hero-description" style={{
                color: '#444',
                fontSize: 'clamp(15px, 1.3vw, 19px)',
                maxWidth: 550,
                marginBottom: 35,
                lineHeight: 1.6,
              }}>
                {s.description}
              </p>
              <div className="d-flex gap-3">
                <Link to="/role-select" className="btn btn-primary rounded-pill px-5 py-3 fw-bold shadow-lg border-0" style={{ fontSize: 17, background: '#1976d2' }}>
                  Book Now
                </Link>
                <Link to="/doctor-list" className="btn btn-outline-primary rounded-pill px-5 py-3 fw-bold" style={{ fontSize: 17, borderWidth: 2 }}>
                  Our Doctors
                </Link>
              </div>
            </div>
          </Carousel.Item>
        ))}
      </Carousel>

      <style>{`
        .hero-carousel .carousel-item { transition: transform 1s ease-in-out, opacity 1s ease-in-out !important; }
        .hero-title { animation: fadeInDown 1s ease-out; }
        .hero-subtitle { animation: fadeInUp 1.2s ease-out; }
        @keyframes fadeInDown {
          from { opacity: 0; transform: translateY(-30px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes fadeInUp {
          from { opacity: 0; transform: translateY(30px); }
          to { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </>
  );
};

export default Corusel;
