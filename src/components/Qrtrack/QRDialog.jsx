import React from 'react';
import { FaQrcode, FaExternalLinkAlt } from 'react-icons/fa'; // Asegúrate de instalar 'react-icons'

const QRDialog = ({ open, handleClose, codigoUnico }) => {
    if (!open) return null;

    const handleGenerateQR = () => {
        // Lógica para generar QR
        console.log('Generar QR para:', codigoUnico);
    };

    const handleNavigate = () => {
        // Lógica para navegar a un enlace con codigoUnico
        window.location.href = `https://example.com/some-path?codigo=${codigoUnico}`;
    };

    return (
        <div className="modal show d-block" tabIndex="-1" style={{ background: "rgba(0, 0, 0, 0.5)" }}>
            <div className="modal-dialog">
                <div className="modal-content" style={{ borderRadius: '10px', overflow: 'hidden' }}>
                    <div className="modal-header" style={{ backgroundColor: '#d62e2f', color: '#fff' }}>
                        <h5 className="modal-title">Acciones del QR</h5>
                        <button type="button" className="btn-close btn-close-white" aria-label="Close" onClick={handleClose}></button>
                    </div>
                    <div className="modal-body text-center">
                        <button className="btn btn-primary me-2" onClick={handleGenerateQR} style={{ backgroundColor: '#d62e2f', borderColor: '#d62e2f' }}>
                            <FaQrcode className="me-2" /> Generar QR
                        </button>
                        <button className="btn btn-secondary ms-2" onClick={handleNavigate} style={{ backgroundColor: '#d62e2f', borderColor: '#d62e2f' }}>
                            <FaExternalLinkAlt className="me-2" /> Ir al enlace
                        </button>
                    </div>
                    <div className="modal-footer">
                        <button type="button" className="btn btn-secondary" onClick={handleClose} style={{ backgroundColor: '#FFCC00', borderColor: '#FFCC00', color: '#000' }}>
                            Cerrar
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default QRDialog;
