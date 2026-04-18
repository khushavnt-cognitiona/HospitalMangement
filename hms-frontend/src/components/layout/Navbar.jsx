import React, { useState, useEffect } from "react";
import { Navbar, Nav, Container, NavDropdown } from "react-bootstrap";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import { 
  FaSignOutAlt, FaUser, FaEdit, FaHome, 
  FaBriefcaseMedical, FaShieldAlt
} from "react-icons/fa";
import "../../styles/Navbar.css";

const AppNavbar = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  const getInitials = (name) => {
    if (!name) return "U";
    return name.split(" ").map(n => n[0]).join("").substring(0, 2).toUpperCase();
  };

  const menuItems = [
    { path: "/", label: "Home", icon: <FaHome /> }
  ];

  return (
    <Navbar 
      expand="lg" 
      fixed="top" 
      className={`navbar-premium ${isScrolled ? 'navbar-scrolled' : ''}`}
    >
      <Container>
        <Navbar.Brand as={Link} to="/" className="brand-container me-lg-5">
          <div className="brand-logo-hex">
            <FaBriefcaseMedical size={24} />
          </div>
          <span className="brand-name">HospitalManager</span>
        </Navbar.Brand>

        <Navbar.Toggle aria-controls="main-navbar-nav" className="navbar-toggler-premium" />
        
        <Navbar.Collapse id="main-navbar-nav">
          <Nav className="mx-auto">
            {menuItems.map((item) => (
              <Nav.Link 
                key={item.path} 
                as={Link} 
                to={item.path} 
                className={`nav-link-premium ${location.pathname === item.path ? 'active' : ''}`}
              >
                {item.icon}
                <span>{item.label}</span>
              </Nav.Link>
            ))}
          </Nav>

          <Nav className="right-nav-group">
            {!user ? (
              <>
                <Link to="/login" className="nav-link-premium">Sign In</Link>
                <Link to="/register" className="btn btn-primary fw-bold rounded-pill px-4" style={{ background: 'var(--primary)', border: 'none' }}>
                  Get Started
                </Link>
              </>
            ) : (
              <NavDropdown
                id="user-profile-dropdown"
                align="end"
                title={
                  <div className="user-profile-pill">
                    <div className="nav-avatar-circle">
                      {getInitials(user.name)}
                    </div>
                    <div className="d-none d-lg-block text-start">
                      <div className="user-name-small">{user.name}</div>
                      <div className="user-role-badge">{user.role}</div>
                    </div>
                  </div>
                }
                className="nav-glass-dropdown"
              >
                <div className="px-3 py-2 border-bottom mb-2 d-lg-none">
                  <div className="fw-bold text-dark">{user.name}</div>
                  <small className="text-primary fw-bold text-uppercase" style={{ fontSize: '0.6rem' }}>{user.role}</small>
                </div>
                
                <NavDropdown.Item as={Link} to="/profile" className="dropdown-item-premium">
                  <FaUser size={14} />
                  <span>View Profile</span>
                </NavDropdown.Item>

                <NavDropdown.Item as={Link} to="/profile/edit" className="dropdown-item-premium">
                  <FaEdit size={14} />
                  <span>Edit Profile</span>
                </NavDropdown.Item>
                
                <NavDropdown.Divider />
                
                <NavDropdown.Item onClick={handleLogout} className="dropdown-item-premium text-danger">
                  <FaSignOutAlt size={14} />
                  <span className="fw-bold">Sign Out</span>
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
