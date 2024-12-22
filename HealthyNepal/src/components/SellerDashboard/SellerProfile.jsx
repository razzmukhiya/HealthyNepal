import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { loadSeller, updateSellerInfo } from '../../redux/actions/sellers';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { server } from '../../utils/api';
import '../../styles/SellerProfile.css';

const SellerProfile = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { seller, error, isLoading, isAuthenticated } = useSelector((state) => state.sellers);
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        description: '',
        address: '',
        phoneNumber: '',
        zipCode: '',
    });
    const [avatar, setAvatar] = useState(null);
    const [avatarPreview, setAvatarPreview] = useState('');
    const [updateLoading, setUpdateLoading] = useState(false);

    useEffect(() => {
        const loadSellerData = async () => {
            try {
                const token = localStorage.getItem('sellerAccessToken');
                if (!token) {
                    console.error('No token found in localStorage');
                    navigate('/sellerlogin');
                    return;
                }

                // Verify token format
                if (!token.match(/^[A-Za-z0-9-_=]+\.[A-Za-z0-9-_=]+\.?[A-Za-z0-9-_.+/=]*$/)) {
                    console.error('Invalid token format');
                    localStorage.removeItem('sellerAccessToken');
                    navigate('/sellerlogin');
                    return;
                }

                console.log('Attempting to load seller data...');
                const result = await dispatch(loadSeller());
                console.log('Load seller result:', result);
                
                if (result.error) {
                    throw new Error(result.error);
                }
            } catch (error) {
                console.error('Error loading seller data:', error);
                localStorage.removeItem('sellerAccessToken');
                navigate('/sellerlogin');
            }
        };

        if (!isAuthenticated) {
            loadSellerData();
        }
    }, [dispatch, navigate, isAuthenticated]);

    useEffect(() => {
        if (seller) {
            console.log("Updating form data with seller info:", seller);
            setFormData({
                name: seller.name || '',
                email: seller.email || '',
                description: seller.description || '',
                address: seller.address || '',
                phoneNumber: seller.phoneNumber || '',
                zipCode: seller.zipCode || '',
            });
            if (seller.avatar?.url) {
                setAvatarPreview(seller.avatar.url);
            }
        } else {
            console.log("No seller data available");
        }
    }, [seller]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleAvatarChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setAvatar(file);
            const reader = new FileReader();
            reader.onload = () => {
                setAvatarPreview(reader.result);
            };
            reader.readAsDataURL(file);
        }
    };

    const handleAvatarUpload = async () => {
        try {
            if (!avatar) return;
            
            setUpdateLoading(true);
            const formData = new FormData();
            formData.append('avatar', avatar);

            const config = {
                headers: {
                    'Content-Type': 'multipart/form-data',
                    Authorization: `Bearer ${localStorage.getItem('sellerAccessToken')}`,
                },
            };

            const { data } = await axios.put(
                `${server}/shop/update-avatar`,
                formData,
                config
            );

            if (data.success) {
                // Update avatar preview with the new URL
                setAvatarPreview(data.avatar.url);
                dispatch(loadSeller()); // Reload seller data to get updated avatar
            }
        } catch (error) {
            console.error('Error uploading avatar:', error);
        } finally {
            setUpdateLoading(false);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log("Submitting form data:", formData);
        try {
            const token = localStorage.getItem('sellerAccessToken');
            if (!token) {
                throw new Error('No authentication token found');
            }

            setUpdateLoading(true);
            const result = await dispatch(updateSellerInfo(formData));
            console.log("Profile update result:", result);
            
            if (result.error) {
                throw new Error(result.error);
            }

            // Upload avatar if selected
            if (avatar) {
                await handleAvatarUpload();
            }

            // Reload seller data after successful update
            await dispatch(loadSeller());
        } catch (err) {
            console.error("Error updating profile:", err);
            if (err.response?.status === 401 || err.message === 'No authentication token found') {
                navigate('/sellerlogin');
            }
        } finally {
            setUpdateLoading(false);
        }
    };

    if (isLoading || updateLoading) {
        return (
            <div className="seller-profile-container">
                <h2>Loading...</h2>
            </div>
        );
    }

    if (!seller) {
        return (
            <div className="seller-profile-container">
                <h2>No seller data available</h2>
                {error && <div className="error-message">{error}</div>}
            </div>
        );
    }

    return (
        <div className="seller-profile-container">
            <h1>Seller Profile</h1>
            {error && <div className="error-message">{error}</div>}
            
            <div className="avatar-section">
                <div className="avatar-preview">
                    <img 
                        src={avatarPreview || seller.avatar?.url || `https://api.dicebear.com/7.x/avataaars/svg?seed=${seller?.name || 'default'}`} 
                        alt="Avatar Preview" 
                        className="avatar-image"
                        onError={(e) => {
                            e.target.onerror = null;
                            e.target.src = `https://api.dicebear.com/7.x/avataaars/svg?seed=${seller?.name || 'default'}`;
                        }}
                    />
                </div>
                <div className="avatar-upload">
                    <input
                        type="file"
                        accept="image/*"
                        onChange={handleAvatarChange}
                        id="avatar-input"
                        className="avatar-input"
                    />
                    <label htmlFor="avatar-input" className="avatar-label">
                        Choose Avatar
                    </label>
                </div>
            </div>

            <form onSubmit={handleSubmit} className="profile-form">
                <div className="form-group">
                    <label htmlFor="name">Name:</label>
                    <input
                        id="name"
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="email">Email:</label>
                    <input
                        id="email"
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="description">Description:</label>
                    <textarea
                        id="description"
                        name="description"
                        value={formData.description}
                        onChange={handleChange}
                        rows="4"
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="address">Address:</label>
                    <input
                        id="address"
                        type="text"
                        name="address"
                        value={formData.address}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="phoneNumber">Phone Number:</label>
                    <input
                        id="phoneNumber"
                        type="tel"
                        name="phoneNumber"
                        value={formData.phoneNumber}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="zipCode">ZIP Code:</label>
                    <input
                        id="zipCode"
                        type="text"
                        name="zipCode"
                        value={formData.zipCode}
                        onChange={handleChange}
                        required
                    />
                </div>
                <button type="submit" className="update-button" disabled={updateLoading}>
                    {updateLoading ? 'Updating...' : 'Update Profile'}
                </button>
            </form>
        </div>
    );
};

export default SellerProfile;
