import HttpClient from "./HttpClient";

export const getEstadosEntrega = async () => {
  try {
    const response = await HttpClient.get("Entregas/");
    return response.data;
  } catch (error) {
    throw error;
  }
};
export const getEstadosEntregaId = async (id) => {
  try {
    const response = await HttpClient.get("Entregas/" + id);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const postEstadosEntrega = async (estado) => {
  try {
    const response = await HttpClient.post("Entregas/", estado);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const putEstadosEntrega = async (estado) => {
  try {
    const response = await HttpClient.put("Entregas/", estado);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export default {
  getEstadosEntrega,
  getEstadosEntregaId,
  postEstadosEntrega,
  putEstadosEntrega,
};
