import React, { useEffect } from 'react'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import LoginComponent from "../components/Login/Login";

const LoginPage = () => {
    const navigate = useNavigate()
    const { isAuthenticated } = useSelector((state) => state.auth);

    useEffect(() => {
        if(isAuthenticated === true){
            navigate("/");
        }
    }, [isAuthenticated, navigate])

    return (
        <div>
            <LoginComponent />
        </div>
    )
}

export default LoginPage;
