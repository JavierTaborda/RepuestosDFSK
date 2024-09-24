import React, { useState, useContext } from 'react';
import { toast } from 'react-toastify';
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
        <div className='container pt-5 pb-4'>
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
                                    value={username}
                                    onChange={(e) => setUsername(e.target.value)}
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
                                {loading ? 'Validando...' : <><i className="bi bi-box-arrow-in-left"></i> Iniciar Sesión</>}
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
