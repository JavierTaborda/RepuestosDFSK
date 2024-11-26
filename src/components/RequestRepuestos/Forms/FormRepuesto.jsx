import React, { useState } from "react";
import { toast } from "react-toastify";
import SelectVehiculo from "../../forms/SelectVehiculo";
import Spinner from "../../forms/Spinner";
import { motion } from 'framer-motion';
import { postRepuesto } from "../../../services/RepuestosService";

export default function FormRepuesto({ setrepuestoData, insertRepuesto }) {
    const initialState = {
        IdRepuesto: 0,
        Codigo: insertRepuesto ? "" : "DEFINIR",
        NumParte: "",
        Nombre: "",
        Descripcion: "",
        Precio: null,
        IdVehiculo: null,
        Marca: "",
        Estatus: true,
        EnInventario: false,
    };

    const [listRepuestos, setlistRepuestos] = useState([]);
    const [repuestoData, setRepuestoData] = useState(initialState);
    const [isLoading, setIsLoading] = useState(false);
    const [errors, setErrors] = useState({});
    const [isClicked, setIsClicked] = useState(false);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setRepuestoData({ ...repuestoData, [name]: value });
        setIsClicked(false)
    };

    const handleIdVehiChange = (newIdVehi) => {
        setRepuestoData((prevData) => ({
            ...prevData,
            IdVehiculo: newIdVehi,
        }));
    };

    const validate = () => {
        let tempErrors = {};
        if (!repuestoData.Nombre) tempErrors.Nombre = "El nombre es requerido";
        if (!repuestoData.Descripcion) tempErrors.Descripcion = "La descripción es requerida";
        if (!repuestoData.IdVehiculo) tempErrors.IdVehiculo = "El vehículo es requerido";
        if (!repuestoData.Marca) tempErrors.Marca = "La marca es requerida";
        setErrors(tempErrors);
        return Object.keys(tempErrors).length === 0;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        repuestoData.Precio = 0;

        if (validate()) {
            if (!isClicked) {
                setIsClicked(true);
            }
            setIsLoading(true);

            try {
                console.log(repuestoData);
                const response = await postRepuesto(repuestoData);

                if (response.status === 200) {
                    setrepuestoData(response.data);
                    toast.success("Repuesto registrado con éxito");
                    // Limpiar el formulario
                    setRepuestoData(initialState);
                } else {
                    toast.error("Error al registrar el repuesto");
                }
            } catch (error) {
                if (error.response) {
                    console.log(repuestoData);
                    toast.error("Ya hay una solicitud similar por este repuesto procesada.\nPor favor espere que sea registrado en nuestro inventario.");
                    setIsClicked(false);
                } else if (error.request) {
                    toast.error("Error conectando con el servidor.");
                } else {
                    toast.error("Error: " + error.message);
                }
            } finally {
                setlistRepuestos([]);
                setIsLoading(false);
            }
        } else {
            toast.warning("Todos los campos son obligatorios");
        }
    };

    return (
        <form onSubmit={handleSubmit} className="pt-5">
            <div className="row g-3">
                {insertRepuesto ? (
                    <div className="col-md-4 col-lg-4">
                        <label htmlFor="codigo" className="form-label">Código</label>
                        <input
                            type="text"
                            className="form-control"
                            placeholder="Ingresa Código"
                            id="codigo"
                            name="Codigo"
                            value={repuestoData.Codigo}
                            onChange={handleChange}
                        />
                        {errors.Codigo && <small className="text-danger">{errors.Codigo}</small>}
                    </div>
                ) : null}
                <div className="col-md-4 col-lg-4">
                    <label htmlFor="numparte" className="form-label">N. de Parte</label>
                    <input
                        type="text"
                        className="form-control"
                        placeholder="Ingresa Número de Parte"
                        id="numparte"
                        name="NumParte"
                        value={repuestoData.NumParte}
                        onChange={handleChange}
                    />
                    {errors.NumParte && <small className="text-danger">{errors.NumParte}</small>}
                </div>
                <div className="col-md-8 col-lg-8">
                    <label htmlFor="Nombre" className="form-label">Nombre</label>
                    <input
                        type="text"
                        className="form-control"
                        placeholder="Ingresa Nombre"
                        name="Nombre"
                        id="Nombre"
                        value={repuestoData.Nombre}
                        onChange={handleChange}
                        required
                    />
                    {errors.Nombre && <small className="text-danger">{errors.Nombre}</small>}
                </div>
                <div className="col-md-12 col-lg-12">
                    <label htmlFor="Descripcion" className="form-label">Descripción/Detalles</label>
                    <input
                        type="text"
                        className="form-control p-3"
                        placeholder="Ingrese Descripción"
                        id="Descripcion"
                        name="Descripcion"
                        value={repuestoData.Descripcion}
                        onChange={handleChange}
                    />
                    {errors.Descripcion && <small className="text-danger">{errors.Descripcion}</small>}
                </div>
                <div className="col-md-6 col-lg-6">
                    <label htmlFor="Marca" className="form-label">Marca</label>
                    <input
                        type="text"
                        className="form-control"
                        placeholder="Ingrese Marca"
                        id="Marca"
                        name="Marca"
                        value={repuestoData.Marca}
                        onChange={handleChange}
                        required
                    />
                    {errors.Marca && <small className="text-danger">{errors.Marca}</small>}
                </div>
                <div className="col-md-12 col-lg-6">
                    <label className="form-label mb-0">Modelo de Vehículo</label>
                    <SelectVehiculo onIdVehiculoChange={handleIdVehiChange} />
                    {errors.IdVehiculo && <small className="text-danger">{errors.IdVehiculo}</small>}
                </div>
            </div>
            <div className="d-grid gap-2 pt-4">
                {insertRepuesto ? (
                    <button type="submit" className="btn btn-success mt-5">
                        <i className="bi bi-floppy"></i> Registrar Repuesto
                    </button>
                ) : (
                    <motion.button
                        type="submit"
                            className="btn btn-danger mt-2"
                        animate={{ x: isClicked ? -100 : 0, opacity: isClicked ? 0 : 1 }}
                        transition={{ type: "tween", stiffness: 300, duration: 0.5 }}
                    >
                        <i className="bi bi-arrow-right-square-fill"></i> Siguiente Paso
                    </motion.button>
                )}
            </div>
            {isLoading && <Spinner />}
        </form>
    );
}
