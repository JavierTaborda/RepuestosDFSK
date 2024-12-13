import React from 'react';
import ImgDefault from '../forms/ImgDefault';


const VehicleCard = ({ vehicle }) => {
    const { articulo, descripcion, marca, existencia, venta, modelo, ano, color, tipoc, puestos, urlimagen } = vehicle;

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
                    <a href="#" className="btn btn-danger d-flex align-items-center">
                        <i className="bi bi-upc me-2"></i>Ver Seriales
                    </a>
                </div>
            </div>
        </div>
    );
};

export default VehicleCard;
