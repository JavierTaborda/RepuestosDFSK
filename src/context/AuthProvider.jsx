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

    }, [user]);
    const login = async (credentials) => {
        return new Promise((resolve, reject) => {
            HttpClient.post('/auth/login', credentials).then((response) => {
               // console.log(response);
                Cookies.set('token_access', response.data.token, { expires: 1, secure: true, sameSite: 'Strict' });
                Cookies.set('refresh_token', response.data.refreshToken, { expires: 7, secure: true, sameSite: 'Strict' });

                const decodedToken = jwtDecode(response.data.token);
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
        Cookies.remove('refresh_token');
        setUser(null);
        navigate('/login');

    };
     const redirect = () => {
        navigate('/login')
    }

    return (
        <AuthContext.Provider value={{ user, login, logout,redirect }}>
            {children}
        </AuthContext.Provider>
    );
};

export { AuthContext, AuthProvider };
