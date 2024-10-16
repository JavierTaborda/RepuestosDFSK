import HttpClient from "./HttpClient";

export const getInitialData = async () => {
  try {
    const response = await HttpClient.get("Solicitudes/DatosIniciales");
    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};
export const getAllSolicitudes = async () => {
  try {
 const response = await HttpClient.get("Solicitudes/DatosIniciales");    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export default { getAllSolicitudes, getInitialData };
