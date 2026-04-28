import React, { useState, useEffect } from 'react';
import { Container, Spinner } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import doctorService from '../../services/doctorService';
import appointmentService from '../../services/appointmentService';
import axiosInstance from '../../api/axiosInstance';
import PatientLayout from '../../components/patient/PatientLayout';
import BookingSteps from '../../components/patient/BookingSteps';
import AppointmentPass from '../../components/patient/AppointmentPass';
import './BookAppointment.css';

const BookAppointment = () => {
    const navigate = useNavigate();
    const [step, setStep] = useState(1);
    const [doctors, setDoctors] = useState([]);
    const [availableSlots, setAvailableSlots] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchDoctors();
    }, []);

    const fetchDoctors = async () => {
        const token = localStorage.getItem("token");
        if (!token) {
            setLoading(false);
            return;
        }

        try {
            console.log("Fetching doctors...");
            const res = await axiosInstance.get("/doctors");
            console.log(res.data);
            setDoctors(res.data);
        } catch (err) {
            console.error("Error:", err);
        } finally {
            setLoading(false);
        }
    };
    const [loadingSlots, setLoadingSlots] = useState(false);
    const [error, setError] = useState('');
    const [submitted, setSubmitted] = useState(false);
    const [bookedId, setBookedId] = useState(null);
    const [showOtpModal, setShowOtpModal] = useState(false);
    const [otp, setOtp] = useState('');
    const [verifying, setVerifying] = useState(false);

    const [form, setForm] = useState({
// ... (existing form state)
        doctorId: '',
        date: '',
        timeId: '',
        time: '',
        reason: ''
    });

    const handleDoctorSelect = (doc) => {
// ...
        setForm({ ...form, doctorId: doc.id, time: '', timeId: '' });
        setStep(2);
    };

    const handleSlotClick = (slot) => {
        const slotTime = typeof slot === 'string' ? slot : (slot.time || slot.startTime?.substring(0, 5));
        const slotId = typeof slot === 'string' ? slot : slot.id;
        setForm({ ...form, timeId: slotId, time: slotTime });
    };

    const handleSubmit = async (e) => {
        if (e) e.preventDefault();
        setLoading(true);
        setError('');
        try {
            const appointmentData = {
                doctorId: form.doctorId,
                appointmentDate: form.date,
                appointmentTime: form.timeId,
                reason: form.reason
            };
            const res = await appointmentService.bookAppointment(appointmentData);
            setBookedId(res.id);
            setShowOtpModal(true);
        } catch (err) {
            const backendMessage = err.response?.data?.message;
            setError(backendMessage || 'Transaction failed. Please check your data.');
        } finally {
            setLoading(false);
        }
    };

    const handleVerifyOtp = async () => {
        if (otp.length !== 6) {
            setError('Please enter a valid 6-digit OTP code.');
            return;
        }
        setVerifying(true);
        setError('');
        try {
            await appointmentService.verifyBookingOtp(bookedId, otp);
            setSubmitted(true);
            setShowOtpModal(false);
        } catch (err) {
            setError('Verification failed. The code might be incorrect or expired.');
        } finally {
            setVerifying(false);
        }
    };

    if (loading && !showOtpModal && !submitted) return (
        <div className="d-flex justify-content-center align-items-center vh-100 bg-light">
            <Spinner animation="grow" variant="info" />
        </div>
    );

    const selectedDoctor = doctors.find(d => d.id === parseInt(form.doctorId));

    return (
        <PatientLayout title="Reserve Your Visit" subtitle="Select your preferred specialist and time slot." showSubNav={true}>
            <div className="booking-page-container">
                <Container>
                    {submitted ? (
                        <AppointmentPass 
                            bookedId={bookedId} 
                            selectedDoctor={selectedDoctor} 
                            form={form} 
                            navigate={navigate} 
                        />
                    ) : (
                        <>
                            <BookingSteps 
                                step={step}
                                setStep={setStep}
                                doctors={doctors}
                                availableSlots={availableSlots}
                                loadingSlots={loadingSlots}
                                error={error}
                                form={form}
                                setForm={setForm}
                                handleDoctorSelect={handleDoctorSelect}
                                handleSlotClick={handleSlotClick}
                                handleSubmit={handleSubmit}
                            />

                            {showOtpModal && (
                                <div className="otp-overlay animate-fade-in shadow-2xl">
                                    <div className="otp-modal-content rounded-5 p-5 bg-white text-center shadow-lg">
                                        <div className="mb-4">
                                            <div className="bg-primary-soft text-primary p-3 rounded-circle d-inline-block mb-3">
                                                <i className="bi bi-shield-lock-fill fs-2"></i>
                                            </div>
                                            <h3 className="fw-bold">Confirm Your Booking</h3>
                                            <p className="text-muted small">We've sent a 6-digit verification code to your registered email to secure this appointment.</p>
                                        </div>

                                        {error && <div className="alert alert-danger p-2 small border-0 mb-3">{error}</div>}

                                        <div className="mb-4">
                                            <input 
                                                type="text" 
                                                className="form-control-premium text-center fs-2 fw-black tracking-widest"
                                                placeholder="000000"
                                                maxLength={6}
                                                value={otp}
                                                onChange={(e) => setOtp(e.target.value)}
                                            />
                                        </div>

                                        <div className="d-grid gap-2">
                                            <button 
                                                className="btn btn-premium btn-premium-primary py-3 fw-bold"
                                                onClick={handleVerifyOtp}
                                                disabled={verifying}
                                            >
                                                {verifying ? (
                                                    <span className="spinner-border spinner-border-sm me-2"></span>
                                                ) : 'Verify & Confirm Appointment'}
                                            </button>
                                            <button 
                                                className="btn btn-link text-muted small"
                                                onClick={() => setShowOtpModal(false)}
                                            >
                                                Change Details
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            )}
                        </>
                    )}
                </Container>
            </div>
        </PatientLayout>
    );
};

export default BookAppointment;
