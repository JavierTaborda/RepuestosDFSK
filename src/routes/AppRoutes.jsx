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

const AppRoutes = ({ cart, addToCart, removeFromCart, increaseQuantity, decreaseQuantity, clearCart, isEmpty, carTotal }) => (
    <Routes>
        {/* Publics Routes */}
        <Route path="/" element={<Inicio />} index />
        <Route path="/login" element={<Login />} />
        <Route path="*" element={<Inicio />} />

        {/* Private routes */}
         <Route path="/repuestos" element={<PrivateRoute element={() => (
            <RepuestosBodega
                addToCart={addToCart}
            />
        )}  />} />

        <Route path="/repuestonew" element={<PrivateRoute element={CrearRepuesto} />} />
    
        <Route path="/solicitud" element={<PrivateRoute element={() => (
            <Solicitud
                cart={cart}
                removeFromCart={removeFromCart}
                increaseQuantity={increaseQuantity}
                decreaseQuantity={decreaseQuantity}
                clearCart={clearCart}
                isEmpty={isEmpty}
                carTotal={carTotal}
            />
        )} roles={['admin', 'user']} />} />
        <Route path="/solicitudes" element={<PrivateRoute element={EstadosSolicitudes}/>} />

        {/* Admin routes */}
        <Route path="/vehiculos" element={<PrivateRoute element={Vehicles} roles={['admin']} />} />
        <Route path="/users" element={<PrivateRoute element={VenUsers} roles={['admin']} />} />
    </Routes>
);

export default AppRoutes;
