import React from 'react';
import { useState, useEffect, useMemo } from "react"
import { toast } from 'react-toastify';
import Spinner from '../components/forms/Spinner';
import CartTable from '../components/CartTable';

function Solicitud({ cart, removeFromCart, increaseQuantity, decreaseQuantity, clearCart }) {

    const [isLoading, setIsLoading] = useState(false);
    const [estadosData, setEstadosData] = useState(1);
    const [responsablesData, setResponsablesData] = useState(1);
    const [vehiculoData, setVehiculoData] = useState(1);
    const [repuestosData, setRepuestosData] = useState(cart.map((item) => [{ articulo: item.articulo, nombre: item.descripcion, marca: item.marca, idVehiculo: vehiculoData }]));

    const isEmpty = useMemo(() => cart?.length === 0, [cart])
    const carTotal = useMemo(() => cart?.reduce((total, item) => total + (item.venta * item.quantity), 0), [cart])
    const currentDate = new Date();
    
    const url = "http://localhost:5116/api/Solicitudes/";
    const [resumenData, setResumenData] = useState({
        idResumenSolicitud: 0,
        fechaCreacion: currentDate.toISOString().replace(/T/, ' ').replace(/\.\d+Z/, ''),
        estatus: true,
        fechaCierre: new Date() + 5,
        observacion: '',
        idVendedor: 1,
        solicitudes: [{
            idSolicitud: 0,
            idResumenSolicitud: 0,
            idResponsableSolicitud: responsablesData,
            idRepuesto: 0,
            cantidad: 0,
            idEstado: 0,
            fechaSolicitud: '',
            fechaCompra: '',
            fechaLlegada: '',
            precio: '',
            observacion: '',
        }]
    });
    const handleChange = (e) => {
        const { name, value } = e.target;
        setResumenData({ ...resumenData, [name]: value });
    };


    const createlistSolicitudes = () => {
        const listSolicitudes = [];
        cart.forEach((item) => {
            listSolicitudes.push({
                idSolicitud: 0,
                idResumenSolicitud: 0,
                idResponsableSolicitud: responsablesData,
                idRepuesto: 0,
                cantidad: item.quantity,
                idEstado: estadosData,
                fechaSolicitud: currentDate.toISOString().replace(/T/, ' ').replace(/\.\d+Z/, ''),
                fechaCompra: currentDate.toISOString().replace(/T/, ' ').replace(/\.\d+Z/, ''),
                fechaLlegada: currentDate.toISOString().replace(/T/, ' ').replace(/\.\d+Z/, ''),
                precio: item.venta,
                observacion: '',
            })

        })
        setResumenData({ ...resumenData, solicitudes: listSolicitudes });
        return true

    };


    const handleSubmit = async (e) => {

        setIsLoading(true);
        e.preventDefault();
        if (createlistSolicitudes()) {
   
                // try {
                //     const response = await fetch(url, {
                //         method: "POST",
                //         headers: {
                //             "Content-Type": "application/json",
                //         },
                //         body: JSON.stringify(resumenData),
                //     });

                //     if (response.ok) {
                       
                //         toast.success("Repuesto registrado correctamente");
                //     } else {
                       
                //         toast.error("Error al registrar el repuesto");
                //     }
                // } catch (error) {
                //     toast.error("Error en la solicitud:" + error.message);
                // }
            toast.info("Enviando solicitud..." + isLoading);
            console.log(resumenData);
        }
        setIsLoading(false);
    }

  
    return (
        <>
            <div className='container  pt-2'>
                <div className='row p-2 justify-content-lg-around'>
                    <div className='col-md-7 col-lg-8 shadow-sm rounded-5 p-4'>
                        <div className="table-responsive" style={{ maxHeight: '70vh', overflowY: 'auto' }}>
                            <CartTable cart={cart}
                                removeFromCart={removeFromCart}
                                increaseQuantity={increaseQuantity}
                                decreaseQuantity={decreaseQuantity}
                                clearCart={clearCart}
                                sendForm={true} />
                        </div>
                    </div>
                    <div className='col-md-5 col-lg-4  order-md-last rounded-5 shadow-sm p-4'>
                        {isLoading ? <Spinner /> :
                            <form onSubmit={handleSubmit} className="p-3 list-group" >
                                <div className="row g-3">
                                    <div className="col-12 pt-3">
                                        <h5 className='text-center pb-2'>
                                            Solicitud
                                        </h5>
                                        <input
                                            type="text"
                                            className="form-control "
                                            id="estado"
                                            name="idEstado"
                                            disabled
                                            value="Registro Inicial"
                                        />
                                    </div>
                                    <div className="col-12 pt-2">
                                        <label htmlFor="fechainicial" className="form-label">
                                            Fecha de Solicitud
                                        </label>
                                        <input
                                            type="datetime"
                                            className="form-control "
                                            id="fechainicial"
                                            name="fechaSolicitud"
                                            value={resumenData.fechaCreacion}
                                            disabled
                                        />
                                    </div>
                                    <div className="col-12 pt-2">
                                        <label htmlFor="fechacierre" className="form-label">
                                            Fecha de Cierre Esperada
                                        </label>
                                        <input
                                            type="datetime-local"
                                            className="form-control "
                                            id="fechacierre"
                                            name="fechaCierre"
                                            value={resumenData.fechaCierre}
                                            onChange={handleChange}

                                        />
                                    </div>

                                    <div className="col-12 pt-2">
                                        <label htmlFor="vendedor" className="form-label">
                                            Solicitante
                                        </label>
                                        <input
                                            type="input"
                                            className="form-control "
                                            placeholder="Vendedor/Concesionario"
                                            id="vendedor"
                                            name="idVendedor"
                                            value={resumenData.idVendedor}
                                            onChange={handleChange}

                                        />

                                    </div>
                                    <div className="col-12 pt-2">
                                        <label htmlFor="textarea" className="form-label">Observación</label>
                                        <textarea className="form-control" id="textarea" rows="3"
                                            placeholder="Comentarios..."
                                            name="observacion"
                                            value={resumenData.observacion}
                                            onChange={handleChange}>

                                        </textarea>
                                    </div>



                                </div>
                                <div className="d-grid gap-2">
                                    <button type="submit" className="btn btn-success mt-5">
                                        <i className="bi bi-floppy"></i> Crear Solicitud
                                    </button>
                                </div>
                            </form>
                        }

                    </div>
                </div>
            </div>

        </>
    )
}
export default Solicitud