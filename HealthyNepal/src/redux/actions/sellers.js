import axios from "axios";
import { server } from "../../utils/api";

// Login seller
export const login = (email, password) => async (dispatch) => {
    try {
        dispatch({ type: 'LoadSellerRequest' });
        
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
        
        if (!data.success || !data.accessToken || !data.refreshToken || !data.user) {
            throw new Error('Invalid response from server');
        }
        
        // Store tokens in localStorage
        localStorage.setItem("sellerAccessToken", data.accessToken);
        localStorage.setItem("sellerRefreshToken", data.refreshToken);
        
        dispatch({
            type: 'SellerLoginSuccess',
            payload: { user: data.user }
        });

        return data;
    } catch (error) {
        dispatch({
            type: 'LoadSellerFail',
            payload: error.response?.data?.message || 'Login failed'
        });
        throw error;
    }
};

// Load seller data
export const loadSeller = () => async (dispatch) => {
    try {
        dispatch({ type: 'LoadSellerRequest' });

        const token = localStorage.getItem("sellerAccessToken");
        if (!token) {
            const error = new Error('No authentication token found');
            dispatch({
                type: 'LoadSellerFail',
                payload: error.message
            });
            throw error;
        }

        const { data } = await axios.get(`${server}/shop/getSeller`, {
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            },
            withCredentials: true,
        });

        if (!data.success || !data.seller) {
            const error = new Error('Invalid seller data received');
            dispatch({
                type: 'LoadSellerFail',
                payload: error.message
            });
            throw error;
        }

        dispatch({
            type: 'LoadSellerSuccess',
            payload: data.seller
        });

        return data;
    } catch (error) {
        if (error.response?.status === 401) {
            localStorage.removeItem("sellerAccessToken");
            localStorage.removeItem("sellerRefreshToken");
        }
        
        const errorMessage = error.response?.data?.message || error.message || 'Failed to load seller data';
        dispatch({
            type: 'LoadSellerFail',
            payload: errorMessage
        });
        
        throw error;
    }
};

// Update seller information
export const updateSellerInfo = (formData) => async (dispatch) => {
    try {
        dispatch({ type: 'UpdateSellerInfoRequest' });

        const token = localStorage.getItem("sellerAccessToken");
        if (!token) {
            const error = new Error('No authentication token found');
            dispatch({
                type: 'UpdateSellerInfoFail',
                payload: error.message
            });
            throw error;
        }

        const { data } = await axios.put(
            `${server}/shop/update-seller-info`,
            formData,
            {
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json',
                    'Accept': 'application/json'
                },
                withCredentials: true,
            }
        );

        if (!data.success || !data.seller) {
            const error = new Error('Invalid response from server');
            dispatch({
                type: 'UpdateSellerInfoFail',
                payload: error.message
            });
            throw error;
        }

        dispatch({
            type: 'UpdateSellerInfoSuccess',
            payload: data.seller
        });

        return data;
    } catch (error) {
        if (error.response?.status === 401) {
            localStorage.removeItem("sellerAccessToken");
            localStorage.removeItem("sellerRefreshToken");
        }

        const errorMessage = error.response?.data?.message || error.message || 'Failed to update seller information';
        dispatch({
            type: 'UpdateSellerInfoFail',
            payload: errorMessage
        });
        throw error;
    }
};

// Logout seller
export const logout = () => async (dispatch) => {
    try {
        dispatch({ type: 'LoadSellerRequest' });
        
        // Remove tokens from localStorage
        localStorage.removeItem("sellerAccessToken");
        localStorage.removeItem("sellerRefreshToken");
        
        // Clear seller state
        dispatch({ type: 'SellerLogout' });
        
        // Redirect to login page
        window.location.href = '/sellerlogin';
    } catch (error) {
        dispatch({
            type: 'LoadSellerFail',
            payload: error.response?.data?.message || error.message || 'Logout failed'
        });
        throw error;
    }
};
