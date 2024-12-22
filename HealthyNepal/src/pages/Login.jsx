import React, { useEffect } from 'react'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import LoginComponent from "../components/Login/Login";
import Navbar from '../components/Navbar';

const LoginPage = () => {
    const navigate = useNavigate()
    const { isAuthenticated, user } = useSelector((state) => state.auth);

    useEffect(() => {
        if(isAuthenticated === true){
            if (user?.role === 'seller') {
                navigate("/seller/dashboard");
            } else {
                navigate("/");
            }
        }
    }, [isAuthenticated, navigate, user])

    return (
        <div>
            <Navbar />  
            <LoginComponent />
        </div>
    )
}

export default LoginPage;
