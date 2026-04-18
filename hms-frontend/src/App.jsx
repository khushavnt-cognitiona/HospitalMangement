import React from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
import { GlobalProvider } from "./context/GlobalContext";
import Navbar from "./components/layout/Navbar";
import Sidebar from "./components/layout/Sidebar";
import ProtectedRoute from "./components/layout/ProtectedRoute";

// Public Pages
import LandingPage from "./pages/public/LandingPage";

// Auth Pages
import Login from "./pages/auth/Login";
import Register from "./pages/auth/Register";

// Dashboards
import AdminDashboard from "./pages/dashboard/AdminDashboard";
import DoctorDashboard from "./pages/dashboard/DoctorDashboard";
import PatientDashboard from "./pages/patient/PatientDashboard";
import NurseDashboard from "./pages/dashboard/NurseDashboard";

// Module Pages
import DoctorList from "./pages/modules/DoctorList";
import AppointmentBooking from "./pages/patient/BookAppointment";
import BillingPage from "./pages/modules/BillingPage";
import WardView from "./pages/modules/WardView";

// Patient Specific Pages
import PatientHistory from "./pages/patient/PatientHistory";
import BillingPortal from "./pages/patient/BillingPortal";
import Subscriptions from "./pages/common/Subscriptions";

// Profile Pages
import Profile from "./pages/profile/Profile";
import EditProfile from "./pages/profile/EditProfile";

const Layout = ({ children }) => {
  return (
    <div className="min-vh-100 d-flex flex-column bg-app">
      <Navbar />
      <main className="flex-grow-1" style={{ marginTop: "var(--navbar-height)" }}>
        {children}
      </main>
    </div>
  );
};

const App = () => {
  return (
    <GlobalProvider>
      <AuthProvider>
        <Router>
          <Routes>
            {/* Public Routes */}
            <Route path="/" element={<Layout><LandingPage /></Layout>} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />

            {/* Protected Routes */}
            <Route element={<ProtectedRoute allowedRoles={["ADMIN"]} />}>
              <Route path="/admin" element={<Layout><AdminDashboard /></Layout>} />
              <Route path="/doctors" element={<Layout><DoctorList /></Layout>} />
              <Route path="/billing" element={<Layout><BillingPage /></Layout>} />
            </Route>

            <Route element={<ProtectedRoute allowedRoles={["DOCTOR"]} />}>
              <Route path="/doctor" element={<Layout><DoctorDashboard /></Layout>} />
            </Route>

            <Route element={<ProtectedRoute allowedRoles={["PATIENT"]} />}>
              <Route path="/patient" element={<Navigate to="/patient/dashboard" replace />} />
              <Route path="/patient/dashboard" element={<Layout><PatientDashboard /></Layout>} />
              <Route path="/patient/book" element={<Layout><AppointmentBooking /></Layout>} />
              <Route path="/patient/appointments" element={<Layout><PatientHistory /></Layout>} />
              <Route path="/patient/billing" element={<Layout><BillingPortal /></Layout>} />
              <Route path="/patient/plans" element={<Layout><Subscriptions /></Layout>} />
              <Route path="/patient/profile" element={<Layout><Profile /></Layout>} />
              <Route path="/patient/profile/edit" element={<Layout><EditProfile /></Layout>} />
            </Route>

            <Route element={<ProtectedRoute allowedRoles={["NURSE", "ADMIN"]} />}>
              <Route path="/nurse" element={<Layout><NurseDashboard /></Layout>} />
              <Route path="/wards" element={<Layout><WardView /></Layout>} />
            </Route>

            {/* Profile Routes (Common for all authenticated users) */}
            <Route element={<ProtectedRoute allowedRoles={["ADMIN", "DOCTOR", "PATIENT", "NURSE"]} />}>
              <Route path="/profile" element={<Layout><Profile /></Layout>} />
              <Route path="/profile/edit" element={<Layout><EditProfile /></Layout>} />
            </Route>

            {/* Default Route */}
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </Router>
      </AuthProvider>
    </GlobalProvider>
  );
};

export default App;
