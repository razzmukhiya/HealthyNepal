import axios from "axios";
import { server } from "../../utils/api";
import { refreshSellerToken } from "../../utils/refreshToken";
import {
    LoadSellerRequest,
    LoadSellerSuccess,
    LoadSellerFail,
    SellerLogout,
    UpdateSellerInfoRequest,
    UpdateSellerInfoSuccess,
    UpdateSellerInfoFail
} from '../reducers/sellersSlice';

// Login seller
export const login = (email, password) => async (dispatch) => {
    try {
        dispatch(LoadSellerRequest());
        
        const { data } = await axios.post(
            `${server}/shop/login-shop`,
            { email, password },
            { 
                withCredentials: true,
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json'
                }
            }
        );
        
        if (!data.success) {
            throw new Error(data.message || 'Login failed');
        }
        
        if (!data.accessToken || !data.refreshToken) {
            throw new Error('Missing authentication tokens');
        }
        
        // Store tokens in localStorage
        localStorage.setItem("sellerAccessToken", data.accessToken);
        localStorage.removeItem("userAccessToken"); // Ensure user is logged out
        localStorage.setItem("sellerRefreshToken", data.refreshToken);

        // Get the seller data from the response
        const sellerData = data.seller || data.user;
        if (!sellerData) {
            throw new Error('Missing seller data');
        }
        
        // Dispatch login success with the seller data
        dispatch(LoadSellerSuccess(sellerData));
        return { ...data, success: true };
    } catch (error) {
        console.error('Login error:', error);
        const errorMessage = error.response?.data?.message || error.message || 'Login failed';
        dispatch(LoadSellerFail(errorMessage));
        throw error;
    }
};

// Load seller data
export const loadSeller = () => async (dispatch) => {
    try {
        let token = localStorage.getItem("sellerAccessToken");
        const refreshToken = localStorage.getItem("sellerRefreshToken");
        
        // If no tokens at all, clear state and return
        if (!token && !refreshToken) {
            dispatch(SellerLogout());
            return;
        }

        dispatch(LoadSellerRequest());

        // If no access token but have refresh token, try to refresh first
        if (!token && refreshToken) {
            try {
                token = await refreshSellerToken();
            } catch (refreshError) {
                localStorage.removeItem("sellerAccessToken");
                localStorage.removeItem("sellerRefreshToken");
                dispatch(SellerLogout());
                return;
            }
        }

        try {
            const { data } = await axios.get(`${server}/shop/getSeller`, {
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json',
                    'Accept': 'application/json'
                },
                withCredentials: true
            });

            if (!data.success || !data.seller) {
                throw new Error(data.message || 'Failed to load seller data');
            }

            dispatch(LoadSellerSuccess(data.seller));
            return data;
        } catch (error) {
            // If token expired (401), try to refresh it
            if (error.response?.status === 401 && refreshToken) {
                try {
                    // Get new access token
                    token = await refreshSellerToken();
                    
                    // Retry the request with new token
                    const { data } = await axios.get(`${server}/shop/getSeller`, {
                        headers: {
                            'Authorization': `Bearer ${token}`,
                            'Content-Type': 'application/json',
                            'Accept': 'application/json'
                        },
                        withCredentials: true
                    });

                    if (!data.success || !data.seller) {
                        throw new Error(data.message || 'Failed to load seller data');
                    }

                    dispatch(LoadSellerSuccess(data.seller));
                    return data;
                } catch (refreshError) {
                    // If refresh fails, logout
                    localStorage.removeItem("sellerAccessToken");
                    localStorage.removeItem("sellerRefreshToken");
                    dispatch(SellerLogout());
                    throw refreshError;
                }
            }
            throw error;
        }
    } catch (error) {
        console.error('Load seller error:', error);
        localStorage.removeItem("sellerAccessToken");
        localStorage.removeItem("sellerRefreshToken");
        const errorMessage = error.response?.data?.message || error.message || 'Failed to load seller data';
        dispatch(LoadSellerFail(errorMessage));
        dispatch(SellerLogout());
    }
};

// Update seller info
export const updateSellerInfo = (formData) => async (dispatch) => {
    try {
        let token = localStorage.getItem("sellerAccessToken");
        if (!token) {
            throw new Error('No authentication token found');
        }

        dispatch(UpdateSellerInfoRequest());

        try {
            const { data } = await axios.put(
                `${server}/shop/update-seller`,
                formData,
                {
                    headers: {
                        'Authorization': `Bearer ${token}`,
                        'Content-Type': 'multipart/form-data'
                    },
                    withCredentials: true
                }
            );

            if (!data.success) {
                throw new Error(data.message || 'Failed to update seller information');
            }

            dispatch(UpdateSellerInfoSuccess(data.seller));
            return data;
        } catch (error) {
            // If token expired (401), try to refresh it
            if (error.response?.status === 401) {
                try {
                    // Get new access token
                    token = await refreshSellerToken();
                    
                    // Retry the request with new token
                    const { data } = await axios.put(
                        `${server}/shop/update-seller`,
                        formData,
                        {
                            headers: {
                                'Authorization': `Bearer ${token}`,
                                'Content-Type': 'multipart/form-data'
                            },
                            withCredentials: true
                        }
                    );

                    if (!data.success) {
                        throw new Error(data.message || 'Failed to update seller information');
                    }

                    dispatch(UpdateSellerInfoSuccess(data.seller));
                    return data;
                } catch (refreshError) {
                    // If refresh fails, logout
                    localStorage.removeItem("sellerAccessToken");
                    localStorage.removeItem("sellerRefreshToken");
                    dispatch(SellerLogout());
                    throw refreshError;
                }
            }
            throw error;
        }
    } catch (error) {
        console.error('Update seller error:', error);
        const errorMessage = error.response?.data?.message || error.message || 'Failed to update seller information';
        dispatch(UpdateSellerInfoFail(errorMessage));
        throw error;
    }
};

// Logout seller
export const logout = () => (dispatch) => {
    try {
        // Remove tokens from localStorage
        localStorage.removeItem("sellerAccessToken");
        localStorage.removeItem("sellerRefreshToken");
        
        // Clear seller state
        dispatch(SellerLogout());
    } catch (error) {
        console.error('Logout error:', error);
        const errorMessage = error.response?.data?.message || error.message || 'Logout failed';
        dispatch(LoadSellerFail(errorMessage));
    }
};
