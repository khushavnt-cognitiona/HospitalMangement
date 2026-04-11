import React, { useState, useEffect } from "react";
import axiosInstance from "../../api/axiosInstance";

const WardView = () => {
    const [wards, setWards] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchWards = async () => {
            try {
                const response = await axiosInstance.get("/wards");
                setWards(response.data);
            } catch (err) {
                console.error("Failed to fetch wards", err);
            } finally {
                setLoading(false);
            }
        };
        fetchWards();
    }, []);

    if (loading) return <div className="text-center mt-5"><div className="spinner-border text-primary"></div></div>;

    return (
        <div className="container-fluid">
            <h2 className="mb-4 fw-bold">Ward & Bed Management</h2>
            <div className="row g-4">
                {wards.map((ward) => (
                    <div key={ward.id} className="col-12">
                        <div className="card shadow-sm border-0 rounded-4 overflow-hidden">
                            <div className="card-header bg-primary text-white p-3 d-flex justify-content-between align-items-center">
                                <h5 className="mb-0 fw-bold">{ward.name} ({ward.type})</h5>
                                <span className="badge bg-light text-primary fw-bold">
                                    Capacity: {ward.capacity}
                                </span>
                            </div>
                            <div className="card-body p-4 bg-light">
                                <div className="row g-3">
                                    {ward.beds?.map(bed => (
                                        <div key={bed.id} className="col-md-2 col-sm-4 col-6">
                                            <div className={`card text-center p-3 rounded-3 shadow-sm border-0 h-100 ${bed.occupied ? "bg-danger-subtle text-danger" : "bg-success-subtle text-success border-bottom border-success border-4"}`}>
                                                <i className="bi bi-hospital fs-3 mb-2"></i>
                                                <h6 className="fw-bold mb-1">Bed {bed.bedNumber}</h6>
                                                <small className="fw-semibold">
                                                    {bed.occupied ? "Occupied" : "Available"}
                                                </small>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default WardView;
