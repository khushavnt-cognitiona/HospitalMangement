import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import doctorService from "../../services/doctorService";
import appointmentService from "../../services/appointmentService";
import { useAuth } from "../../context/AuthContext";

const AppointmentBooking = () => {
    const { user } = useAuth();
    const navigate = useNavigate();
    const query = new URLSearchParams(useLocation().search);
    const doctorId = query.get("doctorId");

    const [doctors, setDoctors] = useState([]);
    const [bookingData, setBookingData] = useState({
        doctorId: doctorId || "",
        patientId: 1, // Placeholder for real patient ID
        appointmentTime: "",
        reason: ""
    });
    const [loading, setLoading] = useState(true);
    const [msg, setMsg] = useState("");

    useEffect(() => {
        const fetchDoctors = async () => {
            try {
                const data = await doctorService.getAllDoctors();
                setDoctors(data);
            } catch (err) {
                console.error("Failed to fetch doctors", err);
            } finally {
                setLoading(false);
            }
        };
        fetchDoctors();
    }, []);

    const handleChange = (e) => {
        setBookingData({ ...bookingData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await appointmentService.bookAppointment(bookingData);
            setMsg("Appointment booked successfully!");
            setTimeout(() => navigate("/patient"), 2000);
        } catch (err) {
            setMsg("Booking failed. Please try again.");
        }
    };

    if (loading) return <div className="text-center mt-5"><div className="spinner-border text-primary"></div></div>;

    return (
        <div className="container-fluid">
            <h2 className="mb-4 fw-bold">Book an Appointment</h2>
            <div className="card shadow-sm border-0 rounded-4 p-4" style={{ maxWidth: "600px" }}>
                {msg && <div className={`alert ${msg.includes("success") ? "alert-success" : "alert-danger"}`}>{msg}</div>}
                <form onSubmit={handleSubmit}>
                    <div className="mb-3">
                        <label className="form-label fw-bold">Select Doctor</label>
                        <select 
                            name="doctorId" 
                            className="form-select form-control-lg bg-light" 
                            value={bookingData.doctorId}
                            onChange={handleChange}
                            required
                        >
                            <option value="">-- Choose a Doctor --</option>
                            {doctors.map(d => (
                                <option key={d.id} value={d.id}>
                                    Dr. {d.user?.name} ({d.specialization}) - ${d.consultationFee}
                                </option>
                            ))}
                        </select>
                    </div>
                    <div className="mb-3">
                        <label className="form-label fw-bold">Date & Time</label>
                        <input 
                            type="datetime-local" 
                            name="appointmentTime" 
                            className="form-control form-control-lg bg-light" 
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <div className="mb-4">
                        <label className="form-label fw-bold">Reason for Visit</label>
                        <textarea 
                            name="reason" 
                            className="form-control bg-light" 
                            rows="3" 
                            placeholder="Describe your symptoms..."
                            onChange={handleChange}
                            required
                        ></textarea>
                    </div>
                    <button type="submit" className="btn btn-primary btn-lg w-100 rounded-pill fw-bold shadow-sm">
                        Confirm Appointment
                    </button>
                </form>
            </div>
        </div>
    );
};

export default AppointmentBooking;
