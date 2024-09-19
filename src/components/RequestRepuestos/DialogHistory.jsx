// ModalComponent.jsx
import React from 'react';
import { Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Button } from '@mui/material';

const DialogHistory = ({ open, handleClose, data }) => {
    return (
        <Dialog open={open} onClose={handleClose}>
            <DialogTitle>Detalles de la Solicitud</DialogTitle>
            <DialogContent>
                <DialogContentText>
                    {/* Aquí puedes mostrar los detalles del resumen seleccionado */}
                    {data && (
                        <div>
                            <p>ID: {data.idResumenSolicitud}</p>
                            <p>Fecha de Creación: {data.fechaCreacion}</p>
                            <p>Fecha de Cierre: {data.fechaCierre}</p>
                            <p>Solicitante: {data.vendedor}</p>
                            <p>Monto Estimado: {data.montoEstimado}</p>
                        </div>
                    )}
                </DialogContentText>
            </DialogContent>
            <DialogActions>
                <Button onClick={handleClose} color="primary">
                    Cerrar
                </Button>
            </DialogActions>
        </Dialog>
    );
};

export default DialogHistory;
