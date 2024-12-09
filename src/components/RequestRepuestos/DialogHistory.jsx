import React, { useState, useEffect } from 'react';
import { Dialog, Switch, DialogActions, FormControlLabel, DialogContent, DialogContentText, DialogTitle, Button, Typography, Box, TextField, Grid, FormControl, InputLabel, Select, MenuItem, IconButton, Collapse, Paper, Card, CardMedia, Skeleton } from '@mui/material';
import { Close, ExpandMore, ExpandLess } from '@mui/icons-material';
import dayjs from 'dayjs';
import { toast } from 'react-toastify';
import { getEstadosSolicitudes, putSolicitud, putResumen } from '../../services/SolicitudesService';
import ImgDefault from '../../components/forms/ImgDefault';

const DialogHistory = ({ open, handleClose, data }) => {
    const [editableData, setEditableData] = useState(data);
    const [expanded, setExpanded] = useState({});
    const [estadosSolicitudes, setEstadosSolicitudes] = useState([]);
    const [loadingEstados, setLoadingEstados] = useState(true);

    useEffect(() => {
        setEditableData(data);
        const fetchEstadosSolicitudes = async () => {
            if (estadosSolicitudes.length > 0) return;
            try {
                const response = await getEstadosSolicitudes();
                setEstadosSolicitudes(response);
                setLoadingEstados(false);
            } catch (error) {
                console.error(error);
                toast.error('Error al cargar los estados de solicitudes. Intente de nuevo.');
                handleClose();
            }
        };
        fetchEstadosSolicitudes();
    }, [data]);

    const handleChange = (field, value) => {
        setEditableData({ ...editableData, [field]: value });
    };

    const handleSolicitudChange = (index, field, value) => {
        const updatedSolicitudes = editableData.solicitudes.map((solicitud, i) =>
            i === index ? { ...solicitud, [field]: value } : solicitud
        );
        setEditableData({ ...editableData, solicitudes: updatedSolicitudes });
    };

    const toggleExpand = (index) => {
        setExpanded({ ...expanded, [index]: !expanded[index] });
    };

    const handleUpdate = async (solicitud) => {
        try {
            const response = await putSolicitud(solicitud);
            if (response) {
                toast.success('Solicitud actualizada correctamente');
            } else {
                toast.error('Error al actualizar la solicitud. Intente de nuevo.');
            }
        } catch (error) {
            console.error(error);
            toast.error('Error al actualizar la solicitud. Intente de nuevo.');
        }
    };

    const handleUpdateAll = async (resumen) => {
        try {
            const response = await putResumen(resumen);
            if (response) {
                toast.success('Cambios guardados correctamente');
                handleClose();
            } else {
                toast.error('Error al actualizar la solicitud. Intente de nuevo.');
            }
        } catch (error) {
            console.error(error);
            toast.error('Error al actualizar la solicitud. Intente de nuevo.');
        }
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
                        <Grid container spacing={2} sx={{ mb: 2 }}>
                            <Grid item xs={12} md={6}>
                                <DialogContentText sx={{ fontSize: '1.1em' }}>ID: {editableData.idResumenSolicitud}</DialogContentText>
                            </Grid>
                            <Grid item xs={12} md={6}>
                                <DialogContentText sx={{ fontSize: '1.1em' }}>Fecha de Creación: {dayjs(editableData.fechaCreacion).format('YYYY-MM-DD HH:mm')}</DialogContentText>
                            </Grid>
                            <Grid item xs={12} md={4}>
                                <TextField
                                    label="Fecha de Cierre"
                                    type="date"
                                    value={dayjs(editableData.fechaCierre).format('YYYY-MM-DD') || ''}
                                    onChange={(e) => handleChange('fechaCierre', e.target.value)}
                                    fullWidth
                                    margin="normal"
                                    InputLabelProps={{ shrink: true }}
                                    sx={{ backgroundColor: 'white', borderRadius: 1, marginBottom: 2 }}
                                    size="small"
                                />
                            </Grid>
                            <Grid item xs={12} md={6}>
                                <TextField
                                    label="Cliente"
                                    value={editableData.usuario || ''}
                                    fullWidth
                                    margin="normal"
                                    sx={{ backgroundColor: 'white', borderRadius: 1, marginBottom: 2 }}
                                    size="small"
                                    InputProps={{ readOnly: true }}
                                />
                            </Grid>
                            <Grid item xs={12} md={2}>
                                <FormControl component="fieldset" sx={{ alignItems: 'center', display: 'flex', flexDirection: 'column', m: 1 }}>
                                    {editableData.estatus ? "Finalizado" : "Pendiente"}
                                    <FormControlLabel
                                        control={<Switch checked={editableData.estatus} onChange={(e) => handleChange('estatus', e.target.checked)} color="error" />}
                                        label=""
                                    />
                                </FormControl>
                            </Grid>
                            <Grid item xs={12} md={7}>
                                <TextField
                                    label="Código Único"
                                    value={editableData.codigoUnico || ''}
                                    fullWidth
                                    margin="normal"
                                    sx={{ backgroundColor: 'white', borderRadius: 1, marginBottom: 2 }}
                                    size="small"
                                    InputProps={{ readOnly: true }}
                                />
                            </Grid>
                            <Grid item xs={12} md={5}>
                                <TextField
                                    label="RIF"
                                    value={editableData.rif || 'No disponible'}
                                    fullWidth
                                    margin="normal"
                                    sx={{ backgroundColor: 'white', borderRadius: 1, marginBottom: 2 }}
                                    size="small"
                                    InputProps={{ readOnly: true }}
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    label="Dirección"
                                    value={editableData.direccion || 'No disponible'}
                                    fullWidth
                                    margin="normal"
                                    sx={{ backgroundColor: 'white', borderRadius: 1, marginBottom: 2 }}
                                    size="small"
                                    InputProps={{ readOnly: true }}
                                />
                            </Grid>
                        </Grid>
                        <TextField
                            label="Observación"
                            value={editableData.observacion || ''}
                            fullWidth
                            margin="normal"
                            multiline
                            rows={3}
                            sx={{ backgroundColor: 'white', borderRadius: 1, marginBottom: 2 }}
                            size="small"
                            InputProps={{ readOnly: true }}
                        />
                        <Typography variant="h6" gutterBottom component="div" mt={3}>
                            Detalles de Repuestos:
                        </Typography>
                        {editableData.solicitudes.map((solicitud, index) => (
                            <Paper key={index} elevation={1} sx={{ mb: 3, p: 2, borderRadius: '8px', backgroundColor: '#fff' }}>
                                <Box display="flex" justifyContent="space-between" alignItems="center">
                                    <Box display="flex" alignItems="center">
                                        <Card sx={{ width: 80, height: 80, marginRight: 2, borderRadius: '50%', overflow: 'hidden' }}>
                                            {solicitud.imagen ? (
                                                <CardMedia
                                                    component="img"
                                                    height="80"
                                                    image={solicitud.imagen || ''}
                                                    alt={solicitud.repuesto || ''}
                                                    sx={{ objectFit: 'cover' }}
                                                />
                                            ) : (
                                                <Box display="flex" justifyContent="center" alignItems="center" height="100%">
                                                    <ImgDefault />
                                                </Box>
                                            )}
                                        </Card>
                                        <Typography variant="subtitle1" sx={{ fontWeight: 'bold' }}>
                                            Repuesto: {solicitud.numParte} - {solicitud.repuesto}
                                        </Typography>
                                    </Box>
                                    <IconButton onClick={() => toggleExpand(index)} size="small">
                                        {expanded[index] ? <ExpandLess /> : <ExpandMore />}
                                    </IconButton>
                                </Box>
                                <Collapse in={expanded[index]} timeout="auto" unmountOnExit>
                                    <Grid container spacing={2}>
                                        <Grid item xs={12} md={6}>
                                            <TextField
                                                label="Cantidad"
                                                type="number"
                                                value={solicitud.cantidad || ''}
                                                onChange={(e) => handleSolicitudChange(index, 'cantidad', e.target.value)}
                                                fullWidth
                                                margin="normal"
                                                sx={{ backgroundColor: 'white', borderRadius: 1, marginBottom: 2 }}
                                                size="small"
                                                InputProps={{ readOnly: true }}
                                            />
                                        </Grid>
                                        <Grid item xs={12} md={6}>
                                            <TextField
                                                label="Precio"
                                                type="number"
                                                value={solicitud.precio || ''}
                                                onChange={(e) => handleSolicitudChange(index, 'precio', e.target.value)}
                                                fullWidth
                                                margin="normal"
                                                sx={{ backgroundColor: 'white', borderRadius: 1, marginBottom: 2 }}
                                                size="small"
                                                InputProps={{ readOnly: true }}
                                            />
                                        </Grid>
                                        <Grid item xs={12} md={6}>
                                            <FormControl fullWidth margin="normal" sx={{ backgroundColor: 'white', borderRadius: 1, marginBottom: 2 }} size="small">
                                                <InputLabel id={`estado-label-${index}`}>Estado</InputLabel>
                                                <Select
                                                    labelId={`estado-label-${index}`}
                                                    value={solicitud.idEstado || ''}
                                                    onChange={(e) => handleSolicitudChange(index, 'idEstado', e.target.value)}
                                                    sx={{ backgroundColor: 'white', borderRadius: 1 }}
                                                >
                                                    {loadingEstados ? (
                                                        <MenuItem value="">
                                                            <Skeleton variant="text" width={100} />
                                                        </MenuItem>
                                                    ) : (
                                                        estadosSolicitudes.map((option) => (
                                                            <MenuItem key={option.idEstado} value={option.idEstado}>
                                                                {option.nombre}
                                                            </MenuItem>
                                                        ))
                                                    )}
                                                </Select>
                                            </FormControl>
                                        </Grid>
                                        <Grid item xs={12} md={6}>
                                            <TextField
                                                label="Responsable"
                                                value={solicitud.responsable || ''}
                                                onChange={(e) => handleSolicitudChange(index, 'responsable', e.target.value)}
                                                fullWidth
                                                margin="normal"
                                                sx={{ backgroundColor: 'white', borderRadius: 1, marginBottom: 2 }}
                                                size="small"
                                                InputProps={{ readOnly: true }}
                                            />
                                        </Grid>
                                        <Grid item xs={12} md={4}>
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
                                        </Grid>
                                        <Grid item xs={12} md={4}>
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
                                        </Grid>
                                        <Grid item xs={12} md={4}>
                                            <TextField
                                                label="Fecha de Finalización"
                                                type="date"
                                                value={solicitud.fechaListo ? dayjs(solicitud.fechaListo).format('YYYY-MM-DD') : ''}
                                                onChange={(e) => handleSolicitudChange(index, 'fechaListo', e.target.value)}
                                                fullWidth
                                                margin="normal"
                                                InputLabelProps={{ shrink: true }}
                                                sx={{ backgroundColor: 'white', borderRadius: 1, marginBottom: 2 }}
                                                size="small"
                                            />
                                        </Grid>
                                        <Grid item xs={12}>
                                            <TextField
                                                label="Observaciones"
                                                type="text"
                                                value={solicitud.observacion || ''}
                                                onChange={(e) => handleSolicitudChange(index, 'observacion', e.target.value)}
                                                fullWidth
                                                margin="normal"
                                                InputLabelProps={{ shrink: true }}
                                                sx={{ backgroundColor: 'white', borderRadius: 1, marginBottom: 2 }}
                                                size="small"
                                            />
                                        </Grid>
                                    </Grid>
                                    <Box mt={2} textAlign="right">
                                        <Button
                                            onClick={() => handleUpdate(solicitud)}
                                            sx={{ backgroundColor: '#d62e2f', color: '#fff', '&:hover': { backgroundColor: '#d62e2f' } }}
                                            variant="contained"
                                            size="small"
                                        >
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
                <Button
                    onClick={handleClose}
                    sx={{ backgroundColor: '#FFCC00', color: '#000', '&:hover': { backgroundColor: '#FFCC00' } }}
                    variant="outlined"
                    size="small"
                >
                    Cerrar
                </Button>
                <Button
                    onClick={() => handleUpdateAll(editableData)}
                    sx={{ backgroundColor: '#d62e2f', color: '#fff', '&:hover': { backgroundColor: '#d62e2f' } }}
                    variant="contained"
                    size="small"
                >
                    Guardar Todos
                </Button>
            </DialogActions>
        </Dialog>
    );
};

export default DialogHistory;
