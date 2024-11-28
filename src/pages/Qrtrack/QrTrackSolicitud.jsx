import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { getTracking } from '../../services/SolicitudesService';
import { toast } from 'react-toastify';
import { FaTruck, FaCalendarAlt, FaUser, FaCheckCircle, FaTimesCircle, FaCog, FaBoxOpen, FaClipboardCheck, FaHourglassHalf, FaCopy, FaSearch } from 'react-icons/fa';
import dayjs from 'dayjs';
import { motion } from 'framer-motion';
import './QrTrackSolicitud.css';

const QrTrackSolicitud = () => {
  const query = new URLSearchParams(useLocation().search);
  const codigoQuery = query.get('codigo');
  const [codigo, setCodigo] = useState(codigoQuery || '');
  const [trackingData, setTrackingData] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [searchError, setSearchError] = useState(false);

  const getData = async () => {
    setIsLoading(true);
    setSearchError(false);
    try {
      const response = await getTracking(codigo);
      if (!response || !response.codigoUnico) {
        setSearchError(true);
      } else {
        setTrackingData(response);
      }
    } catch (error) {
      setSearchError(true);
      //toast.error(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (codigoQuery) {
      getData();
    }
  }, [codigoQuery]);

  const handleSearch = () => {
    if (codigo) {
      getData();
    } else {
      toast.error("Por favor, ingresa un código para buscar");
    }
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(codigo);
    toast.success("Código copiado al portapapeles");
  };

  if (isLoading) {
    return (
      <motion.div
        className="qr-container text-center mt-5 d-flex flex-column align-items-center"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        <h1 className="qr-title pt-5 text-danger"><FaHourglassHalf /> Cargando...</h1>
      </motion.div>
    );
  }

  return (
    <motion.div
      className="qr-container mt-5"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <div className="qr-info">
        <h1 className="qr-title pt-2"><FaClipboardCheck /> Resumen de Solicitud</h1>
        <div className="d-flex align-items-center mb-3">
          <input
            type="text"
            className="form-control me-2"
            placeholder="Ingresa el código"
            value={codigo}
            onChange={(e) => setCodigo(e.target.value)}
          />
          <button className="btn btn-danger" onClick={handleSearch}>
            <FaSearch />
          </button>
        </div>
        {searchError ? (
          <div className="text-center">
            <h1 className="qr-title pt-5 text-danger"><FaTimesCircle /> Información no disponible</h1>
            <p className="qr-paragraph">Lo sentimos, no hay datos para mostrar en este momento. Inténtalo más tarde.</p>
            <img src="/404.jpg" alt="No data available" className="img-fluid" style={{ width: "80%", height: "auto", maxHeight: "70vh", objectFit: "cover" }} />
            <p className="text-muted small"><small>Imagen diseñada por <a href="http://www.freepik.com" className="text-decoration-none text-reset">stories / Freepik</a></small></p>
          </div>
        ) : trackingData ? (
          <><FaBoxOpen /> Código:
            <div className="d-flex align-items-center">
              
              <div className="ticket d-flex align-items-center">
                <p className="ticket-number"> {trackingData.codigoUnico.codigoUnico}</p>
                <FaCopy
                  className="qr-copy-icon"
                  onClick={handleCopy}
                  size={45}
                />
              </div>
            </div>
            <p className="qr-paragraph"><FaTruck /> Estado de Envío: {trackingData.codigoUnico.estadoEnvio}</p>
            <p className="qr-paragraph"><FaCalendarAlt /> Fecha de Creación: {dayjs(trackingData.codigoUnico.fechaCreacion).format('DD/MM/YYYY')}</p>
            <p className="qr-paragraph"><FaHourglassHalf /> Estatus de la Solicitud: {trackingData.codigoUnico.estatus ? 'Completado' : 'Abierta'} {trackingData.codigoUnico.estatus ? <FaCheckCircle color="green" /> : <FaTimesCircle color="red" />}</p>
            <p className="qr-paragraph"><FaCalendarAlt /> Fecha de Cierre: {trackingData.codigoUnico.fechaCierre ? dayjs(trackingData.codigoUnico.fechaCierre).format('DD/MM/YYYY') : 'N/A'}</p>
            <p className="qr-paragraph"><FaUser /> Concesionario: {trackingData.codigoUnico.usuario}</p>
          </>
        ) : (
          <p className="text-center">Por favor, ingresa un código para buscar la información.</p>
        )}
      </div>

      {trackingData && !searchError && (
        <div className="qr-table-container">
          <h2 className="qr-section-title"><FaClipboardCheck /> Solicitudes</h2>
          <table className="qr-table">
            <thead>
              <tr>
                <th>N. Parte</th>
                <th>Repuesto</th>
                <th>Cantidad</th>
                <th>Estado</th>
                <th>Comentarios</th>
                <th>Imagen</th>
              </tr>
            </thead>
            <tbody>
              {trackingData.codigoUnico.solicitudes.map((solicitud, index) => (
                <tr key={index}>
                  <td>{solicitud.numParte}</td>
                  <td>{solicitud.repuesto}</td>
                  <td>{solicitud.cantidad}</td>
                  <td>{solicitud.estado}</td>
                  <td>{solicitud.observacion}</td>
                  <td>{solicitud.imagen && <img src={solicitud.imagen} alt={solicitud.repuesto} className="qr-img-small" />}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </motion.div>
  );
};

export default QrTrackSolicitud;
