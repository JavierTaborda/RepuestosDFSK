import React from 'react';
import { useState, useEffect } from "react"
import CardRepuesto from "../components/CardRepuesto";
import { ToastContainer, toast } from 'react-toastify';

const URI = 'https://localhost:7142/api/Articulos/Existencia';

export default function RepuestosBodega({addToCart}) {
    const [data, setData] = useState([]);

    const toastId = React.useRef(null);//Dont repeat the notification
    //TODO: refactor this function to only one for all app
    const notifyerror = (error) => {
        if (!toast.isActive(toastId.current)) {
            toastId.current = toast.error(error, {
                draggable: true
            });
        }
    }
    const notifysuccess = () => {
        if (!toast.isActive(toastId.current)) {
            toastId.current = toast.success("Cargado exitoso", {
                draggable: true
            });
        }
    }


    useEffect(() => {
        fetch(URI)
            .then(response => response.json())
            .then(data => {
                setData(data);
                notifysuccess();
            })
            .catch(error => {
                console.error('Error fetching data:', error);
                notifyerror(error.message);
            });
    }, []);

    return (
        <>
            <h2 className="bd-title text-center mb-0 pt-2">Inventario de Repuestos</h2>

            <div className="container my-5">
                
                <div className=" d-flex justify-content-between align-items-center pb-3">
                    
                    <form className="d-flex pe-2" role="search">
                        <input className="form-control me-2 rounded-5 shadow-sm" type="search" placeholder="Buscar..." aria-label="Buscar" />
                        <button className="btn btn-outline-danger rounded-5  shadow-sm" type="button">Buscar</button>
                    </form>
                    
                    <div className="btn-group ps-2 " role="group">
                        <button type="button" className="btn btn-outline-danger dropdown-toggle rounded-5 shadow-sm" data-bs-toggle="dropdown" aria-expanded="false">
                            <i className="bi bi-arrow-bar-down" /> Ordenar por:
                        </button>
                        <ul className="dropdown-menu">
                            <li><a className="dropdown-item" href="#">Existencia</a></li>
                            <li><a className="dropdown-item" href="#">Mayor Precio</a></li>
                            <li><a className="dropdown-item" href="#">Menor Precio</a></li>
                        </ul>
                    </div>
                   
                </div>
                <div className="row">
                    {data?.map(item => (

                        <CardRepuesto
                            key={item.articulo}
                            repuestos={item} 
                            addToCart={addToCart}
                         />

                    ))}
                </div>
            </div>
        </>
    );
}