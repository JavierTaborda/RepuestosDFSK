import React from 'react';
import { useState, useEffect } from "react"
import { toast } from 'react-toastify';
import CardRepuesto from "../components/CardRepuesto";
import Spinner from '../components/forms/Spinner';

const URI1 = 'http://localhost:5116/api/Articulos/Existencia';
const URI2 = 'http://localhost:5116/api/Articulos/CodigosGrupo';
const URI3 = 'http://localhost:5116/api/Articulos/CodigosMarca';

export default function RepuestosBodega({ addToCart }) {

    const [isLoading, setIsLoading] = useState(true); // Estado para controlar la carga
    const [dataRepuesto, setRepuestos] = useState([]);
    const [dataMarca, setMarca] = useState([]);
    const [dataGrupo, setGrupo] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [stringMarca, setStringMarca] = useState("*")
    const [stringGrupo, setStringGrupo] = useState("*")
    const [stringDescripcion, setStringDescripcion] = useState("*")

    const itemsPerPage = 12; // Cambia esto según tus necesidades
    const startIndex = (currentPage - 1) * itemsPerPage;
    var visibleRepuestos = dataRepuesto?.slice(startIndex, startIndex + itemsPerPage);
    var textSearch
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

    const filterMarca = async () => {
        try {
            setIsLoading(true);

            const URIM = 'http://localhost:5116/api/Articulos/Bodega/Marca/' +
                encodeURIComponent(stringMarca) + '/' + encodeURIComponent(stringGrupo)+'/'
                + encodeURIComponent(stringDescripcion);

           
            console.log(URIM);

            const response = await fetch(URIM);
            if (!response.ok) {
                notifyerror('Error de la petición.');
            }

            const dataRepuesto = await response.json();
            setRepuestos(dataRepuesto);
            notifysuccess();

            // Resto de las operaciones después de obtener los datos
            handlePageChange(1);
            visibleRepuestos = dataRepuesto?.slice(startIndex, startIndex + itemsPerPage);
        } catch (error) {
            notifyerror('Error de la petición:'+error.message);
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        if (!isLoading) {
            filterMarca();
        }
       
    }, [stringMarca, stringGrupo], [stringDescripcion]);

    useEffect(() => {
      

        const fetchRepuestos = () => fetch(URI1).then(response => response.json());
        const fetchGrupos = () => fetch(URI2).then(response => response.json());
        const fetchMarca = () => fetch(URI3).then(response => response.json());

        Promise.all([fetchRepuestos(), fetchGrupos(), fetchMarca()])
            .then(([dataRepuesto, dataGrupo, dataMarca]) => {

                setRepuestos(dataRepuesto);
                setGrupo(dataGrupo);
                setMarca(dataMarca);
            })
            .catch(error => {
                notifyerror("Error en la carga de datos: " + error.message);
            })
            .finally(() => setIsLoading(false));
   

    }, []);


    const handlePageChange = (pageNumber) => {
        setCurrentPage(pageNumber);
    };

    return (
        <>

            <h2 className="bd-title text-center mb-0 pt-2">Inventario de Repuestos</h2>

            <div className="container my-5">

                <div className=" d-flex flex-wrap justify-content-between align-items-center p-3">

                    <form className="d-flex pe-2 pt-3" role="search">
                        <input className="form-control me-2 rounded-5 shadow-sm" type="search" placeholder="Buscar..." 
                          onChangeCapture={(e) => setStringDescripcion(e.target.value)} aria-label="Buscar" />
                        <button className="btn btn-outline-danger rounded-5  shadow-sm" type="button"onClick={() => setStringDescripcion()}>
                            Buscar
                        </button>
                    </form>

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
                            <i className=" bi bi-sort-down" /> Ordenar por:
                        </button>
                        <ul className="dropdown-menu shadow">
                            <li><a className="dropdown-item" href="#">Existencia</a></li>
                            <li><a className="dropdown-item" href="#">Mayor Precio</a></li>
                            <li><a className="dropdown-item" href="#">Menor Precio</a></li>
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
                    
                { dataRepuesto?.length >0 ?(
                        
                   
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
                </div>): null}
                <div className="d-flex justify-content-center mt-4 mb-2">
                    {dataRepuesto?.length}  elementos
                </div>

            </div>
        </>
    );
}