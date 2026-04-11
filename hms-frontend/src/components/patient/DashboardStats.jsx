import React from 'react';
import { Col } from 'react-bootstrap';
import { FaCalendarCheck, FaFileMedical, FaShieldAlt } from 'react-icons/fa';

const DashboardStats = ({ visitCount, recordCount, plan }) => {
    const stats = [
        { label: 'Total Visits', value: visitCount, icon: <FaCalendarCheck />, color: 'bg-blue' },
        { label: 'Health Records', value: recordCount, icon: <FaFileMedical />, color: 'bg-green' },
        { label: 'Coverage Plan', value: plan || 'PRO+', icon: <FaShieldAlt />, color: 'bg-cyan' }
    ];

    return (
        <>
            {stats.map((stat, idx) => (
                <Col md={4} key={idx} className="animate-in" style={{ animationDelay: `${idx * 0.1}s` }}>
                    <div className={`patient-stat-card ${stat.color}`}>
                        <span className="stat-card-label">{stat.label}</span>
                        <h2 className="stat-card-value text-white">{stat.value}</h2>
                        <div className="stat-card-icon">{stat.icon}</div>
                    </div>
                </Col>
            ))}
        </>
    );
};

export default DashboardStats;
