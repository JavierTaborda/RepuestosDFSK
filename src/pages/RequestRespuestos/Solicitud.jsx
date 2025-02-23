import React, { useState, useEffect, useContext } from 'react';
import { toast } from 'react-toastify';
import Spinner from '../../components/forms/Spinner';
import CartTable from '../../components/RequestRepuestos/CartTable';
import FormSolicitud from '../../components/RequestRepuestos/Forms/FormSolicitud';
import dayjs from 'dayjs';
import { AuthContext } from '../../context/AuthProvider';
import { motion } from 'framer-motion';
import { getInitialData, postSolicitud } from '../../services/SolicitudesService';
import { listRepuestos } from '../../services/RepuestosService';

function Solicitud({ cart, removeFromCart, increaseQuantity, decreaseQuantity, clearCart, isEmpty, carTotal }) {
    const { user } = useContext(AuthContext);
    const [isLoading, setIsLoading] = useState(false);
    const [dataRepuestos, setRepuestos] = useState([]);
    const [dataInicial, setdataInicial] = useState([]);
    const [loadData, setloadData] = useState(true);
    const [createSolicitud, setcreateSolicitud] = useState(false);
    const [resumenData, setResumenData] = useState();

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
        setResumenData((prevData) => ({ ...prevData, solicitudes: listSolicitudes }));
    };

    const insertSolicitud = async (event) => {
        event.preventDefault();
        setIsLoading(true);
        createlistSolicitudes();
    };

    useEffect(() => {
        if (isLoading) {
            async function fetchData() {
                try {
                    if (resumenData.idUsuario === 0) {
                        resumenData.idUsuario = user.user;
                    }

                    const response = await postSolicitud(resumenData);
                    if (response) {
                        clearCart();
                        toast.success("¡Su compra ha sido exitosamente registrada!");
                    } else {
                        toast.error("Error al registrar su compra");
                    }
                } catch (error) {
                    console.log(error);
                    toast.error("Error en la solicitud: " + error.message);
                } finally {
                    setIsLoading(false);
                }
            }
            fetchData();
        }
    }, [resumenData]);

    useEffect(() => {
        if (loadData) {
            if (cart.length === 0) {
                setloadData(false);
                return;
            }
            const listArticulos = cart.map(repuesto => ({
                codigo: repuesto.articulo,
                nombre: repuesto.descripcion,
                marca: repuesto.marca,
                numParte: repuesto.numeroparte,
                precio: repuesto.venta,
                imagen: repuesto.urlimagen
            }));

            const fetchData = async () => {
                try {
                    const dataRepuesto = await listRepuestos(listArticulos);
                    setRepuestos(dataRepuesto);

                    const dataInicial = await getInitialData();
                    setdataInicial(dataInicial);

                    setcreateSolicitud(true);
                } catch (error) {
                    toast.error("Error en la carga de datos: " + error.message);
                } finally {
                    setloadData(false);
                }
            };
            fetchData();
        }
    }, []);

    if (!user || loadData) {
        return (
            <div className="d-flex justify-content-center align-items-center" style={{ height: '80vh' }}>
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
        );
    }

    return (
        <>
            <h2 className="text-start mb-0 p-3 ms-5 mt-2">Realizar Compra de Repuestos</h2>
            <div className="container">
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 1 }}
                >
                    <div className="row">
                        <div className="col-md-7 col-lg-8 mb-4">
                            <div className="p-4 rounded shadow bg-white">
                                <h5 className="text-center">Detalles del Carrito</h5>
                                <div className="table-responsive" style={{ minHeight: '60vh', maxHeight: '70vh', overflowY: 'auto' }}>
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
                        </div>

                        <div className="col-md-5 col-lg-4 order-md-last mb-4">
                            <div className="p-4 rounded shadow bg-white">
                                <h5 className="text-center">Resumen de Solicitud</h5>
                                <div style={{ minHeight: '65vh', maxHeight: '70vh', overflowY: 'auto' }}>
                                    {isEmpty ? <p className="text-center">No posee repuestos a solicitar.</p> :
                                        !createSolicitud ? null :
                                            isLoading ? <Spinner /> :
                                                <FormSolicitud
                                                    setResumenData={setResumenData}
                                                    onSubmit={insertSolicitud}
                                                />
                                    }
                                </div>
                            </div>
                        </div>
                    </div>
                </motion.div>
            </div>
        </>
    );
}

export default Solicitud;
