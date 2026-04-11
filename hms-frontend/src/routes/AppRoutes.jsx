import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import Layout from '../components/common/Layout';

// Public Pages
import Home from '../components/Home';
import Login from '../components/Login';
import Signup from '../components/Signup';
import RoleSelect from '../components/RoleSelect';

// Admin Pages
import AdminDashboard from '../pages/admin/AdminDashboard';
import AdminLogin from '../pages/admin/AdminLogin';

// Patient Pages
import PatientDashboard from '../pages/patient/PatientDashboard';
import BookAppointment from '../pages/patient/BookAppointment';
import PatientDoctorList from '../pages/patient/PatientDoctorList';
import PatientProfile from '../pages/patient/PatientProfile';
import AppointmentStatus from '../pages/patient/AppointmentStatus';
import PatientHistory from '../pages/patient/PatientHistory';
import BillingPortal from '../pages/patient/BillingPortal';

// Common
import UserProfile from '../pages/common/UserProfile';
import Subscriptions from '../pages/common/Subscriptions';

// Doctor Pages
import DoctorDashboard from '../pages/doctor/DoctorDashboard';
import DoctorProfile from '../pages/doctor/DoctorProfile';
import DoctorLogin from '../pages/doctor/DoctorLogin';
import ViewPatientAppointments from '../pages/doctor/ViewPatientAppointments';
import EHRRecords from '../pages/doctor/EHRRecords';
import PrescriptionNotes from '../pages/doctor/PrescriptionNotes';
import PatientDetailsPage from '../pages/doctor/PatientDetailsPage';


// Nurse Pages
import NurseLogin from '../pages/nurse/NurseLogin';
import NurseDashboard from '../pages/nurse/NurseDashboard';
import WardManagement from '../pages/nurse/WardManagement';
import PatientAssignment from '../pages/nurse/PatientAssignment';

const ProtectedRoute = ({ children, requiredRole }) => {
    const { auth, isAuthenticated } = useAuth();
    
    if (!isAuthenticated) {
        return <Navigate to="/login" replace />;
    }
    
    const userRole = auth.role?.toUpperCase();
    if (requiredRole && userRole !== requiredRole.toUpperCase()) {
        const dashboardMap = {
            ADMIN: '/admin/dashboard',
            DOCTOR: '/doctor/dashboard',
            PATIENT: '/patient/dashboard',
            NURSE: '/nurse/dashboard'
        };
        return <Navigate to={dashboardMap[userRole] || '/role-select'} replace />;
    }
    
    return <Layout>{children}</Layout>;
};

const AppRoutes = () => {
    return (
        <Routes>
            {/* Public */}
            <Route path="/" element={<Layout><Home /></Layout>} />
            <Route path="/login" element={<Layout><Login /></Layout>} />
            <Route path="/signup" element={<Layout><Signup /></Layout>} />
            <Route path="/role-select" element={<Layout><RoleSelect /></Layout>} />

            {/* Clinical & Role-Specific Portals */}
            <Route path="/patient/login" element={<Navigate to="/login" replace />} />
            <Route path="/doctor/login" element={<Layout><DoctorLogin /></Layout>} />
            <Route path="/nurse/login" element={<Layout><NurseLogin /></Layout>} />
            <Route path="/admin/login" element={<Layout><AdminLogin /></Layout>} />

            {/* Admin Routes */}
            <Route path="/admin/dashboard" element={
                <ProtectedRoute requiredRole="ADMIN">
                    <AdminDashboard />
                </ProtectedRoute>
            } />
            <Route path="/admin/profile" element={
                <ProtectedRoute requiredRole="ADMIN">
                    <UserProfile />
                </ProtectedRoute>
            } />

            {/* Patient Routes */}
            <Route path="/patient/dashboard" element={
                <ProtectedRoute requiredRole="PATIENT">
                    <PatientDashboard />
                </ProtectedRoute>
            } />
            <Route path="/patient/specialists" element={
                <ProtectedRoute requiredRole="PATIENT">
                    <PatientDoctorList />
                </ProtectedRoute>
            } />
            <Route path="/patient/book" element={
                <ProtectedRoute requiredRole="PATIENT">
                    <BookAppointment />
                </ProtectedRoute>
            } />
            <Route path="/patient/status" element={
                <ProtectedRoute requiredRole="PATIENT">
                    <AppointmentStatus />
                </ProtectedRoute>
            } />
            <Route path="/patient/history" element={
                <ProtectedRoute requiredRole="PATIENT">
                    <PatientHistory />
                </ProtectedRoute>
            } />
            <Route path="/patient/billings" element={
                <ProtectedRoute requiredRole="PATIENT">
                    <BillingPortal />
                </ProtectedRoute>
            } />
            <Route path="/patient/subscriptions" element={
                <ProtectedRoute requiredRole="PATIENT">
                    <Subscriptions />
                </ProtectedRoute>
            } />
            <Route path="/patient/profile" element={
                <ProtectedRoute requiredRole="PATIENT">
                    <PatientProfile />
                </ProtectedRoute>
            } />

            {/* Doctor Routes */}
            <Route path="/doctor/dashboard" element={
                <ProtectedRoute requiredRole="DOCTOR">
                    <DoctorDashboard />
                </ProtectedRoute>
            } />
            <Route path="/doctor/appointments" element={
                <ProtectedRoute requiredRole="DOCTOR">
                    <ViewPatientAppointments />
                </ProtectedRoute>
            } />
            <Route path="/doctor/records" element={
                <ProtectedRoute requiredRole="DOCTOR">
                    <EHRRecords />
                </ProtectedRoute>
            } />
            <Route path="/doctor/history" element={
                <ProtectedRoute requiredRole="DOCTOR">
                    <DoctorDashboard />
                </ProtectedRoute>
            } />
            <Route path="/doctor/profile" element={
                <ProtectedRoute requiredRole="DOCTOR">
                    <DoctorProfile />
                </ProtectedRoute>
            } />
            <Route path="/doctor/subscriptions" element={
                <ProtectedRoute requiredRole="DOCTOR">
                    <Subscriptions />
                </ProtectedRoute>
            } />
            <Route path="/doctor/prescription" element={
                <ProtectedRoute requiredRole="DOCTOR">
                    <PrescriptionNotes />
                </ProtectedRoute>
            } />
            <Route path="/doctor/patient-details" element={
                <ProtectedRoute requiredRole="DOCTOR">
                    <PatientDetailsPage />
                </ProtectedRoute>
            } />

            {/* Nurse Routes */}
            <Route path="/nurse/dashboard" element={
                <ProtectedRoute requiredRole="NURSE">
                    <NurseDashboard />
                </ProtectedRoute>
            } />
            <Route path="/nurse/wards" element={
                <ProtectedRoute requiredRole="NURSE">
                    <WardManagement />
                </ProtectedRoute>
            } />
            <Route path="/nurse/assignments" element={
                <ProtectedRoute requiredRole="NURSE">
                    <PatientAssignment />
                </ProtectedRoute>
            } />
            <Route path="/nurse/profile" element={
                <ProtectedRoute requiredRole="NURSE">
                    <UserProfile />
                </ProtectedRoute>
            } />

            {/* Final Fallback */}
            <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
    );
};

export default AppRoutes;
