import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { getTracking } from '../../services/SolicitudesService';
import { toast } from 'react-toastify';
import { FaTruck, FaCalendarAlt, FaUser, FaCheckCircle, FaTimesCircle, FaCog } from 'react-icons/fa';
import dayjs from 'dayjs';
import './QrTrackSolicitud.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css';

const QrTrackSolicitud = () => {
  const query = new URLSearchParams(useLocation().search);
  const codigo = query.get('codigo');
  const [trackingData, setTrackingData] = useState();
  const [showData, setShowData] = useState(false);

  const getData = async () => {
    try {
      const response = await getTracking(codigo);
      setTrackingData(response);
    } catch (error) {
      toast.error(error.message);
    }
  };

  useEffect(() => {
    if (codigo) {
      getData();
    }
  }, [codigo]);

  useEffect(() => {
    if (trackingData) {
      console.log(trackingData);
      setShowData(true);
    }
  }, [trackingData]);

  if (!showData) {
    return <div className="qr-container">Cargando...</div>;
  }

  const { codigoUnico } = trackingData;
  const { solicitudes } = codigoUnico;

  return (
    <div className="qr-container">
      <div className="qr-info">
        <h1 className="qr-title">Resumen de Solicitud</h1>
        <p className="qr-paragraph"><FaCog /> Resumen: {codigoUnico.idResumenSolicitud}</p>
        <p className="qr-paragraph"><FaTruck /> Estado de Envío: {codigoUnico.idEstadosEnvio}</p>
        <p className="qr-paragraph"><FaCalendarAlt /> Fecha de Creación: {dayjs(codigoUnico.fechaCreacion).format('DD/MM/YYYY')}</p>
        <p className="qr-paragraph">Estatus: {codigoUnico.estatus ? <FaCheckCircle color="green" /> : <FaTimesCircle color="red" />}</p>
        <p className="qr-paragraph">Fecha de Cierre: {codigoUnico.fechaCierre ? dayjs(codigoUnico.fechaCierre).format('DD/MM/YYYY') : 'N/A'}</p>
        <p className="qr-paragraph"><FaUser /> Concesionario: {codigoUnico.usuario}</p>
        <p className="qr-paragraph">Código Único: {codigoUnico.codigoUnico}</p>
      </div>

      <div className="qr-table-container">
        <h2 className="qr-section-title">Solicitudes</h2>
        <table className="qr-table">
          <thead>
            <tr>
              <th>ID Solicitud</th>
              <th>Repuesto</th>
              <th>Cantidad</th>
              <th>Precio</th>
              <th>Estado</th>
              <th>Imagen</th>
            </tr>
          </thead>
          <tbody>
            {solicitudes.map((solicitud, index) => (
              <tr key={index}>
                <td>{solicitud.idSolicitud}</td>
                <td>{solicitud.repuesto}</td>
                <td>{solicitud.cantidad}</td>
                <td>{solicitud.precio}</td>
                <td>{solicitud.estado}</td>
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
