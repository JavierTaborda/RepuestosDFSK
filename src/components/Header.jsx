import { Link } from "react-router-dom";
import { useContext,useState} from "react";
import DarkMode from "./DarkMode"
import CartView from "./RequestRepuestos/CartView";
import { AuthContext } from '../context/AuthProvider';

export default function Header({ cart, removeFromCart, increaseQuantity, decreaseQuantity, clearCart, isEmpty, carTotal }) {
  const { user, logout } = useContext(AuthContext);

  return (
    <>
      <nav className="navbar navbar-expand-lg navbarcolor sticky-top">
        <div className="container-fluid">
          <Link to="/" className="nav-link active" aria-current="page">
            <img src="/dfsklogo.png" alt="Logo" width="80" />
          </Link>
          <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon" />
          </button>
          
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
              {!user ? (
                <li className="nav-item">
                  <Link to="/login" className="nav-link active" aria-current="page">Login</Link>
                </li>
              ) : (
                <>
                  <li className="nav-item dropdown">
                    <a className="nav-link dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                      Manejo de Repuestos
                    </a>
                    <ul className="dropdown-menu shadow-sm">
                      <li><Link to="/repuestos" className="dropdown-item">Catálogo de Repuestos</Link></li>
                      <li><Link to="/repuestonew" className="dropdown-item">Solicitar Repuesto</Link></li>
                      <li><Link to="/solicitud" className="dropdown-item">Ver Carrito</Link></li>
                      <li><Link to="/solicitudes" className="dropdown-item">Historial de Pedidos</Link></li>
                    </ul>
                  </li>
                  {user.role === 'admin' && (
                    <li className="nav-item dropdown">
                      <a className="nav-link dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                        Ingresar Elementos
                      </a>
                      <ul className="dropdown-menu shadow-sm">
                        <li><Link to="/editrepuestos" className="dropdown-item">Repuestos</Link></li>
                        <li><Link to="/vehiculos" className="dropdown-item">Vehículos</Link></li>
                        <li><Link to="/users" className="dropdown-item">Usuarios</Link></li>
                        
                        {/* <li><Link to="/repuestonew" className="dropdown-item">Estados</Link></li>
                        <li><Link to="/repuestonew" className="dropdown-item">Responsables de Solicitud</Link></li> */}
                      </ul>
                    </li>
                  )}
                </>
              )}
            </ul>
            {user && (
              <>
                <CartView cart={cart} removeFromCart={removeFromCart} increaseQuantity={increaseQuantity} decreaseQuantity={decreaseQuantity} clearCart={clearCart} isEmpty={isEmpty} carTotal={carTotal}/>
                <div className="mx-2 my-2">
                  <button className="btn btn-outline-success rounded-5" type="button" title="Cerrar Sesión" onClick={logout}>
                    <i className="bi bi-box-arrow-in-right"></i>
                  </button>
                </div> 
              </>
            )}
            <div className="mx-2 my-2">
              <DarkMode />
            </div>
          </div>
        </div>
      </nav>
    </>
  );
  
}
