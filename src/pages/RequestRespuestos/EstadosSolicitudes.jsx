import React, { useState, useEffect } from 'react';
import { toast } from 'react-toastify';
import Spinner from '../../components/forms/Spinner';
import apiUrl from '../../services/apiConfig';


const URI1 = `${apiUrl}/Solicitudes`;

export default function EstadosSolicitudes() {
    const [dataResumen, setResumen] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch(URI1);
                if (!response.ok) {
                    toast.error('Error fetching data');
                }
                const data = await response.json();
                setResumen(data); console.log(data);
            } catch (error) {
                toast.error(`Error en la carga de datos: ${error.message}`);
            } finally {
                setIsLoading(false);
            }

        };

        fetchData();

    }, []);


    return (
        <>
        <h4>Historicos de Pedidos</h4>
        <div className='container pt-2'>
            <div className='table-responsive'>
                <table className='table table-striped table-hover'>
                    <thead>
                        <tr>
                            <th>N# Solicitud</th>
                            <th>Repuesto</th>
                            <th>Vendedor</th>
                            <th>Cantidad</th>
                            <th>Precio</th>
                        </tr>
                    </thead>
                    <tbody>
                        {dataResumen.map((resumen) => (
                            resumen.solicitudes.map((solicitud) => (
                                <tr key={solicitud.idSolicitud}>
                                    <td>{resumen.idResumenSolicitud}</td>
                                    <td>{solicitud.repuesto}</td>
                                    <td>{solicitud.vendedor}</td>
                                    <td>{solicitud.cantidad}</td>
                                    <td>${solicitud.precio}</td>
                                </tr>
                            ))
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
        </>
    );
}
