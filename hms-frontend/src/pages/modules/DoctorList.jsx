import React, { useState, useEffect } from "react";
import doctorService from "../../services/doctorService";
import { Link } from "react-router-dom";

const DoctorList = () => {
    const [doctors, setDoctors] = useState([]);
    const [loading, setLoading] = useState(true);

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

    if (loading) return <div className="text-center mt-5"><div className="spinner-border text-primary"></div></div>;

    return (
        <div className="app-container py-4">
            <h2 className="mb-4 fw-bold">Hospital Doctors</h2>
            <div className="row g-4 text-center">
                {doctors.map((doctor) => (
                    <div key={doctor.id} className="col-md-4 col-sm-6">
                        <div className="card shadow-sm border-0 rounded-4 overflow-hidden h-100 position-relative">
                            <div className="card-body p-4">
                                <div className="bg-primary-subtle text-primary rounded-circle d-inline-flex align-items-center justify-content-center mb-3 p-3" style={{ width: "80px", height: "80px" }}>
                                    <i className="bi bi-person-badge fs-1"></i>
                                </div>
                                <h4 className="fw-bold mb-1">Dr. {doctor.user?.name || "N/A"}</h4>
                                <p className="text-primary fw-semibold mb-2">{doctor.specialization}</p>
                                <div className="mb-3">
                                    <small className="text-muted d-block">{doctor.qualification}</small>
                                    <small className="text-muted d-block">{doctor.experienceYears} Years Exp.</small>
                                </div>
                                <p className="fw-bold fs-5 text-dark mb-4">${doctor.consultationFee.toFixed(2)}</p>
                                <Link to={`/patient/book?doctorId=${doctor.id}`} className="btn btn-primary w-100 rounded-pill fw-bold shadow-sm py-2">
                                    Book Appointment
                                </Link>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default DoctorList;
