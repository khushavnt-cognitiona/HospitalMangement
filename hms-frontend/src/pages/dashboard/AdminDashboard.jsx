import React, { useState, useEffect } from "react";
import doctorService from "../../services/doctorService";
import billingService from "../../services/billingService";
import { FaUserMd, FaReceipt, FaHandHoldingUsd, FaPlus, FaCog, FaChartLine } from "react-icons/fa";

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

    if (loading) return (
        <div className="flex-center" style={{ minHeight: '60vh' }}>
            <div className="spinner-border text-primary" role="status">
                <span className="visually-hidden">Loading...</span>
            </div>
        </div>
    );

    const cards = [
        { label: "Total Doctors", value: stats.doctors, icon: <FaUserMd />, color: "#0ea5e9", trend: "+2 this month" },
        { label: "Active Bills", value: stats.bills, icon: <FaReceipt />, color: "#10b981", trend: "+14% from last week" },
        { label: "Total Revenue", value: `$${stats.totalRevenue.toLocaleString()}`, icon: <FaHandHoldingUsd />, color: "#6366f1", trend: "+$2.4k today" }
    ];

    return (
        <div className="app-container py-5 animate-slide-up">
            <header className="mb-5 d-flex align-items-center justify-content-between">
                <div>
                    <h2 className="mb-1 fw-bold fs-1">Admin Dashboard</h2>
                    <p className="text-muted">Overview of the hospital's performance and operations.</p>
                </div>
                <div className="d-none d-md-flex gap-2">
                    <button className="btn-premium btn-premium-outline">
                        <FaChartLine className="me-2" /> View Reports
                    </button>
                    <button className="btn-premium btn-premium-primary">
                        <FaPlus className="me-2" /> New Entry
                    </button>
                </div>
            </header>

            <div className="row g-4 mb-5">
                {cards.map((card, idx) => (
                    <div key={idx} className="col-12 col-md-4">
                        <div className="premium-card p-4 h-100">
                            <div className="d-flex align-items-start justify-content-between mb-4">
                                <div className="p-3 rounded-4" style={{ backgroundColor: `${card.color}15`, color: card.color }}>
                                    {React.cloneElement(card.icon, { size: 28 })}
                                </div>
                                <span className="text-success small fw-bold">{card.trend}</span>
                            </div>
                            <div>
                                <h3 className="fs-1 fw-bold mb-1">{card.value}</h3>
                                <p className="text-muted fw-semibold text-uppercase small mb-0">{card.label}</p>
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            <div className="mt-5">
                <div className="d-flex align-items-center justify-content-between mb-4">
                    <h4 className="fw-bold mb-0">Operational Quick Actions</h4>
                    <span className="text-primary small fw-bold cursor-pointer">Manage All</span>
                </div>
                <div className="row g-3">
                    <div className="col-12 col-sm-6 col-lg-3">
                        <button className="btn btn-outline-primary w-100 p-4 border-2 rounded-4 d-flex flex-column align-items-center gap-3">
                            <FaPlus size={24} />
                            <span className="fw-bold">Add Staff</span>
                        </button>
                    </div>
                    <div className="col-12 col-sm-6 col-lg-3">
                        <button className="btn btn-outline-primary w-100 p-4 border-2 rounded-4 d-flex flex-column align-items-center gap-3">
                            <FaReceipt size={24} />
                            <span className="fw-bold">Billing Review</span>
                        </button>
                    </div>
                    <div className="col-12 col-sm-6 col-lg-3">
                        <button className="btn btn-outline-primary w-100 p-4 border-2 rounded-4 d-flex flex-column align-items-center gap-3">
                            <FaUserMd size={24} />
                            <span className="fw-bold">Doctor Roster</span>
                        </button>
                    </div>
                    <div className="col-12 col-sm-6 col-lg-3">
                        <button className="btn btn-outline-primary w-100 p-4 border-2 rounded-4 d-flex flex-column align-items-center gap-3">
                            <FaCog size={24} />
                            <span className="fw-bold">Settings</span>
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AdminDashboard;
