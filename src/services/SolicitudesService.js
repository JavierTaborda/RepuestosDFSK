import HttpClient from "./HttpClient";

export const getInitialData = async () => {
  try {
    const response = await HttpClient.get("Solicitudes/DatosIniciales");
    return response.data;
  } catch (error) {
    //console.error(error);
    throw error;
  }
};
export const getAllSolicitudes = async () => {
  try {
    const response = await HttpClient.get("Solicitudes/DatosIniciales");
    return response.data;
  } catch (error) {
    //console.error(error);
    throw error;
  }
};

export const getFilterSolicitudes = async (startDate, endDate, statusFilter, user) => {
  try {
    const response = await HttpClient.get(
      `Solicitudes/${startDate}/${endDate}/${statusFilter}/${user}`
    );
    
    return response.data;
  } catch (error) {
    //console.error(error);
    throw error;
  }
};

export const getTracking = async (qrcode) => {
  try {
    const response = await HttpClient.get("Solicitudes/qrtracking/" + qrcode);
    return response.data;
  } catch (error) {
    throw error;
  }
};
export const getEstadosSolicitudes = async () => {
  try {
    const response = await HttpClient.get("Estado/" );
    return response.data;
  } catch (error) {
    throw error;
  }
}
export const getEstadosEnvios = async () => {
  try {
    const response = await HttpClient.get("Solicitudes/Envios");
    return response.data;
  } catch (error) {
    throw error;
  }
};


export const putSolicitud = async (solicitud) => {
  try {
    const response = await HttpClient.put(
      "Solicitudes/",
      solicitud
    );
    return response.data;
  } catch (error) {
    throw error;
  }
};
export const putResumen = async (resumen) => {
  try {
    
    const response = await HttpClient.put("Solicitudes/Resumen", resumen);
    return response.data;
  } catch (error) {
    throw error;
  }
};
export const postSolicitud = async (resumenData) => {
  try {
    const response = await HttpClient.post("Solicitudes", resumenData);
    
    return response.data;
  } catch (error) {
    throw error;
  }
};
export default {
  getAllSolicitudes,
  getInitialData,
  postSolicitud,
  getFilterSolicitudes,
  getTracking,
  getEstadosSolicitudes,
  putSolicitud,
  putResumen
};
