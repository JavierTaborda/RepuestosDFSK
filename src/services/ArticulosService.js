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
  const URI1 = `Articulos/Existencia`;
  const URI2 = `Articulos/CodigosGrupo`;
  const URI3 = `Articulos/CodigosMarca`;

  try {
    const fetchRepuestos = () => HttpClient.get(URI1);
    const fetchGrupos = () => HttpClient.get(URI2);
    const fetchMarca = () => HttpClient.get(URI3);

    const [dataRepuesto, dataGrupo, dataMarca] = await Promise.all([
      fetchRepuestos(),
      fetchGrupos(),
      fetchMarca(),
    ]);

    return {
      repuestos: dataRepuesto.data,
      grupo: dataGrupo.data,
      marca: dataMarca.data,
    };
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const getRepuestosFilters = async (Marca, Grupo, Descripcion) => {
  try {
    const URIM = `Articulos/Bodega/Marca/${encodeURIComponent(
      Marca
    )}/${encodeURIComponent(Grupo)}/${encodeURIComponent(
      Descripcion === "" ? "*" : Descripcion
    )}`;
    const response = await HttpClient.get(URIM);
    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export default { updateImagenURL, getRepuestosFilters, getAllRepuestos };
