import React, { useState, useEffect, useContext } from 'react';
import { toast } from 'react-toastify';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Collapse, IconButton, TextField, Button, FormControl, InputLabel, Select, MenuItem, Alert } from '@mui/material';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { KeyboardArrowDown, KeyboardArrowUp } from '@mui/icons-material';
import Spinner from '../../components/forms/Spinner';
import { getFilterSolicitudes } from '../../services/SolicitudesService';
import { getUsers } from '../../services/UserService';
import dayjs from 'dayjs';
import { AuthContext } from '../../context/AuthProvider';
import DialogHistory from '../../components/RequestRepuestos/DialogHistory';
import QRDialog from '../../components/Qrtrack/QRDialog';

export default function EstadosSolicitudes() {
    const { user } = useContext(AuthContext);
    const [dataResumen, setResumen] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [open, setOpen] = useState({});
    const [statusFilter, setStatusFilter] = useState('Todos');
    const [startDate, setStartDate] = useState(dayjs(new Date()).format('YYYY-MM-DD'));
    const [endDate, setEndDate] = useState(dayjs(new Date()).format('YYYY-MM-DD'));
    const [errorMessage, setErrorMessage] = useState(null);
    const [modalOpen, setModalOpen] = useState(false);
    const [qrDialogOpen, setQRDialogOpen] = useState(false);
    const [selectedData, setSelectedData] = useState(null);
    const [userAdmin, setUserAdmin] = useState(false);
    const [usersdata, setUsersData] = useState([]);
    const [iduser, setidUser] = useState(0);
    const [qrcode, setQrCode] = useState();

    const handleModalOpen = (data) => {
        setSelectedData(data);
        setModalOpen(true);
    };

    const handleModalClose = () => {
        setModalOpen(false);
        setSelectedData(null);
    };

    const handleQROpen = (codigoUnico) => {
        setQrCode(codigoUnico);
        setQRDialogOpen(true);
    };

    const handleQRClose = () => {
        setQRDialogOpen(false);
        setSelectedData(null);
    };

    const getData = async () => {

        setIsLoading(true);
        setErrorMessage(null); 
        try {
           
            const response = await getFilterSolicitudes(startDate, endDate, statusFilter, userAdmin ? iduser : user.user);
            setResumen(response);
        } catch (error) {
            setErrorMessage(error.response ? error.response.data : error.message);
            if (error.response?.status !== 401) {
                toast.error(`Error en la carga de datos: ${errorMessage}`);
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
    };

    const getUsersList = async () => {
        try {
            const response = await getUsers();
            setUsersData(response);
        } catch (error) {
            toast.error("Error en la carga de datos: " + error.message);
        }
    };

    useEffect(() => {
        if (user) {
            if (user.role === 'admin') {
                setUserAdmin(true);
                getUsersList();
            }
            
            getData();
        }
    }, [user]);
    if (!user) {
        return <div><Spinner /></div>;
    }

    return (
        <>
            <h2 className="bd-title text-start mb-0 p-3 ms-5 mt-2">Históricos de Pedidos</h2>
            <div className="container pt-2">
                <div className="row p-2">
                    <div className="col-md-3 pt-3">
                        <FormControl fullWidth>
                            <InputLabel id="status-select-label">Filtrar por status</InputLabel>
                            <Select
                                labelId="status-select-label"
                                id="status-select"
                                value={statusFilter}
                                label="Filtrar por status"
                                onChange={(e) => setStatusFilter(e.target.value)}
                                size="small"
                            >
                                <MenuItem value="Todos"><em>Todos</em></MenuItem>
                                <MenuItem value={false}>Pendientes</MenuItem>
                                <MenuItem value={true}>Finalizados</MenuItem>
                            </Select>
                        </FormControl>
                    </div>
                    <div className="col-md-3 pt-3">
                        <TextField
                            InputLabelProps={{ shrink: true }}
                            type="date"
                            label="Fecha de inicio"
                            value={startDate}
                            onChange={(e) => setStartDate(e.target.value)}
                            fullWidth
                            size="small"
                        />
                    </div>
                    <div className="col-md-3 pt-3">
                        <TextField
                            InputLabelProps={{ shrink: true }}
                            type="date"
                            label="Fecha de fin"
                            value={endDate}
                            onChange={(e) => setEndDate(e.target.value)}
                            fullWidth
                            size="small"
                        />
                    </div>
                    {userAdmin && (
                    <div className="col-md-3 pt-3">
                        <FormControl fullWidth>
                            <InputLabel id="concesionario-select-label">Concesionario</InputLabel>
                            <Select
                                labelId="concesionario-select-label"
                                id="concesionario-select"
                                value={iduser}
                                label="Filtrar por Concesionario"
                                onChange={(e) => setidUser(e.target.value)}
                                size="small"
                            >
                                <MenuItem value="0"><em>Todos</em></MenuItem>
                                {usersdata.map((user) => (
                                    <MenuItem key={user.idUsuario} value={user.idUsuario}>
                                        {user.nombre}
                                    </MenuItem>
                                ))}
                            </Select>
                        </FormControl>
                    </div>)}
                   
                    <div className="col-md-3 pt-3">
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
                ) : errorMessage ? (
                    <Alert severity="error">{errorMessage}</Alert>
                ) : dataResumen.length > 0 ? (
                    <TableContainer component={Paper} elevation={2} className="mt-3">
                        <Table>
                            <TableHead>
                                <TableRow>
                                    <TableCell sx={{ backgroundColor: '#d62e2f', color: 'white' }} />
                                    <TableCell sx={{ backgroundColor: '#d62e2f', color: 'white' }}>#Solicitud</TableCell>
                                    <TableCell sx={{ backgroundColor: '#d62e2f', color: 'white' }}>Fecha de Creación</TableCell>
                                    <TableCell sx={{ backgroundColor: '#d62e2f', color: 'white' }}>Fecha de Requerida</TableCell>
                                    <TableCell sx={{ backgroundColor: '#d62e2f', color: 'white' }}>Solicitante</TableCell>
                                    <TableCell sx={{ backgroundColor: '#d62e2f', color: 'white' }}>Monto Estimado</TableCell>
                                    <TableCell sx={{ backgroundColor: '#d62e2f', color: 'white' }}></TableCell>
                                    <TableCell sx={{ backgroundColor: '#d62e2f', color: 'white' }}></TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {dataResumen.map((resumen) => (
                                    <React.Fragment key={resumen.idResumenSolicitud}>
                                        <TableRow>
                                            <TableCell>
                                                <IconButton aria-label="expand row" size="small" onClick={() => handleToggle(resumen.idResumenSolicitud)}>
                                                    {open[resumen.idResumenSolicitud] ? <KeyboardArrowUp /> : <KeyboardArrowDown />}
                                                </IconButton>
                                            </TableCell>
                                            <TableCell size="small">
                                                <span className={resumen.estatus ? 'h5 text-success':'h6 text-warning' }>
                                                    {resumen.idResumenSolicitud}
                                                </span>
                                            </TableCell>
                                            <TableCell>{dayjs(resumen.fechaCreacion).format('YYYY-MM-DD hh:mm')}</TableCell>
                                            <TableCell>{dayjs(resumen.fechaCierre).format('YYYY-MM-DD hh:mm')}</TableCell>
                                            <TableCell>{resumen.usuario}</TableCell>
                                            <TableCell>
                                                <span className="h5">
                                                    <i className="bi bi-currency-dollar"></i> {resumen.solicitudes.reduce((acc, solicitud) => acc + (solicitud.precio * solicitud.cantidad), 0)}
                                                </span>
                                            </TableCell>
                                            <TableCell size="small">
                                                <i className="bi bi-qr-code" style={{ color: '#d62e2f', cursor: 'pointer' }} onClick={() => handleQROpen(resumen.codigoUnico)}></i>
                                            </TableCell>
                                            <TableCell size="small">
                                                {userAdmin ? (
                                                    <button className="btn btn-outline-danger rounded-5" onClick={() => handleModalOpen(resumen)}>
                                                        <i className="bi bi-pencil-fill"></i>
                                                    </button>
                                                ) : null}
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
                                                                    <TableCell>Modelo de Vehículo</TableCell>
                                                                    <TableCell>Estado</TableCell>
                                                                    {userAdmin && (
                                                                        <>
                                                                            <TableCell>Responsable</TableCell>
                                                                            <TableCell>Fecha de Compra</TableCell>
                                                                            <TableCell>Fecha de Llegada</TableCell>
                                                                            <TableCell>Fecha de Finalización</TableCell>
                                                                        </>
                                                                    )}
                                                                </TableRow>
                                                            </TableHead>
                                                            <TableBody>
                                                                {resumen.solicitudes.map((solicitud) => (
                                                                    <TableRow key={solicitud.idSolicitud}>
                                                                        <TableCell component="th" scope="row">{`#Parte:${solicitud.numParte}\n${solicitud.repuesto}`}</TableCell>
                                                                        <TableCell align="right">{solicitud.cantidad}</TableCell>
                                                                        <TableCell align="right">${Math.round(solicitud.cantidad * solicitud.precio * 100) / 100}</TableCell>
                                                                        <TableCell>{solicitud.vehiculo}</TableCell>
                                                                        <TableCell>{solicitud.estado}</TableCell>
                                                                        {userAdmin && (
                                                                            <>
                                                                                <TableCell>{solicitud.responsable}</TableCell>
                                                                                <TableCell>{solicitud.fechaCompra ? dayjs(solicitud.fechaCompra).format('YYYY-MM-DD') : 'N/A'}</TableCell>
                                                                                <TableCell>{solicitud.fechaLlegada ? dayjs(solicitud.fechaLlegada).format('YYYY-MM-DD') : 'N/A'}</TableCell>
                                                                                <TableCell>{solicitud.fechaListo ? dayjs(solicitud.fechaListo).format('YYYY-MM-DD') : 'N/A'}</TableCell>
                                                                            </>
                                                                        )}
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
                <DialogHistory open={modalOpen} handleClose={handleModalClose} data={selectedData} />
                <QRDialog open={qrDialogOpen} handleClose={handleQRClose} codigoUnico={qrcode} />
            </div>
        </>
    );
}


