import React, { useState, useEffect, useContext } from 'react';
import { toast } from 'react-toastify';
import dayjs from 'dayjs';
import { AuthContext } from '../../context/AuthProvider';
import { motion } from 'framer-motion';
import { getDataRoles, postUserData } from '../../services/UserService';
import Spinner from '../../components/forms/Spinner';
import 'bootstrap/dist/css/bootstrap.min.css';

const VenUsers = () => {
  const { user } = useContext(AuthContext);
  const [dataRoles, setDataRoles] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    codigo: '',
    nombre: '',
    email: '',
    telefono: '',
    clave: '',
    confirmarClave: '',
    idRol: '',
    estatus: true,
  });

  useEffect(() => {
    const getRoles = async () => {
      try {
        setIsLoading(true);
        const response = await getDataRoles();
        setDataRoles(response);
      } catch (error) {
        toast.error('Error en la carga de datos: ' + error.message);
      } finally {
        setIsLoading(false);
      }
    };

    getRoles();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (formData.clave !== formData.confirmarClave) {
      toast.error('Las contraseñas no coinciden');
      return;
    }
    try {
      const response = await postUserData(formData);
      console.log('Response:', response);
      toast.success('Usuario registrado exitosamente');
    } catch (error) {
      console.error('Error:', error);
      toast.error('Error en el registro: ' + error.message);
    }
  };

  if (!user || isLoading) {
    return (
      <div className="d-flex justify-content-center align-items-center" style={{ height: '80vh' }}>
        <motion.div
          style={{ fontSize: '18px' }}
          initial={{ opacity: 1 }}
          animate={{ opacity: [1, 0, 1] }}
          transition={{ repeat: Infinity, duration: 1 }}
        >
          Cargando datos...
        </motion.div>
        <Spinner />
      </div>
    );
  }

  return (
    <div className="container mt-5">
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 1 }}>
        <h2 className="text-center mb-4">Registrar Usuario</h2>
        <form onSubmit={handleSubmit} className="p-4 rounded shadow bg-white needs-validation" noValidate>
          <div className="row">
            <div className="col-md-6 mb-3">
              <label htmlFor="codigo" className="form-label">Rif/Cedula</label>
              <input
                type="text"
                className="form-control"
                id="codigo"
                name="codigo"
                value={formData.codigo}
                onChange={handleChange}
                required
              />
            </div>
            <div className="col-md-6 mb-3">
              <label htmlFor="nombre" className="form-label">Nombre</label>
              <input
                type="text"
                className="form-control"
                id="nombre"
                name="nombre"
                value={formData.nombre}
                onChange={handleChange}
                required
              />
            </div>
          </div>
          <div className="row">
            <div className="col-md-6 mb-3">
              <label htmlFor="email" className="form-label">Email</label>
              <input
                type="email"
                className="form-control"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
              />
            </div>
            <div className="col-md-6 mb-3">
              <label htmlFor="telefono" className="form-label">Teléfono</label>
              <input
                type="text"
                className="form-control"
                id="telefono"
                name="telefono"
                value={formData.telefono}
                onChange={handleChange}
                required
              />
            </div>
          </div>
          <div className="row">
            <div className="col-md-6 mb-3">
              <label htmlFor="clave" className="form-label">Clave</label>
              <input
                type="password"
                className="form-control"
                id="clave"
                name="clave"
                value={formData.clave}
                onChange={handleChange}
                required
              />
            </div>
            <div className="col-md-6 mb-3">
              <label htmlFor="confirmarClave" className="form-label">Confirmar Clave</label>
              <input
                type="password"
                className="form-control"
                id="confirmarClave"
                name="confirmarClave"
                value={formData.confirmarClave}
                onChange={handleChange}
                required
              />
            </div>
          </div>
          <div className="row">
            <div className="col-md-12 mb-3">
              <label htmlFor="idRol" className="form-label">Rol</label>
              <select
                className="form-select"
                value={formData.idRol}
                name="idRol"
                onChange={handleChange}
                required
              >
                <option value="">Seleccione un rol</option>
                {dataRoles.map((item) => (
                  <option key={item.idRol} value={item.idRol}>
                    {item.rolName}
                  </option>
                ))}
              </select>
            </div>
          </div>
          <button type="submit" className="btn btn-danger mt-3 w-100">
            Registrar
          </button>
        </form>
      </motion.div>
    </div>
  );
};

export default VenUsers;
