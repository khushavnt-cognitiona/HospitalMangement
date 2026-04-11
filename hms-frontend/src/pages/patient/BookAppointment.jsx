import React, { useState, useEffect } from 'react';
import { Container, Spinner } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import doctorService from '../../services/doctorService';
import appointmentService from '../../services/appointmentService';
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
    const [loadingSlots, setLoadingSlots] = useState(false);
    const [error, setError] = useState('');
    const [submitted, setSubmitted] = useState(false);
    const [bookedId, setBookedId] = useState(null);

    const [form, setForm] = useState({
        doctorId: '',
        date: '',
        timeId: '',
        time: '',
        reason: ''
    });

    useEffect(() => {
        const fetchDoctors = async () => {
            try {
                const data = await doctorService.getAllDoctors();
                setDoctors(data);
            } catch (err) {
                setError('Failed to fetch clinical specialist data.');
            } finally {
                setLoading(false);
            }
        };
        fetchDoctors();
    }, []);

    useEffect(() => {
        if (form.doctorId && form.date) {
            const fetchSlots = async () => {
                setLoadingSlots(true);
                try {
                    const slots = await doctorService.getAvailability(form.doctorId, form.date);
                    setAvailableSlots(slots);
                } catch (err) {
                    setError('Clinical availability scanning failed.');
                } finally {
                    setLoadingSlots(false);
                }
            };
            fetchSlots();
        }
    }, [form.doctorId, form.date]);

    const handleDoctorSelect = (doc) => {
        setForm({ ...form, doctorId: doc.id, time: '', timeId: '' });
        setStep(2);
    };

    const handleSlotClick = (slot) => {
        const slotTime = slot.time || slot.startTime?.substring(0, 5);
        setForm({ ...form, timeId: slot.id, time: slotTime });
    };

    const handleSubmit = async (e) => {
        if (e) e.preventDefault();
        try {
            const appointmentData = {
                doctorId: form.doctorId,
                appointmentDate: form.date,
                appointmentTime: form.timeId,
                reason: form.reason
            };
            const res = await appointmentService.bookAppointment(appointmentData);
            setBookedId(res.id);
            setSubmitted(true);
        } catch (err) {
            const backendMessage = err.response?.data?.message;
            setError(backendMessage || 'Transaction failed. Please check your data.');
        }
    };

    if (loading) return (
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
                    )}
                </Container>
            </div>
        </PatientLayout>
    );
};

export default BookAppointment;
