import React from 'react';
import { useState, useEffect } from "react"
import CardRepuesto from "../components/CardRepuesto";
import { ToastContainer, toast } from 'react-toastify';

const URI = 'http://localhost:5116/api/Articulos/Existencia';

export default function RepuestosBodega() {
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
    const notifysuccess= () => {
        if (!toast.isActive(toastId.current)) {
            toastId.current = toast.success("Cargado exitoso", {
                draggable: true
        });
    }}

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
            <div className="container my-5">
                <div className="row">
                    {data?.map(item => (
                        
                        <CardRepuesto key={item.articulo} repuestos={item} />

                    ))}
                </div>
            </div>
        </>
    );
}