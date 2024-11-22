import React from 'react';
import "../../styles/ModalCart.css";
import ImageCard from "../forms/ImageCard";

const getStockClass = (stock) => {
  if (stock > 100) {
    return 'alert-success'; // Verde
  } else if (stock <= 100 && stock >= 50) {
    return 'alert-warning'; // Amarillo
  } else {
    return 'alert-danger'; // Rojo
  }
};

const darkModal = () => {
  return document.body.classList.contains('bg-dark') ? 'bg-dark' : 'bg-light';
};

const ModalCart = ({ show, handleClose, repuesto, addToCard }) => {
  return (
    <>
      {show && <div className="modal-backdrop fade show"></div>}

      <div className={`modal modal fade ${show ? 'show d-block' : 'd-none'}`} tabIndex="-1">
        <div className="modal-dialog modal-dialog-centered modal-lg">
          <div className={`modal-content ${darkModal()}`}>
            <div className="modal-header">
              <h5 className="modal-title">{repuesto.descripcion}</h5>
              <button type="button" className="btn-close" onClick={handleClose} aria-label="Close"></button>
            </div>
            <div className="modal-body">
              <div className="row">
                <div className="col-md-6">
                  <div className="image-container">
                    <ImageCard info={repuesto.descripcion} nparte={repuesto.numeroparte} stock={repuesto.existencia} img={repuesto.urlimagen} />
                  </div>
                </div>
                <div className="col-md-6">
                  <span className="badge rounded-pill text-bg-success price-badge">
                    ${repuesto.venta.toFixed(2).toLocaleString()}
                  </span>
                  <div className='mt-2 p-2 details-section'>
                    <p className="lead">
                      <i className="bi bi-upc"></i> <b>Número de Parte: </b>{repuesto.numeroparte}
                      <br /><i className="bi bi-archive"></i> <b>Producto: </b>{repuesto.descripcion}
                      <br /><i className="bi bi-tags"></i> <b>Marca: </b>{repuesto.marca}
                      <br /><i className="bi bi-truck"></i> <b>Vehículo: </b>{repuesto.vehiculo}
                      <br /><i className="bi bi-list-ul"></i> <b>Grupo: </b>{repuesto.grupo}
                      <br /><i className="bi bi-border-width"></i> <b>Categoría: </b>{repuesto.categoria}
                    </p>
                    <div className={`alert ${getStockClass(repuesto.existencia)}`} role="alert">
                      <i className="bi bi-boxes"></i> En Stock: {repuesto.existencia}
                    </div>
                    <div className="d-grid gap-2 pt-3">
                      <button className="btn btn-success rounded-5" onClick={() => addToCard(repuesto)}>
                        <span className="fw-medium">AGREGAR AL CARRITO </span> <i className="bi bi-bag-plus"></i>
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="modal-footer">
              <button type="button" className="btn btn-outline-danger rounded-5 close-btn" onClick={handleClose}>
                <i className="bi bi-x"></i> Cerrar
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ModalCart;
