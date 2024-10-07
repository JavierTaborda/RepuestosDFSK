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

    return (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5 }}>
            <form onSubmit={handleSubmit} className="space-y-4 p-4 bg-gray-100 rounded shadow-md">
                <div className="grid grid-cols-2 gap-4">
                    <div>
                        <label>Código:</label>
                        <input type="text" name="codigo" value={formData.codigo} onChange={handleChange} className="w-full p-2 border rounded" />
                    </div>
                    <div>
                        <label>Nombre:</label>
                        <input type="text" name="nombre" value={formData.nombre} onChange={handleChange} className="w-full p-2 border rounded" />
                    </div>
                    <div>
                        <label>Descripción:</label>
                        <input type="text" name="descripcion" value={formData.descripcion} onChange={handleChange} className="w-full p-2 border rounded" />
                    </div>
                    <div>
                        <label>Precio:</label>
                        <input type="number" name="precio" value={formData.precio} onChange={handleChange} className="w-full p-2 border rounded" />
                    </div>
                    <div>
                        <label>ID Vehículo:</label>
                        <input type="number" name="idVehiculo" value={formData.idVehiculo} onChange={handleChange} className="w-full p-2 border rounded" />
                    </div>
                    <div>
                        <label>Marca:</label>
                        <input type="text" name="marca" value={formData.marca} onChange={handleChange} className="w-full p-2 border rounded" />
                    </div>
                    <div>
                        <label>En Inventario:</label>
                        <input type="checkbox" name="enInventario" checked={formData.enInventario} onChange={handleCheckboxChange} className="w-full p-2 border rounded" />
                    </div>
                    <div>
                        <label>Estatus:</label>
                        <input type="checkbox" name="estatus" checked={formData.estatus} onChange={handleCheckboxChange} className="w-full p-2 border rounded" />
                    </div>
                </div>
                <div {...getRootProps()} className="p-4 border-dashed border-2 border-gray-300 rounded mt-4">
                    <input {...getInputProps()} />
                    <p>{file ? file.name : "Arrastra y suelta una imagen aquí, o haz clic para seleccionar una imagen"}</p>
                </div>
                <button type="submit" className="px-4 py-2 bg-blue-500 text-white rounded">Guardar</button>
            </form>
        </motion.div>
    );
}
