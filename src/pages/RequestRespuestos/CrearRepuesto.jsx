import React, { useState, useEffect, useContext } from "react";
import Spinner from "../../components/forms/Spinner";
import FormRepuesto from "../../components/RequestRepuestos/Forms/FormRepuesto";
import FormSolicitud from "../../components/RequestRepuestos/Forms/FormSolicitud";
import { motion } from 'framer-motion';
import { toast } from "react-toastify";
import { getInitialData, postSolicitud } from '../../services/SolicitudesService';
import dayjs from 'dayjs';
import { AuthContext } from '../../context/AuthProvider';

export default function CrearRepuesto() {
  const { user } = useContext(AuthContext);
  const [repuestoData, setRepuestoData] = useState();
  const [isLoading, setIsLoading] = useState(true);
  const [resumenData, setResumenData] = useState();
  const [quantity, setQuantity] = useState(1);
  const [dataInicial, setDataInicial] = useState([]);
  const [loadData, setLoadData] = useState(true);
  const [loadingForm, setLoadingForm] = useState(false);
  const [errordata, seterrorData] = useState(false);

  useEffect(() => {
    const fetchDataInicial = async () => {
      try {
        const response = await getInitialData();
        setDataInicial(response);
      } catch (error) {
        toast.error("Error en la carga de datos: " + error.message);
        seterrorData(true);
      } finally {
        setLoadData(false);
      }
    };
    fetchDataInicial();
  }, []);

  useEffect(() => {
    if (repuestoData) {
      setIsLoading(true);
    } else {
      setIsLoading(false);
    }
  }, [repuestoData]);

  useEffect(() => {
    if (loadingForm) {
      const fetchData = async () => {
        try {
          if (resumenData.idUsuario === 0) {
            resumenData.idUsuario = user.user;
          }
          const response = await postSolicitud(resumenData);
          if (response) {
            toast.success("Solicitud registrada correctamente");
          } else {
            toast.error("Error al registrar la solicitud");
          }
        } catch (error) {
          toast.error("Error en la solicitud: " + error.message);
        } finally {
          setLoadingForm(false);
        }
      };
      fetchData();
    }
  }, [resumenData]);

  const insertSolicitud = async (event) => {
    event.preventDefault();
    createlistSolicitudes();
  };

  const createlistSolicitudes = () => {
    const listSolicitudes = {
      idSolicitud: 0,
      idResumenSolicitud: 0,
      idResponsableSolicitud: dataInicial.Responsable,
      idRepuesto: repuestoData.idRepuesto,
      cantidad: quantity,
      idEstado: dataInicial.Estado,
      fechaSolicitud: dayjs(new Date()).format('YYYY-MM-DDTHH:mm:ss'),
      precio: 0,
      observacion: '',
    };

    setResumenData((prevData) => ({ ...prevData, solicitudes: [listSolicitudes] }));
    setLoadingForm(true);
  };

  if (loadData) {
    return <Spinner />;
  }

  return (
    <>
      <h2 className="text-center my-4">Crear Solicitud de Repuesto</h2>
      <div className="container">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1 }}
        >
          <div className="row">
            <div className="col-md-7 col-lg-8 mb-4">
              <div className="p-4 rounded shadow bg-white">
                <h5 className="text-center">Inserte el Repuesto a Solicitar</h5>
                <div style={{ maxHeight: '60vh', overflowY: 'auto' }}>
                  {errordata ? (
                    <p className="text-danger text-center">
                      Ocurrió un error al cargar los datos, por favor intente más tarde.
                    </p>
                  ) : loadingForm ? (
                    <Spinner />
                  ) : (
                    <FormRepuesto setrepuestoData={setRepuestoData} insertRepuesto={false} />
                  )}
                </div>
              </div>
            </div>

            {isLoading && (
              <div className="col-md-5 col-lg-4 order-md-last mb-4">
                <div className="p-4 rounded shadow bg-white">
                  <h5 className="text-center">Resumen de Solicitud</h5>
                  <div style={{ maxHeight: '60vh', overflowY: 'auto' }}>
                    {loadingForm ? <Spinner /> : <FormSolicitud setResumenData={setResumenData} onSubmit={insertSolicitud} />}
                  </div>
                </div>
              </div>
            )}
          </div>
        </motion.div>
      </div>
    </>
  );
}
