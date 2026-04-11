import React from "react";
import { Link, useLocation } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";

const Sidebar = () => {
    const { user } = useAuth();
    const location = useLocation();

    if (!user) return null;

    const navItems = {
        ADMIN: [
            { path: "/admin", name: "Dashboard", icon: "bi-speedometer2" },
            { path: "/doctors", name: "Doctor List", icon: "bi-people" },
            { path: "/billing", name: "Billing Management", icon: "bi-cash-stack" },
            { path: "/wards", name: "Ward View", icon: "bi-building" },
            { path: "/notifications", name: "Notifications", icon: "bi-bell" },
        ],
        DOCTOR: [
            { path: "/doctor", name: "My Dashboard", icon: "bi-house-heart" },
            { path: "/doctor/appointments", name: "Appointments", icon: "bi-calendar-check" },
            { path: "/doctor/prescriptions", name: "Prescriptions", icon: "bi-file-earmark-medical" },
            { path: "/notifications", name: "Notifications", icon: "bi-bell" },
        ],
        PATIENT: [
            { path: "/patient", name: "My Health Dashboard", icon: "bi-person-circle" },
            { path: "/patient/book", name: "Book Appointment", icon: "bi-calendar-plus" },
            { path: "/patient/billing", name: "My Billing", icon: "bi-wallet2" },
            { path: "/notifications", name: "Notifications", icon: "bi-bell" },
        ],
        NURSE: [
            { path: "/nurse", name: "Nurse Portal", icon: "bi-clipboard-pulse" },
            { path: "/wards", name: "Ward & Beds", icon: "bi-hospital" },
            { path: "/notifications", name: "Notifications", icon: "bi-bell" },
        ],
    };

    const currentNav = navItems[user.role] || [];

    return (
        <div className="bg-dark text-white p-3 sidebar shadow" style={{ minWidth: "250px", minHeight: "calc(100vh - var(--navbar-height))", position: "fixed", top: "var(--navbar-height)" }}>
            <ul className="nav flex-column mb-auto">
                {currentNav.map((item, index) => (
                    <li className="nav-item mb-2" key={index}>
                        <Link
                            to={item.path}
                            className={`nav-link text-white d-flex align-items-center gap-3 px-3 py-2 rounded-2 ${location.pathname === item.path ? "bg-primary active shadow-sm" : "sidebar-link-hover"}`}
                        >
                            <i className={`bi ${item.icon} fs-5`}></i>
                            <span className="fw-semibold">{item.name}</span>
                        </Link>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default Sidebar;
