import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const LoginPage = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const { login } = useAuth();
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const userData = await login(username, password);
            if (userData.role === 'ADMIN') navigate('/admin');
            else if (userData.role === 'DOCTOR') navigate('/doctor');
            else if (userData.role === 'PATIENT') navigate('/patient');
            else if (userData.role === 'NURSE') navigate('/nurse');
            else navigate('/');
        } catch (err) {
            setError('Invalid credentials');
        }
    };

    return (
        <div className="container mt-5">
            <div className="row justify-content-center">
                <div className="col-md-5">
                    <div className="card shadow-lg border-0 rounded-4">
                        <div className="card-body p-5">
                            <h2 className="text-center mb-4 fw-bold text-primary">Login to HMS Pro</h2>
                            {error && <div className="alert alert-danger">{error}</div>}
                            <form onSubmit={handleSubmit}>
                                <div className="mb-3">
                                    <label className="form-label">Username</label>
                                    <input
                                        type="text"
                                        className="form-control rounded-3"
                                        value={username}
                                        onChange={(e) => setUsername(e.target.value)}
                                        required
                                    />
                                </div>
                                <div className="mb-3">
                                    <label className="form-label">Password</label>
                                    <input
                                        type="password"
                                        className="form-control rounded-3"
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}
                                        required
                                    />
                                </div>
                                <button type="submit" className="btn btn-primary w-100 py-2 fw-bold rounded-3">
                                    Login
                                </button>
                            </form>
                            <div className="mt-4 text-center">
                                <small className="text-muted">HMS Monolith v1.0</small>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default LoginPage;
