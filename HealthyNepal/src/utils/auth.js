// Token management
export const getToken = () => localStorage.getItem('accessToken');
export const setToken = (token) => localStorage.setItem('accessToken', token);
export const removeToken = () => localStorage.removeItem('accessToken');

// Authentication status
export const isAuthenticated = () => {
    const token = getToken();
    return !!token;
};
