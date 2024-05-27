import React, { createContext, useEffect } from 'react';
import { Outlet } from 'react-router-dom';
import Footer from './module/Footer';
import Header from './module/Header';
import { LoginProvider, useLogin } from './LoginContext';

const Root = () => {
    
    return (
        <>
            <Header />
            <Outlet />
            <Footer />
        </>
    );
};

export default Root;