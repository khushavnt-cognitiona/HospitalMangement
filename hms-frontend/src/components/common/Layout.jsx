import React from 'react';
import Header from './Header';
import Sidebar from './Sidebar';
import { useAuth } from '../../context/AuthContext';

const Layout = ({ children }) => {
    const { auth } = useAuth();
    
    // Check if we should show sidebar (only for logged in users)
    const showDashboardLayout = !!auth.role;
    
    // Roles that don't need a sidebar (Doctor and Patient use the same clinical top-nav experience)
    const hideSidebarFor = ['PATIENT', 'DOCTOR'];
    const currentRole = auth.role?.toUpperCase();
    const shouldHideSidebar = !currentRole || hideSidebarFor.includes(currentRole);

    if (!showDashboardLayout || window.location.pathname === '/') {
        return (
            <div className="min-vh-100 bg-light w-100 overflow-x-hidden">
                <Header />
                <main className="w-100 h-100 overflow-x-hidden">
                    {children}
                </main>
            </div>
        );
    }

    return (
        <div className="d-flex min-vh-100 bg-light overflow-x-hidden">
            {!shouldHideSidebar && <Sidebar />}
            <div className="flex-grow-1" style={{ marginLeft: !shouldHideSidebar ? '240px' : '0', transition: 'margin 0.3s ease' }}>
                <Header />
                <main className="p-0" style={{ backgroundColor: '#f8f9fa', paddingTop: '80px' }}>
                    <div className="container-fluid p-0">
                        {children}
                    </div>
                </main>
            </div>
        </div>
    );
};

export default Layout;
