import React, { useState, useEffect } from 'react';
import axiosInstance from '../../api/axiosInstance';

const AdminDashboard = () => {
    const [wards, setWards] = useState([]);
    const [staff, setStaff] = useState([]);
    const [newWard, setNewWard] = useState({ wardNumber: '', type: 'General', capacity: 10 });
    const [activeTab, setActiveTab] = useState('wards');

    useEffect(() => {
        fetchWards();
        fetchStaff();
    }, []);

    const fetchWards = async () => {
        try {
            const response = await axiosInstance.get('/wards');
            setWards(response.data);
        } catch (err) { console.error(err); }
    };

    const fetchStaff = async () => {
        try {
            const response = await axiosInstance.get('/staff');
            setStaff(response.data);
        } catch (err) { console.error(err); }
    };

    const handleCreateWard = async (e) => {
        e.preventDefault();
        try {
            await axiosInstance.post('/wards', newWard);
            fetchWards();
            setNewWard({ wardNumber: '', type: 'General', capacity: 10 });
        } catch (err) { console.error(err); }
    };

    return (
        <div className="container py-4">
            <h2 className="mb-4 text-center fw-bold text-dark">Admin Control Center</h2>
            
            <div className="row mb-4">
                <div className="col-md-3">
                    <div className="card text-white bg-primary mb-3 shadow-sm rounded-4 border-0">
                        <div className="card-body">
                            <h5 className="card-title">Total Wards</h5>
                            <p className="card-text fs-2 fw-bold">{wards.length}</p>
                        </div>
                    </div>
                </div>
                <div className="col-md-3">
                    <div className="card text-white bg-success mb-3 shadow-sm rounded-4 border-0">
                        <div className="card-body">
                            <h5 className="card-title">Active Staff</h5>
                            <p className="card-text fs-2 fw-bold">{staff.length}</p>
                        </div>
                    </div>
                </div>
                <div className="col-md-3">
                    <div className="card text-white bg-info mb-3 shadow-sm rounded-4 border-0">
                        <div className="card-body">
                            <h5 className="card-title">System Status</h5>
                            <p className="card-text fs-2 fw-bold">Online</p>
                        </div>
                    </div>
                </div>
                <div className="col-md-3">
                    <div className="card text-white bg-warning mb-3 shadow-sm rounded-4 border-0">
                        <div className="card-body">
                            <h5 className="card-title">Alerts</h5>
                            <p className="card-text fs-2 fw-bold text-dark">0</p>
                        </div>
                    </div>
                </div>
            </div>

            <ul className="nav nav-pills mb-4">
                <li className="nav-item">
                    <button className={`nav-link rounded-pill px-4 me-2 ${activeTab === 'wards' ? 'active' : ''}`} onClick={() => setActiveTab('wards')}>Ward Management</button>
                </li>
                <li className="nav-item">
                    <button className={`nav-link rounded-pill px-4 ${activeTab === 'staff' ? 'active' : ''}`} onClick={() => setActiveTab('staff')}>Staff Roster</button>
                </li>
            </ul>

            {activeTab === 'wards' && (
                <div className="row">
                    <div className="col-md-4">
                        <div className="card shadow-sm border-0 rounded-4">
                            <div className="card-body p-4">
                                <h5 className="fw-bold mb-3">Add New Ward</h5>
                                <form onSubmit={handleCreateWard}>
                                    <div className="mb-3">
                                        <label className="form-label">Ward Number</label>
                                        <input type="text" className="form-control rounded-3" value={newWard.wardNumber} onChange={e => setNewWard({...newWard, wardNumber: e.target.value})} required placeholder="e.g. W-101" />
                                    </div>
                                    <div className="mb-3">
                                        <label className="form-label">Type</label>
                                        <select className="form-select rounded-3" value={newWard.type} onChange={e => setNewWard({...newWard, type: e.target.value})}>
                                            <option value="General">General</option>
                                            <option value="ICU">ICU</option>
                                            <option value="Emergency">Emergency</option>
                                        </select>
                                    </div>
                                    <div className="mb-3">
                                        <label className="form-label">Capacity</label>
                                        <input type="number" className="form-control rounded-3" value={newWard.capacity} onChange={e => setNewWard({...newWard, capacity: e.target.value})} required />
                                    </div>
                                    <button className="btn btn-primary w-100 rounded-3 fw-bold">Create Ward</button>
                                </form>
                            </div>
                        </div>
                    </div>
                    <div className="col-md-8">
                        <div className="card shadow-sm border-0 rounded-4 overflow-hidden">
                            <div className="table-responsive">
                                <table className="table table-hover mb-0">
                                    <thead className="table-light">
                                        <tr>
                                            <th>Number</th>
                                            <th>Type</th>
                                            <th>Capacity</th>
                                            <th>Assigned Staff</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {wards.map(ward => (
                                            <tr key={ward.id}>
                                                <td>{ward.wardNumber}</td>
                                                <td><span className={`badge rounded-pill ${ward.type === 'ICU' ? 'bg-danger' : 'bg-info'}`}>{ward.type}</span></td>
                                                <td>{ward.capacity}</td>
                                                <td>{ward.assignedStaff || 'Unassigned'}</td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                </div>
            )}

            {activeTab === 'staff' && (
                <div className="card shadow-sm border-0 rounded-4">
                    <div className="card-body p-0">
                        <table className="table table-hover mb-0">
                            <thead className="table-light">
                                <tr>
                                    <th>Name</th>
                                    <th>Role</th>
                                    <th>Shift</th>
                                </tr>
                            </thead>
                            <tbody>
                                {staff.map(s => (
                                    <tr key={s.id}>
                                        <td>{s.name}</td>
                                        <td>{s.role}</td>
                                        <td><span className="badge bg-secondary rounded-pill">{s.shift}</span></td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            )}
        </div>
    );
};

export default AdminDashboard;
