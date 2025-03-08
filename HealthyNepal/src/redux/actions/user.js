import { loadUserRequest, loadUserSuccess, loadUserFail } from '../reducers/authSlice';
import { apiMethods } from '../../utils/api';

// load user
export const loadUser = () => async (dispatch) => {
  try {
    dispatch(loadUserRequest());
    
    const token = localStorage.getItem('userAccessToken');
    if (!token) {
      dispatch(loadUserFail("No authentication token found"));
      return;
    }

    const { data, error } = await apiMethods.get('/user/getuser');
    
    if (error) {
      throw new Error(error.message);
    }

    const { success, user } = data;
    
    if (!success) {
      throw new Error("Failed to load user data");
    }
    
    dispatch(loadUserSuccess(user));
  } catch (error) {
    
    if (error.response && error.response.status !== 401) {
      const errorMessage = error.response?.data?.message || "Network Error";
      dispatch(loadUserFail(errorMessage));
    } else {
      
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

    const { data, error } = await apiMethods.put('/user/update-profile', userData);

    if (error) {
      throw new Error(error.message);
    }

    const { success, user } = data;

    if (!success) {
      throw new Error("Failed to update profile");
    }

    dispatch(loadUserSuccess(user));
  } catch (error) {
    const errorMessage = error.response?.data?.message || "Network Error";
    dispatch(loadUserFail(errorMessage));
  }
};
