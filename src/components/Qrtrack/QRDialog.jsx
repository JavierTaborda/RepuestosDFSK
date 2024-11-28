import React, { useRef } from 'react';
import { QRCodeSVG } from 'qrcode.react';
import { FaQrcode, FaExternalLinkAlt } from 'react-icons/fa';
import { saveAs } from 'file-saver';
import domtoimage from 'dom-to-image';
import 'bootstrap/dist/css/bootstrap.min.css';

const QRDialog = ({ open, handleClose, codigoUnico }) => {
    const qrRef = useRef(null);

    if (!open) return null;

    const handleDownloadPNG = () => {
        const node = qrRef.current;
        const config = {
            width: node.clientWidth,
            height: node.clientHeight,
            style: {
                margin: 0,
                padding: 0,
            },
            quality: 1,
            bgcolor: '#ffffff',
            useCORS: true,
        };
        domtoimage.toPng(node, config)
            .then((dataUrl) => {
                const link = document.createElement('a');
                link.download = `${codigoUnico}.png`;
                link.href = dataUrl;
                link.click();
            })
            .catch((error) => {
                console.error('Error al generar la imagen', error);
            });
    };

    const handleDownloadSVG = () => {
        const svgElement = qrRef.current.querySelector('svg');
        const svgData = new XMLSerializer().serializeToString(svgElement);
        const blob = new Blob([svgData], { type: 'image/svg+xml;charset=utf-8' });
        saveAs(blob, `${codigoUnico}.svg`);
    };

    const handleNavigate = () => {
        //window.location.href = `/dfsktrack?codigo=${codigoUnico}`;
        window.open(`/dfsktrack?codigo=${codigoUnico}`, '_blank');
    };

    const qrUrl = `https://appdfsk.vercel.app/dfsktrack?codigo=${codigoUnico}`;

    return (
        <div className="modal show d-block" tabIndex="-1" style={{ background: "rgba(0, 0, 0, 0.5)" }}>
            <div className="modal-dialog modal-dialog-centered">
                <div className="modal-content rounded-3">
                    <div className="modal-header bg-white  justify-content-center">
                        <h5 className="modal-title">Acciones del QR</h5>
                        <button type="button" className="btn-close btn-close-white" aria-label="Close" onClick={handleClose}></button>
                    </div>
                    <div className="modal-body text-center p-4">
                        <div ref={qrRef} className="mb-3 d-flex justify-content-center  p-3 rounded-3 border border-danger">
                            <QRCodeSVG
                                value={qrUrl}
                                size={256}
                                bgColor="#ffffff"
                                fgColor="#d62e2f"
                                level="Q"
                                includeMargin={true}
                                imageSettings={{
                                    src: "/dfsklogo.png",
                                    x: undefined,
                                    y: undefined,
                                    height: 50,
                                    width: 70,
                                    excavate: true,
                                }}
                            />
                        </div>
                        <button className="btn btn-outline-danger mb-2 w-100 rounded-pill" onClick={handleDownloadPNG}>
                            <FaQrcode className="me-2" /> Descargar PNG
                        </button>
                        <button className="btn btn-outline-danger mb-2 w-100 rounded-pill" onClick={handleDownloadSVG}>
                            <FaQrcode className="me-2" /> Descargar SVG
                        </button>
                        <button className="btn btn-outline-danger mb-2 w-100 rounded-pill" onClick={handleNavigate}>
                            <FaExternalLinkAlt className="me-2" /> Ir al enlace
                        </button>
                    </div>
                    <div className="modal-footer justify-content-center">
                        <button type="button" className="btn btn-warning w-100 rounded-pill text-black" onClick={handleClose}>
                            Cerrar
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default QRDialog;
