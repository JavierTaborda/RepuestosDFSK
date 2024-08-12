import { Link } from "react-router-dom";
import { useState } from "react";
import DarkMode from "./DarkMode"

export default function Header() {
  return (
    <>
      {/* <nav className="navbar navbar-expand-lg bg-body-tertiary"> */}
      <nav className="navbar navbar-expand-lg navbarcolor">
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

              <li className="nav-item">             
                <Link to="/repuestos" className="nav-link" aria-current="page" href="#">Repuestos</Link>
              </li>

              {/* <li className="nav-item dropdown">
                <a className="nav-link dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                  Dropdown
                </a>
                <ul className="dropdown-menu">
                  <li><a className="dropdown-item" href="#">Action</a></li>
                  <li><a className="dropdown-item" href="#">Another action</a></li>
                  <li><hr className="dropdown-divider" /></li>
                  <li><a className="dropdown-item" href="#">Something else here</a></li>
                </ul>
              </li> */}

            </ul>
            <div className="mx-2">
              <DarkMode/>           
            </div>
            
            <form className="d-flex" role="search">
              <input className="form-control me-2 rounded-5" type="search" placeholder="Buscar..." aria-label="Buscar" />
              <button className="btn btn-outline-danger rounded-5"type="submit">Buscar</button>

            </form>
          </div>
        </div>
      </nav>

    </>

  )
}
