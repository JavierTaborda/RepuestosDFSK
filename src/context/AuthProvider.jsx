import React, { createContext, useState, useEffect } from 'react';
import { loginService } from '../services/UserService';
import Cookies from 'js-cookie';
import { jwtDecode } from 'jwt-decode';
import { useNavigate } from 'react-router-dom';

const AuthContext = createContext();

const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [userAdmin, setUserAdmin] = useState(null);
    const [loadingAuth, setLoadingAuth] = useState(true); // Estado de carga
    const navigate = useNavigate();

    useEffect(() => {
        const token = Cookies.get('token_access');
        if (token) {
            try {
                const decodedToken = jwtDecode(token);
                setUser(decodedToken);
                setUserAdmin(decodedToken.role === 'admin');
            } catch (error) {
                console.error("Error al decodificar el token:", error);
                logout();
            } finally {
                setLoadingAuth(false); // La carga ha terminado
            }
        } else {
            setLoadingAuth(false); // No hay token, la carga ha terminado
        }
    }, []);

    const login = async (credentials) => {
        try {
            const response = await loginService(credentials);

            Cookies.set('token_access', response.data.token, { expires: 1, secure: true, sameSite: 'None' });
            Cookies.set('refresh_token', response.data.refreshToken, { expires: 7, secure: true, sameSite: 'None' });

            const decodedToken = jwtDecode(response.data.token);
            setUser(decodedToken);
            setUserAdmin(decodedToken.role === 'admin');
            navigate('/repuestos'); // Redirige a la página de inicio después del login
            return "Bienvenido, " + decodedToken.name;
        } catch (error) {
            throw error;
        }
    };

    const logout = () => {
        Cookies.remove('token_access');
        Cookies.remove('refresh_token');
        setUser(null);
        setUserAdmin(null);
        navigate('/login');
    };

    const redirect = () => {
        navigate('/login');
    };

    return (
        <AuthContext.Provider value={{ user, userAdmin, loadingAuth, login, logout, redirect }}>
            {children}
        </AuthContext.Provider>
    );
};

export { AuthContext, AuthProvider };