import React, { useEffect } from 'react'
import { useState } from 'react';
import { toast } from 'react-toastify';
import Spinner from '../../components/forms/Spinner';
import apiUrl from '../../apiConfig';
import axios from 'axios';


export default function Vehicles() {

    const [vehicleData, setVehicleData] = useState([])
    const [filterData, setFilterData] = useState("")
    const [searhData, setsearhData] = useState(false)
    const [statusVehicle, setstatusVehicle] = useState()
    const [formvehicleData, setFormVehicleData] = useState({
        codigo: '',
        marca: '',
        modelo: '',
        anho: '',
        vin: '',
        estatus: true,
    });

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormVehicleData({ ...formvehicleData, [name]: value });
    };

    const filterByArticulo = async () => {
        try {
            const response = await axios.get(apiUrl + `/Vehiculos/Codigo/${filterData}`);
            setVehicleData(response.data);
            console.log(response.data);
        } catch (error) {
            toast.error(error.response.data);

        }
        setsearhData(false)
    };

    const updateVehicle = async (vehiculo) => {


        if (vehiculo.estatus) {
            vehiculo.estatus = false
            console.log(vehiculo)
        }
        else {
            vehiculo.estatus = true
            console.log(vehiculo)
        }
        // axios.put(apiUrl + '/Vehiculos', {
        //   vehiculo,
        // })
        //     .then(function (response) {
        //         console.log(response); // Maneja la respuesta aquí
        //     })
        //     .catch(function (error) {
        //         console.log(error); // Maneja el error aquí
        //     });

    }

    useEffect(() => {
        axios.get(apiUrl + '/Vehiculos')
            .then(function (response) {
                setVehicleData(response.data)
            })
            .catch(function (error) {
                // console.log(error);
            })
            .finally(function () {

            });
    }, []);


    useEffect(() => {
        if (searhData) {

            filterByArticulo();

            if (vehicleData.length === 0) {
                toast.error("Artículo no encontrado");
            }
        }

    }, [searhData]);

    useEffect(() => {
        if (statusVehicle !== undefined) {
            updateVehicle(statusVehicle);
        }

    }, [statusVehicle]);

    return (
        <div className='container P-2'>
            <div className='row p-2  px-2'>
                <div className='col-md-7 col-lg-8 shadow-sm rounded-5 p-4 '>
                    <div className="row p-2 pt-3" >
                        <div className="col-6">
                            <input className="form-control me-2 rounded-5 shadow-sm" onChange={(e) => setFilterData(e.target.value)} type="search" placeholder="Artículo..." aria-label="Buscar" />
                        </div>
                        <div className="col-6">
                            <button className="btn btn-outline-danger rounded-5  shadow-sm" onClick={() => filterData !== "" ? setsearhData(true) : null} onChange={(e) => filterByArticulo(e.target.value)} type="button" >Buscar</button>
                        </div>
                    </div>
                    <div className="table-responsive" style={{ maxHeight: '70vh', overflowY: 'auto' }}>
                        {searhData ? <Spinner /> :
                            <table className="table ">
                                <thead>
                                    <tr>
                                        <th>Imagen</th>
                                        <th>Artículo</th>
                                        <th>Modelo</th>
                                        <th>Marca</th>
                                        <th>Año</th>
                                        <th>Estado</th>
                                        <th>Actualizar</th>
                                    </tr>
                                </thead>
                                <tbody>

                                    {vehicleData.map((item) => (
                                        <tr key={item.idVehiculo} className='p-1'>
                                            <td>
                                                <img className="img-fluid" src="./puerta.png" alt="imagen" style={{ maxHeight: '80px', }} />
                                            </td>
                                            <td className="fw-bold align-middle">{item.codigo}</td>
                                            <td className="fw-bold align-middle">{item.modelo}</td>
                                            <td className="fw-bold align-middle">{item.marca}</td>
                                            <td className="fw-bold align-middle">{item.anho}</td>
                                            <td className="fw-bold align-middle">

                                                <div className="form-check form-switch">
                                                    <input className="form-check-input" type="checkbox" role="switch" onChange={(e) => setstatusVehicle(item)} checked={item.estatus} />
                                                </div>

                                            </td>
                                            <td>

                                                <button className="btn btn-outline-danger rounded-5" ><i className="bi bi-pencil-square"></i></button>    
                                            </td>
                                        </tr>
                                    ))}

                                </tbody>
                            </table>
                        }
                    </div>
                </div>
                <div className='col-md-5 col-lg-4 order-md-last rounded-5 shadow-sm p-3'>
                    <h6 className='text-center p-2'> Agregar Vehículos desde Sistema</h6>
                    <div className="row p-2 pt-3" >
                    <div className="col-6">
                            <input className="form-control me-2 rounded-5 shadow-sm" onChange={(e) => setFilterData(e.target.value)} type="search" placeholder="Artículo..." aria-label="Buscar" />
                        </div>
                        <div className="col-6">
                        <button type="button" className="btn btn-outline-danger rounded-5" >
                        <i className="bi bi-x"></i>Agregar Vehículo
                    </button>                    
                    </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
