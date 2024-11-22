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
    const response = await HttpClient.get("qrtracking/" + qrcode);
    return response;
  } catch (error) {
    throw error;
  }
};
export const postSolicitud = async (resumenData) => {
  try {
    const response = await HttpClient.post("Solicitudes", resumenData);
    return response;
  } catch (error) {
    throw error;
  }
};
export default {
  getAllSolicitudes,
  getInitialData,
  postSolicitud,
  getFilterSolicitudes,
  getTracking
};
