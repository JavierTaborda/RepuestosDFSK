import React, { useState, useEffect, useContext } from 'react';
import { toast } from 'react-toastify';
import Spinner from '../../components/forms/Spinner';
import CartTable from '../../components/RequestRepuestos/CartTable';
import FormSolicitud from '../../components/RequestRepuestos/Forms/FormSolicitud';
import HttpClient from '../../services/HttpClient';
import dayjs from 'dayjs';
import { AuthContext } from '../../context/AuthProvider';
import { motion } from 'framer-motion';
import { ins } from 'framer-motion/client';
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
        //console.log(listSolicitudes);
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
                    console.log(resumenData);
                    const response = await HttpClient.post("Solicitudes", resumenData)
                    if (response.status === 200) {
                        clearCart();
                        toast.success("Solicitud registrada correctamente");

                    } else {
                        toast.error("Error al registrar la solicitud");
                    }

                } catch (error) {
                    console.log(error);
                    toast.error("Error en la solicitud: " + error.message);
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

            if (cart.length === 0) {
                setloadData(false);
                return;
            }

            const listArticulos = cart.map(repuesto => ({
                codigo: repuesto.articulo,
                nombre: repuesto.descripcion,
                marca: repuesto.marca
            }));

            //console.log(listArticulos);

            const fetchRepuestos = () => HttpClient.post('Repuestos/codigos', listArticulos);
            const fetchDataInicial = () => HttpClient.get('Solicitudes/DatosIniciales');

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

    }), [];



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

                        <div className='col-md-5 col-lg-4 order-md-last rounded-5 shadow-sm p-1'>
                            <div className="table-responsive" style={{ maxHeight: '70vh', overflowY: 'auto' }}>
                                {isEmpty ? <p className='text-center'>No posee repuestos a solicitar.</p> :

                                    !createSolicitud ? null :

                                        isLoading ? <Spinner /> : <FormSolicitud
                                            setResumenData={setResumenData}
                                            onSubmit={insertSolicitud}
                                        />
                                      
                                }

                            </div>
                        </div>
                    </div>
                </motion.div>
            </div>
        </>
    );
}

export default Solicitud;
