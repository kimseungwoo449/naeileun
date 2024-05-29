import React, { useEffect } from 'react';
import { useLogin } from '../LoginContext';
import { useNavigate } from 'react-router-dom';
const Logout = () => {
    const {logout} = useLogin();
    const navigate = useNavigate();
    useEffect(() => {
     
        logout();
       
        navigate('/');
    }, [navigate])
    return (
        <div>
            
        </div>
    );
};

export default Logout;
