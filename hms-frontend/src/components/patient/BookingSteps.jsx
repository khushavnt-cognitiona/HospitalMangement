import React from 'react';
import { Row, Col, Button, Spinner, Alert } from 'react-bootstrap';
import { 
    FaUserMd, FaCalendarPlus, FaClock, FaStethoscope, FaCheckCircle, 
    FaChevronRight, FaChevronLeft, FaInfoCircle, FaLock, FaCalendarCheck
} from 'react-icons/fa';

const BookingSteps = ({ 
    step, setStep, doctors, availableSlots, loadingSlots, 
    error, form, setForm, handleDoctorSelect, handleSlotClick, handleSubmit 
}) => {

    const StepIndicator = () => (
        <div className="step-indicator-container">
            {[
                { n: 1, label: 'Specialist' },
                { n: 2, label: 'Schedule' },
                { n: 3, label: 'Clinical' }
            ].map(s => (
                <div key={s.n} className={`step-item ${step >= s.n ? 'active' : ''}`}>
                    <div className="step-dot"></div>
                    <span className="step-label">{s.label}</span>
                    {s.n < 3 && <div className="step-line" style={{ width: '30px', height: '2px', background: '#e2e8f0', margin: '0 5px' }}></div>}
                </div>
            ))}
        </div>
    );

    const selectedDoctor = doctors.find(d => d.id === parseInt(form.doctorId));

    return (
        <div className="animate-in">
            <StepIndicator />
            <div className="glass-booking-card">
                <div className="booking-header">
                    <h4 className="mb-0 fw-900">
                        {step === 1 && "Choose Your Specialist"}
                        {step === 2 && "Pick a Time Window"}
                        {step === 3 && "Clinical Requirements"}
                    </h4>
                    <p className="mb-0 opacity-75 small mt-1">
                        {step === 1 && "Select from our board-certified clinical experts"}
                        {step === 2 && "Choose a date and available clinical slot"}
                        {step === 3 && "Briefly describe your medical concerns"}
                    </p>
                </div>

                <div className="booking-body">
                    {error && (
                        <Alert variant="danger" className="rounded-4 mb-4 d-flex align-items-center gap-2">
                            <FaInfoCircle /> {error}
                        </Alert>
                    )}

                    {step === 1 && (
                        <div className="specialist-grid">
                            {doctors.map(doc => (
                                <div 
                                    key={doc.id} 
                                    className={`specialist-card-premium ${form.doctorId === doc.id ? 'selected' : ''}`}
                                    onClick={() => handleDoctorSelect(doc)}
                                >
                                    <div className="selection-check"><FaCheckCircle /></div>
                                    <div className="d-flex align-items-center gap-3 mb-3">
                                        <div className="avatar-box bg-info bg-opacity-10 p-3 rounded-circle">
                                            <FaUserMd className="text-info fs-4" />
                                        </div>
                                        <div>
                                            <h6 className="fw-900 mb-0">{doc.user?.name || doc.name || 'Specialist'}</h6>
                                            <span className="text-info small fw-700">{doc.specialization}</span>
                                        </div>
                                    </div>
                                    <div className="d-flex justify-content-between align-items-center mt-4">
                                        <span className="small opacity-50 fw-bold">Session Fee</span>
                                        <span className="fw-900">₹{doc.consultationFee || 500}</span>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}

                    {step === 2 && (
                        <div className="animate-in">
                            <Row className="g-4 mb-4">
                                <Col md={12}>
                                    <label className="label-premium"><FaCalendarPlus /> Select Visit Date</label>
                                    <input 
                                        type="date" 
                                        className="form-control premium-input h-auto" 
                                        value={form.date} 
                                        min={new Date().toISOString().split('T')[0]} 
                                        onChange={e => setForm({ ...form, date: e.target.value, time: '', timeId: '' })} 
                                        placeholder="dd-mm-yyyy"
                                    />
                                </Col>
                            </Row>
                            
                            {form.date && (
                                <div className="animate-in">
                                    <label className="label-premium"><FaClock /> Time Windows</label>
                                    {loadingSlots ? (
                                        <div className="py-5 text-center">
                                            <Spinner animation="border" variant="info" size="sm" className="me-2" />
                                            <span className="text-info small fw-bold">Scanning availability...</span>
                                        </div>
                                    ) : (
                                        <div className="slots-grid">
                                            {(() => {
                                                const slots = selectedDoctor?.availabilitySlots
                                                    ? selectedDoctor.availabilitySlots.split(",")
                                                    : [];
                                                
                                                return slots.length > 0 ? slots.map((slot, index) => {
                                                    const isSelected = form.time === slot;
                                                    return (
                                                        <button 
                                                            key={index} 
                                                            className={`slot-btn slot-chip ${isSelected ? 'selected' : ''}`}
                                                            onClick={() => handleSlotClick(slot)}
                                                        >
                                                            {slot}
                                                        </button>
                                                    );
                                                }) : (
                                                    <div className="w-100 text-center py-5 border border-dashed rounded-4">
                                                        <p className="text-muted mb-0 small fw-bold">No slots available for this date.</p>
                                                    </div>
                                                );
                                            })()}
                                        </div>
                                    )}
                                </div>
                            )}

                            <div className="d-flex justify-content-between mt-5">
                                <Button variant="link" className="text-muted text-decoration-none fw-700" onClick={() => setStep(1)}>
                                    <FaChevronLeft className="me-2" /> Back
                                </Button>
                                <Button 
                                    className="btn-premium-grad px-5" 
                                    disabled={!form.timeId}
                                    onClick={() => setStep(3)}
                                >
                                    Proceed <FaChevronRight className="ms-2" />
                                </Button>
                            </div>
                        </div>
                    )}

                    {step === 3 && (
                        <div className="animate-in">
                            <div className="mb-4">
                                <label className="label-premium"><FaStethoscope /> Symptoms & Clinical Narrative</label>
                                <textarea 
                                    className="form-control premium-input" 
                                    value={form.reason} 
                                    onChange={e => setForm({ ...form, reason: e.target.value })} 
                                    placeholder="Briefly describe your medical concerns..." 
                                    rows={5} 
                                />
                            </div>

                            <div className="summary-banner p-4 rounded-4 bg-info bg-opacity-10 border border-info border-opacity-10 mb-5 text-center">
                                <p className="mb-1 text-muted small fw-700">Booking Review</p>
                                <h5 className="fw-900 text-info mb-0">
                                    {selectedDoctor?.user?.name || selectedDoctor?.name} • {form.time} • {form.date}
                                </h5>
                            </div>

                            <div className="d-flex justify-content-between">
                                <Button variant="link" className="text-muted text-decoration-none fw-700" onClick={() => setStep(2)}>
                                    <FaChevronLeft className="me-2" /> Adjust Timeline
                                </Button>
                                <Button 
                                    className="btn-premium-grad px-5 shadow-lg" 
                                    disabled={!form.reason}
                                    onClick={handleSubmit}
                                >
                                    <FaCalendarCheck className="me-2" /> Confirm Appointment
                                </Button>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default BookingSteps;
