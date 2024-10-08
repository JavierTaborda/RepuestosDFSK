import React, { useState, useEffect } from 'react';
import { useDropzone } from 'react-dropzone';
import { motion } from 'framer-motion';

export default function EditRepuesto({ initialData, onSubmit }) {
    const [formData, setFormData] = useState({
        idRepuesto: 0,
        codigo: '',
        nombre: '',
        descripcion: '',
        precio: 0,
        idVehiculo: 0,
        marca: '',
        enInventario: true,
        estatus: true,
        imagen: ''
    });

    const [file, setFile] = useState(null);
    const { getRootProps, getInputProps } = useDropzone({
        onDrop: acceptedFiles => {
            setFile(acceptedFiles[0]);
            setFormData({ ...formData, imagen: acceptedFiles[0].name });
        }
    });

    useEffect(() => {
        if (initialData) {
            setFormData(initialData);
        }
    }, [initialData]);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleCheckboxChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.checked });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        onSubmit(formData);
    };

    const previewImage = file ? URL.createObjectURL(file) : null;

    return (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5 }}>
            <form onSubmit={handleSubmit} className="p-4 bg-light rounded shadow-sm">
                <div className="form-row">
                    <div className="form-group pt-2">
                        <label>Código:</label>
                        <input
                            type="text"
                            name="codigo"
                            value={formData.codigo}
                            onChange={handleChange}
                            className="form-control"
                        />
                    </div>
                    <div className="form-group pt-2">
                        <label>Nombre:</label>
                        <input
                            type="text"
                            name="nombre"
                            value={formData.nombre}
                            onChange={handleChange}
                            className="form-control"
                        />
                    </div>
                    <div className="form-group  pt-2">
                        <label>Descripción:</label>
                        <input
                            type="text"
                            name="descripcion"
                            value={formData.descripcion}
                            onChange={handleChange}
                            className="form-control"
                        />
                    </div>
                    <div className="form-group  pt-2">
                        <label>Precio:</label>
                        <input
                            type="number"
                            name="precio"
                            value={formData.precio}
                            onChange={handleChange}
                            className="form-control"
                        />
                    </div>
                    <div className="form-group  pt-2">
                        <label>ID Vehículo:</label>
                        <input
                            type="number"
                            name="idVehiculo"
                            value={formData.idVehiculo}
                            onChange={handleChange}
                            className="form-control"
                        />
                    </div>
                    <div className="form-group  pt-2">
                        <label>Marca:</label>
                        <input
                            type="text"
                            name="marca"
                            value={formData.marca}
                            onChange={handleChange}
                            className="form-control"
                        />
                    </div>
                    <div className="form-group  pt-2">
                        <label>En Inventario:</label>
                        <input
                            type="checkbox"
                            name="enInventario"
                            checked={formData.enInventario}
                            onChange={handleCheckboxChange}
                            className="form-check-input"
                        />
                    </div>
                    <div className="form-group  pt-2">
                        <label>Estatus:</label>
                        <input
                            type="checkbox"
                            name="estatus"
                            checked={formData.estatus}
                            onChange={handleCheckboxChange}
                            className="form-check-input"
                        />
                    </div>
                </div>
                <div {...getRootProps()} className="p-4 border border-secondary rounded mt-4">
                    <input {...getInputProps()} />
                    <p className="text-center">
                        {file ? file.name : "Arrastra y suelta una imagen aquí, o haz clic para seleccionar una imagen"}
                    </p>
                    {previewImage && (
                        <div className="mt-4 d-flex justify-content-center">
                            <img src={previewImage} alt="Preview" className="img-thumbnail" style={{ maxHeight: "100px" }} />
                        </div>
                    )}
                </div>
                <button type="submit" className="btn btn-success mt-4">Guardar</button>
            </form>
        </motion.div>
    );
}
