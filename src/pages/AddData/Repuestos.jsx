import React from 'react';
import EditRepuesto from '../../components/RequestRepuestos/Forms/EditRepuesto';

const Repuestos = () => {
    const initialData = {
        idRepuesto: 123,
        codigo: 'ABC123',
        nombre: 'Repuesto Ejemplo',
        descripcion: 'Descripción del repuesto',
        precio: 100,
        idVehiculo: 456,
        marca: 'Marca Ejemplo',
        enInventario: true,
        estatus: true,
        imagen: 'imagen.jpg'
    };

    const handleFormSubmit = (data) => {
        console.log('Datos recibidos del formulario:', data);
        // Aquí puedes manejar los datos, enviarlos a un servidor, etc.
    };

    return (
        <div className="container mx-auto p-4">
            <h1 className="text-2xl mb-4">Editar Repuesto</h1>
            <EditRepuesto initialData={initialData} onSubmit={handleFormSubmit} />
        </div>
    );
};
   

export default Repuestos;
