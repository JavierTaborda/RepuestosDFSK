import React from 'react';
import { Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Button } from '@mui/material';

const DialogHistory = ({ open, handleClose, data }) => {
    return (
        <Dialog open={open} onClose={handleClose}>
            <DialogTitle>Detalles de la Solicitud</DialogTitle>
            <DialogContent>
                {data && (
                    <>
                        <DialogContentText>ID: {data.idResumenSolicitud}</DialogContentText>
                        <DialogContentText>Fecha de Creación: {data.fechaCreacion}</DialogContentText>
                        <DialogContentText>Fecha de Cierre: {data.fechaCierre}</DialogContentText>
                        <DialogContentText>Solicitante: {data.vendedor}</DialogContentText>
                        <DialogContentText>Monto Estimado: {data.montoEstimado}</DialogContentText>
                    </>
                )}
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

