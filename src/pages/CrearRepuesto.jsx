import React from "react";
import { useState, useEffect, useForm } from "react";
import { toast } from "react-toastify";
import Spinner from "../components/forms/Spinner";
import SelectVehiculo from "../components/forms/SelectVehiculo";
import apiUrl from "../apiConfig";

export default function CrearRepuesto() {

  const url = `${apiUrl}/Repuestos/`;

  //Define objet of state for form fields repuestos
  const [repuestoData, setRepuestoData] = useState({
    IdRepuesto: 0,
    Codigo: "",
    Nombre: "",
    Descripcion: "",
    Precio: null,
    IdVehiculo: null,
    Marca: "",
    Estatus: true,
    EnInventario: false,
  });
  
  const [isLoading, setIsLoading] = useState(false);
  //error of validation
  const [errors, setErrors] = useState({});

  //List of repuestos to API
  const [listRepuestos, setlistRepuestos] = useState([]);

  //Sets the value in the object field
  const handleChange = (e) => {
    const { name, value } = e.target;
    setRepuestoData({ ...repuestoData, [name]: value });
  };

  const handleIdVehiChange = (newIdVehi) => {
    setRepuestoData((prevData) => ({
      ...prevData,
      IdVehiculo: newIdVehi

    }));
  };

  const validate = () => {
    let tempErrors = {};

    if (!repuestoData.Nombre) tempErrors.Nombre = "El nombre es requerido";
    if (!repuestoData.Descripcion)
      tempErrors.Descripcion = "La descripción es requerida";
    if (!repuestoData.IdVehiculo)
      tempErrors.IdVehiculo = "El vehículo es requerido";
    if (!repuestoData.Marca) tempErrors.Marca = "La marca es requerida";
    setErrors(tempErrors);
    return Object.keys(tempErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    repuestoData.Precio = 0;

    if (validate()) {
      setIsLoading(true)
      const newlistRepuestos = [...listRepuestos, repuestoData];
      setlistRepuestos(newlistRepuestos);

      try {
        const response = await fetch(url, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(newlistRepuestos),
        });

        if (response.ok) {
          toast.success("Repuesto registrado correctamente");
        } else {

          toast.error("Error al registrar el repuesto");
        }
      } catch (error) {
        toast.error("Error en la solicitud:" + error.message);
      }
      //clear fields
      setRepuestoData({
        Codigo: "",
        Nombre: "",
        Descripcion: "",
        Marca: ""
      });
      setlistRepuestos([]);
      setIsLoading(false)
    } else {
      toast.warning("Todos los campos son obligatorios");
    }
  };

  return (
    <div className="container my-4">
      <div className="row ">
        <div className="col-md-8 col-lg-9">
          <h4 className="mb-5">Crear Repuesto para Solicitud</h4>
          <form onSubmit={handleSubmit} className="" >
            <div className="row g-3">
              <div className="col-md-4 col-lg-4">
                <label htmlFor="codigo" className="form-label">
                  Código
                </label>
                <input
                  type="text"
                  className="form-control "
                  placeholder="Ingresa Código"
                  id="codigo"
                  name="Codigo"
                  value={repuestoData.Codigo}
                  onChange={handleChange}
                />
              </div>
              <div className="col-md-8 col-lg-8">
                <label htmlFor="Nombre" className="form-label">
                  Nombre
                </label>
                <input
                  type="text"
                  className="form-control"
                  // className={`form-control ${errors.Nombre ? 'is-invalid' : ''}`}
                  placeholder="Ingresa Nombre"
                  name="Nombre"
                  id="Nombre"
                  value={repuestoData.Nombre}
                  onChange={handleChange}
                  required
                />
                {/* {errors.Nombre && <div className="invalid-feedback">{errors.Nombre}</div>} */}
              </div>
              <div className="col-md-12 col-lg-12">
                <label htmlFor="Descripcion" className="form-label">
                  Descripción/Detalles
                </label>
                <input
                  type="text"
                  className="form-control p-3"
                  placeholder="Ingrese Descripción"
                  id="Descripcion"
                  name="Descripcion"
                  value={repuestoData.Descripcion}
                  onChange={handleChange}
                />
              </div>
              <div className="col-md-6 col-lg-6">
                <label htmlFor="Marca" className="form-label">
                  Marca
                </label>
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
              </div>

              <div className="col-md-6 col-lg-6">
                <label className="form-label">Vehículo</label>
                <SelectVehiculo
                  onIdVehiculoChange={handleIdVehiChange}
                />
              </div>
              <div className="col-12" >
                <div className="mb-3">
                  <label htmlFor="formFile" className="form-label">Imagen Referencial</label>
                  <input className="form-control" type="file" id="formFile" />
                </div>
              </div>
            </div>

            <button type="submit" className="btn btn-success mt-5">
              <i className="bi bi-floppy"></i> Enviar
            </button>
          </form>
        </div>
        <div className="col-md-4 col-lg-3 my-auto">
          {isLoading ? <Spinner />: null}    
        </div>
      </div>
    </div>
  );
}
