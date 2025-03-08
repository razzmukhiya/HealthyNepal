import React from 'react';
import Sidebar from './Adminidebar';
import DashboardOverview from './DashboardOverview';
import '../../styles/admindashboard.css';

const AdminPanel = () => {
  return (
    <div className="admin-panel">
      <Sidebar />
      <div className="admin-content">
        <DashboardOverview />
        {/* Other components or content can be added here */}
      </div>
    </div>
  );
};

export default AdminPanel;
