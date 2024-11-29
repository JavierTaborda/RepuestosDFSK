import { Link } from "react-router-dom";
import { useContext } from "react";
import CartView from "./RequestRepuestos/CartView";
import { AuthContext } from '../context/AuthProvider';

export default function Header({ cart, removeFromCart, increaseQuantity, decreaseQuantity, clearCart, isEmpty, carTotal }) {
  const { user, logout } = useContext(AuthContext);

  return (
    <header>
      <nav className="navbar navbar-expand-lg sticky-top" style={{ backgroundColor: '#f8f9f9', boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)' }}>
        <div className="container-fluid">
          <Link to="/" className="navbar-brand d-flex align-items-center" style={{ fontWeight: 'bold', color: '#333' }}>
            <img src="/dfsklogo.png" alt="Logo" width="80" className="me-2" />
            <span style={{ color: '555' }}>Inicio</span>
          </Link>
          <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarContent" aria-controls="navbarContent" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>   
          <div className="collapse navbar-collapse justify-content-end" id="navbarContent">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
              {!user ? (
                <li className="nav-item">
                  <Link to="/login" className="nav-link" style={{ color: '#555' }}>Login</Link>
                </li>
              ) : (
                <>
                  <li className="nav-item dropdown">
                    <a className="nav-link dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false" style={{ color: '#555' }}>
                      Repuestos
                    </a>
                    <ul className="dropdown-menu shadow-sm">
                      <li><Link to="/repuestos" className="dropdown-item">Catálogo</Link></li>
                      <li><Link to="/repuestonew" className="dropdown-item">Solicitar</Link></li>
                      <li><Link to="/solicitud" className="dropdown-item">Carrito</Link></li>
                      <li><Link to="/solicitudes" className="dropdown-item">Historial</Link></li>
                    </ul>
                  </li>
                  {user.role === 'admin' && (
                    <li className="nav-item dropdown">
                      <a className="nav-link dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false" style={{ color: '#555' }}>
                        Admin
                      </a>
                      <ul className="dropdown-menu shadow-sm">
                        <li><Link to="/editrepuestos" className="dropdown-item">Repuestos</Link></li>
                        <li><Link to="/vehiculos" className="dropdown-item">Vehículos</Link></li>
                        <li><Link to="/users" className="dropdown-item">Usuarios</Link></li>
                        <li><Link to="/estados_solicitud" className="dropdown-item">Estados de Solicitud</Link></li>
                        <li><Link to="/estados_entregas" className="dropdown-item">Entregas y Envíos</Link></li>
                      </ul>
                    </li>
                  )}
                </>
              )}
            </ul>
            {user && (
              <>
                <CartView
                  cart={cart}
                  removeFromCart={removeFromCart}
                  increaseQuantity={increaseQuantity}
                  decreaseQuantity={decreaseQuantity}
                  clearCart={clearCart}
                  isEmpty={isEmpty}
                  carTotal={carTotal}
                />
                <div className="mx-2 my-2">
                  <button className="btn btn-outline-dark" type="button" title="Cerrar Sesión" onClick={logout}>
                    <i className="bi bi-box-arrow-right"></i>
                  </button>
                </div>
              </>
            )}
          </div>
        </div>
      </nav>
    </header>
  );
}


