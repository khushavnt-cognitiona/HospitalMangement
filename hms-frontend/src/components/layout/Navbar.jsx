import React, { useState, useEffect } from "react";
import { Navbar, Nav, Container, NavDropdown, Badge } from "react-bootstrap";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import { 
  FaBell, FaSignOutAlt, FaUser, FaEdit, FaHome, 
  FaUserMd, FaUsers, FaCalendarCheck, FaFileInvoiceDollar, 
  FaBriefcaseMedical, FaChartBar, FaStethoscope, FaBed, 
  FaHandHoldingHeart, FaCalendarPlus, FaShieldAlt
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

  // Simplified Navigation: Only Home
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
        {/* Brand Section */}
        <Navbar.Brand as={Link} to="/" className="brand-container me-lg-5">
          <div className="brand-logo-hex">
            <FaBriefcaseMedical size={22} />
          </div>
          <div className="brand-text">
            <span className="brand-name">HospitalManager</span>
            <span className="brand-tagline">Clinical Excellence</span>
          </div>
        </Navbar.Brand>

        <Navbar.Toggle aria-controls="main-navbar-nav" className="navbar-toggler-premium">
          <span className="navbar-toggler-icon"></span>
        </Navbar.Toggle>
        
        <Navbar.Collapse id="main-navbar-nav">
          {/* Central Navigation Section */}
          <Nav className="mx-auto">
            {menuItems.map((item) => (
              <Nav.Link 
                key={item.path} 
                as={Link} 
                to={item.path} 
                className={`nav-link-premium d-flex align-items-center gap-2 ${location.pathname === item.path ? 'active' : ''}`}
              >
                <span className="d-lg-none d-xl-inline-block">{item.icon}</span>
                <span>{item.label}</span>
              </Nav.Link>
            ))}
          </Nav>

          {/* Right Action Section */}
          <Nav className="align-items-center gap-3 right-nav-group">
            {!user ? (
              <>
                <Link to="/login" className="text-secondary fw-bold text-decoration-none hover-text-primary px-3 d-none d-lg-block">
                  Sign In
                </Link>
                <Link to="/register" className="btn btn-primary fw-bold rounded-pill px-4 py-2 shadow-sm d-flex align-items-center gap-2" style={{ background: '#0076ff', border: 'none' }}>
                  Get Started
                </Link>
              </>
            ) : (
              <>
                {/* Notification Bell */}
                <div className="nav-action-btn">
                  <FaBell size={20} />
                  <div className="notification-badge-premium">3</div>
                </div>

                {/* Profile Dropdown */}
                <div className="profile-section-wrapper">
                  <NavDropdown
                    id="user-profile-dropdown"
                    align="end"
                    title={
                      <div className="user-profile-pill">
                        <div className="nav-avatar-circle">
                          {getInitials(user.name)}
                        </div>
                        <div className="d-none d-lg-block text-start user-info-text">
                          <div className="user-name-small">{user.name}</div>
                          <div className="user-role-badge">{user.role}</div>
                        </div>
                      </div>
                    }
                    className="nav-glass-dropdown"
                  >
                    {/* Mobile Identity Info */}
                    <div className="px-3 py-3 border-bottom mb-2 d-lg-none">
                      <div className="fw-bold text-dark">{user.name}</div>
                      <small className="text-primary fw-bold text-uppercase" style={{ fontSize: '0.6rem' }}>{user.role}</small>
                    </div>
                    
                    <NavDropdown.Item as={Link} to="/profile" className="dropdown-item-premium">
                      <div className="nav-icon-wrapper bg-light-blue">
                        <FaUser size={14} />
                      </div>
                      <span>View Profile</span>
                    </NavDropdown.Item>
  
                    <NavDropdown.Item as={Link} to="/profile/edit" className="dropdown-item-premium">
                       <div className="nav-icon-wrapper bg-light-green">
                        <FaEdit size={14} />
                      </div>
                      <span>Security Settings</span>
                    </NavDropdown.Item>
                    
                    <NavDropdown.Divider className="my-2 opacity-50" />
                    
                    <NavDropdown.Item onClick={handleLogout} className="dropdown-item-premium logout-item">
                      <div className="nav-icon-wrapper bg-light-red">
                        <FaSignOutAlt size={14} />
                      </div>
                      <span className="fw-bold">Sign Out</span>
                    </NavDropdown.Item>
                  </NavDropdown>
                </div>
              </>
            )}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default AppNavbar;
