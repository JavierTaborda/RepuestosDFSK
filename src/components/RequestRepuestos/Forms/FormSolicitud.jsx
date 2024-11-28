import React, { useState, useContext, useEffect } from 'react';
import dayjs from 'dayjs';
import { AuthContext } from '../../../context/AuthProvider';
import { getEstadosEnvios } from '../../../services/SolicitudesService';
import { toast } from 'react-toastify';
import { motion } from 'framer-motion';

const FormSolicitud = ({ setResumenData, onSubmit }) => {
    const { user } = useContext(AuthContext);
    const [localResumenData, setLocalResumenData] = useState({
        idResumenSolicitud: 0,
        fechaCreacion: dayjs(new Date()).format('YYYY-MM-DDTHH:mm:ss'),
        estatus: false,
        fechaCierre: dayjs(new Date(new Date().setDate(new Date().getDate() + 5))).format('YYYY-MM-DDTHH:mm:ss'),
        observacion: '',
        idUsuario: user?.user || 0,
        idEstadosEnvio: 0,
        solicitudes: [],
        direccion: '',
        telefono: '',
        rif: ''
    });

    const [enviosData, setEnviosData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [selectedEnvio, setSelectedEnvio] = useState(null);
    const [errors, setErrors] = useState({});

    const handleChange = (e) => {
        const { name, value } = e.target;
        setLocalResumenData({ ...localResumenData, [name]: value });

        // Validar el campo en cada cambio
        let tempErrors = { ...errors };
        if (value.trim() !== '') {
            delete tempErrors[name];
        } else {
            tempErrors[name] = `${name.charAt(0).toUpperCase() + name.slice(1)} es requerido`;
        }
        setErrors(tempErrors);

        if (name === 'idEstadosEnvio') {
            const selected = enviosData.find(envio => envio.idEstadosEnvio === parseInt(value));
            setSelectedEnvio(selected);
        }
    };

    const validate = () => {
        let tempErrors = {};
        if (!localResumenData.direccion) tempErrors.direccion = "La dirección es requerida";
        if (!localResumenData.telefono) tempErrors.telefono = "El teléfono es requerido";
        if (!localResumenData.rif) tempErrors.rif = "El RIF es requerido";
        if (!localResumenData.idEstadosEnvio) tempErrors.idEstadoEntrega = "El estado de entrega es requerido";
        setErrors(tempErrors);
        return Object.keys(tempErrors).length === 0;
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        if (validate()) {
            setResumenData(localResumenData);
            onSubmit(event);
        } else {
            toast.warning("Por favor, complete todos los campos requeridos.");
        }
    };

    useEffect(() => {
        const fetchEstadosEnvios = async () => {
            try {
                const response = await getEstadosEnvios();
                setEnviosData(response);
            } catch (error) {
                toast.error('Error al obtener los estados de envíos. \n Por favor, recargue la página.');
            } finally {
                setLoading(false);
            }
        };

        fetchEstadosEnvios();
    }, []);

    return (
        <form onSubmit={handleSubmit} className="p-4 rounded shadow bg-white">
            <div className="row g-3">
                <div className="col-12 pt-3">
                    <h5 className='text-center pb-2'>Solicitud</h5>
                    <input type="text" className="form-control" id="estado" name="idEstado" disabled value="Registro Inicial" />
                </div>
                <div className="col-12 pt-2">
                    <label htmlFor="fechainicial" className="form-label">Fecha de Solicitud</label>
                    <input type="datetime" className="form-control" id="fechainicial" name="fechaSolicitud" value={localResumenData.fechaCreacion} disabled />
                </div>
                <div className="col-12 pt-2">
                    <label htmlFor="fechacierre" className="form-label">Fecha Deseada de Entrega </label>
                    <input type="datetime-local" className="form-control" id="fechacierre" name="fechaCierre" value={localResumenData.fechaCierre} onChange={handleChange} />
                </div>
                <div className="col-12 pt-2">
                    <label htmlFor="vendedor" className="form-label">Solicitante</label>
                    <input type="input" className="form-control" placeholder="Vendedor/Concesionario" value={user.name} disabled />
                </div>
                <div className="col-12 pt-2">
                    <label htmlFor="idEstadosEnvio" className="form-label">Estado de Entrega</label>
                    {loading ? (
                        <p>Cargando estados de envío...</p>
                    ) : (
                            <select className="form-select form-select mb-2" id="idEstadosEnvio" name="idEstadosEnvio" value={localResumenData.idEstadosEnvio} onChange={handleChange}>
                            <option value="">Seleccione un estado</option>
                            {enviosData.map((envio) => (
                                <option key={envio.idEstadosEnvio} value={envio.idEstadosEnvio}>
                                    {envio.estado}
                                </option>
                            ))}
                        </select>
                    )}
                    {errors.idEstadosEnvio && <div className="text-danger">{errors.idEstadosEnvio}</div>}
                </div>
                {selectedEnvio && (
                    <motion.div
                        className="col-12"
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5 }}
                    >
                        <div className="alert alert-danger" role="alert">
                            Aproximadamente {selectedEnvio.tiempo} días
                        </div>
                    </motion.div>
                )}
                <div className="col-12 pt-2">
                    <label htmlFor="direccion" className="form-label">Dirección</label>
                    <input type="text" className="form-control" id="direccion" name="direccion" value={localResumenData.direccion} onChange={handleChange} />
                    {errors.direccion && <div className="text-danger">{errors.direccion}</div>}
                </div>
                <div className="col-12 pt-2">
                    <label htmlFor="telefono" className="form-label">Teléfono</label>
                    <input type="text" className="form-control" id="telefono" name="telefono" value={localResumenData.telefono} onChange={handleChange} />
                    {errors.telefono && <div className="text-danger">{errors.telefono}</div>}
                </div>
                <div className="col-12 pt-2">
                    <label htmlFor="rif" className="form-label">RIF</label>
                    <input type="text" className="form-control" id="rif" name="rif" value={localResumenData.rif} onChange={handleChange} />
                    {errors.rif && <div className="text-danger">{errors.rif}</div>}
                </div>
                
                <div className="col-12 pt-2">
                    <label htmlFor="textarea" className="form-label">Observación</label>
                    <textarea className="form-control" id="textarea" rows="3" placeholder="Comentarios..." name="observacion" value={localResumenData.observacion} onChange={handleChange} />
                </div>
            </div>
            <div className="d-grid gap-2">
                <button type="submit" className="btn btn-danger mt-5">
                    <i className="bi bi-floppy"></i> Crear Solicitud
                </button>
            </div>
        </form>
    );
};

export default FormSolicitud;
