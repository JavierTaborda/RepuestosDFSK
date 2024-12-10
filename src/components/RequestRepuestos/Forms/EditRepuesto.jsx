import React, { useState, useEffect } from 'react';
import { useDropzone } from 'react-dropzone';
import { motion } from 'framer-motion';
import { uploadFile } from '../../../firebase/config';
import { toast } from 'react-toastify';
import { updateRespuestos } from '../../../services/RepuestosService';
import { updateImagenURL } from '../../../services/ArticulosService';
import Spinner from '../../forms/Spinner'; 

export default function EditRepuesto({ initialData, onSubmit, modelos }) {
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
    const [isUploading, setIsUploading] = useState(false);

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

    const { getRootProps, getInputProps } = useDropzone({
        onDrop: acceptedFiles => {
            if (!isUploading) {
                setFile(acceptedFiles[0]);
            }
        }
    });

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            setIsUploading(true);
            const fileType = file.name.split('.').pop(); 
            const url = await uploadFile(file, `${formData.codigo}.${fileType}`);
            if (url.length > 0) {
                formData.imagen = url;
                const responseDFSK = await updateImagenURL({ articulo: formData.codigo, urlImagen: formData.imagen });
                if (responseDFSK === "Exitoso") {
                    const responseConcesionario = await updateRespuestos(formData);
                    if (responseConcesionario.status === 200) {
                        toast.success("Repuesto actualizado exitosamente");
                    } else {
                        toast.error("Error al actualizar el repuesto");
                    }
                } else {
                    toast.error("Error al actualizar el repuesto");
                }
            }
        } catch (error) {
            console.log(error);
            toast.error(error.message);
        } finally {
            setIsUploading(false);
        }
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
                    <div className="form-group pt-2">
                        <label>Descripción:</label>
                        <input
                            type="text"
                            name="descripcion"
                            value={formData.descripcion}
                            onChange={handleChange}
                            className="form-control"
                        />
                    </div>
                    <div className="form-group pt-2">
                        <label>Precio:</label>
                        <input
                            type="number"
                            name="precio"
                            value={formData.precio}
                            onChange={handleChange}
                            className="form-control"
                        />
                    </div>
                    <div className="form-group pt-2">
                        <label>Modelo:</label>
                        <select
                            className="form-select form-select mb-2"
                            id="idVehiculo"
                            name="idVehiculo"
                            value={formData.idVehiculo}
                            onChange={handleChange}
                        >
                            <option value="0">Seleccione un modelo</option>
                            {modelos.map((modelo) => (
                                <option key={modelo.id} value={modelo.id}>
                                    {modelo.nombre}
                                </option>
                            ))}
                        </select>
                    </div>
                    <div className="form-group pt-2">
                        <label>Marca:</label>
                        <input
                            type="text"
                            name="marca"
                            value={formData.marca}
                            onChange={handleChange}
                            className="form-control"
                        />
                    </div>
                    <div className="form-group pt-2">
                        <label>En Inventario:</label>
                        <input
                            type="checkbox"
                            name="enInventario"
                            checked={formData.enInventario}
                            onChange={handleCheckboxChange}
                            className="form-check-input"
                        />
                    </div>
                    <div className="form-group pt-2">
                        <label>Estatus:</label>
                        <input
                            type="checkbox"
                            name="estatus"
                            checked={formData.estatus}
                            onChange={handleCheckboxChange}
                            className="form-check-input"
                        />
                    </div>
                    <div className="pt-2">
                        <label>Imagen actual:</label>
                        <img src={formData.imagen} className="img-thumbnail" alt={formData.nombre} />
                    </div>
                </div>
                <div {...getRootProps()} className={`p-4 border border-secondary rounded mt-4 ${isUploading ? 'disabled' : ''}`}>
                    <input {...getInputProps()} disabled={isUploading} />
                    {isUploading ? (
                        <div className="d-flex justify-content-center">
                            <Spinner />
                        </div>
                    ) : (
                        <p className="text-center">
                            {file ? file.name : "Arrastra y suelta una imagen aquí, o haz clic para seleccionar una imagen"}
                        </p>
                    )}
                    {previewImage && (
                        <div className="mt-4 d-flex justify-content-center">
                            <img src={previewImage} alt="Preview" className="img-thumbnail" style={{ maxHeight: "100px" }} />
                        </div>
                    )}
                </div>
                <button type="submit" className="btn btn-success mt-4" disabled={isUploading}>Guardar</button>
            </form>
        </motion.div>
    );
}
