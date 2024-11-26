import HttpClient from "./HttpClient";

export const loginService = async (credentials) => {
  try {
    const response = await HttpClient.post("auth/login", credentials);
    return response;
  } catch (error) {
    //console.error(error);
    throw error;
  }
};
export const getUsers = async () => {
  try {
    const response = await HttpClient.get("Usuarios");
    return response.data;
  } catch (error) {
    toast.error("Error en la carga de datos: " + error.message);
  }
};
export const getDataRoles = async () => {
  try {
    const response = await HttpClient.get("Usuarios/Roles");
    return response.data;
  } catch (error) {
    toast.error("Error en la carga de datos: " + error.message);
  }
};
export const postUserData = async () => {
  try {
   
    const response = await HttpClient.post("/Auth/Registrar", formData);
    return response.data;
  } catch (error) {
    toast.error("Error en la carga de datos: " + error.message);
  }
};

export default { loginService, getDataRoles, postUserData };    
