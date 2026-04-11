import React from "react";
import { Navbar, Nav, Container, NavDropdown, Badge } from "react-bootstrap";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import { 
  FaBell, FaSignOutAlt, FaUser, 
  FaEdit, FaHome, FaUserMd, FaUsers, FaCalendarCheck, 
  FaFileInvoiceDollar, FaBriefcaseMedical,
  FaChartBar, FaStethoscope, FaBed, FaHandHoldingHeart,
  FaCalendarPlus, FaShieldAlt
} from "react-icons/fa";

const AppNavbar = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  const getInitials = (name) => {
    if (!name) return "U";
    return name.split(" ").map(n => n[0]).join("").substring(0, 2).toUpperCase();
  };

  // Role-Based Navigation Configuration
  const navLinks = {
    ADMIN: [
      { path: "/admin/dashboard", label: "Dashboard", icon: <FaHome /> },
      { path: "/admin/doctors", label: "Doctors", icon: <FaUserMd /> },
      { path: "/admin/patients", label: "Patients", icon: <FaUsers /> },
      { path: "/admin/billing", label: "Billing", icon: <FaFileInvoiceDollar /> },
      { path: "/admin/reports", label: "Reports", icon: <FaChartBar /> },
    ],
    DOCTOR: [
      { path: "/doctor/dashboard", label: "Dashboard", icon: <FaHome /> },
      { path: "/doctor/appointments", label: "Appointments", icon: <FaCalendarCheck /> },
      { path: "/doctor/patients", label: "Patients", icon: <FaUsers /> },
      { path: "/doctor/prescriptions", label: "Prescriptions", icon: <FaStethoscope /> },
    ],
    PATIENT: [
      { path: "/patient/dashboard", label: "Dashboard", icon: <FaHome /> },
      { path: "/patient/book", label: "Book Appointment", icon: <FaCalendarPlus /> },
      { path: "/patient/appointments", label: "My History", icon: <FaCalendarCheck /> },
      { path: "/patient/billing", label: "My Billings", icon: <FaFileInvoiceDollar /> },
      { path: "/patient/plans", label: "Health Plans", icon: <FaShieldAlt /> },
    ],
    NURSE: [
      { path: "/nurse/dashboard", label: "Dashboard", icon: <FaHome /> },
      { path: "/nurse/wards", label: "Ward", icon: <FaBed /> },
      { path: "/nurse/care", label: "Patient Care", icon: <FaHandHoldingHeart /> },
    ],
  };

  const currentRoleLinks = user ? navLinks[user.role] || [] : [];

  return (
    <Navbar expand="lg" variant="dark" sticky="top" className="navbar-custom shadow-sm">
      <Container>
        <Navbar.Brand as={Link} to="/" className="d-flex align-items-center gap-2 me-5">
          <div className="bg-white p-2 rounded-3 d-flex align-items-center justify-content-center shadow-sm" style={{ width: '32px', height: '32px' }}>
             <FaBriefcaseMedical className="text-primary" size={20} />
          </div>
          <span className="fs-4 ls-1">
            <span className="logo-hospital">Hospital</span>
            <span className="logo-manager">Manager</span>
          </span>
        </Navbar.Brand>

        <Navbar.Toggle aria-controls="basic-navbar-nav" className="border-0 shadow-none" />
        
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="mx-auto gap-2">
            {currentRoleLinks.map((link) => (
              <Nav.Link 
                key={link.path} 
                as={Link} 
                to={link.path} 
                active={location.pathname === link.path}
                className="d-flex align-items-center gap-3 px-3"
              >
                {link.icon}
                <span>{link.label}</span>
              </Nav.Link>
            ))}
          </Nav>

          <Nav className="align-items-center gap-3">
            <div className="position-relative cursor-pointer hover-lift p-2">
              <FaBell size={22} className="text-white opacity-90" />
              <Badge 
                bg="danger" 
                pill 
                className="position-absolute"
                style={{ top: '8px', right: '0px', fontSize: '0.6rem', border: '2px solid var(--primary-medical)' }}
              >
                3
              </Badge>
            </div>

            {user && (
              <NavDropdown
                id="profile-dropdown"
                align="end"
                title={
                  <div className="d-flex align-items-center gap-2 cursor-pointer">
                    <div className="avatar-nav" style={{ width: '32px', height: '32px', fontSize: '0.8rem' }}>
                      {getInitials(user.name)}
                    </div>
                    <div className="d-none d-xl-block text-start">
                      <div className="text-white fw-bold small mb-0 lh-1">{user.name}</div>
                      <div className="text-white opacity-75 fw-bold" style={{ fontSize: '0.65rem', textTransform: 'uppercase' }}>{user.role}</div>
                    </div>
                  </div>
                }
                className="profile-dropdown-custom"
              >
                <div className="px-3 py-2 border-bottom mb-2 d-xl-none">
                  <div className="fw-bold">{user.name}</div>
                  <small className="text-muted">{user.role}</small>
                </div>
                
                <NavDropdown.Item as={Link} to={user.role === 'PATIENT' ? '/patient/profile' : '/profile'} className="py-2 px-3">
                  <FaUser className="me-2 text-primary" /> View Profile
                </NavDropdown.Item>
                <NavDropdown.Item as={Link} to={user.role === 'PATIENT' ? '/patient/profile/edit' : '/profile/edit'} className="py-2 px-3">
                  <FaEdit className="me-2 text-primary" /> Edit Profile
                </NavDropdown.Item>
                <NavDropdown.Divider />
                <NavDropdown.Item onClick={handleLogout} className="py-2 px-3 text-danger">
                  <FaSignOutAlt className="me-2" /> Logout
                </NavDropdown.Item>
              </NavDropdown>
            )}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default AppNavbar;
