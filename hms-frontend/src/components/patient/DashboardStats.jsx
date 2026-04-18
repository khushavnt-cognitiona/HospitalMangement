import React from 'react';
import { Col } from 'react-bootstrap';
import { FaCalendarCheck, FaFileMedical, FaCreditCard, FaBed, FaBell } from 'react-icons/fa';

const DashboardStats = ({ visitCount, recordCount, billingCount, wardStatus, notificationsCount }) => {
    const stats = [
        { 
            label: 'Upcoming Appointments', 
            value: visitCount || 0, 
            icon: <FaCalendarCheck />, 
            class: 'summary-card-premium bg-gradient-blue',
            color: 'var(--gradient-blue)' 
        },
        { 
            label: 'Medical Records', 
            value: recordCount || 0, 
            icon: <FaFileMedical />, 
            class: 'summary-card-premium bg-gradient-green',
            color: 'var(--gradient-green)'
        },
        { 
            label: 'Pending Bills', 
            value: billingCount || 0, 
            icon: <FaCreditCard />, 
            class: 'summary-card-premium bg-gradient-orange',
            color: 'var(--gradient-orange)'
        },
        { 
            label: 'Ward Activity', 
            value: wardStatus || 'None', 
            icon: <FaBed />, 
            class: 'summary-card-premium bg-gradient-purple',
            color: 'var(--gradient-purple)'
        },
        { 
            label: 'New Notifications', 
            value: notificationsCount || 0, 
            icon: <FaBell />, 
            class: 'summary-card-premium bg-gradient-cyan',
            color: 'var(--gradient-cyan)'
        }
    ];

    return (
        <div className="row g-4 mb-5">
            {stats.map((stat, idx) => (
                <Col key={idx} xs={12} sm={6} lg={4} xl={2} className="flex-grow-1 animate-in" style={{ animationDelay: `${idx * 0.1}s` }}>
                    <div className={stat.class} style={{ background: stat.color }}>
                        <div className="d-flex justify-content-between align-items-start w-100">
                            <span className="summary-card-label">{stat.label}</span>
                            <div className="summary-card-icon-box">{stat.icon}</div>
                        </div>
                        <h2 className="summary-card-value text-white mb-0">{stat.value}</h2>
                    </div>
                </Col>
            ))}
            <style>{`
                .bg-gradient-blue { background: var(--gradient-blue) !important; }
                .bg-gradient-green { background: var(--gradient-green) !important; }
                .bg-gradient-orange { background: var(--gradient-orange) !important; }
                .bg-gradient-purple { background: var(--gradient-purple) !important; }
                .bg-gradient-cyan { background: var(--gradient-cyan) !important; }
                .summary-card-icon-box { background: rgba(255,255,255,0.2); width: 40px; height: 40px; border-radius: 12px; display: flex; align-items: center; justify-content: center; font-size: 1.25rem; }
            `}</style>
        </div>
    );
};

export default DashboardStats;
