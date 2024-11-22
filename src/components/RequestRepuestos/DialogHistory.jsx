import React, { useState, useEffect } from 'react';
import { Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Button, Typography, Box, TextField, FormControl, InputLabel, Select, MenuItem, IconButton, Collapse, Paper, Card, CardMedia } from '@mui/material';
import { Close, ExpandMore, ExpandLess } from '@mui/icons-material';
import dayjs from 'dayjs';


const DialogHistory = ({ open, handleClose, data }) => {
    const [editableData, setEditableData] = useState(data);
    const [expanded, setExpanded] = useState({});

    useEffect(() => {
        setEditableData(data);
    }, [data]);

    const handleChange = (field, value) => {
        setEditableData({
            ...editableData,
            [field]: value
        });
    };

    const handleSolicitudChange = (index, field, value) => {
        const updatedSolicitudes = editableData.solicitudes.map((solicitud, i) =>
            i === index ? { ...solicitud, [field]: value } : solicitud
        );
        setEditableData({
            ...editableData,
            solicitudes: updatedSolicitudes
        });
    };

    const toggleExpand = (index) => {
        setExpanded({ ...expanded, [index]: !expanded[index] });
    };

    const handleUpdate = (solicitud) => {
        console.log(`Updating solicitud with ID: ${solicitud.idSolicitud}`, solicitud);
        // Aquí puedes agregar la lógica para actualizar la solicitud, como una llamada a una API
    };

    return (
        <Dialog open={open} onClose={handleClose} fullWidth maxWidth="lg" PaperProps={{ style: { borderRadius: 20, padding: '20px', backgroundColor: '#f5f5f5' } }}>
            <DialogTitle sx={{ backgroundColor: '#d62e2f', color: 'white', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                Detalles de la Solicitud
                <IconButton onClick={handleClose} sx={{ color: 'white' }}>
                    <Close />
                </IconButton>
            </DialogTitle>
            <DialogContent>
                {editableData ? (
                    <Box>
                        <DialogContentText sx={{ mb: 2, fontSize: '1.1em' }}>ID: {editableData.idResumenSolicitud}</DialogContentText>
                        <DialogContentText sx={{ mb: 2, fontSize: '1.1em' }}>Fecha de Creación: {dayjs(editableData.fechaCreacion).format('YYYY-MM-DD HH:mm')}</DialogContentText>
                        <TextField
                            label="Fecha de Cierre"
                            type="date"
                            value={dayjs(editableData.fechaCierre).format('YYYY-MM-DD')}
                            onChange={(e) => handleChange('fechaCierre', e.target.value)}
                            fullWidth
                            margin="normal"
                            InputLabelProps={{ shrink: true }}
                            sx={{ backgroundColor: 'white', borderRadius: 1, marginBottom: 2 }}
                            size="small"
                        />
                        <TextField
                            label="Observación"
                            value={editableData.observacion}
                            onChange={(e) => handleChange('observacion', e.target.value)}
                            fullWidth
                            margin="normal"
                            multiline
                            rows={3}
                            sx={{ backgroundColor: 'white', borderRadius: 1, marginBottom: 2 }}
                            size="small"
                        />
                        <Typography variant="h6" gutterBottom component="div" mt={3}>Detalles de Repuestos:</Typography>
                        {editableData.solicitudes.map((solicitud, index) => (
                            <Paper key={index} elevation={1} sx={{ mb: 3, p: 2, borderRadius: '8px', backgroundColor: '#fff' }}>
                                <Box display="flex" justifyContent="space-between" alignItems="center">
                                    <Box display="flex" alignItems="center">
                                        
                                        <Card sx={{ width: 80, height: 80, marginRight: 2, borderRadius: '50%', overflow: 'hidden' }}>
                                            <CardMedia
                                                component="img"
                                                height="80"
                                                image={solicitud.imagen}
                                                alt={solicitud.repuesto}
                                                sx={{ objectFit: 'cover' }}
                                            />
                                          
                                        </Card>
                                        <Typography variant="subtitle1" sx={{ fontWeight: 'bold' }}>Repuesto: {solicitud.numParte} - {solicitud.repuesto}</Typography>
                                    </Box>
                                    <IconButton onClick={() => toggleExpand(index)} size="small">
                                        {expanded[index] ? <ExpandLess /> : <ExpandMore />}
                                    </IconButton>
                                </Box>
                                <Collapse in={expanded[index]} timeout="auto" unmountOnExit>
                                    <TextField
                                        label="Cantidad"
                                        type="number"
                                        value={solicitud.cantidad}
                                        onChange={(e) => handleSolicitudChange(index, 'cantidad', e.target.value)}
                                        fullWidth
                                        margin="normal"
                                        sx={{ backgroundColor: 'white', borderRadius: 1, marginBottom: 2 }}
                                        size="small"
                                    />
                                    <TextField
                                        label="Precio"
                                        type="number"
                                        value={solicitud.precio}
                                        onChange={(e) => handleSolicitudChange(index, 'precio', e.target.value)}
                                        fullWidth
                                        margin="normal"
                                        sx={{ backgroundColor: 'white', borderRadius: 1, marginBottom: 2 }}
                                        size="small"
                                    />
                                    <FormControl fullWidth margin="normal" sx={{ backgroundColor: 'white', borderRadius: 1, marginBottom: 2 }} size="small">
                                        <InputLabel id={`estado-label-${index}`}>Estado</InputLabel>
                                        <Select
                                            labelId={`estado-label-${index}`}
                                            value={solicitud.estado}
                                            onChange={(e) => handleSolicitudChange(index, 'estado', e.target.value)}
                                            sx={{ backgroundColor: 'white', borderRadius: 1 }}
                                        >
                                            <MenuItem value="En Espera">En Espera</MenuItem>
                                            <MenuItem value="Aprobado">Aprobado</MenuItem>
                                            <MenuItem value="Rechazado">Rechazado</MenuItem>
                                        </Select>
                                    </FormControl>
                                    <TextField
                                        label="Responsable"
                                        value={solicitud.responsable}
                                        onChange={(e) => handleSolicitudChange(index, 'responsable', e.target.value)}
                                        fullWidth
                                        margin="normal"
                                        sx={{ backgroundColor: 'white', borderRadius: 1, marginBottom: 2 }}
                                        size="small"
                                    />
                                    <TextField
                                        label="Fecha de Compra"
                                        type="date"
                                        value={solicitud.fechaCompra ? dayjs(solicitud.fechaCompra).format('YYYY-MM-DD') : ''}
                                        onChange={(e) => handleSolicitudChange(index, 'fechaCompra', e.target.value)}
                                        fullWidth
                                        margin="normal"
                                        InputLabelProps={{ shrink: true }}
                                        sx={{ backgroundColor: 'white', borderRadius: 1, marginBottom: 2 }}
                                        size="small"
                                    />
                                    <TextField
                                        label="Fecha de Llegada"
                                        type="date"
                                        value={solicitud.fechaLlegada ? dayjs(solicitud.fechaLlegada).format('YYYY-MM-DD') : ''}
                                        onChange={(e) => handleSolicitudChange(index, 'fechaLlegada', e.target.value)}
                                        fullWidth
                                        margin="normal"
                                        InputLabelProps={{ shrink: true }}
                                        sx={{ backgroundColor: 'white', borderRadius: 1, marginBottom: 2 }}
                                        size="small"
                                    />
                                    <Box mt={2} textAlign="right">
                                        <Button onClick={() => handleUpdate(solicitud)} sx={{ backgroundColor: '#d62e2f', color: '#fff', '&:hover': { backgroundColor: '#d62e2f' } }} variant="contained" size="small">
                                            Actualizar
                                        </Button>
                                    </Box>
                                </Collapse>
                            </Paper>
                        ))}
                    </Box>
                ) : (
                    <DialogContentText>No hay datos disponibles</DialogContentText>
                )}
            </DialogContent>
            <DialogActions sx={{ justifyContent: 'space-between', padding: '20px' }}>
                <Button onClick={handleClose} sx={{ backgroundColor: '#FFCC00', color: '#000', '&:hover': { backgroundColor: '#FFCC00' } }} variant="outlined" size="small">
                    Cerrar
                </Button>
                <Button onClick={() => console.log('Save all changes', editableData)} sx={{ backgroundColor: '#d62e2f', color: '#fff', '&:hover': { backgroundColor: '#d62e2f' } }} variant="contained" size="small">
                    Guardar Todos
                </Button>
            </DialogActions>
        </Dialog>
    );
};

export default DialogHistory;
