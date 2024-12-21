import { loadUserRequest, loadUserSuccess, loadUserFail } from '../reducers/authSlice';
import api from '../../utils/api';

// load user
export const loadUser = () => async (dispatch) => {
  try {
    const token = localStorage.getItem('userAccessToken');
    if (!token) {
      // If no token, user is not logged in - this is a normal state
      return;
    }

    dispatch(loadUserRequest());

    const response = await api.get('/user/getuser');
    
    if (response.error) {
      throw new Error(response.message);
    }

    const { success, user } = response.data;
    
    if (!success) {
      throw new Error("Failed to load user data");
    }
    
    dispatch(loadUserSuccess(user));
  } catch (error) {
    // Only dispatch error for actual API failures
    if (error.response && error.response.status !== 401) {
      const errorMessage = error.response?.data?.message || "Network Error";
      dispatch(loadUserFail(errorMessage));
    } else {
      // For 401 unauthorized or no token, silently reset the state
      dispatch(loadUserSuccess(null));
    }
  }
};

// update user profile
export const updateProfile = (userData) => async (dispatch) => {
  try {
    dispatch(loadUserRequest());

    const token = localStorage.getItem('userAccessToken');
    if (!token) {
      dispatch(loadUserFail("No authentication token found. Please login."));
      return;
    }

    const response = await api.put('/user/update-profile', userData);

    if (response.error) {
      throw new Error(response.message);
    }

    const { success, user } = response.data;

    if (!success) {
      throw new Error("Failed to update profile");
    }

    dispatch(loadUserSuccess(user));
  } catch (error) {
    const errorMessage = error.response?.data?.message || "Network Error";
    dispatch(loadUserFail(errorMessage));
  }
};
