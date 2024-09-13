import React, { createContext, useState, useEffect } from 'react';
import HttpClient from '../services/HttpClient';
import Cookies from 'js-cookie';
import { jwtDecode } from 'jwt-decode';
import { useNavigate } from 'react-router-dom';


const AuthContext = createContext();

const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        const token = Cookies.get('token_access');
        if (token) {
            const decodedToken = jwtDecode(token);
            setUser(decodedToken);
        }

    }, []);
    const login = async (credentials) => {
        return new Promise((resolve, reject) => {
            HttpClient.post('/auth/login', credentials).then((response) => {
                Cookies.set('token_access', response.data, { expires: 1, secure: true, sameSite: 'Strict' });
                const decodedToken = jwtDecode(response.data);
                setUser(decodedToken);
                navigate('/inicio'); // Redirige a la página de inicial después del login
                resolve("Bienvenido, " + decodedToken.name);
            }).catch((error) => {
                reject(error);
            });
        });
    };

    const logout = () => {
        Cookies.remove('token_access');
        setUser(null);
        navigate('/login');

    };

    return (
        <AuthContext.Provider value={{ user, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};

export { AuthContext, AuthProvider };
