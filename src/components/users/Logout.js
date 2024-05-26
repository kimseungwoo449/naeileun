import React, { useEffect } from 'react';
import { useLogin } from '../LoginContext';
import { useNavigate } from 'react-router-dom';
const Logout = () => {
    const {setIsLoggedIn, setUser} = useLogin();
    const navigate = useNavigate();
    useEffect(() => {
        setIsLoggedIn(false);
        setUser(null);
        sessionStorage.removeItem('user');
        navigate('/');
    }, [setIsLoggedIn, setUser, navigate])
    return (
        <div>
            
        </div>
    );
};

export default Logout;
