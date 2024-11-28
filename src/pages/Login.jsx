import React, { useState, useContext } from 'react';
import { toast } from 'react-toastify';
import { motion } from 'framer-motion';
import Carousel from '../components/forms/Carousel';
import { AuthContext } from '../context/AuthProvider';

const Login = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const { user, login, logout } = useContext(AuthContext);

    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError(null);

        try {
            await login({ username, password }).then((response) => {
                toast.success(response);
            });
        } catch (error) {
            setError('Falló el inicio de sesión, por favor verifique sus credenciales.');
            console.log(error);
            toast.error(error.request.response);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className='container mt-5'>
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 1 }}>
                <div className='row align-items-center'>
                    <div className='col-md-6'>
                        <motion.div
                            initial={{ x: -100, opacity: 0 }}
                            animate={{ x: 0, opacity: 1 }}
                            transition={{ duration: 0.5 }}
                            className="login-container p-4 rounded shadow bg-white mx-auto"
                        >
                            <img src="/DFSKimg.png" alt="Logo" className="mb-4" width="175" />
                            <h2 className="text-center mb-4">Iniciar Sesión</h2>
                            <form onSubmit={handleSubmit}>
                                <div className="mb-3">
                                    <label htmlFor="username" className="form-label">Usuario:</label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        id="username"
                                        value={username}
                                        onChange={(e) => setUsername(e.target.value)}
                                        required
                                    />
                                </div>
                                <div className="mb-3 position-relative">
                                    <label htmlFor="password" className="form-label">Contraseña:</label>
                                    <input
                                        type={showPassword ? 'text' : 'password'}
                                        className="form-control"
                                        id="password"
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}
                                        required
                                    />
                                    <span
                                        className="toggle-password position-absolute top-50 end-0 translate-middle-y pe-3"
                                        onClick={togglePasswordVisibility}
                                        style={{ cursor: 'pointer' }}
                                    >
                                        {showPassword ? <i className="bi bi-eye-slash"></i> : <i className="bi bi-eye"></i>}
                                    </span>
                                </div>
                                {error && <p className="text-danger">{error}</p>}
                                <button type="submit" className="btn btn-danger w-100" disabled={loading}>
                                    {loading ? 'Validando...' : <><i className="bi bi-box-arrow-in-left"></i> Iniciar Sesión</>}
                                </button>
                            </form>
                        </motion.div>
                    </div>
                    <div className='col-md-6'>
                        <Carousel />
                    </div>
                </div>
            </motion.div>
        </div>
    );
};

export default Login;
