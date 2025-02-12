import React, { useState, useEffect, useContext } from 'react';
import { toast } from 'react-toastify';
import { getVehiculosBodegas } from '../../services/ArticulosService';
import Spinner from '../../components/forms/Spinner';
import VehicleCard from '../../components/VehicleInventory/VeichleCard';
import VehicleSearch from '../../components/VehicleInventory/VehicleSearch';
import { AuthContext } from '../../context/AuthProvider';
import { getUsers } from '../../services/UserService';
import '../../components/VehicleInventory/VehiclesPage.css';

const VehiclesPage = () => {
    const { user, userAdmin, loadingAuth } = useContext(AuthContext); // Usa loadingAuth
    const [vehicles, setVehicles] = useState([]);
    const [userdata, setUsersData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [loadingUsers, setLoadingUsers] = useState(false);
    const [searchQuery, setSearchQuery] = useState('');
    const [selectedBodega, setSelectedBodega] = useState('');
    const [manualBodega, setManualBodega] = useState('');

    const fetchVehicles = async (bodega) => {
        setLoading(true);
        try {
            const data = await getVehiculosBodegas(bodega);
            setVehicles(data);
        } catch (error) {
            toast.error('No se pueden obtener los vehículos. Inténtalo de nuevo.');
        } finally {
            setLoading(false);
        }
    };

    const getUsersList = async () => {
        setLoadingUsers(true);
        try {
            const response = await getUsers();
            setUsersData(response);
        } catch (error) {
            toast.error("Error en la carga de datos: " + error.message);
        } finally {
            setLoadingUsers(false);
        }
    };

    useEffect(() => {
        if (!loadingAuth && user) { // Espera a que loadingAuth sea false
            if (userAdmin) {
                getUsersList();
            }
            fetchVehicles(user.bodega);
            setSelectedBodega(user.bodega);
        }
    }, [user, userAdmin, loadingAuth]); // Agrega loadingAuth como dependencia

    useEffect(() => {
        if (selectedBodega !== '' && user) {
            fetchVehicles(selectedBodega);
        }
    }, [selectedBodega]);

    const handleBodegaChange = (bodega) => {
        setSelectedBodega(bodega);
        setManualBodega('');
    };

    const handleManualBodegaChange = (event) => {
        const value = event.target.value;
        setManualBodega(value);
        setSelectedBodega(value);
    };

    const filteredVehicles = vehicles.filter(vehicle =>
        vehicle.descripcion.toLowerCase().includes(searchQuery.toLowerCase()) ||
        vehicle.modelo.toLowerCase().includes(searchQuery.toLowerCase()) ||
        vehicle.color.toLowerCase().includes(searchQuery.toLowerCase())
    );

    // Muestra un spinner si el contexto aún está cargando
    if (loadingAuth) {
        return (
            <div className="d-flex justify-content-center align-items-center vh-100">
                <Spinner />
            </div>
        );
    }

    // Si no hay usuario o userAdmin es null, muestra un mensaje
    if (!user || userAdmin === null) {
        return <div>No hay datos de usuario disponibles.</div>;
    }

    return (
        <div className="vehicles-container container-fluid">
            <h2 className="text-start mb-0 mt-2">Inventario de Vehículos</h2>
            <div className="d-flex justify-content-center mb-4 text-start pt-3 flex-column flex-md-row">
                {userAdmin ? (
                    <>
                        <h5 className="text-start mt-1">Selecciona una bodega:</h5>
                        <select
                            className="form-select"
                            id="idUsuario"
                            name="idUsuario"
                            value={selectedBodega}
                            onChange={(e) => handleBodegaChange(Number(e.target.value))}
                            required
                            style={{ width: '100%', maxWidth: '200px', marginLeft: '10px' }}
                        >
                            {loadingUsers ? (
                                <option>Cargando...</option>
                            ) : (
                                <>
                                    {userdata.map((data) => (
                                        <option key={data.idUsuario} value={data.bodega}>
                                            {data.nombre} - {data.bodega}
                                        </option>
                                    ))}
                                </>
                            )}
                        </select>
                        <input
                            type="number"
                            className="form-control"
                            placeholder="ingresa manualmente.."
                            value={manualBodega}
                            onChange={handleManualBodegaChange}
                            style={{ width: '100%', maxWidth: '200px', marginLeft: '10px' }}
                        />
                    </>
                ) : (
                    <>
                        <button
                            className={`btn btn-outline-danger me-2 ${selectedBodega === 0 ? 'active' : ''}`}
                            onClick={() => handleBodegaChange(0)}
                        >
                            Patio
                        </button>
                        <button
                            className={`btn btn-outline-danger ${selectedBodega === user.bodega ? 'active' : ''}`}
                            onClick={() => handleBodegaChange(user.bodega)}
                        >
                            Mi Inventario
                        </button>
                    </>
                )}
            </div>
            <VehicleSearch searchQuery={searchQuery} handleSearchChange={setSearchQuery} />
            {loading ? (
                <div className="d-flex justify-content-center align-items-center">
                    <Spinner />
                </div>
            ) : (
                <div className="row">
                    {filteredVehicles.length > 0 ? (
                        filteredVehicles.map((vehicle) => (
                            <VehicleCard key={vehicle.articulo} vehicle={vehicle} bodega={selectedBodega} />
                        ))
                    ) : (
                        <div className="col-12">
                            <p className="text-center">No se encontraron vehículos.</p>
                        </div>
                    )}
                </div>
            )}
        </div>
    );
};

export default VehiclesPage;