import React from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import PrivateRoute from './PrivateRoute';
import Inicio from "../pages/Inicio";
import Login from '../pages/Login';
import RepuestosBodega from '../pages/RequestRespuestos/RepuestosBodega';
import CrearRepuesto from '../pages/RequestRespuestos/CrearRepuesto';
import Solicitud from '../pages/RequestRespuestos/Solicitud';
import EstadosSolicitudes from '../pages/RequestRespuestos/EstadosSolicitudes';
import Vehicles from '../pages/AddData/Vehicles';
import VenUsers from '../pages/AddData/VenUsers';
import Repuestos from '../pages/AddData/Repuestos';
import QrTrackSolicitud from '../pages/Qrtrack/QrTrackSolicitud';
import Header from "../components/Header";
import Estados from '../pages/AddData/Estados';
import EstadosEntrega from '../pages/AddData/EstadosEntrega';

function AppRoutes({ cart, addToCart, removeFromCart, increaseQuantity, decreaseQuantity, clearCart, isEmpty, carTotal }) {
    const location = useLocation();
    const isDfskTrackRoute = location.pathname.startsWith('/dfsktrack');
    const isAuthenticated = true;
    const userRole = 'admin';

    return (
        <>
            {!isDfskTrackRoute && <Header
                cart={cart}
                removeFromCart={removeFromCart}
                increaseQuantity={increaseQuantity}
                decreaseQuantity={decreaseQuantity}
                clearCart={clearCart}
                isEmpty={isEmpty}
                carTotal={carTotal}
            />}
            <Routes>
                <Route path="/" element={<Inicio />} index />
                <Route path="/login" element={<Login />} />
                <Route path="/dfsktrack" element={<QrTrackSolicitud />} />
                <Route path="*" element={<Inicio />} />

                {/* authentication */}
                <Route element={<PrivateRoute />}>
                    <Route path="/repuestos" element={<RepuestosBodega addToCart={addToCart} />} />
                    <Route path="/repuestonew" element={<CrearRepuesto />} />
                    <Route path="/solicitud" element={
                        <Solicitud
                            cart={cart}
                            removeFromCart={removeFromCart}
                            increaseQuantity={increaseQuantity}
                            decreaseQuantity={decreaseQuantity}
                            clearCart={clearCart}
                            isEmpty={isEmpty}
                            carTotal={carTotal}
                        />
                    } />
                    <Route path="/solicitudes" element={<EstadosSolicitudes />} />
                </Route>

                {/* AddData admin*/}
                <Route element={<PrivateRoute roles={['admin']} />}>
                    <Route path="/editrepuestos" element={<Repuestos />} />
                    <Route path="/vehiculos" element={<Vehicles />} />
                    <Route path="/users" element={<VenUsers />} />
                    <Route path="/estados_solicitud" element={<Estados/>} />
                    <Route path="/estados_entregas" element={<EstadosEntrega />} />
                </Route>
            </Routes>
            
        </>
    );
}

export default AppRoutes;
