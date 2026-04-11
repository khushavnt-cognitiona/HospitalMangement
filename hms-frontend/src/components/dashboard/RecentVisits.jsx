import React from "react";
import { Card, Table, Badge } from "react-bootstrap";
import { Link } from "react-router-dom";
import { FaUserMd, FaFileAlt, FaCalendarCheck } from "react-icons/fa";

const RecentVisits = ({ appointments = [] }) => {
    // Fallback data if no real appointments exist
    const displayData = appointments.length > 0 ? appointments : [
        { id: 1, doctor: { user: { name: "Priya Sharma" } }, reason: "hii", appointmentTime: "2026-04-15", status: "PENDING" },
        { id: 2, doctor: { user: { name: "Priya Sharma" } }, reason: "fivar", appointmentTime: "2026-04-12", status: "PENDING" }
    ];

    return (
        <Card className="card-premium border-0 p-4 h-100 bg-white shadow-sm overflow-hidden">
            <div className="d-flex justify-content-between align-items-center mb-4">
                <h4 className="fw-black text-dark mb-0 d-flex align-items-center gap-3">
                    <FaCalendarCheck className="text-primary" /> Recent Visits
                </h4>
                <Link to="/patient/appointments" className="text-primary fw-bold text-decoration-none hover-lift">
                    View All History
                </Link>
            </div>
            
            <div className="table-responsive">
                <Table className="align-middle border-0 mb-0">
                    <thead>
                        <tr className="bg-light border-0">
                            <th className="py-3 px-3 text-muted fw-bold small text-uppercase border-0">Consultant</th>
                            <th className="py-3 px-3 text-muted fw-bold small text-uppercase border-0">Clinical Reason</th>
                            <th className="py-3 px-3 text-muted fw-bold small text-uppercase border-0">Date & Status</th>
                            <th className="py-3 px-3 text-muted fw-bold small text-uppercase text-center border-0">Action</th>
                        </tr>
                    </thead>
                    <tbody className="border-0">
                        {displayData.slice(0, 5).map((app, i) => (
                            <tr key={app.id || i} className="border-0 transition-all hover-bg-light">
                                <td className="py-4 px-3 border-0">
                                    <div className="d-flex align-items-center gap-3">
                                        <div className="bg-primary bg-opacity-10 text-primary rounded-circle p-2 d-flex align-items-center justify-content-center shadow-sm" style={{ width: '42px', height: '42px' }}>
                                            <FaUserMd size={20} />
                                        </div>
                                        <div>
                                            <div className="fw-bold text-dark lh-1 mb-1">Dr. {app.doctor?.user?.name || "Specialist"}</div>
                                            <small className="text-muted fw-bold" style={{ fontSize: '0.65rem', textTransform: 'uppercase' }}>Specialist</small>
                                        </div>
                                    </div>
                                </td>
                                <td className="py-4 px-3 border-0 text-muted fw-bold">{app.reason}</td>
                                <td className="py-4 px-3 border-0">
                                    <div className="fw-black text-dark">{new Date(app.appointmentTime).toLocaleDateString(undefined, { month: 'short', day: 'numeric' })}</div>
                                    <Badge bg="" className="mt-1 rounded-pill px-3 py-1 fw-bold border-0 shadow-sm" style={{ fontSize: '0.7rem', background: app.status === 'PENDING' ? 'var(--primary-medical)' : 'var(--success-medical)' }}>
                                        {app.status}
                                    </Badge>
                                </td>
                                <td className="py-4 px-3 text-center border-0">
                                    <button className="btn btn-light rounded-circle shadow-sm p-2 hover-lift">
                                        <FaFileAlt className="text-primary" size={14} />
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </Table>
            </div>
        </Card>
    );
};

export default RecentVisits;
