import React, { useState, useEffect, useContext, useRef, useMemo } from "react";
import { toast } from 'react-toastify';
import CardRepuesto from "../../components/RequestRepuestos/CardRepuesto";
import Spinner from '../../components/forms/Spinner';
import { AuthContext } from '../../context/AuthProvider';
import { getRepuestosFilters, getAllRepuestos } from '../../services/ArticulosService';

export default function RepuestosBodega({ addToCart }) {
    const { user } = useContext(AuthContext);
    const [isLoading, setIsLoading] = useState(true);
    const [dataRepuesto, setRepuestos] = useState([]);
    const [dataMarca, setMarca] = useState([]);
    const [dataGrupo, setGrupo] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [stringMarca, setStringMarca] = useState("*");
    const [stringGrupo, setStringGrupo] = useState("*");
    const [stringDescripcion, setStringDescripcion] = useState("*");
    const [stringTextSearch, setStringTextSearch] = useState("");
    const [orderData, setOrderData] = useState("");
    const itemsPerPage = 12;
    const toastId = useRef(null);
    const startIndex = useMemo(() => (currentPage - 1) * itemsPerPage, [currentPage]);

    const notifyError = (error) => {
        if (!toast.isActive(toastId.current)) {
            toastId.current = toast.error(error, { draggable: true });
        }
    };

    const notifySuccess = () => {
        if (!toast.isActive(toastId.current)) {
            toastId.current = toast.success("Cargado exitoso ", { draggable: true });
        }
    };

    useEffect(() => {
        const fetchData = async () => {
            try {
                const { repuestos, grupo, marca } = await getAllRepuestos();
                setRepuestos(repuestos);
                setGrupo(grupo);
                setMarca(marca);
                //notifySuccess();
            } catch (err) {
                console.error(err);
                notifyError(err.message);
            } finally {
                setIsLoading(false);
            }
        };
        fetchData();
    }, []);

    const filterMarca = async () => {
        try {
            setIsLoading(true);
            const dataRepuesto = await getRepuestosFilters(stringMarca, stringGrupo, stringDescripcion);
            const sortedRepuestos = sortRepuestos(dataRepuesto, orderData);
            setRepuestos(sortedRepuestos);
            handlePageChange(1); // Reset to first page
        } catch (error) {
            notifyError('Error de la petición: ' + error.message);
        } finally {
            setIsLoading(false);
        }
    };

    const sortRepuestos = (repuestos, order) => {
        return repuestos.sort((a, b) => {
            switch (order) {
                case "Mayor Existencia":
                    return b.existencia - a.existencia;
                case "Menor Existencia":
                    return a.existencia - b.existencia;
                case "Mayor Precio":
                    return b.venta - a.venta;
                case "Menor Precio":
                    return a.venta - b.venta;
                default:
                    return 0;
            }
        });
    };

    useEffect(() => {
        if (!isLoading) {
            filterMarca();
        }
    }, [stringMarca, stringGrupo, stringDescripcion, orderData]);

    const handlePageChange = (pageNumber) => {
        setCurrentPage(pageNumber);
    };

    const visibleRepuestos = useMemo(() => dataRepuesto.slice(startIndex, startIndex + itemsPerPage), [dataRepuesto, startIndex]);

    return (
        <>
            <h2 className="bd-title text-center mb-0 pt-2">Inventario de Repuestos</h2>
            <div className="container my-5">
                <div className="d-flex flex-wrap justify-content-between align-items-center p-3">
                    <div className="d-flex pe-2 pt-3" role="search">
                        <input
                            className="form-control me-2 rounded-5 shadow-sm"
                            value={stringTextSearch}
                            onChange={(e) => setStringTextSearch(e.target.value)}
                            type="search"
                            placeholder="Buscar..."
                            aria-label="Buscar"
                        />
                        <button
                            className="btn btn-outline-danger rounded-5 shadow-sm"
                            type="button"
                            onClick={() => setStringDescripcion(stringTextSearch)}
                        >
                            Buscar
                        </button>
                    </div>

                    <div className="btn-group ps-2 pt-3" role="group">
                        <button
                            type="button"
                            className="btn btn-outline-danger dropdown-toggle rounded-5 shadow-sm"
                            data-bs-toggle="dropdown"
                            aria-expanded="false"
                        >
                            <i className="bi bi-funnel" /> MARCA : {stringMarca}
                        </button>
                        <ul className="dropdown-menu shadow">
                            <li>
                                <a onClick={() => setStringMarca('*')} className="dropdown-item" href="#">Todos</a>
                            </li>
                            {dataMarca.map((item) => (
                                <li key={item.codigo}>
                                    <a onClick={() => setStringMarca(item.descripcion)} className="dropdown-item">
                                        {item.descripcion}
                                    </a>
                                </li>
                            ))}
                        </ul>
                    </div>

                    <div className="btn-group ps-2 pt-3" role="group">
                        <button
                            type="button"
                            className="btn btn-outline-danger dropdown-toggle rounded-5 shadow-sm"
                            data-bs-toggle="dropdown"
                            aria-expanded="false"
                        >
                            <i className="bi bi-funnel" /> GRUPO: {stringGrupo}
                        </button>
                        <ul className="dropdown-menu shadow">
                            <li>
                                <a onClick={() => setStringGrupo('*')} className="dropdown-item" href="#">Todos</a>
                            </li>
                            {dataGrupo.map((item) => (
                                <li key={item.idgrupo}>
                                    <a onClick={() => setStringGrupo(item.grupo)} className="dropdown-item">
                                        {item.grupo}
                                    </a>
                                </li>
                            ))}
                        </ul>
                    </div>

                    <div className="btn-group ps-2 pt-3" role="group">
                        <button
                            type="button"
                            className="btn btn-outline-danger dropdown-toggle rounded-5 shadow-sm"
                            data-bs-toggle="dropdown"
                            aria-expanded="false"
                        >
                            <i className="bi bi-sort-down" /> Ordenar por: {orderData}
                        </button>
                        <ul className="dropdown-menu shadow">
                            <li>
                                <a onClick={() => setOrderData('Mayor Existencia')} className="dropdown-item" href="#">
                                    <i className="bi bi-sort-down"></i> Mayor Existencia
                                </a>
                            </li>
                            <li>
                                <a onClick={() => setOrderData('Menor Existencia')} className="dropdown-item" href="#">
                                    <i className="bi bi-sort-down-alt"></i> Menor Existencia
                                </a>
                            </li>
                            <li>
                                <a onClick={() => setOrderData('Mayor Precio')} className="dropdown-item" href="#">
                                    <i className="bi bi-sort-down"></i> Mayor Precio
                                </a>
                            </li>
                            <li>
                                <a onClick={() => setOrderData('Menor Precio')} className="dropdown-item" href="#">
                                    <i className="bi bi-sort-down-alt"></i> Menor Precio
                                </a>
                            </li>
                        </ul>
                    </div>
                </div>

                {dataRepuesto?.length > 0 && (
                    <div className="d-flex justify-content-center mt-4 mb-2">
                        <div className="btn-group" role="group" aria-label="Basic mixed styles example">
                            <button
                                className="btn btn-outline-danger"
                                onClick={() => handlePageChange(currentPage - 1)}
                                disabled={currentPage === 1}
                            >
                                Anterior
                            </button>
                            <button type="button" className="btn btn-danger">
                                {currentPage} / {Math.ceil(dataRepuesto?.length / itemsPerPage)}
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
                )}

                <div className="row">
                    {isLoading ? <Spinner /> : visibleRepuestos.map((item) => (
                        <CardRepuesto key={item.articulo} repuestos={item} addToCart={addToCart} />
                    ))}
                </div>

                {dataRepuesto?.length > 0 && (
                    <div className="d-flex justify-content-center mt-4 mb-2">
                        <div className="btn-group" role="group" aria-label="Basic">
                            <button
                                className="btn btn-outline-danger"
                                onClick={() => handlePageChange(currentPage - 1)}
                                disabled={currentPage === 1}
                            >
                                Anterior
                            </button>
                            <button type="button" className="btn btn-danger">
                                {currentPage} / {Math.ceil(dataRepuesto?.length / itemsPerPage)}
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
                )}

                <div className="d-flex justify-content-center mt-4 mb-2">
                    {dataRepuesto?.length} elementos
                </div>
            </div>
        </>
    );
}

