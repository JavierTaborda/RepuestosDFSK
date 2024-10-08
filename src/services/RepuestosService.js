import HttpClient from './HttpClient';


export const getRepuestos = async () => {
  try {
    const response = await HttpClient.get("Repuestos");
    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};


//Sitema IMB
export const getMarcasImb = async () => {
   try {
     const response = await HttpClient.get("Articulos/CodigosMarca");
     return response.data;
   } catch (error) {
     console.error(error);
     throw error;
   }
}
export const getGrupos = async () => {
  try {
    const response = await HttpClient.get("Articulos/CodigosGrupo");
    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};


export default { getRepuestos,getMarcasImb,getGrupos };

