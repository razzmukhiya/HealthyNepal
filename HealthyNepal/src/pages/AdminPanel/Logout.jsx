import React from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { logoutAdmin } from '../../redux/reducers/authSlice';
import '../../styles/admindashboard.css';

const Logout = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = () => {
    dispatch(logoutAdmin());
    navigate('/admin/login');
  };

  return (
    <div className="admin-page">
      <h1>Logout</h1>
      <div className="page-content">
        <p>You are about to log out. Are you sure?</p>
        <button 
          className="logout-btn"
          onClick={handleLogout}
        >
          Log Out
        </button>
      </div>
    </div>
  );
};

export default Logout;
