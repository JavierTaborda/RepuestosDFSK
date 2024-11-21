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
    const fetchModelos = () => getModelos();

    const [dataRepuesto, dataGrupo, dataCategoria, dataMarca, dataModelo] = await Promise.all([
      fetchRepuestos(),
      fetchGrupos(),
      fetchCategorias(),
      fetchMarca(),
      fetchModelos(),
    ]);
  //console.log(dataModelo);

    return {
      repuestos: dataRepuesto,
      grupo: dataGrupo,
      categoria: dataCategoria,
      marca: dataMarca,
      modelo: dataModelo
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


export const getRepuestosFilters = async (Marca, Grupo, Categoria, Descripcion, Modelo) => {
  try {
    const URIM = `Articulos/Bodega/Filtros/${encodeURIComponent(
      Marca
    )}/${encodeURIComponent(Grupo)}/${encodeURIComponent(
      Categoria
    )}/${encodeURIComponent(
      Descripcion === "" ? "*" : Descripcion
    )}/${encodeURIComponent(Modelo)}`;
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
  
export const getModelos = async () => {
  try {
    const response = await HttpClient.get("Articulos/Modelos");
    return response.data;
  } catch (error) {
    //console.error(error);
    throw error;
  }
};


export default { updateImagenURL, getRepuestosFilters, getAllRepuestos, getGrupos, getCategorias, getAllArticulosExistencia, getModelos };
