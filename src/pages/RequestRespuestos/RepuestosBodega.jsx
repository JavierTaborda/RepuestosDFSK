import React from 'react';
import { useState, useEffect, useContext } from "react"
import { toast } from 'react-toastify';
import CardRepuesto from "../../components/RequestRepuestos/CardRepuesto";
import Spinner from '../../components/forms/Spinner';
import { AuthContext } from '../../context/AuthProvider';
import HttpClient from '../../services/HttpClient';

const URI1 = `/Articulos/Existencia`;
const URI2 = `/Articulos/CodigosGrupo`;
const URI3 = `/Articulos/CodigosMarca`;

export default function RepuestosBodega({ addToCart }) {
    const { user } = useContext(AuthContext);
    const [isLoading, setIsLoading] = useState(true); // Estado para controlar la carga
    const [dataRepuesto, setRepuestos] = useState([]);
    const [dataMarca, setMarca] = useState([]);
    const [dataGrupo, setGrupo] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [stringMarca, setStringMarca] = useState("*")
    const [stringGrupo, setStringGrupo] = useState("*")
    const [stringDescripcion, setstringDescripcion] = useState("*")
    const [stringTextSearch, setstringTextSearch] = useState("")
    const [orderData, setorderData] = useState("")

    const itemsPerPage = 12; // Cambia esto según tus necesidades
    const startIndex = (currentPage - 1) * itemsPerPage;
    var visibleRepuestos = dataRepuesto?.slice(startIndex, startIndex + itemsPerPage);

    const toastId = React.useRef(null);//Dont repeat the notification

    const notifyerror = (error) => {
        if (!toast.isActive(toastId.current)) {
            toastId.current = toast.error(error, {
                draggable: true
            });
        }
    }
    const notifysuccess = () => {
        if (!toast.isActive(toastId.current)) {
            toastId.current = toast.success("Cargado exitoso ", {
                draggable: true
            });
        }
    }


    useEffect(() => {
        const fetchRepuestos = () => HttpClient.get(URI1);
        const fetchGrupos = () => HttpClient.get(URI2);
        const fetchMarca = () => HttpClient.get(URI3);

        Promise.all([fetchRepuestos(), fetchGrupos(), fetchMarca()])
            .then(([dataRepuesto, dataGrupo, dataMarca]) => {
                setRepuestos(dataRepuesto.data);
                setGrupo(dataGrupo.data);
                setMarca(dataMarca.data);
            })
            .catch(error => {
                notifyerror("Error en la carga de datos: " + error.message);
            })
            .finally(() => setIsLoading(false));
    }, []);


    const filterMarca = async () => {
        try {
            setIsLoading(true);

            const URIM = `/Articulos/Bodega/Marca/${encodeURIComponent(stringMarca)}/${encodeURIComponent(stringGrupo)}/${encodeURIComponent(stringDescripcion === "" ? "*" : stringDescripcion)}`;

            const response = await HttpClient.get(URIM);
            const dataRepuesto = response.data;

            setRepuestos(dataRepuesto);

            // SORT
            dataRepuesto.sort((a, b) => {
                if (orderData === "Mayor Existencia") {
                    return b.existencia - a.existencia;
                } else if (orderData === "Menor Existencia") {
                    return a.existencia - b.existencia;
                } else if (orderData === "Mayor Precio") {
                    return b.venta - a.venta;
                } else {
                    return a.venta - b.venta;
                }
            });

            // Paging
            handlePageChange(1);
            visibleRepuestos = dataRepuesto?.slice(startIndex, startIndex + itemsPerPage);
        } catch (error) {
            notifyerror('Error de la petición: ' + error.message);
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        if (!isLoading) {

            filterMarca();
        }

    }, [stringMarca, stringGrupo, stringDescripcion, orderData]);


    const handlePageChange = (pageNumber) => {
        setCurrentPage(pageNumber);
    };


    return (
        <>
            <h2 className="bd-title text-center mb-0 pt-2">Inventario de Repuestos</h2>

            <div className="container my-5">

                <div className=" d-flex flex-wrap justify-content-between align-items-center p-3">

                    <div className="d-flex pe-2 pt-3" role="search">
                        <input className="form-control me-2 rounded-5 shadow-sm" value={stringTextSearch} onChange={(e) => setstringTextSearch(e.target.value)} type="search" placeholder="Buscar..." aria-label="Buscar" />
                        <button className="btn btn-outline-danger rounded-5  shadow-sm" type="button" onClick={() => setstringDescripcion(stringTextSearch)}>Buscar</button>
                    </div>
                    <div className="btn-group ps-2 pt-3" role="group">
                        <button type="button" className="btn btn-outline-danger dropdown-toggle rounded-5 shadow-sm" data-bs-toggle="dropdown" aria-expanded="false">
                            <i className="bi bi-funnel" /> MARCA : {stringMarca}
                        </button>
                        <ul className="dropdown-menu shadow">
                            <li><a onClick={() => setStringMarca('*')} className="dropdown-item" href="#">Todos</a></li>
                            {dataMarca.map((item) => (
                                <li key={item.codigo}>
                                    <a onClick={() => setStringMarca(item.descripcion)} className="dropdown-item">{item.descripcion}</a>
                                </li>
                            ))}
                        </ul>
                    </div>

                    <div className="btn-group ps-2 pt-3 " role="group">
                        <button type="button" className="btn btn-outline-danger dropdown-toggle rounded-5 shadow-sm" data-bs-toggle="dropdown" aria-expanded="false">
                            <i className="bi bi-funnel" /> GRUPO: {stringGrupo}
                        </button>
                        <ul className="dropdown-menu shadow">
                            <li><a onClick={() => setStringGrupo('*')} className="dropdown-item" href="#">Todos</a></li>
                            {dataGrupo.map((item) => (
                                <li key={item.codigo}>
                                    <a onClick={() => setStringGrupo(item.descripcion)} className="dropdown-item">{item.descripcion}</a>
                                </li>
                            ))}
                        </ul>
                    </div>

                    <div className="btn-group ps-2 pt-3" role="group">
                        <button type="button" className="btn btn-outline-danger dropdown-toggle rounded-5 shadow-sm" data-bs-toggle="dropdown" aria-expanded="false">
                            <i className=" bi bi-sort-down" /> Ordenar por: {orderData}
                        </button>
                        <ul className="dropdown-menu shadow">
                            <li><a onClick={() => setorderData('Mayor Existencia')} className="dropdown-item" href="#"> <i className="bi bi-sort-down"></i> Mayor Existencia</a></li>
                            <li><a onClick={() => setorderData('Menor Existencia')} className="dropdown-item" href="#"><i className="bi bi-sort-down-alt"></i> Menor Existencia</a></li>
                            <li><a onClick={() => setorderData('Mayor Precio')} className="dropdown-item" href="#"> <i className="bi bi-sort-down"></i> Mayor Precio</a></li>
                            <li><a onClick={() => setorderData('Menor Precio')} className="dropdown-item" href="#"><i className="bi bi-sort-down-alt"></i> Menor Precio</a></li>
                        </ul>
                    </div>
                </div>



                {dataRepuesto?.length > 0 ? (

                    <div className="d-flex justify-content-center mt-4 mb-2">
                        <div className="btn-group" role="group" aria-label="Basic mixed styles example">
                            <button
                                className="btn btn-outline-danger"
                                onClick={() => handlePageChange(currentPage - 1)}
                                disabled={currentPage === 1}
                            >
                                Anterior
                            </button>
                            <button type="button" className="btn btn-danger"> {currentPage} / {Math.ceil(dataRepuesto?.length / itemsPerPage)}
                            </button>

                            <button
                                className="btn btn-outline-danger"
                                onClick={() => handlePageChange(currentPage + 1)}
                                disabled={currentPage === Math.ceil(dataRepuesto?.length / itemsPerPage)}
                            >
                                Siguiente
                            </button>
                        </div>
                    </div>) : null}

                <div className="row">
                    {isLoading ? (
                        <Spinner />
                    ) : (

                        visibleRepuestos.map((item) => (
                            <CardRepuesto key={item.articulo} repuestos={item} addToCart={addToCart} />
                        ))

                    )}
                </div>

                {dataRepuesto?.length > 0 ? (


                    <div className="d-flex justify-content-center mt-4 mb-2">
                        <div className="btn-group" role="group" aria-label="Basic">
                            <button
                                className="btn btn-outline-danger"
                                onClick={() => handlePageChange(currentPage - 1)}
                                disabled={currentPage === 1}
                            >
                                Anterior
                            </button>
                            <button type="button" className="btn btn-danger"> {currentPage} / {Math.ceil(dataRepuesto?.length / itemsPerPage)}
                            </button>

                            <button
                                className="btn btn-outline-danger"
                                onClick={() => handlePageChange(currentPage + 1)}
                                disabled={currentPage === Math.ceil(dataRepuesto?.length / itemsPerPage)}
                            >
                                Siguiente
                            </button>
                        </div>
                    </div>) : null}
                <div className="d-flex justify-content-center mt-4 mb-2">
                    {dataRepuesto?.length}  elementos
                </div>

            </div>
        </>
    );
}