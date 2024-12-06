import React from 'react';
import Sidebar from '../../components/UserDashboard/Sidebar';
import NavTop from '../../components/UserDashboard/NavTop';

const Dashboard = () => {
  return (
    <div className="dashboard-container">
      <Sidebar />
      <div className="dashboard-content">
        <NavTop />
        <div className="dashboard-main">
          <h2>Welcome to Your Dashboard</h2>
        </div>
      </div>
    </div>
  )
}

export default Dashboard;
