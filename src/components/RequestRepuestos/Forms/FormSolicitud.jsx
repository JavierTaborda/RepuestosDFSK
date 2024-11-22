import React, { useState, useContext } from 'react';
import dayjs from 'dayjs';
import { AuthContext } from '../../../context/AuthProvider';

const FormSolicitud = ({ setResumenData, onSubmit }) => {
    const { user } = useContext(AuthContext);
    const [localResumenData, setLocalResumenData] = useState({
        idResumenSolicitud: 0,
        fechaCreacion: dayjs(new Date()).format('YYYY-MM-DDTHH:mm:ss'),
        estatus: true,
        fechaCierre: dayjs(new Date(new Date().setDate(new Date().getDate() + 5))).format('YYYY-MM-DDTHH:mm:ss'),
        observacion: '',
        idUsuario: user?.user || 0,
        solicitudes: []
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setLocalResumenData({ ...localResumenData, [name]: value });
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        setResumenData(localResumenData);
        onSubmit(event);
    };

    return (
        <form onSubmit={handleSubmit} className="p-3 list-group">
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
                    <input type="input" className="form-control" placeholder="Vendedor/Concesionario" value={user.name} onChange={handleChange} />
                </div>
                <div className="col-12 pt-2">
                    <label htmlFor="direccion" className="form-label">Dirección</label>
                    <input type="text" className="form-control" id="direccion" name="direccion" value={localResumenData.direccion || ''} onChange={handleChange} />
                </div>
                <div className="col-12 pt-2">
                    <label htmlFor="telefono" className="form-label">Teléfono</label>
                    <input type="text" className="form-control" id="telefono" name="telefono" value={localResumenData.telefono || ''} onChange={handleChange} />
                </div>
                <div className="col-12 pt-2">
                    <label htmlFor="rif" className="form-label">RIF</label>
                    <input type="text" className="form-control" id="rif" name="rif" value={localResumenData.rif || ''} onChange={handleChange} />
                </div>
                <div className="col-12 pt-2">
                    <label htmlFor="textarea" className="form-label">Observación</label>
                    <textarea className="form-control" id="textarea" rows="3" placeholder="Comentarios..." name="observacion" value={localResumenData.observacion} onChange={handleChange} />
                </div>
                <div className="col-12 pt-2">
                    <div className="row">
                        <div className="col-8">
                            <input type="text" className="form-control" id="cupon" name="cupon" value={localResumenData.cupon || ''} onChange={handleChange} />
                        </div>
                        <div className="col-4">
                            <button type="button" className="btn btn-outline-primary">
                                <i className="bi bi-plus-square"></i> Cupón
                            </button>
                        </div>
                    </div>
                </div>
            </div>
            <div className="d-grid gap-2">
                <button type="submit" className="btn btn-success mt-5">
                    <i className="bi bi-floppy"></i> Crear Solicitud
                </button>
            </div>
        </form>
    );
};

export default FormSolicitud;
