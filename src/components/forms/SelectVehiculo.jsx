import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { FormControl, InputLabel, Select, MenuItem } from "@mui/material";
import { getVehiculos } from "../../services/VehiclesService";

const URI = `Vehiculos/`;

const SelectVehiculo = ({ onIdVehiculoChange }) => {
  const [dataVehiculos, setDataVehiculos] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [dataIdVehiculo, setdataIdVehiculo] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoading(true);
        const response = await getVehiculos();
        setDataVehiculos(response);
       
      } catch (error) {
        toast.error("Error en la carga de datos: " + error.message);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  const handleSelectChange = (e) => {
    const newIdVehi = e.target.value;
    setdataIdVehiculo(newIdVehi);
    onIdVehiculoChange(newIdVehi);
  };

  return (
    <>
      {isLoading ? (
        <div className="spinner-border spinner-border-sm" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
      ) : (
        <FormControl fullWidth>
          <InputLabel id="modelo-select-label">Modelo de Vehículo</InputLabel>
          <Select
            labelId="modelo-select-label"
            value={dataIdVehiculo}
            onChange={handleSelectChange}
            label="Modelo de Vehículo"
          >
            <MenuItem value="">
              <em>Seleccione un Modelo de Vehículo</em>
            </MenuItem>
            {dataVehiculos.map((vehiculo) => (
              <MenuItem key={vehiculo.idVehiculo} value={vehiculo.idVehiculo}>
                {vehiculo.modelo} <em style={{ paddingLeft: '10px', color: '#a8a8a8' }}>{vehiculo.anho}</em>
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      )}
    </>
  );
};

export default SelectVehiculo;
