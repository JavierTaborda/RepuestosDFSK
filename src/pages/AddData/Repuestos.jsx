import React, { useEffect, useState } from 'react';
import { getRepuestos } from '../../services/RepuestosService';
import EditRepuesto from '../../components/RequestRepuestos/Forms/EditRepuesto';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Button, Dialog, DialogActions, DialogContent, DialogTitle } from '@mui/material';
import { toast } from 'react-toastify';
import { motion } from 'framer-motion';


const Repuestos = () => {
    const [repuestos, setRepuestos] = useState([]);
    const [selectedRepuesto, setSelectedRepuesto] = useState(null);
    const [modalIsOpen, setModalIsOpen] = useState(false);
    const [error, setError] = useState(null);

    const handleFormSubmit = (data) => {
        console.log('Datos recibidos del formulario:', data);
        closeModal();
    };

    useEffect(() => {
        const fetchRepuestos = async () => {
            try {
                const repuestos = await getRepuestos();
                setRepuestos(repuestos);
                // toast.success('Repuestos cargados exitosamente');
                console.log('Repuestos:', repuestos);
            } catch (error) {
                console.error('Error fetching repuestos', error);
                setError(error);
            }
        };
        fetchRepuestos();
    }, []);

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
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5 }}
                className="container mx-auto p-4"
            >
                <TableContainer component={Paper}>
                    <Table>
                        <TableHead>
                            <TableRow>
                                <TableCell sx={{ backgroundColor: '#d62e2f', color: 'white' }}>Código</TableCell>
                                <TableCell sx={{ backgroundColor: '#d62e2f', color: 'white' }}>Nombre</TableCell>
                                <TableCell sx={{ backgroundColor: '#d62e2f', color: 'white' }}>Descripción</TableCell>
                                <TableCell sx={{ backgroundColor: '#d62e2f', color: 'white' }}>Precio</TableCell>
                                <TableCell sx={{ backgroundColor: '#d62e2f', color: 'white' }}>Marca</TableCell>
                                <TableCell sx={{ backgroundColor: '#d62e2f', color: 'white' }}>En Inventario</TableCell>
                                <TableCell sx={{ backgroundColor: '#d62e2f', color: 'white' }}>Editar</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {repuestos.map((repuesto) => (
                                <TableRow key={repuesto.idRepuesto}>
                                    <TableCell>{repuesto.codigo}</TableCell>
                                    <TableCell>{repuesto.nombre}</TableCell>
                                    <TableCell>{repuesto.descripcion}</TableCell>
                                    <TableCell>{repuesto.precio}</TableCell>
                                    <TableCell>{repuesto.marca}</TableCell>
                                    <TableCell>{repuesto.enInventario ? "Sí" : "No"}</TableCell>
                                    <TableCell>
                                        <button className="btn btn-outline-secondary" onClick={() => openModal(repuesto)}>
                                            <i className="bi bi-pencil-square"></i>
                                        </button>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
            </motion.div>
            <Dialog open={modalIsOpen} onClose={closeModal}  aria-labelledby="form-dialog-title"
                sx={{
                    '& .MuiDialog-paper': {
                        margin: 'auto',
                        position: 'absolute',
                        top: '50%',
                        left: '50%',
                        transform: 'translate(-50%, -50%)',
                        minWidth: '50%',
                        '@media (max-width: 600px)': {  // Media query para pantallas de tamaño teléfono
                            minWidth: '90%'
                        }
                    }
                }} >
                <DialogTitle id="form-dialog-title">Editar Repuesto</DialogTitle>
                <DialogContent>
                    {selectedRepuesto && (
                        <EditRepuesto initialData={selectedRepuesto} onSubmit={handleFormSubmit} />
                    )}
                </DialogContent>
                <DialogActions> 
                    <Button onClick={closeModal} sx={{ color: '#d62e2f' }}>
                        Cerrar
                    </Button>
                </DialogActions>
            </Dialog>
        </>
    );
};

export default Repuestos;
