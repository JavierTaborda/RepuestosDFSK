import React from 'react';
import { useLocation } from 'react-router-dom';
import Header from '../components/Header'; 
import Footer from '../components/Footer'; 

const Layout = ({ children }) => {
    const location = useLocation();
    const showHeader = location.pathname !== '/dfsktrack';

    return (
        <>
            {showHeader && <Header />}
            <main>{children}</main>
            {showHeader && <Footer />}
        </>
    );
};

export default Layout;
