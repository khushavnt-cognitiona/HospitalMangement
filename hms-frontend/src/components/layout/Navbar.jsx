import React, { useState, useEffect } from "react";
import { Navbar, Nav, Container, NavDropdown, Badge } from "react-bootstrap";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import { 
  FaSignOutAlt, FaUser, FaEdit, FaHome, 
  FaBriefcaseMedical, FaBell, FaSearch, FaChevronDown
} from "react-icons/fa";
import "../../styles/Navbar.css";

const AppNavbar = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [isScrolled, setIsScrolled] = useState(false);
  const [notifications] = useState(3); // Placeholder for notifications

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

  const navLinks = [
    { path: "/", label: "Home", icon: <FaHome size={18} /> },
  ];

  // Role-based links
  if (user) {
    if (user.role === 'ADMIN') navLinks.push({ path: "/admin", label: "Dashboard" }, { path: "/doctors", label: "Doctors" });
    if (user.role === 'DOCTOR') navLinks.push({ path: "/doctor", label: "Practice" });
    if (user.role === 'PATIENT') navLinks.push({ path: "/patient/dashboard", label: "Health Hub" });
  }

  return (
    <Navbar 
      expand="lg" 
      fixed="top" 
      className={`navbar-premium ${isScrolled ? 'navbar-scrolled shadow-premium' : ''}`}
    >
      <Container>
        <Navbar.Brand as={Link} to="/" className="brand-container">
          <div className="brand-icon-wrapper">
            <FaBriefcaseMedical size={20} className="text-white" />
          </div>
          <span className="brand-text">HMS<span className="text-primary">Pro</span></span>
        </Navbar.Brand>

        <div className="d-flex align-items-center gap-3 d-lg-none">
          {user && (
            <div className="nav-icon-btn position-relative">
              <FaBell size={20} />
              {notifications > 0 && <Badge bg="danger" className="nav-badge-dot" />}
            </div>
          )}
          <Navbar.Toggle aria-controls="main-navbar-nav" className="navbar-toggler-custom" />
        </div>
        
        <Navbar.Collapse id="main-navbar-nav">
          <Nav className="mx-auto nav-links-group">
            {navLinks.map((link) => (
              <Nav.Link 
                key={link.path} 
                as={Link} 
                to={link.path} 
                className={`nav-link-item ${location.pathname === link.path ? 'active' : ''}`}
              >
                {link.label}
              </Nav.Link>
            ))}
          </Nav>

          <Nav className="align-items-center gap-2">
            {!user ? (
              <div className="d-flex align-items-center gap-3">
                <Link to="/login" className="btn-nav-text">Sign In</Link>
                <Link to="/register" className="btn-premium btn-premium-primary py-2 px-4 shadow-sm">
                  Get Started
                </Link>
              </div>
            ) : (
              <div className="d-flex align-items-center gap-lg-4">
                <div className="nav-icon-btn d-none d-lg-flex">
                  <FaBell size={20} />
                  {notifications > 0 && <Badge bg="danger" className="nav-badge-dot" />}
                </div>

                <NavDropdown
                  id="nav-user-dropdown"
                  align="end"
                  title={
                    <div className="user-nav-profile">
                      <div className="nav-avatar">
                        {user.profileImage ? (
                          <img src={user.profileImage} alt="Avatar" className="avatar-img" />
                        ) : (
                          getInitials(user.name)
                        )}
                      </div>
                      <div className="d-none d-xl-block">
                        <div className="user-name-label">{user.name}</div>
                        <div className="user-role-label">{user.role}</div>
                      </div>
                      <FaChevronDown size={12} className="ms-2 opacity-50" />
                    </div>
                  }
                  className="profile-dropdown-container"
                >
                  <div className="dropdown-header-main d-lg-none">
                    <div className="fw-bold">{user.name}</div>
                    <div className="text-muted small">{user.role}</div>
                  </div>

                  <NavDropdown.Item as={Link} to="/profile" className="dropdown-link-item">
                    <FaUser className="me-2 text-primary" /> Profile
                  </NavDropdown.Item>

                  <NavDropdown.Item as={Link} to="/profile/edit" className="dropdown-link-item">
                    <FaEdit className="me-2 text-primary" /> Settings
                  </NavDropdown.Item>
                  
                  <NavDropdown.Divider />
                  
                  <NavDropdown.Item onClick={handleLogout} className="dropdown-link-item logout-btn">
                    <FaSignOutAlt className="me-2 text-danger" /> Sign Out
                  </NavDropdown.Item>
                </NavDropdown>
              </div>
            )}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default AppNavbar;
