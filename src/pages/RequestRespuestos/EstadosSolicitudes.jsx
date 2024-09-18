import React, { useState, useEffect, useContext } from 'react';
import { toast } from 'react-toastify';
import {
    Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Collapse, IconButton,
    TextField, Button, FormControl, InputLabel, Select, MenuItem, Alert
} from '@mui/material';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { KeyboardArrowDown, KeyboardArrowUp } from '@mui/icons-material';
import Spinner from '../../components/forms/Spinner';
import HttpClient from '../../services/HttpClient';
import dayjs from 'dayjs';
import { AuthContext } from '../../context/AuthProvider';

export default function EstadosSolicitudes() {
    const { user } = useContext(AuthContext);
    const [dataResumen, setResumen] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [open, setOpen] = useState({});
    const [statusFilter, setStatusFilter] = useState('Todos');
    const [startDate, setStartDate] = useState(dayjs(new Date()).format('YYYY-MM-DD'));
    const [endDate, setEndDate] = useState(dayjs(new Date()).format('YYYY-MM-DD'));
    const [error, setError] = useState(null);

    const getData = async () => {
        setIsLoading(true);
        setError(null); // Reset error state

        try {
            const response = await HttpClient.get(`/Solicitudes/${startDate}/${endDate}/${statusFilter}/${user.user}`);
            setResumen(response.data);
            // console.log(response.data);
        } catch (error) {
            setError(`Error en la carga de datos: ${error.message}`);
            //console.log(error);
            if (error.response.status !== 401) {
                toast.error(`Error en la carga de datos: ${error.message}`);
            }
        } finally {
            setIsLoading(false);
        }
    };


    const handleToggle = (id) => {
        setOpen((prevOpen) => ({ ...prevOpen, [id]: !prevOpen[id] }));
    };

    const handleSearch = () => {
        getData();

        //console.log(startDate, endDate, statusFilter, user.user);
    };


    useEffect(() => {
        if (user) {
            getData();
        }

    }, [user]);

    if (!user) {
        return <div><Spinner /></div>;
    }

    return (
        <>

            <h2 className="bd-title text-center mb-0 p-3">Históricos de Pedidos</h2>

            <div className='container pt-2'>
                <div className='row p-2'>
                    <div className='col-md-3 pt-3'>
                        <FormControl fullWidth>
                            <InputLabel id="status-select-label">Filtrar por status</InputLabel>
                            <Select
                                labelId="status-select-label"
                                id="status-select"
                                value={statusFilter}
                                label="Filtrar por status"
                                onChange={(e) => setStatusFilter(e.target.value)}
                            >
                                <MenuItem value="Todos"><em>Todos</em></MenuItem>
                                <MenuItem value={true}>Activo</MenuItem>
                                <MenuItem value={false}>Inactivo</MenuItem>
                            </Select>
                        </FormControl>
                    </div>
                    <div className='col-md-3 pt-3'>
                        <TextField
                            InputLabelProps={{ shrink: true }}
                            type="date"
                            label="Fecha de inicio"
                            value={startDate}
                            onChange={(e) => setStartDate(e.target.value)}
                            fullWidth
                        />
                    </div>
                    <div className='col-md-3 pt-3'>
                        <TextField
                            InputLabelProps={{ shrink: true }}
                            type="date"
                            label="Fecha de fin"
                            value={endDate}
                            onChange={(e) => setEndDate(e.target.value)}
                            fullWidth
                        />
                    </div>
                    <div className='col-md-3 pt-3'>
                        <Button variant="contained" color="error" onClick={handleSearch}>
                            Buscar
                        </Button>
                    </div>
                </div>

                {isLoading ? (
                    <div className="text-center">
                        <Spinner />
                        <p>Cargando datos...</p>
                    </div>
                ) : error ? (
                    <Alert severity="error">{error}</Alert>
                ) : dataResumen.length > 0 ? (
                    <TableContainer component={Paper }elevation={2} className='mt-3'>
                        <Table>
                            <TableHead>
                                <TableRow>
                                    <TableCell sx={{ backgroundColor: '#d62e2f', color: 'white' }} />
                                    <TableCell sx={{ backgroundColor: '#d62e2f', color: 'white' }}>#Solicitud</TableCell>
                                    <TableCell sx={{ backgroundColor: '#d62e2f', color: 'white' }}>Fecha de Creación</TableCell>
                                    <TableCell sx={{ backgroundColor: '#d62e2f', color: 'white' }}>Fecha de Cierre</TableCell>
                                    <TableCell sx={{ backgroundColor: '#d62e2f', color: 'white' }}>Solicitante</TableCell>
                                    <TableCell sx={{ backgroundColor: '#d62e2f', color: 'white' }}>Monto Estimado</TableCell>
                                    <TableCell sx={{ backgroundColor: '#d62e2f', color: 'white' }}></TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {dataResumen.map((resumen) => (
                                    <React.Fragment key={resumen.idResumenSolicitud}>
                                        <TableRow>
                                            <TableCell>
                                                <IconButton
                                                    aria-label="expand row"
                                                    size="small"
                                                    onClick={() => handleToggle(resumen.idResumenSolicitud)}
                                                >
                                                    {open[resumen.idResumenSolicitud] ? <KeyboardArrowUp /> : <KeyboardArrowDown />}
                                                </IconButton>
                                            </TableCell>
                                            <TableCell>
                                                <span className={resumen.estatus ? 'h5 text-warning' : ' h5 text-success'}>
                                                    {resumen.idResumenSolicitud}
                                                </span>
                                            </TableCell>
                                            <TableCell>{dayjs(resumen.fechaCreacion).format('YYYY-MM-DD HH:mm:ss')}</TableCell>
                                            <TableCell>{dayjs(resumen.fechaCierre).format('YYYY-MM-DD HH:mm:ss')}</TableCell>
                                            <TableCell>{resumen.vendedor}</TableCell>
                                            <TableCell>  <span className='h5'> <i className="bi bi-currency-dollar"></i> {resumen.solicitudes.reduce((acc, solicitud) => acc + (solicitud.precio*solicitud.cantidad), 0)}</span></TableCell>
                                            <TableCell>
                                                {user.role === 'Admin' ? <button className='btn btn-outline-success rounded-5'><i className="bi bi-pencil-fill"></i></button> : null}
                                            </TableCell>
                                        </TableRow>
                                        <TableRow>
                                            <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
                                                <Collapse in={open[resumen.idResumenSolicitud]} timeout="auto" unmountOnExit>
                                                    <Box sx={{ margin: 1 }}>
                                                        <Typography variant="h6" gutterBottom component="div">
                                                            Resumen:
                                                        </Typography>
                                                        <Table size="small">
                                                            <TableHead>
                                                                <TableRow>
                                                                    <TableCell>Repuesto</TableCell>
                                                                    <TableCell align="right">Cantidad</TableCell>
                                                                    <TableCell align="right">Precio Estimado</TableCell>
                                                                    <TableCell>Vehículo</TableCell>
                                                                    <TableCell>Responsable</TableCell>
                                                                    <TableCell>Estado</TableCell>
                                                                    <TableCell>Fecha de Compra</TableCell>
                                                                    <TableCell>Fecha de Llegada</TableCell>
                                                                </TableRow>
                                                            </TableHead>
                                                            <TableBody>
                                                                {resumen.solicitudes.map((solicitud) => (
                                                                    <TableRow key={solicitud.idSolicitud}>
                                                                        <TableCell component="th" scope="row">
                                                                            {solicitud.repuesto}
                                                                        </TableCell>
                                                                        <TableCell align="right">{solicitud.cantidad}</TableCell>
                                                                        <TableCell align="right">
                                                                            $ {Math.round(solicitud.cantidad * solicitud.precio * 100) / 100}
                                                                        </TableCell>
                                                                        <TableCell> {solicitud.vehiculo}</TableCell>
                                                                        <TableCell> {solicitud.responsable}</TableCell>
                                                                        <TableCell> {solicitud.estado}</TableCell>
                                                                        <TableCell> {solicitud.fechaCompra ? dayjs(solicitud.fechaCompra).format('YYYY-MM-DD') : 'N/A'}</TableCell>
                                                                        <TableCell> {solicitud.fechaCompra ? dayjs(solicitud.Llegada).format('YYYY-MM-DD') : 'N/A'}</TableCell>
                                                                    </TableRow>
                                                                ))}
                                                            </TableBody>
                                                        </Table>
                                                    </Box>
                                                </Collapse>
                                            </TableCell>
                                        </TableRow>
                                    </React.Fragment>
                                ))}
                            </TableBody>
                        </Table>
                    </TableContainer>
                ) : dataResumen.length === 0 && !isLoading ? (
                    <p>No se encontraron solicitudes.</p>
                ) : null}
            </div>

        </>


    );
}
