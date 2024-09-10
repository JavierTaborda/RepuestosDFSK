import React, { useState } from 'react';
import HttpClient from '../services/HttpClient';

const Login = () => {
    const [user, setUser] = useState('');
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError(null);

        try {
            loginUser().then((response) => {
                console.log(response);
            })
        } catch (error) {
            console.error(error);
            setError('Login failed. Please check your credentials and try again.');
        } finally {
            setLoading(false);
        }
    };

     const loginUser = () => {
        return new Promise((resolve, reject) => {
            HttpClient.post('/auth/login', { user, password }).then((response) => {
                resolve(response);
                console.log(response,"Hola");
            })
        })
    };

    return (
        <div className='lgcontainer'>
            <div className="login-container">
                <img src="/DFSK.png" alt="Logo" className="p-4" />
                <h2>Iniciar Sesión</h2>
                <form onSubmit={handleSubmit}>
                    <div>
                        <label htmlFor="username">Usuario:</label>
                        <input
                            type="text"
                            id="username"
                            value={user}
                            onChange={(e) => setUser(e.target.value)}
                            required
                        />
                    </div>
                    <div className="password-container">
                        <label htmlFor="password">Contraseña:</label>
                        <input
                            type={showPassword ? 'text' : 'password'}
                            id="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                        />
                        <span
                            className="toggle-password"
                            onClick={togglePasswordVisibility}
                        >
                            {showPassword ? <i className="bi bi-eye-slash"></i> : <i className="bi bi-eye"></i>}
                        </span>
                    </div>
                    {error && <p className="error">{error}</p>}
                    <button type="submit" className="btn btn-success" disabled={loading}>
                        {loading ? 'Validando...' : <><i className="bi bi-box-arrow-in-right"></i> Iniciar Sesión</>}
                    </button>
                </form>
            </div>
        </div>
    );
};

export default Login;
