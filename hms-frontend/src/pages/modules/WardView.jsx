import React, { useState, useEffect } from "react";
import axiosInstance from "../../api/axiosInstance";
import { FaProcedures, FaCheckCircle, FaExclamationCircle, FaInfoCircle, FaHdd } from "react-icons/fa";

const WardView = () => {
    const [wards, setWards] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchWards = async () => {
            try {
                const response = await axiosInstance.get("/wards");
                setWards(response.data || []);
            } catch (err) {
                console.error("Failed to fetch wards", err);
            } finally {
                setLoading(false);
            }
        };
        fetchWards();
    }, []);

    if (loading) return (
        <div className="flex-center py-5 animate-fade-in" style={{ minHeight: '60vh', flexDirection: 'column' }}>
            <div className="spinner-border text-primary mb-3" role="status"></div>
            <p className="fw-semibold text-muted">Retrieving hospital ward status...</p>
        </div>
    );

    return (
        <div className="app-container py-5 animate-slide-up">
            <header className="mb-5 d-flex align-items-center justify-content-between">
                <div>
                    <h2 className="mb-1 fw-bold fs-1">Ward & Bed Management</h2>
                    <p className="text-muted">Real-time oversight of facility capacity and patient allocation.</p>
                </div>
                <div className="d-flex gap-2">
                    <div className="premium-card py-2 px-4 d-flex align-items-center gap-3 shadow-none">
                        <div className="bg-success-light text-success rounded-pill px-3 py-1 extra-small fw-bold">
                            {wards.reduce((acc, w) => acc + (w.beds?.filter(b => !b.occupied).length || 0), 0)} Available
                        </div>
                        <div className="bg-danger-light text-danger rounded-pill px-3 py-1 extra-small fw-bold">
                            {wards.reduce((acc, w) => acc + (w.beds?.filter(b => b.occupied).length || 0), 0)} Occupied
                        </div>
                    </div>
                </div>
            </header>

            <div className="row g-5">
                {wards.length > 0 ? wards.map((ward) => (
                    <div key={ward.id} className="col-12">
                        <div className="premium-card p-0 overflow-hidden border-0">
                            <div className="p-4 bg-primary-gradient text-white d-flex justify-content-between align-items-center">
                                <div className="d-flex align-items-center gap-3">
                                    <div className="bg-white bg-opacity-20 p-2 rounded-3 text-white">
                                        <FaHdd size={24} />
                                    </div>
                                    <div>
                                        <h4 className="mb-0 fw-bold fs-3">{ward.name}</h4>
                                        <span className="opacity-75 small fw-semibold text-uppercase letter-spacing-wide">{ward.type} Section</span>
                                    </div>
                                </div>
                                <div className="text-end">
                                    <h3 className="mb-0 fw-bold">{ward.capacity}</h3>
                                    <div className="opacity-75 extra-small fw-bold text-uppercase">Total Capacity</div>
                                </div>
                            </div>
                            
                            <div className="p-4 p-md-5 bg-white">
                                <div className="row g-4">
                                    {ward.beds?.map(bed => (
                                        <div key={bed.id} className="col-6 col-md-4 col-lg-2">
                                            <div className={`premium-card p-4 text-center border-2 transition-all duration-200 ${bed.occupied ? "bg-danger-light border-danger-subtle text-danger shadow-none" : "bg-success-light border-success-subtle text-success border-success-focus shadow-sm"}`}>
                                                <div className="mb-3">
                                                    <FaProcedures size={28} />
                                                </div>
                                                <h6 className="fw-bold mb-1">Bed {bed.bedNumber}</h6>
                                                <div className="extra-small fw-bold text-uppercase d-flex align-items-center justify-content-center gap-1 opacity-75">
                                                    {bed.occupied ? <><FaExclamationCircle /> Occupied</> : <><FaCheckCircle /> Vacant</>}
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                    {(!ward.beds || ward.beds.length === 0) && (
                                        <div className="col-12 py-5 text-center">
                                            <FaInfoCircle size={32} className="text-muted mb-3 opacity-25" />
                                            <p className="text-muted fw-semibold">No beds units registered in this ward yet.</p>
                                        </div>
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>
                )) : (
                    <div className="col-12 py-5 text-center">
                        <div className="premium-card p-5">
                            <FaProcedures size={64} className="text-muted mb-4 opacity-25" />
                            <h3 className="fw-bold fs-2 text-dark">Facility Data Unavailable</h3>
                            <p className="text-muted max-w-md mx-auto mb-4">No ward structures are currently configured in the database. Please contact system administrator to initialize wing allocations.</p>
                            <button className="btn btn-premium btn-premium-primary px-5 py-3">Register First Ward</button>
                        </div>
                    </div>
                )}
            </div>
            
            <style>{`
                .border-success-focus {
                    border-color: #10b981 !important;
                    box-shadow: 0 0 0 3px rgba(16, 185, 129, 0.1) !important;
                }
                .bg-primary-gradient {
                    background: linear-gradient(135deg, var(--primary) 0%, var(--primary-dark) 100%) !important;
                }
            `}</style>
        </div>
    );
};

export default WardView;
