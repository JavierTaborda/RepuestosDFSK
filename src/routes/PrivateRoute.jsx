import React, { useContext, useState, useEffect } from 'react';
import { Navigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthProvider';

const PrivateRoute = ({ element: Component, roles, ...rest }) => {
    const { user, loading } = useContext(AuthContext);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        if (!loading) {
            setIsLoading(false);
        }
    }, [loading]);

    if (isLoading) {
        return <div>Loading...</div>;
    }

    if (!user) {
        return <Navigate to="/inicio" />;
    }

    if (roles && !roles.includes(user.role)) {
        return <Navigate to="/inicio" />;
    }

    return <Component {...rest} />;
};

export default PrivateRoute;