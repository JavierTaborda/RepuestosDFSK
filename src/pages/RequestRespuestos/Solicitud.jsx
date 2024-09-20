import React, { useState, useEffect, useContext } from 'react';
import { toast } from 'react-toastify';
import Spinner from '../../components/forms/Spinner';
import CartTable from '../../components/RequestRepuestos/CartTable';
import HttpClient from '../../services/HttpClient';
import dayjs from 'dayjs';
import { AuthContext } from '../../context/AuthProvider';
import { motion } from 'framer-motion';
function Solicitud({ cart, removeFromCart, increaseQuantity, decreaseQuantity, clearCart, isEmpty, carTotal }) {

    const { user } = useContext(AuthContext);
    const [isLoading, setIsLoading] = useState(false);
    const [dataRepuestos, setRepuestos] = useState([]);
    const [dataInicial, setdataInicial] = useState([]);
    const [loadData, setloadData] = useState(true);
    const [createSolicitud, setcreateSolicitud] = useState(false);


    const [resumenData, setResumenData] = useState({
        idResumenSolicitud: 0,
        fechaCreacion: dayjs(new Date()).format('YYYY-MM-DDTHH:mm:ss'),
        estatus: true,
        fechaCierre: dayjs(new Date(new Date().setDate(new Date().getDate() + 5))).format('YYYY-MM-DDTHH:mm:ss'),
        observacion: '',
        idVendedor: user?.user || 0,
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
            idResponsableSolicitud: dataInicial.Responsable,
            idRepuesto: dataRepuestos.find(x => x.codigo === item.articulo)?.idRepuesto,
            cantidad: item.quantity,
            idEstado: dataInicial.Estado,
            fechaSolicitud: dayjs(new Date()).format('YYYY-MM-DDTHH:mm:ss'),
            precio: item.venta,
            observacion: '',
        }));
        console.log(listSolicitudes);
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


                try {
                    if (resumenData.idVendedor === 0) {
                        resumenData.idVendedor = user.user;
                    }
                    console.log(resumenData);
                    const response = await HttpClient.post("/Solicitudes", resumenData)
                    if (response.status === 200) {
                        clearCart();
                        toast.success("Solicitud registrada correctamente");

                    } else {
                        toast.error("Error al registrar la solicitud");
                    }

                } catch (error) {
                    toast.error("Error en la solicitud: ");
                }
                finally {
                    setIsLoading(false);
                }

            }

            fetchData();
        }
    }), [resumenData];


    useEffect(() => {

        if (loadData) {
            console.log(cart);
            if (cart.length === 0) {
                setloadData(false);
                return;
            }

            const listArticulos = cart.map(repuesto => ({
                codigo: repuesto.articulo,
                nombre: repuesto.descripcion,
                marca: repuesto.marca
            }));

            console.log(listArticulos);

            const fetchRepuestos = () => HttpClient.post('/Repuestos/codigos', listArticulos);
            const fetchDataInicial = () => HttpClient.get('/Solicitudes/DatosIniciales');

            Promise.all([fetchRepuestos(), fetchDataInicial()])
                .then(([dataRepuesto, dataInicial]) => {
                    setRepuestos(dataRepuesto.data);
                    setdataInicial(dataInicial.data);
                    //console.log(dataInicial);
                    //console.log(dataRepuesto.data);
                    setcreateSolicitud(true);

                })
                .catch(error => {
                    toast.error("Error en la carga de datos: " + error.message);
                })
                .finally(() => setloadData(false));
        }

    }), [loadData];


    if (!user || loadData) {
        return <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '80vh' }}>
            <motion.div
                style={{ fontSize: '18px' }}
                initial={{ opacity: 1 }}
                animate={{ opacity: [1, 0, 1] }}
                transition={{ repeat: Infinity, duration: 1 }}
            >
                Cargando lista de repuestos...
            </motion.div>
            <Spinner />
        </div>
    }
    return (
        <>
            <h2 className="bd-title text-center mb-0 pt-2">Realizar Solicitud de Repuestos</h2>
            <div className='container pt-2'>
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 1 }}
                >
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

                                !createSolicitud ? null :

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
                                                    <label htmlFor="fechacierre" className="form-label">Fecha Deseada de Entrega </label>
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
                </motion.div>
            </div>
        </>
    );
}

export default Solicitud;
