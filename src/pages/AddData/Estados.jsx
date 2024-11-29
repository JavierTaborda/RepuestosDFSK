import React, { useState, useEffect } from 'react';
import { toast } from 'react-toastify';
import { getEstadosSolicitudes, postEstados, putEstados } from '../../services/EstadosService';

const Estados = () => {
    const [estados, setEstados] = useState([]);
    const [estado, setEstado] = useState({ idEstado: 0, nombre: '', descripcion: '', estatus: true, orden: 0 });
    const [loading, setLoading] = useState(true);
    const [filter, setFilter] = useState('');
    const [sortConfig, setSortConfig] = useState({ key: 'orden', direction: 'ascending' });
    const [showInactive, setShowInactive] = useState(true);

    useEffect(() => {
        const fetchEstados = async () => {
            try {
                const response = await getEstadosSolicitudes();
                setEstados(response);
            } catch (error) {
                toast.error('Error al cargar los estados: ' + error.message);
            } finally {
                setLoading(false);
            }
        };
        fetchEstados();
    }, []);

    const handleSave = async (e) => {
        e.preventDefault();
        try {
            if (estado.idEstado) {
                await putEstados(estado);
                toast.success('Estado actualizado correctamente');
            } else {
                await postEstados(estado);
                toast.success('Estado registrado correctamente');
            }
            const response = await getEstadosSolicitudes();
            setEstados(response);
            setEstado({ idEstado: 0, nombre: '', descripcion: '', estatus: true, orden: 0 });
        } catch (error) {
            if (error.response) {
                toast.error('Error al guardar el estado: ' + error.response.data);

            }
            else {
                toast.error('Error al guardar el estado: ' + error.message);
            }
            console.error(error);
        }
    };

    const handleEdit = (estado) => {
        setEstado(estado);
    };

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        setEstado({
            ...estado,
            [name]: type === 'checkbox' ? checked : value,
        });
    };

    const handleNew = () => {
        setEstado({ idEstado: 0, nombre: '', descripcion: '', estatus: true, orden: 0 });
    };

    const handleFilterChange = (e) => {
        setFilter(e.target.value);
    };

    const sortedEstados = [...estados].sort((a, b) => {
        if (a[sortConfig.key] < b[sortConfig.key]) {
            return sortConfig.direction === 'ascending' ? -1 : 1;
        }
        if (a[sortConfig.key] > b[sortConfig.key]) {
            return sortConfig.direction === 'ascending' ? 1 : -1;
        }
        return 0;
    });

    const filteredEstados = sortedEstados.filter(estado =>
        (estado.nombre.toLowerCase().includes(filter.toLowerCase()) ||
            estado.descripcion.toLowerCase().includes(filter.toLowerCase())) &&
        (showInactive || estado.estatus)
    );

    const requestSort = (key) => {
        let direction = 'ascending';
        if (sortConfig.key === key && sortConfig.direction === 'ascending') {
            direction = 'descending';
        }
        setSortConfig({ key, direction });
    };

    const toggleInactive = () => {
        setShowInactive(!showInactive);
    };

    const toggleOrdenSort = () => {
        requestSort('orden');
    };

    return (
        <div className="container mt-5">
            <h2 className="text-start mb-4">Gestionar Estados Para Solicitudes</h2>
            <div className="d-flex justify-content-end mb-3">
                <button className="btn btn-danger me-2" onClick={handleNew}>
                    <i className="bi bi-plus-circle"></i> Agregar Nuevo Estado
                </button>
                <button className="btn btn-secondary me-2" onClick={toggleOrdenSort}>
                    Orden <i className={sortConfig.direction === 'ascending' ? 'bi bi-arrow-up' : 'bi bi-arrow-down'}></i>
                </button>
                <button className="btn btn-secondary me-2" onClick={toggleInactive}>
                    {showInactive ? <><i className="bi bi-eye"></i> Mostrar Inactivos</> : <><i className="bi bi-eye-slash"></i> Ocultar Inactivos</>}
                </button>

            </div>
            <div className="row">
                <div className="col-md-5 mb-4">
                    <form onSubmit={handleSave} className="p-4 rounded shadow bg-white">
                        <div className="mb-3">
                            <label htmlFor="nombre" className="form-label">Nombre</label>
                            <input
                                type="text"
                                className="form-control"
                                id="nombre"
                                name="nombre"
                                value={estado.nombre}
                                onChange={handleChange}
                                required
                            />
                        </div>
                        <div className="mb-3">
                            <label htmlFor="descripcion" className="form-label">Descripción</label>
                            <input
                                type="text"
                                className="form-control"
                                id="descripcion"
                                name="descripcion"
                                value={estado.descripcion}
                                onChange={handleChange}
                            />
                        </div>
                        <div className="mb-3">
                            <label htmlFor="orden" className="form-label">Orden</label>
                            <input
                                type="number"
                                className="form-control"
                                id="orden"
                                name="orden"
                                value={estado.orden}
                                onChange={handleChange}
                                required
                            />
                        </div>
                        <div className="form-check mb-3">
                            <input
                                type="checkbox"
                                className="form-check-input"
                                id="estatus"
                                name="estatus"
                                checked={estado.estatus}
                                onChange={handleChange}
                            />
                            <label htmlFor="estatus" className="form-check-label">Activo</label>
                        </div>
                        <div className="d-grid gap-2">
                            <button type="submit" className="btn btn-danger">
                                <i className="bi bi-save"></i> {estado.idEstado ? 'Actualizar' : 'Guardar'}
                            </button>
                        </div>
                    </form>
                </div>
                <div className="col-md-7">
                    <input
                        type="text"
                        className="form-control mb-3"
                        placeholder="Filtrar por nombre o descripción..."
                        value={filter}
                        onChange={handleFilterChange}
                    />
                    {loading ? (
                        <div className="d-flex justify-content-center align-items-center" style={{ height: '100%' }}>
                            <div className="spinner-border text-danger" role="status">
                                <span className="visually-hidden">Cargando...</span>
                            </div>
                        </div>
                    ) : (
                        <div className="table-responsive shadow-sm rounded">
                            <table className="table table-striped table-bordered">
                                <thead>
                                    <tr>
                                       
                                        <th className="bg-danger text-white">Nombre</th>
                                        <th className="bg-danger text-white">Descripción</th>
                                        <th className="bg-danger text-white">Estatus</th>
                                        <th className="bg-danger text-white">Orden</th>
                                        <th className="bg-danger text-white">Acciones</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {filteredEstados.length > 0 ? (
                                        filteredEstados.map((estado) => (
                                            <tr key={estado.idEstado}>
                                                
                                                <td>{estado.nombre}</td>
                                                <td>{estado.descripcion}</td>
                                                <td>{estado.estatus ? 'Activo' : 'Inactivo'}</td>
                                                <td>{estado.orden}</td>
                                                <td>
                                                    <button
                                                        className="btn btn-warning btn-sm me-2"
                                                        onClick={() => handleEdit(estado)}
                                                    >
                                                        <i className="bi bi-pencil"></i> Editar
                                                    </button>
                                                </td>
                                            </tr>
                                        ))
                                    ) : (
                                        <tr>
                                            <td colSpan="6" className="text-center">No hay estados registrados</td>
                                        </tr>
                                    )}
                                </tbody>
                            </table>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default Estados;
