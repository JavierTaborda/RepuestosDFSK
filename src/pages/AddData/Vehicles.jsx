import React, { useEffect } from 'react'
import { useState } from 'react';
import { toast } from 'react-toastify';
import ImageCard from '../../components/forms/ImageCard';
import Spinner from '../../components/forms/Spinner';
import HttpClient from '../../services/HttpClient';


import axios from 'axios';


export default function Vehicles() {

    const [vehicleData, setVehicleData] = useState([]);
    const [searchData, setSearchData] = useState(false);//loading by articulo
    const [statusVehicle, setStatusVehicle] = useState();//update estatus of vehicle
    const [filterData, setFilterData] = useState("");//filter by articulo
    const [filterDFSKData, setFilterDFSKData] = useState("");//search vehicle in sistem Dfsk
    const [searchDFSK, setSearchDFSK] = useState(false);
    const [vehicleDFSKData, setVehicleDFSKData] = useState([]);//insert vehicle from sistem Dfsk

    const [formVehicleData, setFormVehicleData] = useState({
        idVehiculo: 0,
        codigo: '',
        descripcion: '',
        marca: '',
        modelo: '',
        anho: '',
        vin: '',
        estatus: true,
    });

    const fetchData = async (url, setData, errorMessage) => {
        try {
            const response = await HttpClient.get(url);
            setData(response.data);
            if (response.data.length === 0) {
                toast.error(errorMessage);
            }
        } catch (error) {
            toast.error(error.response?.data || "Error de conexión a los datos.");
        }
    };

    const filterByArticulo = () => {
        setSearchData(true);
            fetchData( `/Vehiculos/Codigo/${filterData}`, setVehicleData, "Artículo no encontrado");
        setSearchData(false);
    };

    const updateVehicle = async (vehiculo) => {
        vehiculo.estatus = !vehiculo.estatus;
        try {
            await HttpClient.put('/Vehiculos', vehiculo);
            toast.success(`Se actualizó el estado del vehículo ${vehiculo.descripcion}`);
            RefreshData();
        } catch (error) {
            toast.error(`No se logró actualizar el estado del vehículo: ${error}`);
        }
    };

    const GetVehicleDFSK = () => {
        setSearchDFSK(true);
        fetchData(`/Articulos/Bodega/Vehiculos/${filterDFSKData}`, setVehicleDFSKData, "Artículo no encontrado");
        setSearchDFSK(false);
    };

    const UpdateAddVehicle = async () => {
        try {
            await axios.put('/Vehiculos/AddUpdate', formVehicleData);
            toast.success(`Se actualizó el vehículo ${formVehicleData.descripcion}`);
            RefreshData();
        } catch (error) {
            toast.error(`No se logró actualizar el estado del vehículo: ${error}`);
        }
    };

    //refresh or getdata
    const RefreshData = () => {
        const url = filterData.length === 0 ? '/Vehiculos' : `/Vehiculos/Codigo/${filterData}`;
        fetchData(url, setVehicleData, "Error refreshing data");
    };

    //Add new vehicle from Sistem Dfsk
    const CreateVehicle = (vehiclearticulos) => {
        setFormVehicleData({
            idVehiculo: vehiclearticulos.idVehiculo || 0,
            codigo: vehiclearticulos.articulo,
            descripcion: vehiclearticulos.descripcion,
            modelo: vehiclearticulos.modelo,
            marca: vehiclearticulos.marca,
            anho: vehiclearticulos.ano,
            estatus: true,
        });
        console.log(formVehicleData);
    };

    const updateFromDFSK = (articulo) => {
        setFilterDFSKData(articulo);
         setSearchDFSK(true);
         toast.info('Valide el resultado de la busqueda, en el panel derecho.');
    }
    

    useEffect(() => {
        RefreshData();
    }, []);

    useEffect(() => {
        if (statusVehicle !== undefined) {
            updateVehicle(statusVehicle);
        }
    }, [statusVehicle]);

    useEffect(() => {
        if (searchData) {
            filterByArticulo();
        }
    }, [searchData]);

    useEffect(() => {
        if (searchDFSK) {
            GetVehicleDFSK();
        }
    }, [searchDFSK]);

    useEffect(() => {
        if (vehicleDFSKData.length >= 1) {
            UpdateAddVehicle();
        }
    }, [formVehicleData]);

    return (

        <div className='container'>
            <div className='row p-2 px-2'>
                <div className='col-md-7 col-lg-8 shadow-sm rounded-5 p-4'>
                    <div className="row p-2 pt-3">
                        <div className="col-6">
                            <input className="form-control me-2 rounded-5 shadow-sm" onChange={(e) => setFilterData(e.target.value)} type="search" placeholder="Artículo..." aria-label="Buscar" />
                        </div>
                        <div className="col-6">
                            <button className="btn btn-outline-danger rounded-5 shadow-sm" onClick={() => filterData !== "" ? setSearchData(true) : null} type="button">Buscar</button>
                        </div>
                    </div>
                    <div className="table-responsive" style={{ maxHeight: '70vh', overflowY: 'auto' }}>
                        {searchData ? <Spinner /> :
                            <table className="table">
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
                                            <td style={{ maxHeight: '80px', maxWidth: '80px' }}>
                                                <ImageCard info={item.descripcion} stock={item.existencia} />
                                            </td>
                                            <td className="align-middle">{item.codigo}</td>
                                            <td className="align-middle">{item.descripcion}</td>
                                            <td className="align-middle">{item.modelo}</td>
                                            <td className="align-middle">{item.marca}</td>
                                            <td className="align-middle">{item.anho}</td>
                                            <td className="align-middle text-center">
                                                <div className="form-check form-switch d-flex justify-content-center">
                                                    <input
                                                        className="form-check-input"
                                                        type="checkbox"
                                                        role="switch"
                                                        onChange={() => setStatusVehicle(item)}
                                                        checked={item.estatus}
                                                    />
                                                </div>
                                            </td>
                                            <td className="align-middle text-center">
                                                <button className="btn btn-outline-danger rounded-5" onClick={() => updateFromDFSK(item.codigo)} ><i className="bi bi-search"></i></button>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        }
                    </div>
                </div>
                <div className='col-md-5 col-lg-4 order-md-last rounded-5 shadow-sm p-3'>
                    <h6 className='text-center p-2'>Agregar Vehículos desde el Sistema Principal</h6>
                    <div className="row p-2 pt-3">
                        <div className="col-6 my-auto">
                            <input className="form-control me-2 rounded-5 shadow-sm my-auto" onChange={(e) => setFilterDFSKData(e.target.value)} type="search" placeholder="Artículo..." aria-label="Buscar" />
                        </div>
                        <div className="col-6">
                            <button type="button" className="btn btn-outline-danger rounded-5" onClick={() => filterDFSKData !== "" ? setSearchDFSK(true) : null}>
                                Agregar Vehículo <i className="bi bi-truck-flatbed"></i>
                            </button>
                        </div>
                    </div>
                    <div className="row p-2 pt-3 d-flex justify-content-center" style={{ minHeight: '45vh', maxHeight: '65vh', overflowY: 'auto' }}>
                        {searchDFSK ? <Spinner /> :
                            <ol className="list-group list-group-numbered rounded-5">
                                {vehicleDFSKData.map((item) => (
                                    <li key={item.articulo} className="list-group-item d-flex justify-content-between align-items-center">
                                        <div className="ms-2 me-auto">
                                            <div className="fw-bold">{item.articulo} {item.descripcion}</div>
                                            {item.modelo} - {item.marca} - {item.ano}
                                        </div>
                                        <button className="btn btn-danger rounded-5"  title='Insertar/Actualizar' onClick={() => CreateVehicle(item)}><i className="bi bi-arrow-down-up"></i></button>
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
