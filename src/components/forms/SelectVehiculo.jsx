import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import HttpClient from '../../services/HttpClient';

const URI = `Vehiculos/`;

export default function SelectVehiculo({ onIdVehiculoChange }) {
  const [dataVehiculos, setDataVehiculos] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [dataIdVehiculo, setdataIdVehiculo] = useState();

  useEffect(() => {
    
      const fetchData = async () => {
        try {
          setIsLoading(true);
          const response = await HttpClient.get(URI);
          setDataVehiculos(response.data);
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
      <select
        className="form-select"
        value={dataIdVehiculo || ""}
        onChange={handleSelectChange}
      >
        <option value="">Seleccione un Modelo de Vehículo</option>
        {dataVehiculos.map((item) => (
          item.estatus && (
            <option key={item.idVehiculo} value={item.idVehiculo}>
              {item.modelo}
            </option>
          )
        ))}
      </select>
    )}
  </>
);

}
