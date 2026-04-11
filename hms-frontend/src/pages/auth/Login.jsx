import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";

const Login = () => {
    const [credentials, setCredentials] = useState({ username: "", password: "" });
    const [error, setError] = useState("");
    const { login } = useAuth();
    const navigate = useNavigate();

    const handleChange = (e) => {
        setCredentials({ ...credentials, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const user = await login(credentials);
            if (user.role === "ADMIN") navigate("/admin");
            else if (user.role === "DOCTOR") navigate("/doctor");
            else if (user.role === "PATIENT") navigate("/patient");
            else if (user.role === "NURSE") navigate("/nurse");
            else navigate("/");
        } catch (err) {
            setError("Invalid username or password");
        }
    };

    return (
        <div className="container d-flex align-items-center justify-content-center vh-100 bg-light">
            <div className="card shadow-lg p-4" style={{ maxWidth: "400px", width: "100%", borderRadius: "15px" }}>
                <div className="text-center mb-4">
                    <h2 className="fw-bold text-primary">HMS Login</h2>
                    <p className="text-muted">Welcome back! Please login.</p>
                </div>
                {error && <div className="alert alert-danger">{error}</div>}
                <form onSubmit={handleSubmit}>
                    <div className="mb-3">
                        <label className="form-label fw-semibold">Username</label>
                        <input
                            type="text"
                            name="username"
                            className="form-control form-control-lg bg-light"
                            placeholder="Enter username"
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <div className="mb-4">
                        <label className="form-label fw-semibold">Password</label>
                        <input
                            type="password"
                            name="password"
                            className="form-control form-control-lg bg-light"
                            placeholder="Enter password"
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <button type="submit" className="btn btn-primary btn-lg w-100 shadow-sm fw-bold">
                        Login
                    </button>
                </form>
                <div className="text-center mt-4">
                    <span>Don't have an account? </span>
                    <Link to="/register" className="text-primary fw-bold text-decoration-none">Register here</Link>
                </div>
            </div>
        </div>
    );
};

export default Login;
