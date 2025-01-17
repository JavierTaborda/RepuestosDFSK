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
  const [dataCategoria, setCategoria] = useState([]);
  const [dataModelo, setModelo] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [stringMarca, setStringMarca] = useState("*");
  const [stringGrupo, setStringGrupo] = useState("*");
  const [stringCategoria, setStringCategoria] = useState("*");
  const [stringModelo, setStringModelo] = useState("*");
  const [stringDescripcion, setStringDescripcion] = useState("*");
  const [stringTextSearch, setStringTextSearch] = useState("");
  const [orderData, setOrderData] = useState("");
  const itemsPerPage = 12;
  const toastId = useRef(null);

  // Calcular el índice de inicio para la paginación
  const startIndex = useMemo(() => (currentPage - 1) * itemsPerPage, [currentPage, itemsPerPage]);

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

  // Obtener todos los repuestos al montar el componente
  useEffect(() => {
    const fetchData = async () => {
      try {
        const { repuestos, grupo, categoria, marca,modelo } = await getAllRepuestos();
        setRepuestos(repuestos);
        setGrupo(grupo);
        setCategoria(categoria);
        setMarca(marca);
        setModelo(modelo);
      } catch (err) {
        console.error(err);
        notifyError(err.message);
      } finally {
        setIsLoading(false);
      }
    };
    fetchData();
  }, []);

  // Filtrar los repuestos según los criterios seleccionados
  const filterMarca = async () => {
    try {
      setIsLoading(true);
      const dataRepuesto = await getRepuestosFilters(stringMarca, stringGrupo,stringCategoria ,stringDescripcion, stringModelo);
      const sortedRepuestos = sortRepuestos(dataRepuesto, orderData);
      setRepuestos(sortedRepuestos);
      handlePageChange(1); // Reset to first page
    } catch (error) {
      notifyError('Error de la petición: ' + error.message);
    } finally {
      setIsLoading(false);
    }
  };

  // Ordenar los repuestos según el criterio seleccionado
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

  // Filtrar los datos cada vez que los criterios de búsqueda o de ordenación cambian
  useEffect(() => {
    if (!isLoading) {
      filterMarca();
    }
  }, [stringMarca, stringGrupo, stringDescripcion, orderData, stringCategoria, stringModelo]);

  // Manejar el cambio de página
  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  // Obtener los repuestos visibles para la página actual
  const visibleRepuestos = useMemo(() => dataRepuesto.slice(startIndex, startIndex + itemsPerPage), [dataRepuesto, startIndex, itemsPerPage]);

  return (
    <>
      <h2 className="bd-title text-start mb-0 ms-5 mt-3">Inventario de Repuestos</h2>
      <div className="container my-5">
        <div className="d-flex flex-wrap justify-content-between align-items-center p-3">
          <div className="d-flex pe-2 pt-3" role="search">
            <input
              className="form-control me-2 rounded-5 shadow-sm"
              value={stringTextSearch}
              onChange={(e) => setStringTextSearch(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && setStringDescripcion(stringTextSearch)}
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
              <i className="bi bi-funnel" /> MODELO: {stringModelo}
            </button>
            <ul className="dropdown-menu shadow">
              <li>
                <a onClick={() => setStringModelo('*')} className="dropdown-item" href="#">Todos</a>
              </li>
              {dataModelo.map((item) => (
                <li key={item.idmodelo}>
                  <a onClick={() => setStringModelo(item.modelo1)} className="dropdown-item">
                    {item.modelo1} - {item.marca} - {item.ano}
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
              <i className="bi bi-funnel" /> CATEGORÍA: {stringCategoria}
            </button>
            <ul className="dropdown-menu shadow">
              <li>
                <a onClick={() => setStringCategoria('*')} className="dropdown-item" href="#">Todos</a>
              </li>
              {dataCategoria.filter(item => item.idgrupo === (dataGrupo.find(grupo => grupo.grupo === stringGrupo)?.idgrupo || item.idgrupo)).map((item) =>
              (<li key={item.idcategoria}>
                <a onClick={() => setStringCategoria(item.categoria)} className="dropdown-item">
                  {item.categoria} </a>
              </li>))}
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
              <button className="btn btn-outline-danger" onClick={() => handlePageChange(currentPage - 1)} disabled={currentPage === 1}>
                Anterior
              </button>
              <button type="button" className="btn btn-danger">
                {currentPage} / {Math.ceil(dataRepuesto?.length / itemsPerPage)}
              </button>
              <button className="btn btn-outline-danger" onClick={() => handlePageChange(currentPage + 1)} disabled={currentPage === Math.ceil(dataRepuesto?.length / itemsPerPage)}>
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
              <button className="btn btn-outline-danger" onClick={() => handlePageChange(currentPage - 1)} disabled={currentPage === 1}>
                Anterior
              </button>
              <button type="button" className="btn btn-danger">
                {currentPage} / {Math.ceil(dataRepuesto?.length / itemsPerPage)}
              </button>
              <button className="btn btn-outline-danger" onClick={() => handlePageChange(currentPage + 1)} disabled={currentPage === Math.ceil(dataRepuesto?.length / itemsPerPage)}>
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
