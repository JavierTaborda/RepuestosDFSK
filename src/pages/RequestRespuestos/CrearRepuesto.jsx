import React, { useState, useEffect } from "react";
import Spinner from "../../components/forms/Spinner";
import FormRepuesto from "../../components/RequestRepuestos/Forms/FormRepuesto";
import FormSolicitud from "../../components/RequestRepuestos/Forms/FormSolicitud";
import { motion } from 'framer-motion';
import { toast } from "react-toastify";
import HttpClient from '../../services/HttpClient';
import dayjs from 'dayjs';
export default function CrearRepuesto() {

  const [repuestoData, setrepuestoData] = useState();
  const [isLoading, setIsLoading] = useState(true);
  const [resumenData, setResumenData] = useState();
  const [quantity, setQuantity] = useState(1);
  const [dataInicial, setdataInicial] = useState([]);
  const [loadData, setloadData] = useState(true);
  const [loadingForm, setloadingForm] = useState(false);

  useEffect(() => {
    const fetchDataInicial = async () => {
      try {
        const response = await HttpClient.get('/Solicitudes/DatosIniciales');
        setdataInicial(response.data);
      } catch (error) {
        toast.error("Error en la carga de datos: " + error.message);
      } finally {
        setloadData(false);
      }
    };

    fetchDataInicial();
  }, []);


  useEffect(() => {
    if (repuestoData) {

      setIsLoading(true);
    }
    else {
      setIsLoading(false);

    }
  }, [repuestoData]);

  useEffect(() => {
    if (loadingForm) {
      async function fetchData() {

        try {
          if (resumenData.idVendedor === 0) {
            resumenData.idVendedor = user.user;
          }
          console.log(resumenData);
          
          const response = await HttpClient.post("/Solicitudes", resumenData)
          if (response.status === 200) {
            
            toast.success("Solicitud registrada correctamente");

          } else {
            toast.error("Error al registrar la solicitud");
          }

        } catch (error) {
          //console.log(error);
          toast.error("Error en la solicitud: ", error);
        }
        finally {
          setloadingForm(false);
        }

      }
      
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
    setloadingForm(true);
  };
  if (loadData) {
    return <Spinner />;
  }
  return (
    <>
      <h2 className="bd-title text-center mb-0 pt-2">Crear Solicitud de Repuesto </h2>
      <div className='container pt-2'>
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1 }}
        >
          <div className='row p-2  px-2'>
            <div className='col-md-7 col-lg-8 shadow-sm rounded-5 p-4 ' >
              <h4 className="bd-title text-center mb-0 pt-2">Inserte el Repuesto a Solicitar</h4>
              <FormRepuesto
                setrepuestoData={setrepuestoData}
                insertRepuesto={false}
              />
            </div>

            {
              !isLoading ? null :
              loadingForm ? <Spinner /> :
                <motion.div
                  className='col-md-5 col-lg-4 order-md-last rounded-5 shadow-sm p-4'
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 1 }}
                >
                  <FormSolicitud
                    setResumenData={setResumenData}
                    onSubmit={insertSolicitud}

                  />

                </motion.div>}
          </div>
        </motion.div>
      </div>
    </>
  );
}

