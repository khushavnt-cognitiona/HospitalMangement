import React, { useState, useEffect } from "react";
import axiosInstance from "../../api/axiosInstance";

const NurseDashboard = () => {
    const [tasks, setTasks] = useState([
        { id: 1, patient: "John Doe", room: "101", task: "Administer Vitamin C", time: "10:00 AM", status: "PENDING" },
        { id: 2, patient: "Jane Smith", room: "202", task: "Check Blood Pressure", time: "11:30 AM", status: "PENDING" },
        { id: 3, patient: "Mike Ross", room: "305", task: "Post-op Checkup", time: "12:15 PM", status: "COMPLETED" },
    ]);

    const toggleTask = (id) => {
        setTasks(tasks.map(t => t.id === id ? { ...t, status: t.status === "PENDING" ? "COMPLETED" : "PENDING" } : t));
    };

    return (
        <div className="container-fluid">
            <h2 className="mb-4 fw-bold">Nurse Dashboard</h2>
            <div className="row g-4">
                <div className="col-lg-8">
                    <div className="card shadow-sm border-0 rounded-4 p-4">
                        <h4 className="fw-bold mb-4 text-primary">Daily Patient Care Tasks</h4>
                        <div className="list-group list-group-flush">
                            {tasks.map((task) => (
                                <div key={task.id} className="list-group-item px-0 py-3 d-flex justify-content-between align-items-center border-bottom">
                                    <div className="d-flex align-items-center gap-3">
                                        <div className={`rounded-circle d-flex align-items-center justify-content-center ${task.status === 'COMPLETED' ? 'bg-success text-white' : 'bg-warning-subtle text-warning'}`} style={{ width: "45px", height: "45px" }}>
                                            <i className={`bi ${task.status === 'COMPLETED' ? 'bi-check-lg' : 'bi-clock-history'} fs-5`}></i>
                                        </div>
                                        <div>
                                            <h6 className={`mb-0 fw-bold ${task.status === 'COMPLETED' ? 'text-decoration-line-through text-muted' : ''}`}>{task.task}</h6>
                                            <p className="small text-muted mb-0">Patient: {task.patient} | Room: {task.room} | Time: {task.time}</p>
                                        </div>
                                    </div>
                                    <button 
                                        className={`btn btn-sm fw-bold rounded-pill px-3 ${task.status === 'COMPLETED' ? 'btn-outline-secondary' : 'btn-primary'}`}
                                        onClick={() => toggleTask(task.id)}
                                    >
                                        {task.status === 'COMPLETED' ? 'Undo' : 'Complete'}
                                    </button>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                <div className="col-lg-4">
                    <div className="card shadow-sm border-0 rounded-4 p-4 bg-primary text-white h-100">
                        <h4 className="fw-bold mb-4">Ward Status Quick Link</h4>
                        <div className="mt-auto">
                            <p className="mb-4 opacity-75">Check available beds and allocate patients to rooms instantly.</p>
                            <a href="/wards" className="btn btn-light w-100 rounded-pill fw-bold shadow-sm p-3">
                                View Wards & Beds
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default NurseDashboard;
