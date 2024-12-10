import React, { useEffect, useState, useRef, useCallback } from 'react';
import { filterRepuestos } from '../../services/RepuestosService';
import { getVehiculos } from '../../services/VehiclesService';
import { getMarca } from '../../services/ArticulosService';
import EditRepuesto from '../../components/RequestRepuestos/Forms/EditRepuesto';
import FormGroup from '@mui/material/FormGroup';
import Switch from '@mui/material/Switch';
import FormControlLabel from '@mui/material/FormControlLabel';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Button, Dialog, DialogActions, DialogContent, DialogTitle, TextField, InputAdornment } from '@mui/material';
import { toast } from 'react-toastify';
import { motion } from 'framer-motion';
import ImgDefault from '../../components/forms/ImgDefault';
import SearchIcon from '@mui/icons-material/Search';
import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';
import CustomSelect from '../../components/forms/CustomSelect';

const debounce = (func, delay) => {
    let debounceTimer;
    return function (...args) {
        clearTimeout(debounceTimer);
        debounceTimer = setTimeout(() => func.apply(this, args), delay);
    };
};

const Repuestos = () => {
    const [repuestos, setRepuestos] = useState([]);
    const [selectedRepuesto, setSelectedRepuesto] = useState(null);
    const [modalIsOpen, setModalIsOpen] = useState(false);
    const [error, setError] = useState(null);
    const [searchTerm, setSearchTerm] = useState('');
    const [marca, setMarca] = useState([]);
    const [modelo, setModelo] = useState([]);
    const [enInventario, setEnInventario] = useState(true);
    const [loading, setLoading] = useState(false);
    const [filterMarca, setFilterMarca] = useState('');
    const [filterModelo, setFilterModelo] = useState('');

    const handleFormSubmit = (data) => {
        closeModal();
    };

    const handleSearchChange = debounce((event) => {
        setSearchTerm(event.target.value);
    }, 500);

    const handleMarcaChange = (event) => {
        setFilterMarca(event.target.value);
    };

    const handleModeloChange = (event) => {
        setFilterModelo(event.target.value);
        
    };

    const handleSwitchChange = (event) => {
        setEnInventario(event.target.checked);
    };

    const handleSearchClick = () => {
        fetchRepuestos();
        toast.success('Búsqueda exitosa');
    };

    const fetchRepuestos = useCallback(async () => {
        setLoading(true);
        try {
            const repuestos = await filterRepuestos(searchTerm, filterMarca, enInventario, filterModelo);
            setRepuestos(repuestos);
        } catch (error) {
            setError(error);
        } finally {
            setLoading(false);
        }
    }, [searchTerm, filterMarca, enInventario, filterModelo]);

    useEffect(() => {
        fetchRepuestos();
        const fetchInitialData = async () => {
            try {
                if (marca.length === 0) {
                    const marcas = await getMarca();
                    setMarca(marcas);
                }
                if (modelo.length === 0) {
                    const models = await getVehiculos();
                    setModelo(models.map(model => ({ id: model.idVehiculo, nombre: model.modelo })));  
                }
            } catch (error) {
                setError(error);
            }
        };
        fetchInitialData();
    }, [fetchRepuestos, marca.length, modelo.length]);

    useEffect(() => {
        if (error) toast.error("Ocurrió un error inesperado: \n" + error);
    }, [error]);

    const openModal = (repuesto) => {
        setSelectedRepuesto(repuesto);
        setModalIsOpen(true);
    };

    const closeModal = () => {
        setSelectedRepuesto(null);
        setModalIsOpen(false);
    };

    if (error) {
        return <div>Error: {error.message}</div>;
    }


    return (
        <>
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.6 }} className="container mx-auto p-4">
                <FormGroup row style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '1rem', padding: '1rem' }}>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                    <TextField sx={{ m: 1, minWidth: 300 }} size="small" label="Buscar por nombre" variant="outlined" onChange={handleSearchChange} />
                    <Button variant="contained" color="error" onClick={handleSearchClick} sx={{ m: 1, height: '35px' }} startIcon={<SearchIcon />}>
                        Buscar
                    </Button>
                    </Box>
                    <CustomSelect
                        label="Marca"
                        value={filterMarca}
                        onChange={handleMarcaChange}
                        options={marca}
                        keyField="codigo"
                        valueField="descripcion"
                        displayField="descripcion"
                        sx={{ m: 1, minWidth: 220}}
                        size="small"
                        labelId="marca-select-label"
                    />
                    <CustomSelect
                        label="Modelo"
                        value={filterModelo}
                        onChange={handleModeloChange}
                        options={modelo}
                        keyField="id"
                        valueField="id"
                        displayField="nombre"
                        sx={{ m: 1, minWidth: 220 }}
                        size="small"
                        labelId="modelo-select-label"
                    />
                    <FormControlLabel control={<Switch checked={enInventario} onChange={handleSwitchChange} color="error" />} label="En Inventario" sx={{ m: 1 }} />
                </FormGroup>

                {loading ? (
                    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.6 }}>
                        <Box display="flex" justifyContent="center" alignItems="center" minHeight="50vh">
                            <CircularProgress variant="indeterminate" color="error" />
                        </Box>
                    </motion.div>
                ) 
                :
                 (
                    <TableContainer component={Paper} sx={{ boxShadow: 3, borderRadius: 2 }}>
                        <Table>
                            <TableHead>
                                <TableRow>
                                    <TableCell sx={{ backgroundColor: '#d62e2f', color: 'white', padding: 2 }}>Código</TableCell>
                                    <TableCell sx={{ backgroundColor: '#d62e2f', color: 'white', padding: 2 }}>Nombre</TableCell>
                                    <TableCell sx={{ backgroundColor: '#d62e2f', color: 'white', padding: 2 }}>Descripción</TableCell>
                                    <TableCell sx={{ backgroundColor: '#d62e2f', color: 'white', padding: 2 }}>Precio</TableCell>
                                    <TableCell sx={{ backgroundColor: '#d62e2f', color: 'white', padding: 2 }}>Marca</TableCell>
                                    <TableCell sx={{ backgroundColor: '#d62e2f', color: 'white', padding: 2 }}>En Inventario</TableCell>
                                    <TableCell style={{ textAlign: 'center', verticalAlign: 'middle', minWidth: '200px' }} sx={{ backgroundColor: '#d62e2f', color: 'white', padding: 2 }}>Imagen</TableCell>
                                    <TableCell sx={{ backgroundColor: '#d62e2f', color: 'white', padding: 2 }}>Editar</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {repuestos.map((repuesto) => (
                                    <TableRow key={repuesto.idRepuesto} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                                        <TableCell>{repuesto.codigo}</TableCell>
                                        <TableCell>{repuesto.nombre}</TableCell>
                                        <TableCell>{repuesto.descripcion}</TableCell>
                                        <TableCell>{repuesto.precio}</TableCell>
                                        <TableCell>{repuesto.marca}</TableCell>
                                        <TableCell>{repuesto.enInventario ? "Sí" : "No"}</TableCell>
                                        <TableCell style={{ textAlign: 'center', verticalAlign: 'middle' }}>
                                            {repuesto.imagen ? <img src={repuesto.imagen} className="img-fluid" alt={repuesto.descripcion} style={{ maxWidth: '200px', maxHeight: '200px', objectFit: 'contain' }} /> : <ImgDefault />}
                                        </TableCell>
                                        <TableCell>
                                            <button className="btn btn-outline-secondary" onClick={() => openModal(repuesto)}><i className="bi bi-pencil-square"></i></button>
                                        </TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </TableContainer>
                )}
            </motion.div>

            <Dialog open={modalIsOpen} onClose={closeModal} aria-labelledby="form-dialog-title" sx={{ '& .MuiDialog-paper': { margin: 'auto', position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', minWidth: '50%', padding: 4, borderRadius: 2, boxShadow: 3, transition: 'all 0.3s ease', '@media (max-width: 600px)': { minWidth: '90%' } } }}>
                <DialogTitle id="form-dialog-title">Editar Repuesto</DialogTitle>
                <DialogContent>
                    {selectedRepuesto && <EditRepuesto initialData={selectedRepuesto} modelos={modelo} onSubmit={handleFormSubmit} />}
                </DialogContent>
                <DialogActions>
                    <Button onClick={closeModal} sx={{ color: '#d62e2f' }}>Cerrar</Button>
                </DialogActions>
            </Dialog>
        </>
    );
}

export default Repuestos;