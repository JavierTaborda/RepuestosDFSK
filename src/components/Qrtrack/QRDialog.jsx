import React, { useRef } from 'react';
import { QRCodeSVG } from 'qrcode.react';
import { FaQrcode, FaExternalLinkAlt } from 'react-icons/fa';
import { saveAs } from 'file-saver';
import domtoimage from 'dom-to-image';

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
        window.location.href = `/dfsktrack?codigo=${codigoUnico}`;
    };

    const qrUrl = `https://appdfsk.vercel.app/dfsktrack?codigo=${codigoUnico}`;

    return (
        <div className="modal show d-block" tabIndex="-1" style={{ background: "rgba(0, 0, 0, 0.5)" }}>
            <div className="modal-dialog modal-dialog-centered">
                <div className="modal-content" style={{ borderRadius: '15px', overflow: 'hidden' }}>
                    <div className="modal-header" style={{ backgroundColor: '#d62e2f', color: '#fff', justifyContent: 'center' }}>
                        <h5 className="modal-title">Acciones del QR</h5>
                        <button type="button" className="btn-close btn-close-white" aria-label="Close" onClick={handleClose}></button>
                    </div>
                    <div className="modal-body text-center">
                        <div ref={qrRef} className="mb-3 d-flex justify-content-center" style={{ padding: '20px', backgroundColor: '#ffffff', borderRadius: '8px' }}>
                            <QRCodeSVG
                                value={qrUrl}
                                size={256}
                                bgColor="#ffffff"
                                fgColor="#d62e2f"
                                level="Q"
                                includeMargin={true}
                                imageSettings={{
                                    src: "https://firebasestorage.googleapis.com/v0/b/repuestos-dfsk.appspot.com/o/logos%2Fdfsklogo.png?alt=media&token=8a01df7b-9999-4d3f-ae01-6e26a0eadb30",
                                    x: undefined,
                                    y: undefined,
                                    height: 50,
                                    width: 50,
                                    excavate: true,
                                }}
                            />
                        </div>
                        <button className="btn btn-primary mb-2" onClick={handleDownloadPNG} style={{ backgroundColor: '#d62e2f', borderColor: '#d62e2f', borderRadius: '20px', width: '90%' }}>
                            <FaQrcode className="me-2" /> Descargar PNG
                        </button>
                        <button className="btn btn-primary mb-2" onClick={handleDownloadSVG} style={{ backgroundColor: '#d62e2f', borderColor: '#d62e2f', borderRadius: '20px', width: '90%' }}>
                            <FaQrcode className="me-2" /> Descargar SVG
                        </button>
                        <button className="btn btn-secondary mb-2" onClick={handleNavigate} style={{ backgroundColor: '#d62e2f', borderColor: '#d62e2f', borderRadius: '20px', width: '90%' }}>
                            <FaExternalLinkAlt className="me-2" /> Ir al enlace
                        </button>
                    </div>
                    <div className="modal-footer justify-content-center">
                        <button type="button" className="btn btn-secondary" onClick={handleClose} style={{ backgroundColor: '#FFCC00', borderColor: '#FFCC00', color: '#000', borderRadius: '20px', width: '90%' }}>
                            Cerrar
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default QRDialog;
