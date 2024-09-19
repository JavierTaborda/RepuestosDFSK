import React, { useState, useEffect } from 'react';
import HttpClient from '../../services/HttpClient';
import { toast } from 'react-toastify'; // Asegúrate de importar toast
import 'bootstrap/dist/css/bootstrap.min.css'; // Asegúrate de importar Bootstrap CSS

const VenUsers = () => { 
  const [dataRoles, setDataRoles] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [formData, setFormData] = useState({
    codigo: '',
    nombre: '',
    email: '',
    telefono: '',
    clave: '',
    confirmarClave: '',
    idRol: 0
  });

  useEffect(() => {
    const getDataRoles = async () => {
      const URI = '/Vendedores/Roles';
      try {
        setIsLoading(true);
        const response = await HttpClient.get(URI);
        setDataRoles(response.data);
      } catch (error) {
        toast.error("Error en la carga de datos: " + error.message);
      } finally {
        setIsLoading(false);
      }
    };

    getDataRoles();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (formData.clave !== formData.confirmarClave) {
      toast.error("Las contraseñas no coinciden");
      return;
    }
    try {
      const response = await HttpClient.post('/Auth/Registrar', formData);
      console.log('Response:', response.data);
      toast.success("Usuario registrado exitosamente");
    } catch (error) {
      console.error('Error:', error);
      toast.error("Error en el registro: " + error.message);
    }
  };

  return (
    <div className="container mt-5">
      <h2 className="mb-4">Registrar Usuario</h2>
      <form onSubmit={handleSubmit} className="row">
        <div className="form-group mb-3  col-md-6">
          <label htmlFor="codigo">Rif/Cedula</label>
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

        <div className="form-group mb-3 col-md-6">
          <label htmlFor="nombre">Nombre</label>
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

        <div className="form-group mb-3 col-md-6">
          <label htmlFor="email">Email</label>
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

        <div className="form-group mb-3 col-md-6">
          <label htmlFor="telefono">Teléfono</label>
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

        <div className="form-group mb-3 col-md-6">
          <label htmlFor="clave">Clave</label>
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

        <div className="form-group mb-3 col-md-6">
          <label htmlFor="confirmarClave">Confirmar Clave</label>
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

        {isLoading ? (
          <div className="spinner-border spinner-border-sm" role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
        ) : (
          <div className="form-group mb-3 col-md-6">
            <label htmlFor="idRol">Rol</label>
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
        )}
        
        <button type="submit" className="btn btn-success mt-3"> <i className="bi bi-pencil"></i> Registrar</button>
        
      </form>
    </div>
  );
};

export default VenUsers;
