import HttpClient from "./HttpClient";

//Modelos from DFSK
export const getModeloTexto = async (texto) => {
  try {
    const response = await HttpClient.get(`Articulos/Modelos/${texto}`);
    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};
export const getModeloFilters = async (modelo, marca, year) => {
  try {
    const encodedModelo = encodeURIComponent(modelo);
    const encodedMarca = encodeURIComponent(marca);
    const encodedYear = encodeURIComponent(year);

    const response = await HttpClient.get(
      `Articulos/Modelos/Actualizar/${encodedModelo}/${encodedMarca}/${encodedYear}`
    );
    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};


//Vehiculos
export const getVehiculos = async () => {
  try {

    const response = await HttpClient.get("Vehiculos");
    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};
export const getVehiculosFilter = async (text) => {
  try {
    const encodedText = encodeURIComponent(text);

    const response = await HttpClient.get(`Vehiculos/Modelo/${encodedText}`);
    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const UpdateAddVehicle = async (formVehicleData) => {
  try {
   
    const response= await HttpClient.put("Vehiculos/AddUpdate", formVehicleData);
    return response.data;
  } catch (error) {
    throw error;
  }
};
export const updateVehiculo = async (vehiculo) => {
  try {

    const response= await HttpClient.put("Vehiculos", vehiculo);  
    return response.data;
    
  } catch (error) {
    throw error;
  }
};

export default { getVehiculos, UpdateAddVehicle, getVehiculosFilter,getModeloTexto,getModeloFilters,updateVehiculo };
