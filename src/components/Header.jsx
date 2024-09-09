import { Link } from "react-router-dom";
import { useMemo } from "react";
import { useState } from "react";
import DarkMode from "./DarkMode"
import CartTable from "./RequestRepuestos/CartTable"



export default function Header({ cart, removeFromCart, increaseQuantity, decreaseQuantity, clearCart, isEmpty, carTotal }) {
  return (
    <>
      <nav className="navbar navbar-expand-lg navbarcolor  sticky-top">
        <div className="container-fluid">
          <a className="navbar-brand" href="#"><img src="/DFSK.png" alt="Logo" className="logo" /></a>
          <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon" />
          </button>
          {/* 
          <div className="dropdown navbar-toggler" data-bs-toggle=" collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
            <button className="btn btn-outline-danger dropdown-toggle rounded-5" type="button"
              data-bs-toggle="dropdown" data-bs-display="static" aria-expanded="false" data-bs-auto-close="false">
              <i className="bi bi-cart3"></i>
            </button>

            <div className="dropdown-menu dropdown-menu-end  p-3 shadow" style={{ maxHeight: '57vh', overflowY: 'auto', maxWidth: '95vw', overflowX: 'auto' }}>

              <CartTable cart={cart}
                removeFromCart={removeFromCart}
                increaseQuantity={increaseQuantity}
                decreaseQuantity={decreaseQuantity}
                clearCart={clearCart} />

            </div>
          </div> */}
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
                  <li><Link to="/repuestos" className=" dropdown-item" aria-current="page" href="#">Catálogo de Repuestos</Link></li>
                  <li><Link to="/repuestonew" className=" dropdown-item" aria-current="page" href="#">Solicitar Repuesto</Link></li>
                  <li><Link to="/solicitud" className=" dropdown-item" aria-current="page" href="#">Ver Carrito</Link></li>
                  <li><Link to="/solicitudes" className=" dropdown-item" aria-current="page" href="#">Historial de Pedidos</Link></li>

                </ul>
              </li>

              <li className="nav-item dropdown">
                <a className="nav-link dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                  Ingresar Elementos
                </a>
                <ul className="dropdown-menu shadow-sm">
                  <li><Link to="/vehiculos" className=" dropdown-item" aria-current="page" href="#">Vehículos</Link></li>                  
                  <li><Link to="/solicitud" className=" dropdown-item" aria-current="page" href="#">Vendedores</Link></li>
                  <li><Link to="/repuestonew" className=" dropdown-item" aria-current="page" href="#"> Estados</Link></li>
                  <li><Link to="/repuestonew" className=" dropdown-item" aria-current="page" href="#">Responsables de Solicitud</Link></li>

                </ul>
              </li>

            </ul>

            <div className="dropdown">
              <button className="btn btn-outline-danger dropdown-toggle rounded-5" type="button"
                data-bs-toggle="dropdown" data-bs-display="static" aria-expanded="false" data-bs-auto-close="false">
                <i className="bi bi-cart3"></i>
              </button>

              <div className="dropdown-menu dropdown-menu-end  p-3 shadow" style={{ maxHeight: '57vh', overflowY: 'auto', maxWidth: '95vw', overflowX: 'auto' }}>

                <CartTable cart={cart}
                  removeFromCart={removeFromCart}
                  increaseQuantity={increaseQuantity}
                  decreaseQuantity={decreaseQuantity}
                  clearCart={clearCart}
                  isEmpty={isEmpty}
                  carTotal={carTotal}
                  sendForm={false} />

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
