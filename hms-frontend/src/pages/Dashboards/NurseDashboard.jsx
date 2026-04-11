import React, { useState, useEffect } from 'react';
import api from '../../services/api';
import { useAuth } from '../../context/AuthContext';

const NurseDashboard = () => {
    const { user } = useAuth();
    const [wards, setWards] = useState([]);
    const [notifications, setNotifications] = useState([]);

    useEffect(() => {
        fetchWards();
        fetchNotifications();
    }, []);

    const fetchWards = async () => {
        try {
            const response = await api.get('/wards');
            setWards(response.data);
        } catch (err) { console.error(err); }
    };

    const fetchNotifications = async () => {
        try {
            const response = await api.get('/notifications');
            setNotifications(response.data);
        } catch (err) { console.error(err); }
    };

    return (
        <div className="container py-4">
            <div className="row align-items-center mb-4">
                <div className="col">
                    <h2 className="fw-bold text-dark mb-0">Nurse Station Dashboard</h2>
                    <p className="text-muted">Ward management and real-time updates</p>
                </div>
                <div className="col-auto">
                    <span className="badge bg-danger rounded-pill px-3 py-2">LIVE MONITORING</span>
                </div>
            </div>
            
            <div className="row">
                <div className="col-md-8">
                    <div className="card shadow-sm border-0 rounded-4 overflow-hidden mb-4">
                        <div className="card-header bg-white border-0 py-3">
                            <h5 className="mb-0 fw-bold">Current Ward Status</h5>
                        </div>
                        <div className="table-responsive">
                            <table className="table table-hover align-middle mb-0">
                                <thead className="table-light">
                                    <tr>
                                        <th>Ward #</th>
                                        <th>Department</th>
                                        <th>Occupancy</th>
                                        <th>Progress</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {wards.map(ward => (
                                        <tr key={ward.id}>
                                            <td className="fw-bold">{ward.wardNumber}</td>
                                            <td>{ward.type}</td>
                                            <td>{ward.capacity} Beds</td>
                                            <td style={{width: '200px'}}>
                                                <div className="progress rounded-pill" style={{height: '8px'}}>
                                                    <div className="progress-bar bg-success" role="progressbar" style={{width: '65%'}}></div>
                                                </div>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>

                <div className="col-md-4">
                    <div className="card shadow-sm border-0 rounded-4 overflow-hidden">
                        <div className="card-header bg-primary text-white border-0 py-3 d-flex justify-content-between align-items-center">
                            <h5 className="mb-0 fw-bold">Clinical Alerts</h5>
                            <button className="btn btn-sm btn-outline-light rounded-pill px-3" onClick={fetchNotifications}>Refresh</button>
                        </div>
                        <div className="card-body p-0" style={{maxHeight: '500px', overflowY: 'auto'}}>
                            {notifications.length > 0 ? (
                                <ul className="list-group list-group-flush">
                                    {notifications.map(notif => (
                                        <li key={notif.id} className="list-group-item p-3 border-light border-bottom">
                                            <div className="d-flex w-100 justify-content-between">
                                                <p className="mb-1 text-dark small">{notif.message}</p>
                                            </div>
                                            <small className="text-muted">{new Date(notif.timestamp).toLocaleString()}</small>
                                        </li>
                                    ))}
                                </ul>
                            ) : (
                                <div className="p-5 text-center text-muted">
                                    <p className="mb-0">No new alerts.</p>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default NurseDashboard;
