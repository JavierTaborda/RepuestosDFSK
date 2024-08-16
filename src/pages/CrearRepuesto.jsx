import React from 'react';
import { useState, useEffect, useForm} from "react"
import { toast } from 'react-toastify';
import Spinner from '../components/Spinner';
import CartTable from '../components/CartTable';

export default function CrearRepuesto() {

    const [repuestoData, setRepuestoData] = useState({
        IdRepuesto: 0,
        Codigo: '',
        Nombre: '',
        Descripcion: '',
        Precio: null,
        IdVehiculo: null,
        Marca: '',
        Estatus: false,
    });
    const handleChange = (e) => {
        const { name, value } = e.target;
        setRepuestoData({ ...repuestoData, [name]: value });
    };

    const url = 'http://localhost:5116/api/Repuestos/';

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch(url, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(repuestoData),
            });

            if (response.ok) {
                // Procesar la respuesta exitosa aquí
                console.log('Repuesto registrado correctamente');
            } else {
                // Manejar errores aquí
                console.error('Error al registrar el repuesto');
            }
        } catch (error) {
            console.error('Error en la solicitud:', error);
        }
    };
  

    return (

        <div className="container my-4">
            <div className="row g-5">
                <div className="col-md-8 col-lg-9">

                    <h4>Crear Repuesto para Solicitud</h4>
                    <form onSubmit={handleSubmit}  className="needs-validation">

                        <div className="row g-3">
                            <div className="col-4">
                                <label htmlFor="codigo" className="form-label">
                                    Código
                                </label>
                                <input
                                    type="text"
                                    className="form-control"
                                    placeholder='Ingresa Código'
                                    id="codigo"
                                    name="Codigo"
                                    value={repuestoData.Codigo}
                                    onChange={handleChange}
                                />                                 
                            </div>
                            <div className="col-8">
                                <label htmlFor="Nombre" className="form-label">
                                    Nombre/Detalle
                                </label>
                                <input
                                    type="text"
                                    className="form-control"
                                    placeholder='Ingresa Nombre/Detalle'
                                    id="Nombre"
                                    name="Nombre"
                                    value={repuestoData.Nombre}
                                    onChange={handleChange}
                                />                                 
                            </div>
                        </div>


                        <button type="submit" className="btn btn-success">
                            Enviar
                        </button>
                    </form>
                </div>
                <div className="col-md-4 col-lg-3">
                    <Spinner />
                </div>

            </div>
        </div>
    );
};


