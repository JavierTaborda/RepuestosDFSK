import React from 'react';

const ModalCart = ({ show, handleClose, product }) => {
    return (
        <>
        {show && <div className="modal-backdrop fade show"></div>}
        
      <div className={`modal   ${show ? 'show d-block ' : 'd-none'}`} tabIndex="-1" >
        <div className="modal-dialog modal-dialog-centered">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title">{product.name}</h5>
              
            </div>
            <div className="modal-body">
            <div className="row">
                <div className="col-md-6">
                  <img src={product.image} alt={product.name} style={{ width: '100%' }} />
                </div>
                <div className="col-md-6">
                    <div className='mt-5 p-2 '>
                        <p>{product.description}</p>
                        <p>Precio: ${product.price}</p>
                        <p>Stock: {product.stock}</p>
                        <div class="d-grid gap-2  pt-5">
                            <button className="btn btn-outline-success rounded-5">
                                AGREGAR AL CARRITO <i className="bi bi-bag-plus"></i>
                            </button>
                        </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="modal-footer">
              <button type="button" className="btn btn-secondary" onClick={handleClose}>
                Cerrar
              </button>
            </div>
          </div>
        </div>
      </div>
      </>
    );
  };
  
export default ModalCart;
