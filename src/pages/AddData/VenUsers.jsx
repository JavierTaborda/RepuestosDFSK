import React, { useState, useEffect, useContext } from 'react';
import { toast } from 'react-toastify';
import { AuthContext } from '../../context/AuthProvider';
import { motion } from 'framer-motion';
import { getDataRoles, postUserData } from '../../services/UserService';
import Spinner from '../../components/forms/Spinner';


const VenUsers = () => {
  const { user } = useContext(AuthContext);
  const [dataRoles, setDataRoles] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [clave2, setClave2] = useState('');
  const [formData, setFormData] = useState({
    username: '',
    nombre: '',
    email: '',
    telefono: '',
    clave: '',
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

  const handlePhoneChange = (e) => {
    const formattedPhoneNumber = formatPhoneNumber(e.target.value);
    setFormData({
      ...formData,
      telefono: formattedPhoneNumber,
    });
  };

  const formatPhoneNumber = (value) => {
    if (!value) return value;
    const phoneNumber = value.replace(/[^\d]/g, "");
    const phoneNumberLength = phoneNumber.length;

    if (phoneNumberLength < 5) return phoneNumber;
    if (phoneNumberLength < 8) {
      return `${phoneNumber.slice(0, 4)}-${phoneNumber.slice(4, 7)}`;
    }
    return `${phoneNumber.slice(0, 4)}-${phoneNumber.slice(4, 7)}-${phoneNumber.slice(7, 11)}`;
  };

  const handleClave2Change = (e) => {
    setClave2(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (formData.clave !== clave2) {
      toast.error('Las contraseñas no coinciden');
      return;
    }
    if (formData.idRol === '') {
      toast.error('Seleccione un rol');
      return;
    }
    try {
      const response = await postUserData(formData);
      if (!response) {
        toast.warning('Ya existe un usuario con este rif/cedula');
        return;
      } else {
        toast.success('Usuario registrado exitosamente');
      }
    } catch (error) {
      toast.error('Error en el registro. Verifique los datos ');
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
              <label htmlFor="username" className="form-label">Rif/Cedula</label>
              <input
                type="text"
                className="form-control"
                id="username"
                name="username"
                value={formData.username}
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
                onChange={handlePhoneChange}
                placeholder="00000000000"
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
                value={clave2}
                onChange={handleClave2Change}
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
