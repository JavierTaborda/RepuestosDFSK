import { Link } from "react-router-dom";
import { useMemo } from "react";
import { useState } from "react";
import DarkMode from "./DarkMode"



export default function Header({ cart,removeFromCart, increaseQuantity,decreaseQuantity,clearCart }) {
  
  const isEmpty= useMemo(()=>cart?.length===0, [cart])
  const carTotal=useMemo(()=>cart?.reduce((total, item) => total + (item.venta * item.quantity), 0),[cart])

  return (
    <>
      <nav className="navbar navbar-expand-lg navbarcolor  sticky-top">
        <div className="container-fluid">
          <a className="navbar-brand" href="#"><img src="/DFSK.png" alt="Logo" className="logo" /></a>
          <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon" />
          </button>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">

            <ul className="navbar-nav me-auto mb-2 mb-lg-0">

              <li className="nav-item">
                <Link to="/inicio" className="nav-link active" aria-current="page" href="/">Inicio</Link>
              </li>

              <li className="nav-item dropdown">
                <a className="nav-link dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                  Manejo de Repuestos
                </a>
                <ul className="dropdown-menu shadow-sm">
                  <li><Link to="/repuestos" className=" dropdown-item" aria-current="page" href="#">Repuestos</Link></li>
                  <li><a className="dropdown-item" href="#">Solicitar Repuesto</a></li>
                  <li><a className="dropdown-item" href="#">Estdo de Solicitudes</a></li>
                  <li><a className="dropdown-item" href="#">Something else here</a></li>
                </ul>
              </li>

            </ul>

            <div className="dropdown">
              <button className="btn btn-outline-danger dropdown-toggle rounded-5" type="button" 
                data-bs-toggle="dropdown" data-bs-display="static" aria-expanded="false" data-bs-auto-close="false">
                <i className="bi bi-cart3"></i>
              </button>

              <div className="dropdown-menu dropdown-menu-end p-4 shadow " style={{ maxHeight: '70vh', overflowY: 'auto', maxWidth: '90vh', overflowX: 'auto' }}>

                {isEmpty ? (

                  <>
                    <div className="lign-items-center">
                      <p className="text-center"><i className="bi bi-cart-x fs-1"></i></p>
                      <p className="text-center">El carrito esta vacio</p>
                    </div>
                  </>

                )
                  : (
                    /* TODO: Crear Component para addcart */
                    <>
                      <table className="table ">
                        <thead>
                          <tr>
                            <th>Imagen</th>
                            <th>Nombre</th>
                            <th>Precio</th>
                            <th>Cantidad</th>
                            <th></th>
                          </tr>
                        </thead>
                        <tbody>
                          {cart?.map(item => (

                            <tr key={item.articulo}>
                              <td>
                                <img className="img-fluid" src="./puerta.png" alt="imagen" />
                              </td>
                              <td className="fw-bold align-middle">{item.descripcion}</td>
                              <td className="fw-bold align-middle">
                                ${item.venta.toFixed(2).toLocaleString()}
                              </td>
                              <td className="align-middle">
                                <div className="d-flex justify-content-between align-items-center">
                                  <button type="button" 
                                    className="btn btn-outline-dark btn-sm "
                                    onClick={()=> decreaseQuantity(item.articulo,item.existencia)}>-
                                   
                                  </button>
                                  <span>{item.quantity}</span>
                                  <button type="button" 
                                    className="btn btn-outline-dark btn-sm" 
                                    onClick={()=> increaseQuantity(item.articulo,item.existencia)}>+
                                  </button>
                                </div>
                              </td>
                              <td className="align-middle">
                                <button
                                  className="btn btn-danger btn-sm"
                                  type="button"
                                  onClick={() => removeFromCart(item.articulo)}
                                >
                                  X
                                </button>
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>

                      <p className="text-end">Total pagar: <span className="fw-bold">${carTotal?.toFixed(2).toLocaleString()}</span></p>

                      <button className="btn btn-warning  rounded-4   m-2 p-2"
                      onClick={clearCart}>
                        <i className="bi bi-bag-x"></i> Cancelar
                      </button>
                      <button className="btn btn-success rounded-4  m-2 p-2 "><i className="bi bi-bag-check"></i> Generar Solicitud</button>
                    </>
                  )}
              </div>
            </div>

            <div className="mx-2">
              <DarkMode />
            </div>

          </div>


        </div>

      </nav>
                  
    </>

  )
}
