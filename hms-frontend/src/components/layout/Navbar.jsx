import React, { useState, useEffect } from "react";
import { Navbar, Nav, Container, NavDropdown, Badge } from "react-bootstrap";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import { 
  FaSignOutAlt, FaUser, FaEdit, FaHome, 
  FaBriefcaseMedical, FaBell, FaChevronDown, FaTachometerAlt, FaCheckCircle
} from "react-icons/fa";
import axiosInstance from "../../api/axiosInstance";
import "../../styles/Navbar.css";

const AppNavbar = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [isScrolled, setIsScrolled] = useState(false);
  const [notifications, setNotifications] = useState([]);
  const [unreadCount, setUnreadCount] = useState(0);

  // Polling for notifications
  useEffect(() => {
    if (user) {
      fetchNotifications();
      const interval = setInterval(fetchNotifications, 20000); // 20s polling
      return () => clearInterval(interval);
    }
  }, [user]);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const fetchNotifications = async () => {
    try {
      const response = await axiosInstance.get("notifications");
      setNotifications(response.data);
      setUnreadCount(response.data.filter(n => !n.readStatus).length);
    } catch (error) {
      console.error("Error fetching notifications:", error);
    }
  };

  const markAsRead = async (id) => {
    try {
      await axiosInstance.patch(`notifications/${id}/read`);
      fetchNotifications(); // Refresh list after marking
    } catch (error) {
      console.error("Error marking notification as read:", error);
    }
  };

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  const getDashboardPath = () => {
    if (!user) return "/";
    const role = user.role;
    switch (role) {
      case 'ADMIN': return "/admin";
      case 'DOCTOR': return "/doctor";
      case 'PATIENT': return "/patient/dashboard";
      case 'NURSE': return "/nurse";
      default: return "/";
    }
  };

  const getInitials = (name) => {
    if (!name) return "U";
    return name.split(" ").map(n => n[0]).join("").substring(0, 2).toUpperCase();
  };

  const navLinks = [
    { path: "/", label: "Home", icon: <FaHome size={18} /> },
  ];

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
              {unreadCount > 0 && <Badge bg="danger" className="nav-badge-dot" />}
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
            {user && (
              <Nav.Link 
                as={Link} 
                to={getDashboardPath()} 
                className={`nav-link-item dashboard-nav-link ms-lg-2 ${location.pathname.includes(getDashboardPath()) ? 'active' : ''}`}
              >
                <FaTachometerAlt className="me-2" /> Dashboard
              </Nav.Link>
            )}
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
                <NavDropdown
                  id="nav-notification-dropdown"
                  align="end"
                  title={
                    <div className="nav-icon-btn position-relative">
                      <FaBell size={20} />
                      {unreadCount > 0 && <Badge bg="danger" className="nav-badge-dot" />}
                    </div>
                  }
                  className="notification-dropdown-container"
                >
                  <div className="dropdown-header d-flex justify-content-between align-items-center p-3 border-bottom" style={{ minWidth: '320px' }}>
                    <h6 className="mb-0 fw-bold">Notifications</h6>
                    {unreadCount > 0 && <span className="badge bg-primary-light text-primary rounded-pill">{unreadCount} New</span>}
                  </div>
                  <div className="notification-list" style={{ maxHeight: '400px', overflowY: 'auto' }}>
                    {notifications.length === 0 ? (
                      <div className="p-4 text-center text-muted">
                        <FaBell size={32} className="mb-2 opacity-20" />
                        <p className="small mb-0">No notifications yet</p>
                      </div>
                    ) : (
                      notifications.map(notif => (
                        <NavDropdown.Item 
                          key={notif.id} 
                          className={`notification-item p-3 border-bottom ${!notif.readStatus ? 'bg-light' : ''}`}
                          onClick={() => !notif.readStatus && markAsRead(notif.id)}
                        >
                          <div className="d-flex gap-3">
                            <div className={`mt-1 ${notif.readStatus ? 'text-muted' : 'text-primary'}`}>
                              <FaCheckCircle size={14} />
                            </div>
                            <div>
                              <div className={`small mb-1 ${!notif.readStatus ? 'fw-bold' : ''}`}>
                                {notif.message}
                              </div>
                              <div className="text-muted" style={{ fontSize: '0.7rem' }}>
                                {new Date(notif.timestamp).toLocaleString()}
                              </div>
                            </div>
                          </div>
                        </NavDropdown.Item>
                      ))
                    )}
                  </div>
                </NavDropdown>

                <NavDropdown
                  id="nav-user-dropdown"
                  align="end"
                  title={
                    <div className="user-nav-profile">
                      <div className="nav-avatar">
                        {user.profileImage ? (
                          <img src={user.profileImage} alt="Avatar" className="avatar-img" />
                        ) : (
                          getInitials(user.name || user.username)
                        )}
                      </div>
                      <div className="d-none d-xl-block">
                        <div className="user-name-label">{user.name || user.username}</div>
                        <div className="user-role-label">{user.role}</div>
                      </div>
                      <FaChevronDown size={12} className="ms-2 opacity-50" />
                    </div>
                  }
                  className="profile-dropdown-container"
                >
                  <div className="dropdown-header-main d-lg-none">
                    <div className="fw-bold">{user.name || user.username}</div>
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
