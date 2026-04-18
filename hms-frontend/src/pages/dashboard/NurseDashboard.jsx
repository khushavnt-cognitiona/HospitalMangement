import React, { useState } from "react";
import { FaCheckCircle, FaClock, FaProcedures, FaClipboardList, FaUndoAlt, FaArrowRight } from "react-icons/fa";
import { Link } from "react-router-dom";

const NurseDashboard = () => {
    const [tasks, setTasks] = useState([
        { id: 1, patient: "John Doe", room: "101", task: "Administer Vitamin C", time: "10:00 AM", status: "PENDING" },
        { id: 2, patient: "Jane Smith", room: "202", task: "Check Blood Pressure", time: "11:30 AM", status: "PENDING" },
        { id: 3, patient: "Mike Ross", room: "305", task: "Post-op Checkup", time: "12:15 PM", status: "COMPLETED" },
    ]);

    const toggleTask = (id) => {
        setTasks(tasks.map(t => t.id === id ? { ...t, status: t.status === "PENDING" ? "COMPLETED" : "PENDING" } : t));
    };

    const stats = [
        { label: "Tasks Pending", value: tasks.filter(t => t.status === "PENDING").length, icon: <FaClock />, color: "#f59e0b" },
        { label: "Completed Today", value: tasks.filter(t => t.status === "COMPLETED").length, icon: <FaCheckCircle />, color: "#10b981" },
        { label: "Active Admissions", value: "8", icon: <FaProcedures />, color: "#0ea5e9" }
    ];

    return (
        <div className="app-container py-5 animate-slide-up">
            <header className="mb-5">
                <h2 className="mb-1 fw-bold fs-1">Nurse Care Control</h2>
                <p className="text-muted">Manage your patient rounds and clinical tasks effectively.</p>
            </header>

            {/* Quick Stats */}
            <div className="row g-4 mb-5">
                {stats.map((stat, idx) => (
                    <div key={idx} className="col-12 col-md-4">
                        <div className="premium-card p-4 d-flex align-items-center gap-4">
                            <div className="p-3 rounded-4" style={{ backgroundColor: `${stat.color}15`, color: stat.color }}>
                                {React.cloneElement(stat.icon, { size: 24 })}
                            </div>
                            <div>
                                <h3 className="fs-3 fw-bold mb-0">{stat.value}</h3>
                                <p className="text-muted small fw-semibold text-uppercase mb-0">{stat.label}</p>
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            <div className="row g-4">
                <div className="col-lg-8">
                    <div className="premium-card p-0 overflow-hidden">
                        <div className="p-4 border-bottom d-flex align-items-center justify-content-between bg-light bg-opacity-50">
                            <h4 className="fw-bold mb-0 flex-center gap-2">
                                <FaClipboardList className="text-primary" /> Daily Patient Care
                            </h4>
                            <span className="badge bg-primary-light text-primary rounded-pill px-3">{tasks.length} Total</span>
                        </div>
                        <div className="list-group list-group-flush">
                            {tasks.map((task) => (
                                <div key={task.id} className="list-group-item p-4 border-bottom border-0-last">
                                    <div className="d-flex justify-content-between align-items-center">
                                        <div className="d-flex align-items-center gap-4">
                                            <div className={`p-3 rounded-circle flex-center ${task.status === 'COMPLETED' ? 'bg-success-light text-success' : 'bg-warning-light text-warning'}`} style={{ width: "50px", height: "50px" }}>
                                                {task.status === 'COMPLETED' ? <FaCheckCircle size={20} /> : <FaClock size={20} />}
                                            </div>
                                            <div>
                                                <h6 className={`mb-1 fw-bold fs-5 ${task.status === 'COMPLETED' ? 'text-decoration-line-through text-muted' : ''}`}>{task.task}</h6>
                                                <div className="d-flex gap-3 text-muted small">
                                                    <span>Patient: <span className="fw-semibold text-dark">{task.patient}</span></span>
                                                    <span className="opacity-50">|</span>
                                                    <span>Room: <span className="fw-semibold text-dark">{task.room}</span></span>
                                                    <span className="opacity-50">|</span>
                                                    <span>Time: <span className="fw-semibold text-primary">{task.time}</span></span>
                                                </div>
                                            </div>
                                        </div>
                                        <button 
                                            className={`btn btn-sm btn-premium ${task.status === 'COMPLETED' ? 'btn-premium-outline' : 'btn-premium-primary'}`}
                                            onClick={() => toggleTask(task.id)}
                                        >
                                            {task.status === 'COMPLETED' ? (
                                                <><FaUndoAlt className="me-1" /> Undo</>
                                            ) : (
                                                <><FaCheckCircle className="me-1" /> Complete</>
                                            )}
                                        </button>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                <div className="col-lg-4">
                    <div className="premium-card bg-primary-gradient text-white p-5 border-0 h-100 shadow-lg d-flex flex-column justify-content-center">
                        <div className="mb-4 p-3 bg-white bg-opacity-20 rounded-4 d-inline-block">
                            <FaProcedures size={32} />
                        </div>
                        <h3 className="fw-bold mb-3 fs-2">Ward & Bed Management</h3>
                        <p className="mb-5 opacity-90 fs-5 lh-base">Real-time status of all clinical wards. Manage bed allocation and patient transfers instantly.</p>
                        <Link to="/wards" className="btn btn-white w-100 py-3 rounded-pill fw-bold fs-5 d-flex align-items-center justify-content-center gap-2 text-primary shadow-sm">
                            Access Wards Center <FaArrowRight />
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default NurseDashboard;
