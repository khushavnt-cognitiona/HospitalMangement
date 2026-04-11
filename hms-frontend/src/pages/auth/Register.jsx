import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";

const Register = () => {
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    name: "",
    role: "PATIENT",
  });
  const [error, setError] = useState("");
  const { register } = useAuth();
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await register(formData);
      navigate("/login");
    } catch (err) {
      if (err.response && err.response.data && err.response.data.message) {
        setError(err.response.data.message);
      } else {
        setError("Registration failed. Please try again.");
      }
    }
  };

  return (
    <div className="container d-flex align-items-center justify-content-center vh-100 bg-light">
      <div className="card shadow-lg p-4" style={{ maxWidth: "500px", width: "100%", borderRadius: "15px" }}>
        <div className="text-center mb-4">
          <h2 className="fw-bold text-primary">Join HMS</h2>
          <p className="text-muted">Create your account to get started.</p>
        </div>
        {error && <div className="alert alert-danger">{error}</div>}
        <form onSubmit={handleSubmit}>
          <div className="row">
            <div className="col-md-6 mb-3">
              <label className="form-label fw-semibold">Full Name</label>
              <input type="text" name="name" className="form-control" placeholder="John Doe" onChange={handleChange} required />
            </div>
            <div className="col-md-6 mb-3">
              <label className="form-label fw-semibold">Role</label>
              <select name="role" className="form-select text-primary fw-bold" onChange={handleChange} required>
                <option value="PATIENT">Patient</option>
                <option value="DOCTOR">Doctor</option>
                <option value="NURSE">Nurse</option>
              </select>
            </div>
          </div>
          <div className="mb-3">
            <label className="form-label fw-semibold">Username</label>
            <input type="text" name="username" className="form-control" placeholder="johndoe123" onChange={handleChange} required />
          </div>
          <div className="mb-3">
            <label className="form-label fw-semibold">Email</label>
            <input type="email" name="email" className="form-control" placeholder="john@example.com" onChange={handleChange} required />
          </div>
          <div className="mb-4">
            <label className="form-label fw-semibold">Password</label>
            <input type="password" name="password" className="form-control" placeholder="••••••••" onChange={handleChange} required />
          </div>
          <button type="submit" className="btn btn-primary btn-lg w-100 shadow-sm fw-bold">
            Register
          </button>
        </form>
        <div className="text-center mt-4">
          <span>Already have an account? </span>
          <Link to="/login" className="text-primary fw-bold text-decoration-none">Login here</Link>
        </div>
      </div>
    </div>
  );
};

export default Register;
