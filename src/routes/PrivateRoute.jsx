import React, { useContext } from 'react';
import { Navigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthProvider';

const PrivateRoute = ({ element: Component, roles, ...rest }) => {
    const { user } = useContext(AuthContext);
    
    // TODO: cuando se recarga la pagoina no espèra el user y se va al inicio
    if (!user) {
        return <Navigate to="/inicio" />;
    }

    if (roles && !roles.includes(user.role)) {
        return <Navigate to="/inicio" />;
    }

    return <Component {...rest} />;
};

export default PrivateRoute;

