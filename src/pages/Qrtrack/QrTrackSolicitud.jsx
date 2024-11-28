import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { getTracking } from '../../services/SolicitudesService';
import { toast } from 'react-toastify';
import { FaTruck, FaCalendarAlt, FaUser, FaCheckCircle, FaTimesCircle, FaCog, FaBoxOpen, FaClipboardCheck, FaHourglassHalf } from 'react-icons/fa';
import dayjs from 'dayjs';
import './QrTrackSolicitud.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css';

const QrTrackSolicitud = () => {
  const query = new URLSearchParams(useLocation().search);
  const codigo = query.get('codigo');
  const [trackingData, setTrackingData] = useState(null);
  const [showData, setShowData] = useState(false);

  const getData = async () => {
    try {
      const response = await getTracking(codigo);
      setTrackingData(response);
      setShowData(true);
    } catch (error) {
      toast.error(error.message);
      setShowData(false);
    }
  };

  useEffect(() => {
    if (codigo) {
      getData();
    }
  }, [codigo]);

  if (!showData) {
    return (
      <div className="qr-container text-center mt-5 d-flex flex-column align-items-center">     
         <p className="qr-paragraph">Lo sentimos, no hay datos para mostrar en este momento. Inténtalo más tarde.</p>
         <h1 className="qr-title pt-1 text-danger"><FaTimesCircle /> Ups!</h1>
        <img src="/404.jpg" alt="No data available" className="img-fluid" style={{ width: "100%", height: "auto", maxHeight: "70vh", objectFit: "cover" }} />
        

        <p className="text-muted small"><small>Imagen diseñada por <a href="http://www.freepik.com" className="text-decoration-none text-reset">stories / Freepik</a></small></p>
      </div>
    );
  }

  const { codigoUnico } = trackingData;
  const { solicitudes } = codigoUnico;

  return (
    <div className="qr-container mt-5">
      <div className="qr-info">
        <h1 className="qr-title pt-2"><FaClipboardCheck /> Resumen de Solicitud</h1>
        <FaBoxOpen /> Código:
        <div className="ticket">
          <p className="ticket-number"> {codigoUnico.codigoUnico}</p>
        </div>
        <p className="qr-paragraph"><FaTruck /> Estado de Envío: {codigoUnico.estadoEnvio}</p>
        <p className="qr-paragraph"><FaCalendarAlt /> Fecha de Creación: {dayjs(codigoUnico.fechaCreacion).format('DD/MM/YYYY')}</p>
        <p className="qr-paragraph"><FaHourglassHalf /> Estatus de la Solicitud: {codigoUnico.estatus ? 'Completado' : 'Abierta'} {codigoUnico.estatus ? <FaCheckCircle color="green" /> : <FaTimesCircle color="red" />}</p>
        <p className="qr-paragraph"><FaCalendarAlt /> Fecha de Cierre: {codigoUnico.fechaCierre ? dayjs(codigoUnico.fechaCierre).format('DD/MM/YYYY') : 'N/A'}</p>
        <p className="qr-paragraph"><FaUser /> Concesionario: {codigoUnico.usuario}</p>
      </div>

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
            {solicitudes.map((solicitud, index) => (
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
    </div>
  );
};

export default QrTrackSolicitud;
