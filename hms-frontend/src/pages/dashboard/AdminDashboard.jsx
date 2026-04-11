import React, { useState, useEffect } from "react";
import doctorService from "../../services/doctorService";
import billingService from "../../services/billingService";

const AdminDashboard = () => {
    const [stats, setStats] = useState({ doctors: 0, bills: 0, totalRevenue: 0 });
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchStats = async () => {
            try {
                const doctors = await doctorService.getAllDoctors();
                const bills = await billingService.getAllBills();
                const revenue = bills.reduce((acc, bill) => acc + (bill.billingStatus === "PAID" ? bill.amount : 0), 0);
                setStats({ doctors: doctors.length, bills: bills.length, totalRevenue: revenue });
            } catch (err) {
                console.error("Failed to fetch stats", err);
            } finally {
                setLoading(false);
            }
        };
        fetchStats();
    }, []);

    if (loading) return <div className="text-center mt-5"><div className="spinner-border text-primary"></div></div>;

    return (
        <div className="container-fluid">
            <h2 className="mb-4 fw-bold">Admin Dashboard</h2>
            <div className="row g-4">
                <div className="col-md-4">
                    <div className="card border-0 shadow-sm bg-primary text-white p-4 text-center rounded-4 h-100">
                        <i className="bi bi-people-fill fs-1 mb-3"></i>
                        <h4 className="fw-bold">Total Doctors</h4>
                        <p className="fs-2 mb-0">{stats.doctors}</p>
                    </div>
                </div>
                <div className="col-md-4">
                    <div className="card border-0 shadow-sm bg-success text-white p-4 text-center rounded-4 h-100">
                        <i className="bi bi-receipt fs-1 mb-3"></i>
                        <h4 className="fw-bold">Total Bills</h4>
                        <p className="fs-2 mb-0">{stats.bills}</p>
                    </div>
                </div>
                <div className="col-md-4">
                    <div className="card border-0 shadow-sm bg-info text-white p-4 text-center rounded-4 h-100">
                        <i className="bi bi-currency-dollar fs-1 mb-3"></i>
                        <h4 className="fw-bold">Total Revenue</h4>
                        <p className="fs-2 mb-0">${stats.totalRevenue.toFixed(2)}</p>
                    </div>
                </div>
            </div>

            <div className="mt-5">
                <h4 className="fw-bold mb-3">Quick Actions</h4>
                <div className="d-flex gap-3">
                    <button className="btn btn-primary px-4 py-2 fw-bold rounded-pill shadow-sm">
                        <i className="bi bi-person-plus me-2"></i>
                        Add New Staff
                    </button>
                    <button className="btn btn-outline-primary px-4 py-2 fw-bold rounded-pill shadow-sm">
                        <i className="bi bi-gear me-2"></i>
                        System Settings
                    </button>
                </div>
            </div>
        </div>
    );
};

export default AdminDashboard;
