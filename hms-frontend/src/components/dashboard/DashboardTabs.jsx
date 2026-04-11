import React from "react";
import { FaHome, FaPlus, FaClipboardList, FaFileInvoiceDollar, FaShieldAlt } from "react-icons/fa";

const DashboardTabs = ({ activeTab, setActiveTab }) => {
    const tabs = [
        { id: "Overview", icon: <FaHome size={18} className="mb-1 me-1" /> },
        { id: "Book Visit", icon: <FaPlus size={16} className="mb-1 me-1" /> },
        { id: "History", icon: <FaClipboardList size={18} className="mb-1 me-1" /> },
        { id: "Billings", icon: <FaFileInvoiceDollar size={18} className="mb-1 me-1" /> },
        { id: "Plans", icon: <FaShieldAlt size={18} className="mb-1 me-1" /> }
    ];

    return (
        <div className="d-flex justify-content-center mb-4 mt-1">
            <div className="dashboard-tabs p-2 shadow-sm bg-white">
                {tabs.map(tab => (
                    <button 
                        key={tab.id}
                        className={`tab-pill ${activeTab === tab.id ? 'active' : ''}`}
                        onClick={() => setActiveTab(tab.id)}
                    >
                        {tab.icon} {tab.id}
                    </button>
                ))}
            </div>
        </div>
    );
};

export default DashboardTabs;
