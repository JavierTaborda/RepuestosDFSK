import HttpClient from "./HttpClient";


export const getEstadosSolicitudes = async () => {
  try {
    const response = await HttpClient.get("Estado/");
    return response.data;
  } catch (error) {
    throw error;
  }
};
export const getEstadosId = async (id) => {
  try {
    const response = await HttpClient.get("Estado/"+id);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const postEstados = async (estado) => {
  try {
    const response = await HttpClient.post("Estado/", estado);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const putEstados = async (estado) => {
  try {
    const response = await HttpClient.put("Estado/", estado);
    return response.data;
  } catch (error) {
    throw error;
  }
};
 
export default{
    getEstadosSolicitudes,
    getEstadosId,
    postEstados,
    putEstados,

}