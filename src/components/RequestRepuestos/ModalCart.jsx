import "../../styles/ModalCart.css"
import React from 'react';
import DarkMode from "../DarkMode"
import QuantityControl from "./QuantityControl"

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
  if (document.body.classList.contains('bg-dark')) { return ('bg-dark') }
  else { return ('bg-light') }
}

const ModalCart = ({ show, handleClose, repuesto, addToCard }) => {
  return (
    <>
      {show && <div className="modal-backdrop fade show"></div>}

      <div className={`modal modal fade ${show ? 'show d-block ' : 'd-none'}`} tabIndex="-1" >
        <div className="modal-dialog modal-dialog-centered">
          <div className={`modal-content ${darkModal()} `}>
            <div className="modal-header">
              <h5 className="modal-title">{repuesto.descripcion}</h5>

            </div>
            <div className="modal-body">
              <div className="row">
                <div className="col-md-6">
                  <img src="/puerta.png" alt={repuesto.name} style={{ width: '100%' }} />
                </div>
                <div className="col-md-6">

                  <span className="badge rounded-pill text-bg-success">
                    <h5 className="pt-1 pb-0">${repuesto.venta.toFixed(2).toLocaleString()} </h5>
                  </span>
                
                  <div className='mt-2 p-2 '>
                    <p className="lead">
                      <b>Articulo: </b>{repuesto.articulo}
                      <br /><b>Producto: </b>{repuesto.descripcion}
                      <br /><b>Marca: </b>{repuesto.marca}
                      <br /><b>Modelo: </b>{repuesto.modelo}
                      <br /><b>Grupo: </b>{repuesto.grupo}
                    </p>

                    <div className={`alert ${getStockClass(repuesto.existencia)}`} role="alert">
                      En Stock: {repuesto.existencia}
                    </div>
                      
                    <div className="d-grid gap-2  pt-5">
                      <button className="btn btn-success rounded-5" onClick={()=>addToCard(repuesto)}>
                        <span className="fw-medium">AGREGAR AL CARRITO </span> <i className="bi bi-bag-plus"></i>
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="modal-footer">
              <button type="button" className="btn btn-outline-danger rounded-5" onClick={handleClose}>
                <i className="bi bi-x"></i>Cerrar
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ModalCart;
