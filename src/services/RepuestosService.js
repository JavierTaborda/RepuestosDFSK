import HttpClient from "./HttpClient";

export const getRepuestos = async () => {
  try {
    const response = await HttpClient.get("Repuestos");

    return response.data;
  } catch (error) {
    //console.error(error);
    throw error;
  }
};

export const updateRespuestos = async (repuesto) => {
  try {
    const response = await HttpClient.put("Repuestos", repuesto);
    return response;
  } catch (error) {
    throw error;
  }
};

export const postRepuesto = async (repuestoData) => {
  try {
    const response = await HttpClient.post("Repuestos", repuestoData);
    return response;
  } catch (error) {
    throw error;
  }
};

export const filterRepuestos = async (nombre, marca, inventario, modelo) => {
  try {
    //console.log({ nombre, marca, inventario, modelo }); 
     const query = new URLSearchParams({
       nombre: nombre !== null ? nombre : '',
       marca: marca !== null ? marca : '',
       inventario: inventario !== null ? inventario : '',
       modelo: modelo !== null ? modelo : '',
     }).toString();

    const response = await HttpClient.get(`Repuestos/Filtrar?${query}`);
    return response.data;
  } catch (error) {
    throw error;
  }
};


export const listRepuestos = async (listArticulos) => {
  try {
    const response = await HttpClient.post("Repuestos/codigos", listArticulos);
    return response.data;
  } catch (error) {
    throw error;
  }
};

//Concesionario
export const getGrupos = async () => {
  try {
    const response = await HttpClient.get("Articulos/CodigosGrupo");
    return response.data;
  } catch (error) {
    //console.error(error);
    throw error;
  }
};
export const getModelos = async () => {
  try {
    const response = await HttpClient.get("Articulos/Modelos");
    return response.data;
  } catch (error) {
    //console.error(error);
    throw error;
  }
};

export default {
  getRepuestos,
  getGrupos,
  updateRespuestos,
  postRepuesto,
  listRepuestos,
  filterRepuestos,
  getModelos,
};
