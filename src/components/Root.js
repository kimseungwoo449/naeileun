import React from 'react';
import { Outlet } from 'react-router-dom';
import Footer from './module/Footer';
import Header from './module/Header';

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