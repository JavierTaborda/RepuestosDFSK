import HttpClient from "./HttpClient";
export const updateImagenURL = async (url) => {
  try {
    const response = await HttpClient.post("Articulos/UpdateImageUrl",url);
     return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export default { updateImagenURL };
