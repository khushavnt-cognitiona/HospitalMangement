import React from "react";
import { Row, Col, Card } from "react-bootstrap";
import { FaCalendarAlt, FaFileAlt, FaShieldAlt } from "react-icons/fa";

const StatCards = ({ visitsCount = 3, recordsCount = 0, plan = "PRO+" }) => {
    const stats = [
        { label: "Total Visits", value: visitsCount, icon: <FaCalendarAlt size={45} className="opacity-50 mt-2" />, className: "stat-card-blue" },
        { label: "Health Records", value: recordsCount, icon: <FaFileAlt size={45} className="opacity-50 mt-2" />, className: "stat-card-green" },
        { label: "Coverage Plan", value: plan, icon: <FaShieldAlt size={48} className="opacity-50 mt-2" />, className: "stat-card-cyan", isPlan: true }
    ];

    return (
        <Row className="g-4 mb-5">
            {stats.map((stat, i) => (
                <Col lg={4} key={i}>
                    <Card className={`card-premium ${stat.className} text-white p-4 h-100 border-0 shadow-lg`}>
                        <div className="d-flex justify-content-between align-items-start position-relative z-index-1">
                            <div>
                                <small className="text-white opacity-75 fw-bold text-uppercase ls-1">{stat.label}</small>
                                <h1 className={`${stat.isPlan ? 'display-3' : 'display-2'} fw-black mt-1`}>{stat.value}</h1>
                            </div>
                            {stat.icon}
                        </div>
                    </Card>
                </Col>
            ))}
        </Row>
    );
};

export default StatCards;
