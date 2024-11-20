import HttpClient from "./HttpClient";
export const updateImagenURL = async (url) => {
  try {
    const response = await HttpClient.post("Articulos/UpdateImageUrl", url);
    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const getAllRepuestos = async () => {

  try {
    const fetchRepuestos = () => getAllArticulosExistencia();
    const fetchGrupos = () => getGrupos();
    const fetchCategorias = () => getCategorias();
    const fetchMarca = () => getMarca();

    const [dataRepuesto, dataGrupo, dataCategoria, dataMarca] = await Promise.all([
      fetchRepuestos(),
      fetchGrupos(),
      fetchCategorias(),
      fetchMarca(),
    ]);
  //console.log(dataGrupo.data);
    return {
      repuestos: dataRepuesto,
      grupo: dataGrupo,
      categoria: dataCategoria,
      marca: dataMarca,
    };
  } catch (error) {

    throw error;
  }
};

export const getAllArticulosExistencia = async () => {
  try {
    const response = await HttpClient.get("Articulos/Existencia");
    return response.data;
  } catch (error) {
    throw error;
  }
};  

export const getMarca = async () => {
  try {
    const response = await HttpClient.get("Articulos/CodigosMarca");
    return response.data;
  } catch (error) {
   
    throw error;
  }
};  

//TODO: No filtra
export const getRepuestosFilters = async (Marca, Grupo, Categoria, Descripcion) => {
  try {
    const URIM = `Articulos/Bodega/Marca/${encodeURIComponent(Marca)}/${encodeURIComponent(Grupo)}/${encodeURIComponent(Categoria)}/${encodeURIComponent(Descripcion === "" ? "*" : Descripcion)}`;
    const response = await HttpClient.get(URIM);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const getGrupos = async () => {
  try {
    const response = await HttpClient.get(`Articulos/Grupos`);
    return response.data;
  } catch (error) {
    throw error;
  }
};  
export const getCategorias = async () => {
  try {
    const response = await HttpClient.get(`Articulos/Categorias`);
    return response.data;
  } catch (error) {
    throw error;
  }
};  

export default { updateImagenURL, getRepuestosFilters, getAllRepuestos, getGrupos, getCategorias, getAllArticulosExistencia };
