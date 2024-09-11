import React, { useState } from 'react';
import HttpClient from '../services/HttpClient';
import { toast } from 'react-toastify';
import Cookies from 'js-cookie';
import Carousel from '../components/forms/Carousel';
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
            const response = await HttpClient.post('/auth/login', { user, password });

            toast.success(response.data);
            const expirationDate = new Date(new Date().getTime() + 30 * 60 * 1000); // 30 minutos a partir 
            Cookies.set('token_access', response.data, { expires: expirationDate, secure: true, sameSite: 'Strict' });
            console.log('Resultado', response.data);


        } catch (error) {

            setError('Falló el inicio de sesión, por favor verifique sus credenciales.');
            toast.error(error.response.data);
        } finally {
            setLoading(false);
        }
    };


    return (
        <div className='container pt-4 '>
            <div className='row align-items-center'>

                <div className='col-md-4 '>
                    <div className="login-container mx-auto">
                        <img src="/DFSKimg.png" alt="Logo" className="p-4" width="175" />
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
                <div className='col-md-8 mx-auto'>

                    <Carousel />

                </div>
            </div>
        </div>
    );
};

export default Login;
