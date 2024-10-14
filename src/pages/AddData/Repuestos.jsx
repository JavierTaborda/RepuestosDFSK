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
        toast.success("Hola")
        closeModal();
    };

    useEffect(() => {
        const fetchRepuestos = async () => {
            try {
                const repuestos = await getRepuestos();
                setRepuestos(repuestos);
                // toast.success('Repuestos cargados exitosamente');
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
                                <TableCell sx={{ backgroundColor: '#d62e2f', color: 'white', padding: 2 }}>Imagen</TableCell>
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
                                    <TableCell>
                                        <img
                                            src={repuesto.imagen}
                                            className="img-fluid"
                                            alt={repuesto.descripcion}
                                            style={{ maxWidth: '200px', maxHeight: '200px', objectFit: 'contain' }}
                                        />
                                    </TableCell>
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
            <Dialog
                open={modalIsOpen}
                onClose={closeModal}
                aria-labelledby="form-dialog-title"
                sx={{
                    '& .MuiDialog-paper': {
                        margin: 'auto',
                        position: 'absolute',
                        top: '50%',
                        left: '50%',
                        transform: 'translate(-50%, -50%)',
                        minWidth: '50%',
                        padding: 4,
                        borderRadius: 2,
                        boxShadow: 3,
                        transition: 'all 0.3s ease',
                        '@media (max-width: 600px)': { minWidth: '90%' }
                    }
                }}
            >
                <DialogTitle id="form-dialog-title">Editar Repuesto</DialogTitle>
                <DialogContent>
                    {selectedRepuesto && (
                        <EditRepuesto initialData={selectedRepuesto} onSubmit={handleFormSubmit} />
                    )}
                </DialogContent>
                <DialogActions>
                    <Button onClick={closeModal} sx={{ color: '#d62e2f' }}>Cerrar</Button>
                </DialogActions>
            </Dialog>

        </>
    );
};

export default Repuestos;
