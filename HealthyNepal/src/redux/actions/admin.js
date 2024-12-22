import axios from 'axios';
import { server } from '../../../server';
import { loginAdmin, clearError, loadUserRequest, loadUserSuccess, loadUserFail } from '../reducers/authSlice';
import { toast } from 'react-toastify';

// Admin login action
export const adminLogin = (formData) => async (dispatch) => {
  try {
    dispatch(loadUserRequest());
    
    const { data } = await axios.post(
      `${server}/admin/login`,
      formData,
      { withCredentials: true }
    );

    localStorage.setItem('adminToken', data.token);
    dispatch(loginAdmin(data.user));
    dispatch(loadUserSuccess(data.user));
    toast.success('Login successful!');

  } catch (error) {
    dispatch(loadUserFail(error.response?.data?.message || 'Login failed'));
    toast.error(error.response?.data?.message || 'Login failed');
  }
};

// Load admin data
export const loadAdmin = () => async (dispatch) => {
  try {
    dispatch(loadUserRequest());

    const { data } = await axios.get(`${server}/admin/me`, {
      withCredentials: true,
      headers: {
        'Authorization': `Bearer ${localStorage.getItem('adminToken')}`
      }
    });

    dispatch(loadUserSuccess(data.user));

  } catch (error) {
    dispatch(loadUserFail(error.response?.data?.message || 'Failed to load admin data'));
  }
};

// Admin register action
export const adminRegister = (formData) => async (dispatch) => {
  try {
    dispatch(loadUserRequest());
    
    const { data } = await axios.post(
      `${server}/admin/register`,
      formData,
      { 
        withCredentials: true,
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      }
    );

    localStorage.setItem('adminToken', data.token);
    dispatch(loginAdmin(data.user));
    dispatch(loadUserSuccess(data.user));
    toast.success('Registration successful!');

  } catch (error) {
    dispatch(loadUserFail(error.response?.data?.message || 'Registration failed'));
    toast.error(error.response?.data?.message || 'Registration failed');
  }
};

// Admin logout action
export const adminLogout = () => async (dispatch) => {
  try {
    await axios.get(`${server}/admin/logout`, {
      withCredentials: true
    });
    
    localStorage.removeItem('adminToken');
    dispatch(clearError());
    toast.success('Logout successful!');

  } catch (error) {
    toast.error(error.response?.data?.message || 'Logout failed');
  }
};
