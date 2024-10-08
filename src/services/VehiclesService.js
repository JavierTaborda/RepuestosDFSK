import HttpClient from "./HttpClient";
export const getVehiculos = async () => {
  try {
    const response = await HttpClient.get("Vehiculos");
    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export default {getVehiculos}
