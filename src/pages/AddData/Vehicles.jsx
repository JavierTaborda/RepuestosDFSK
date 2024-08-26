import React, { useEffect } from 'react'
import { useState } from 'react';
import { toast } from 'react-toastify';
import Spinner from '../../components/forms/Spinner';
import apiUrl from '../../apiConfig';
import axios from 'axios';
import { text } from '@fortawesome/fontawesome-svg-core';


export default function Vehicles() {

    const [vehicleData, setVehicleData] = useState([])


    const [searhData, setsearhData] = useState(false) //loading by articulo
    const [statusVehicle, setstatusVehicle] = useState()//update estatus of vehicle
    const [filterData, setFilterData] = useState("") //filter by articulo

    const [filterDFSKData, setFilterDFSKData] = useState("")//search vehiclu in sistem Dfsk
    const [searhDFSK, setsearhDFSK] = useState(false) //loading by articulo
    const [vehicleDFSKData, setVehicleDFSKData] = useState([]) //insert vehicle from sistem Dfsk

    const [formvehicleData, setFormVehicleData] = useState({
        idVehiculo: 0,
        codigo: '',
        descripcion: '',
        marca: '',
        modelo: '',
        anho: '',
        vin: '',
        estatus: true,
    });

    const filterByArticulo = async () => {
        try {
            const response = await axios.get(apiUrl + `/Vehiculos/Codigo/${filterData}`);
            setVehicleData(response.data);
            if (response.data.length === 0) {
                toast.error("Artículo no encontrado");
            }
        } catch (error) {
            toast.error(error.response.data);

        }
        setsearhData(false)
    };

    const updateVehicle = async (vehiculo) => {

        vehiculo.estatus = !vehiculo.estatus;
        axios.put(apiUrl + '/Vehiculos',
            vehiculo
        )
            .then(function (response) {

                toast.success("Se actualizo el estado del vehículo " + vehiculo.descripcion);
                //console.log(response.data) 
               
            })
            .catch(function (error) {
                toast.error("No se logró actualizar el estado del vehículo " + error);
            });
    }


    const GetVehicleDFSK = async () => {
        try {
            const response = await axios.get(apiUrl + `/Articulos/Bodega/Vehiculos/${filterDFSKData}`);

            if (response.data.length === 0) {
                toast.warning("Artículo no encontrado");
            }
            setVehicleDFSKData(response.data);
        } catch (error) {
            toast.error(error.response.data);
        }
        setsearhDFSK(false)
    };

    const UpdateAddVehicle = async () => {

        axios.put(apiUrl + '/Vehiculos/AddUpdate',
            formvehicleData
        )
            .then(function (response) {
                toast.success("Se actualizo el estado del vehículo " + formvehicleData.descripcion);
                console.log(response.data);
            })
            .catch(function (error) {
                toast.error("No se logro actualizar el estado del vehículo " + error);
            });
            
    };



    //TODO: actualizar data al insertar vehiculo
    const RefreshData = () => {
        axios.get(apiUrl + '/Vehiculos')
            .then(function (response) {
                setVehicleData(response.data)
            })
            .catch(function (error) {
                // console.log(error);
            })
            .finally(function () {

            });
    };

    //Add new vehicle from Sistem Dfsk
    const CreateVehicle = async (vehiclearticulos) => {
        setFormVehicleData({
            idVehiculo: 0,
            codigo: vehiclearticulos.articulo,
            descripcion: vehiclearticulos.descripcion,
            modelo: vehiclearticulos.modelo,
            marca: vehiclearticulos.marca,
            anho: vehiclearticulos.ano,
            estatus: true,
        });
    };


    useEffect(() => {
        RefreshData();
    }, []);

    //refresh data
    useEffect(() => {
        if (statusVehicle !== undefined) {
            
            console.log("esta", statusVehicle)
        }
      
    }, [vehicleData]);


    useEffect(() => {
        if (searhData) {
            filterByArticulo();
        }
    }, [searhData]);

    useEffect(() => {
        if (statusVehicle !== undefined) {
            updateVehicle(statusVehicle);
           // console.log("este",statusVehicle)
           
        }

    }, [statusVehicle]);


    useEffect(() => {
        if (searhDFSK) {
            GetVehicleDFSK();
        }
    }, [searhDFSK]);

    useEffect(() => {
        if (vehicleDFSKData.length >= 1) {
            UpdateAddVehicle();
        }
    }, [formvehicleData]);

    return (
        <div className='container '>
            <div className='row p-2  px-2'>
                <div className='col-md-7 col-lg-8 shadow-sm rounded-5 p-4 '>
                    <div className="row p-2 pt-3" >
                        <div className="col-6">
                            <input className="form-control me-2 rounded-5 shadow-sm" onChange={(e) => setFilterData(e.target.value)} type="search" placeholder="Artículo..." aria-label="Buscar" />
                        </div>
                        <div className="col-6">
                            <button className="btn btn-outline-danger rounded-5  shadow-sm" onClick={() => filterData !== "" ? setsearhData(true) : null} onChange={(e) => filterByArticulo()} type="button" >Buscar</button>
                        </div>
                    </div>
                    <div className="table-responsive" style={{ maxHeight: '70vh', overflowY: 'auto' }}>
                        {searhData ? <Spinner /> :
                            <table className="table ">
                                <thead>
                                    <tr>
                                        <th>Imagen</th>
                                        <th>Artículo</th>
                                        <th>Descripción</th>
                                        <th>Modelo</th>
                                        <th>Marca</th>
                                        <th>Año</th>
                                        <th className='text-center'>Estado</th>
                                        <th className='text-center'>Actualizar</th>
                                    </tr>
                                </thead>
                                <tbody>

                                    {vehicleData?.map((item) => (
                                        <tr key={item.idVehiculo} className='p-1'>
                                            <td>
                                                <img className="img-fluid" src="./puerta.png" alt="imagen" style={{ maxHeight: '80px', }} />
                                            </td>
                                            <td className="align-middle">{item.codigo}</td>
                                            <td className="align-middle">{item.descripcion}</td>
                                            <td className="align-middle">{item.modelo}</td>
                                            <td className="align-middle">{item.marca}</td>
                                            <td className="align-middle">{item.anho}</td>
                                            <td className="align-middle text-center">
                                                <div className="form-check form-switch d-flex justify-content-center ">
                                                    <input
                                                        className="form-check-input"
                                                        type="checkbox"
                                                        role="switch"
                                                        onChange={(e) => setstatusVehicle(item)}
                                                        checked={item.estatus}
                                                    />                                                </div>
                                            </td>
                                            <td className="align-middle text-center">
                                                <button className="btn btn-outline-danger rounded-5 " ><i className="bi bi-pencil-square"></i></button>
                                            </td>
                                        </tr>
                                    ))}

                                </tbody>
                            </table>
                        }
                    </div>
                </div>
                <div className='col-md-5 col-lg-4 order-md-last rounded-5 shadow-sm p-3'>
                    <h6 className='text-center p-2'> Agregar Vehículos desde el Sistema Principal</h6>
                    <div className="row p-2 pt-3" >
                        <div className="col-6 my-auto">
                            <input className="form-control me-2 rounded-5 shadow-sm my-auto" onChange={(e) => setFilterDFSKData(e.target.value)} type="search" placeholder="Artículo..." aria-label="Buscar" />
                        </div>
                        <div className="col-6">
                            <button type="button" className="btn btn-outline-danger rounded-5"
                                onClick={() => filterDFSKData !== "" ? setsearhDFSK(true) : null} onChange={(e) => filterByArticulo(e.target.value)}
                            >
                                Agregar Vehículo <i className="bi bi-truck-flatbed"></i>
                            </button>
                        </div>
                    </div>
                    <div className="row p-2 pt-3 d-flex justify-content-center " style={{ minHeight: '45vh', maxHeight: '65vh', overflowY: 'auto' }}>
                        {searhDFSK ? <Spinner /> :
                            <ol className="list-group list-group-numbere rounded-5">
                                {vehicleDFSKData.map((item) => (
                                    <li key={item.articulo} className="list-group-item d-flex justify-content-between align-items-center">
                                        <div className="ms-2 me-auto">
                                            <div className="fw-bold">{item.articulo} {item.descripcion}</div>
                                            {item.modelo} - {item.marca} - {item.ano}
                                        </div>
                                        <button className="btn btn-danger rounded-5 " onClick={(e) => CreateVehicle(item)} ><i className="bi bi-copy"></i></button>
                                    </li>
                                ))}
                            </ol>
                        }
                    </div>
                </div>
            </div>
        </div>
    )
}
