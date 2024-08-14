import React from 'react';
import { useState, useEffect } from "react"
import { toast } from 'react-toastify';
import CardRepuesto from "../components/CardRepuesto";
import Spinner from '../components/Spinner';

const URI1 = 'http://localhost:5116/api/Articulos/Existencia';
const URI2 = 'http://localhost:5116/api/Articulos/Existencia';
const URI3 = 'http://localhost:5116/api/Articulos/Existencia';

export default function RepuestosBodega({ addToCart }) {

    const [isLoading, setIsLoading] = useState(true); // Estado para controlar la carga
    const [dataRepuesto, setRepuestos] = useState([]);
    const [dataMarca, setMarca] = useState([]);
    const [dataGrupo, setGrupo] = useState([]);

    const toastId = React.useRef(null);//Dont repeat the notification
    //TODO: refactor this function to only one for all app
    const notifyerror = (error) => {
        if (!toast.isActive(toastId.current)) {
            toastId.current = toast.error(error, {
                draggable: true
            });
        }
    }
    const notifysuccess = () => {
        if (!toast.isActive(toastId.current)) {
            toastId.current = toast.success("Cargado exitoso", {
                draggable: true
            });
        }
    }


    // useEffect(() => {
    //     fetch(URI)
    //         .then(response => response.json())
    //         .then(dataRepuesto => {
    //             setRepuestos(dataRepuesto);
    //             notifysuccess();
    //         })
    //         .catch(error => {
    //             console.error('Error fetching data:', error);
    //             notifyerror(error.message);
    //         });
    // }, []);

    const filterMarca= (marca) => {
        setIsLoading(false);
        console.log(marca)
        fetch('http://localhost:5116/api/Articulos/Bodega/Marca/' + marca)
                .then(response => response.json())
                .then(dataRepuesto => {
                    setRepuestos(dataRepuesto);
                    notifysuccess();
                })
                .catch(error => {
                    console.error('Error fetching data:', error);
                    notifyerror(error.message);
                })
                 .finally(() => setIsLoading(false));
            
    }

    useEffect(() => {

        const fetchRepuestos = () => fetch(URI1).then(response => response.json());
        const fetchGrupos = () => fetch(URI2).then(response => response.json());
        const fetchMarca = () => fetch(URI3).then(response => response.json());

        Promise.all([fetchRepuestos(), fetchGrupos(), fetchMarca()])
            .then(([dataRepuesto, dataMarca, dataGrupo]) => {

                setRepuestos(dataRepuesto);
                setGrupo(dataGrupo);
                setMarca(dataMarca);
            })
            .catch(error => {
                notifyerror("Error en la carga de datos: " + error.message);
            })
            .finally(() => setIsLoading(false));
    }, []);

    // TODO: check object empty
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 12; // Cambia esto según tus necesidades
    const startIndex = (currentPage - 1) * itemsPerPage;
    const visibleRepuestos = dataRepuesto?.slice(startIndex, startIndex + itemsPerPage);
    const handlePageChange = (pageNumber) => {
        setCurrentPage(pageNumber);
    };

    return (
        <>

            <h2 className="bd-title text-center mb-0 pt-2">Inventario de Repuestos</h2>

            <div className="container my-5">

                <div className=" d-flex flex-wrap justify-content-between align-items-center p-3">

                    <form className="d-flex pe-2 pt-3" role="search">
                        <input className="form-control me-2 rounded-5 shadow-sm" type="search" placeholder="Buscar..." aria-label="Buscar" />
                        <button className="btn btn-outline-danger rounded-5  shadow-sm" type="button">Buscar</button>
                    </form>

                    <div className="btn-group ps-2 pt-3" role="group">
                        <button type="button" className="btn btn-outline-danger dropdown-toggle rounded-5 shadow-sm" data-bs-toggle="dropdown" aria-expanded="false">
                            <i className="bi bi-funnel" /> MARCA:
                        </button>
                        <ul className="dropdown-menu shadow">
                            <li><a className="dropdown-item" href="#">DFSK</a></li>
                            <li><a className="dropdown-item" href="#">BLUESKY</a></li>
                            <li><a className="dropdown-item" href="#">SHINERAY</a></li>
                        </ul>
                    </div>

                    <div className="btn-group ps-2 pt-3 " role="group">
                        <button type="button" className="btn btn-outline-danger dropdown-toggle rounded-5 shadow-sm" data-bs-toggle="dropdown" aria-expanded="false">
                            <i className="bi bi-funnel" /> GRUPO:
                        </button>
                        <ul className="dropdown-menu shadow">
                            {dataMarca.map((item) => (
                                <li key={item.codigo}>
                                    <a onClick={() => filterMarca(item.marca)} className="dropdown-item">{item.marca}</a>
                                </li>
                            ))}
                        </ul>
                    </div>
                
                    <div className="btn-group ps-2 pt-3" role="group">
                        <button type="button" className="btn btn-outline-danger dropdown-toggle rounded-5 shadow-sm" data-bs-toggle="dropdown" aria-expanded="false">
                            <i className=" bi bi-sort-down" /> Ordenar por:
                        </button>
                        <ul className="dropdown-menu shadow">
                            <li><a className="dropdown-item" href="#">Existencia</a></li>
                            <li><a className="dropdown-item" href="#">Mayor Precio</a></li>
                            <li><a className="dropdown-item" href="#">Menor Precio</a></li>
                        </ul>
                    </div>
                </div>

  

                <div className="d-flex justify-content-center mt-4 mb-2">
                    <div className="btn-group" role="group" aria-label="Basic mixed styles example">
                        <button
                            className="btn btn-outline-danger"
                            onClick={() => handlePageChange(currentPage - 1)}
                            disabled={currentPage === 1}
                        >
                            Anterior
                        </button>
                        <button type="button" className="btn btn-danger"> {currentPage} / { Math.ceil(dataRepuesto?.length / itemsPerPage) } 
                        </button>

                        <button
                            className="btn btn-outline-danger"
                            onClick={() => handlePageChange(currentPage + 1)}
                            disabled={currentPage === Math.ceil(dataRepuesto?.length / itemsPerPage)}
                        >
                            Siguiente
                        </button>
                    </div>
                </div>

                <div className="row">
                    {isLoading ? (
                        <Spinner />
                    ) : (
                        visibleRepuestos.map((item) => (
                            <CardRepuesto key={item.articulo} repuestos={item} addToCart={addToCart} />
                        ))
                    )}
                </div>

                {/* Agrega los botones de paginación */}

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
                </div>

            </div>
        </>
    );
}