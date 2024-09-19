import React from 'react';
import { Routes, Route } from 'react-router-dom';
import PrivateRoute from './PrivateRoute';
import Inicio from "../pages/Inicio";
import Login from '../pages/Login';
import RepuestosBodega from '../pages/RequestRespuestos/RepuestosBodega';
import CrearRepuesto from '../pages/RequestRespuestos/CrearRepuesto';
import Solicitud from '../pages/RequestRespuestos/Solicitud';
import EstadosSolicitudes from '../pages/RequestRespuestos/EstadosSolicitudes';
import Vehicles from '../pages/AddData/Vehicles';
import VenUsers from '../pages/AddData/VenUsers';
function AppRoutes({ cart, addToCart, removeFromCart, increaseQuantity, decreaseQuantity, clearCart, isEmpty, carTotal }) {

    const isAuthenticated = true; // Aquí deberías verificar la autenticación real
    const userRole = 'admin'; // Aquí deberías obtener el rol real del usuario

    return (
        <Routes>
            <Route path="/" element={<Inicio />} index />
            <Route path="/login" element={<Login />} />
            <Route path="*" element={<Inicio />} />

            {/* authentication */}
            <Route element={<PrivateRoute  />}>
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
                <Route path="/vehiculos" element={<Vehicles />} />
                <Route path="/users" element={<VenUsers />} />
            </Route>
        </Routes >
    );
}

export default AppRoutes;
