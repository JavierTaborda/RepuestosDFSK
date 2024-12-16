import React, { useState } from 'react';
import ImgDefault from '../forms/ImgDefault';
import { getSerialesVehiculosBodegas } from '../../services/ArticulosService';
import { toast } from 'react-toastify';

const VehicleCard = ({ vehicle, bodega }) => {
    const { articulo, descripcion, marca, existencia, venta, modelo, ano, color, tipoc, puestos, urlimagen } = vehicle;
    const [seriales, setSeriales] = useState([]);
    const [loadingSeriales, setLoadingSeriales] = useState(false);

    const getSeriales = async (articulo) => {
        setLoadingSeriales(true);
        try {
     
            const data = await getSerialesVehiculosBodegas( bodega,articulo);
            setSeriales(data);
        } catch (error) {
            toast.error("Error en la carga de datos: " + error.message);
        } finally {
            setLoadingSeriales(false);
        }
    };

    return (
        <div className="col-md-6 col-lg-4 mb-4">
            <div className="vehicle-card h-100 shadow-sm">
                {urlimagen ? (
                    <img src={urlimagen} className="vehicle-card-img-top" alt={descripcion} />
                ) : (
                    <div className="vehicle-card-img-top d-flex justify-content-center align-items-center">
                        <ImgDefault />
                    </div>
                )}
                <div className="vehicle-card-body">
                    <h5 className="vehicle-card-title">{modelo} - {ano}</h5>
                    <p className="vehicle-card-text">
                        <strong>Descripción:</strong> {descripcion}<br />
                        <strong>Marca:</strong> {marca}<br />
                        <strong>Tipo:</strong> {tipoc}<br />
                        <strong>Color:</strong> {color}<br />
                        <strong>Puestos:</strong> {puestos}<br />
                        <strong>Existencia:</strong> {existencia}<br />
                        <strong>Precio:</strong> ${venta.toLocaleString()}
                    </p>
                    <button type="button" className="btn btn-danger d-flex align-items-center" data-bs-toggle="modal" data-bs-target={`#modal${articulo}`} onClick={() => getSeriales(articulo)}>
                        <i className="bi bi-upc me-2"></i>Ver Seriales
                    </button>
                </div>
            </div>

      
            <div className="modal fade" id={`modal${articulo}`} tabIndex="-1" aria-labelledby={`modalLabel${articulo}`} aria-hidden="true">
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title" id={`modalLabel${articulo}`}>Detalles del Vehículo</h5>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div className="modal-body">
                            {loadingSeriales ? (
                                <p>Cargando seriales...</p>
                            ) : (
                                <>
                                 
                                    {seriales.length > 0 ? (
                                            <table className="table table-hover table-striped">
                                                <thead>
                                                    <tr>
                                                        <th scope="col">Serial Carrocería</th>
                                                        <th scope="col">Serial NIV</th>
                                                        <th scope="col">Serial Motor</th>
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    {seriales.map((serial, index) => (
                                                        <tr key={index}>
                                                            <td>{serial.scarroceria}</td>
                                                            <td>{serial.sniv}</td>
                                                            <td>{serial.smotor}</td>
                                                        </tr>
                                                    ))}
                                                </tbody>
                                            </table>
                                    ) : (
                                        <p>No se encontraron seriales.</p>
                                    )}
                                </>
                            )}
                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Cerrar</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );  
};

export default VehicleCard;
