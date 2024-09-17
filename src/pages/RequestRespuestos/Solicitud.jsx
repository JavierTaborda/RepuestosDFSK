import React, { useState, useEffect, useContext } from 'react';
import { toast } from 'react-toastify';
import Spinner from '../../components/forms/Spinner';
import CartTable from '../../components/RequestRepuestos/CartTable';
import apiUrl from '../../services/apiConfig';
import dayjs from 'dayjs';
import { AuthContext } from '../../context/AuthProvider';
function Solicitud({ cart, removeFromCart, increaseQuantity, decreaseQuantity, clearCart, isEmpty, carTotal }) {
    
    const { user } = useContext(AuthContext);
    const [isLoading, setIsLoading] = useState(false);
    const [estadosData, setEstadosData] = useState(1);
    const [responsablesData, setResponsablesData] = useState(1);
    const [vehiculoData, setVehiculoData] = useState(1);



    const [resumenData, setResumenData] = useState({
        idResumenSolicitud: 0,
        fechaCreacion: dayjs(new Date()).format('YYYY-MM-DDTHH:mm:ss'),
        estatus: true,
        fechaCierre: dayjs(new Date(new Date().setDate(new Date().getDate() + 5))).format('YYYY-MM-DDTHH:mm:ss'),
        observacion: '',
        idVendedor: 0,
        solicitudes: []
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setResumenData({ ...resumenData, [name]: value });
    };

    const createlistSolicitudes = () => {
        const listSolicitudes = cart.map((item) => ({
            idSolicitud: 0,
            idResumenSolicitud: 0,
            idResponsableSolicitud: responsablesData,
            idRepuesto: 1,
            cantidad: item.quantity,
            idEstado: estadosData,
            fechaSolicitud: dayjs(new Date()).format('YYYY-MM-DDTHH:mm:ss'),
            precio: item.venta,
            observacion: '',
        }));
        setResumenData((prevData) => ({ ...prevData, solicitudes: listSolicitudes }));
        return true;
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        setIsLoading(true);
        createlistSolicitudes();
    };



    useEffect(() => {
        if (isLoading) {
            async function fetchData() {
                console.log(resumenData);
                // try {

                //     const response = await fetch(apiUrl+"/Solicitudes", {
                //         method: "POST",
                //         headers: {
                //             "Content-Type": "application/json",
                //         },
                //         body: JSON.stringify(resumenData),
                //     });

                //     if (response.ok) {
                //         toast.success("Solicitud registrada correctamente");
                //     } else {
                //         toast.error("Error al registrar la solicitud");
                //     }
                //     console.log(response);
                // } catch (error) {
                //     toast.error("Error en la solicitud: ");
                // }

                setIsLoading(false);
            }

            fetchData();
        }
    }), [resumenData];

    useEffect(() => {

        
        // const fetchRepuestos = () => fetch(URI1).then(response => response.json());
        // const fetchGrupos = () => fetch(URI2).then(response => response.json());
        // const fetchMarca = () => fetch(URI3).then(response => response.json());

        // Promise.all([fetchRepuestos(), fetchGrupos(), fetchMarca()])
        //     .then(([dataRepuesto, dataGrupo, dataMarca]) => {

        //         setRepuestos(dataRepuesto);
        //         setGrupo(dataGrupo);
        //         setMarca(dataMarca);
        //     })
        //     .catch(error => {
        //         notifyerror("Error en la carga de datos: " + error.message);
        //     })
        //     .finally(() => setIsLoading(false));


    }, []);

    if (!user) {
        return <div><Spinner /></div>;
    }
    return (
        <>
            {!user ? (
                <><Spinner /></>
            ) : (

                <div className='container pt-2'>
                    <div className='row p-2  px-2'>
                        <div className='col-md-7 col-lg-8 shadow-sm rounded-5 p-4 '>
                            <div className="table-responsive" style={{ maxHeight: '70vh', overflowY: 'auto' }}>
                                <CartTable
                                    cart={cart}
                                    removeFromCart={removeFromCart}
                                    increaseQuantity={increaseQuantity}
                                    decreaseQuantity={decreaseQuantity}
                                    clearCart={clearCart}
                                    isEmpty={isEmpty}
                                    carTotal={carTotal}
                                    sendForm={true}
                                />
                            </div>
                        </div>
                        <div className='col-md-5 col-lg-4 order-md-last rounded-5 shadow-sm p-4'>

                            {isEmpty ? <p className='text-center'>No posee repuestos a solicitar.</p> :

                                isLoading ? <Spinner /> :
                                    <form onSubmit={handleSubmit} className="p-3 list-group">
                                        <div className="row g-3">
                                            <div className="col-12 pt-3">
                                                <h5 className='text-center pb-2'>Solicitud</h5>
                                                <input
                                                    type="text"
                                                    className="form-control"
                                                    id="estado"
                                                    name="idEstado"
                                                    disabled
                                                    value="Registro Inicial"
                                                />
                                            </div>
                                            <div className="col-12 pt-2">
                                                <label htmlFor="fechainicial" className="form-label">Fecha de Solicitud</label>
                                                <input
                                                    type="datetime"
                                                    className="form-control"
                                                    id="fechainicial"
                                                    name="fechaSolicitud"
                                                    value={resumenData.fechaCreacion}
                                                    disabled
                                                />
                                            </div>
                                            <div className="col-12 pt-2">
                                                <label htmlFor="fechacierre" className="form-label">Fecha de Cierre Esperada</label>
                                                <input
                                                    type="datetime-local"
                                                    className="form-control"
                                                    id="fechacierre"
                                                    name="fechaCierre"
                                                    value={resumenData.fechaCierre}
                                                    onChange={handleChange}
                                                />
                                            </div>
                                            <div className="col-12 pt-2">
                                                <label htmlFor="vendedor" className="form-label">Solicitante</label>
                                                <input
                                                    type="input"
                                                    className="form-control"
                                                    placeholder="Vendedor/Concesionario"
                                                    // id="vendedor"
                                                    // name="idVendedor"
                                                    value={user.name}
                                                    onChange={handleChange}
                                                />
                                            </div>
                                            <div className="col-12 pt-2">
                                                <label htmlFor="textarea" className="form-label">Observación</label>
                                                <textarea
                                                    className="form-control"
                                                    id="textarea"
                                                    rows="3"
                                                    placeholder="Comentarios..."
                                                    name="observacion"
                                                    value={resumenData.observacion}
                                                    onChange={handleChange}
                                                />
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

            )}
        </>
    );
}

export default Solicitud;
