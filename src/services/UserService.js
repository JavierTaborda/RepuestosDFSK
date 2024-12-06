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
        throw error;
  }
};
export const getUsersEdit = async () => {
  try {
    const response = await HttpClient.get("Usuarios/Edit");
    return response.data;
  } catch (error) {
        throw error;
  }
};
export const getDataRoles = async () => {
  try {
    const response = await HttpClient.get("Usuarios/Roles");
    return response.data;
  } catch (error) {
        throw error;
  }
};
export const postUserData = async (Data) => {
  try {
    const response = await HttpClient.post("auth/Registrar", Data);
   
    return response.data;
  } catch (error) {
    console.error(error);
       throw error;
  }
};
export const putUserData = async (Data, newpassword) => {
  try {

    const response = await HttpClient.put("Usuarios", {
      user: Data,
      newpass: newpassword,
    });
    return response.data;
  } catch (error) {
    throw error;
    
  }
};


export default { loginService, getDataRoles, postUserData, putUserData, getUsers, getUsersEdit };    
