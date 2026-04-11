import React, { useState, useEffect } from 'react';
import { Container, Spinner, Alert } from 'react-bootstrap';
import { FaQuoteLeft, FaStar } from 'react-icons/fa';

const reviewsData = [
  {
    id: 1, name: 'Sarah Johnson', role: 'Patient — Cardiology',
    text: 'The doctors were incredible. They made sure I understood everything about my treatment, and I felt completely cared for from the very first appointment.',
    stars: 5, initials: 'SJ', avatarBg: '#1976d2',
  },
  {
    id: 2, name: 'Michael Chen', role: 'Patient — Orthopedics',
    text: 'State-of-the-art facilities and a truly compassionate team. My recovery was seamless and stress-free thanks to their continuous support.',
    stars: 5, initials: 'MC', avatarBg: '#2e7d32',
  },
  {
    id: 3, name: 'Emily Rodriguez', role: 'Patient — Dermatology',
    text: 'From the front desk to the surgical team, everyone was professional and kind. I highly recommend Hospital Manager to anyone seeking quality care.',
    stars: 5, initials: 'ER', avatarBg: '#7b1fa2',
  },
  {
    id: 4, name: 'David Patel', role: 'Patient — Neurology',
    text: 'Booking was effortless and the doctor was incredibly thorough. I got clear explanations and a detailed treatment plan within minutes.',
    stars: 4, initials: 'DP', avatarBg: '#00838f',
  },
  {
    id: 5, name: 'Aisha Khan', role: 'Patient — Pediatrics',
    text: "My child felt completely at ease with the pediatrician. The whole experience was warm, gentle, and professional. Couldn't ask for more.",
    stars: 5, initials: 'AK', avatarBg: '#f57c00',
  },
  {
    id: 6, name: 'James Wilson', role: 'Patient — Psychiatry',
    text: "Mental health care done right. My therapist listened patiently and provided practical tools. I've seen real improvements in just two months.",
    stars: 5, initials: 'JW', avatarBg: '#c62828',
  },
];

const Review = () => {
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchReviews = async () => {
      try {
        setLoading(true);
        setError(null);
        setTimeout(() => {
          setReviews(reviewsData);
          setLoading(false);
        }, 800);
      } catch (err) {
        setError('Failed to fetch reviews. Please try again later.');
        setLoading(false);
      }
    };
    fetchReviews();
  }, []);

  return (
    <div style={{ backgroundColor: '#f4f7fc', padding: '80px 0', minHeight: '400px' }}>
      <Container>
        <div className="text-center mb-5">
          <span style={{
            background: 'rgba(13,110,253,0.1)',
            color: '#1976d2',
            borderRadius: 20,
            padding: '6px 18px',
            fontSize: 13,
            fontWeight: 700,
            letterSpacing: 1,
            textTransform: 'uppercase',
            display: 'inline-block',
            marginBottom: 14,
          }}>
            Testimonials
          </span>
          <h2 style={{ fontWeight: 900, color: '#1a3a6e', fontSize: 'clamp(22px, 4vw, 38px)', marginBottom: 10 }}>
            What Our Patients Say
          </h2>
          <p style={{ color: '#666', maxWidth: 460, margin: '0 auto', fontSize: 15, lineHeight: 1.7 }}>
            Over 10,000 patients trust us with their health. Here are some of their stories.
          </p>
        </div>

        {loading ? (
          <div className="d-flex justify-content-center align-items-center flex-column py-5">
            <Spinner animation="border" variant="primary" style={{ width: '3rem', height: '3rem' }} />
            <p className="mt-3 text-muted fw-bold">Loading reviews...</p>
          </div>
        ) : error ? (
          <Alert variant="danger" className="text-center shadow-sm">{error}</Alert>
        ) : (
          <div className="marquee-container" style={{ overflow: 'hidden', position: 'relative', padding: '20px 0' }}>
            <style>{`
              @keyframes scrollLeft {
                0%   { transform: translateX(0); }
                100% { transform: translateX(calc(-380px * ${reviews.length} - 24px * ${reviews.length})); }
              }
              .review-track {
                display: flex;
                gap: 24px;
                width: max-content;
                animation: scrollLeft ${reviews.length * 6}s linear infinite;
              }
              .review-track:hover { animation-play-state: paused; }
              .rev-card {
                width: 380px;
                flex-shrink: 0;
                border-radius: 20px;
                background: #fff;
                box-shadow: 0 4px 24px rgba(0,0,0,0.06);
                border: 1.5px solid #eaf0fb;
                padding: 28px;
                transition: transform 0.3s ease, box-shadow 0.3s ease;
                cursor: default;
              }
              .rev-card:hover {
                transform: translateY(-8px);
                box-shadow: 0 16px 40px rgba(13,110,253,0.12);
              }
            `}</style>

            <div style={{ position: 'absolute', top: 0, left: 0, bottom: 0, width: 100, background: 'linear-gradient(to right, #f4f7fc, transparent)', zIndex: 2, pointerEvents: 'none' }} />
            <div style={{ position: 'absolute', top: 0, right: 0, bottom: 0, width: 100, background: 'linear-gradient(to left, #f4f7fc, transparent)', zIndex: 2, pointerEvents: 'none' }} />

            <div className="review-track pb-4">
              {[...reviews, ...reviews].map((review, index) => (
                <div key={`${review.id}-${index}`} className="rev-card">
                  <FaQuoteLeft style={{ color: '#1976d2', opacity: 0.15, marginBottom: 16 }} size={36} />
                  <p style={{ color: '#444', lineHeight: 1.7, fontSize: 14, marginBottom: 24, fontStyle: 'italic' }}>
                    "{review.text}"
                  </p>
                  <div style={{ display: 'flex', marginBottom: 20, gap: 3 }}>
                    {[...Array(5)].map((_, i) => (
                      <FaStar key={i} size={15} style={{ color: i < review.stars ? '#ffc107' : '#e0e0e0' }} />
                    ))}
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 14, borderTop: '1.5px solid #f0f4f8', paddingTop: 18 }}>
                    <div style={{
                      width: 48, height: 48, borderRadius: '50%',
                      background: review.avatarBg,
                      display: 'flex', alignItems: 'center', justifycontent: 'center',
                      color: '#fff', fontWeight: 800, fontSize: 16, flexShrink: 0,
                    }}>
                      {review.initials}
                    </div>
                    <div>
                      <div style={{ fontWeight: 700, color: '#1a3a6e', fontSize: 15 }}>{review.name}</div>
                      <div style={{ color: '#888', fontSize: 12 }}>{review.role}</div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </Container>
    </div>
  );
};

export default Review;
