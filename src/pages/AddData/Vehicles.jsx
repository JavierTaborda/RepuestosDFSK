import React, { useEffect, useState } from 'react'
import { toast } from 'react-toastify';
import Spinner from '../../components/forms/Spinner';
import {
    getVehiculos,
    UpdateAddVehicle,
    getVehiculosFilter,
    updateVehiculo,
    getModeloTexto,
    getModeloFilters
}from '../../services/VehiclesService';


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
        descripcion: '',
        marca: '',
        modelo: '',
        anho: '',
        vin: '',
        estatus: true,
    });

    const updateVehicle = async (vehiculo) => {
        vehiculo.estatus = !vehiculo.estatus;
        try {
            const response = await updateVehiculo(vehiculo);
            toast.success(`Se actualizó el estado del vehículo ${response.modelo} a ${response.estatus ? "Activo" : "Inactivo"}   `);

        } catch (error) {
            toast.error(`No se logró actualizar el estado del vehículo: ${error}`);
        }
        finally {
            RefreshData();
        }
    };


    const GetVehicleDFSK = async () => {
        setSearchDFSK(true);
        const response = await getModeloTexto(filterDFSKData);
        setVehicleDFSKData(response);
        setSearchDFSK(false);
    };

    const CallUpdateAddVehicle = () => {
        try {
            const response = UpdateAddVehicle(formVehicleData);

            toast.success(`Se actualizó el modelo de vehículo ${formVehicleData.modelo}`);
            RefreshData();
        } catch (error) {
            toast.error(`No se logró actualizar el modelo del vehículo: ${error}`);
        }
    };

    //refresh or getdata
    const RefreshData = async () => {
        try {
            setSearchData(true);
            let response;

            if (filterData.length === 0) {
                response = await getVehiculos();
            } else {

                response = await getVehiculosFilter(filterData);
            }

            if (response.length === 0) { toast.error("No se encontraron datos."); }
            setVehicleData(response);

        } catch (error) {
            toast.error(error.response?.data || "Error de conexión a los datos.");
        }
        finally {
            setSearchData(false);
        }
    };


    //Add new vehicle from Sistem Dfsk
    const CreateVehicle = (vehiclearticulos) => {
        setFormVehicleData({
            idVehiculo: vehiclearticulos.idVehiculo || 0,
            descripcion: vehiclearticulos.descripcion,
            modelo: vehiclearticulos.modelo1,
            marca: vehiclearticulos.marca,
            anho: vehiclearticulos.ano,
            estatus: true,
        });
    };

    const updateFromDFSK = async (modelo) => {
        try {

            const response = await getModeloFilters(modelo.modelo, modelo.marca, modelo.anho);
            setVehicleDFSKData(response);
            if (response.length > 0) {
                toast.info('Valide el resultado de la busqueda, en el panel.');
            }
            else {
                toast.warning('No se encontraron datos.');
            }
        } catch (error) {

            toast.warning('ocurrió un error en la búsqueda. ' + error.message);

        }
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
            RefreshData();
        }
    }, [searchData]);

    useEffect(() => {
        if (searchDFSK) {
            GetVehicleDFSK();
        }
    }, [searchDFSK]);

    useEffect(() => {
        if (vehicleDFSKData.length >= 1) {
            CallUpdateAddVehicle();
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
                                        <th>Modelo</th>
                                        <th>Descripción</th>
                                        <th>Marca</th>
                                        <th>Año</th>
                                        <th className='text-center'>Estado</th>
                                        <th className='text-center'>Actualizar</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {vehicleData?.map((item) => (
                                        <tr key={item.idVehiculo} className='p-1'>
                                            <td className="align-middle">{item.modelo}</td>
                                            <td className="align-middle">{item.descripcion}</td>
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
                                                <button className="btn btn-outline-danger rounded-5" onClick={() => updateFromDFSK(item)} ><i className="bi bi-search"></i></button>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        }
                    </div>
                </div>
                <div className='col-md-5 col-lg-4 order-md-last rounded-5 shadow-sm p-3'>
                    <h6 className='text-center p-2'>Agregar Modelos de Vehículos desde el Sistema Principal</h6>
                    <div className="row p-2 pt-3">
                        <div className="col-6 my-auto">
                            <input className="form-control me-2 rounded-5 shadow-sm my-auto" onChange={(e) => setFilterDFSKData(e.target.value)} type="search" placeholder="Artículo..." aria-label="Buscar" />
                        </div>
                        <div className="col-6">
                            <button type="button" className="btn btn-outline-danger rounded-5" onClick={() => filterDFSKData !== "" ? setSearchDFSK(true) : null}>
                                Agregar Modelo <i className="bi bi-truck-flatbed"></i>
                            </button>
                        </div>
                    </div>
                    <div className="row p-2 pt-3 d-flex justify-content-center" style={{ minHeight: '45vh', maxHeight: '65vh', overflowY: 'auto' }}>
                        {searchDFSK ? <Spinner /> :
                            <ol className="list-group list-group-numbered rounded-5">
                                {vehicleDFSKData.map((item) => (
                                    <li key={item.idmodelo} className="list-group-item d-flex justify-content-between align-items-center">
                                        <div className="ms-2 me-auto">
                                            <div className="fw-bold">{item.modelo1} {item.descripcion}</div>
                                            {item.modelo1} - {item.marca} - {item.ano}
                                        </div>
                                        <button className="btn btn-danger rounded-5" title='Insertar/Actualizar' onClick={() => CreateVehicle(item)}><i className="bi bi-arrow-down-up"></i></button>
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
