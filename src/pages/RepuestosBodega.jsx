import { useState, useEffect } from "react"
import CardRepuesto from "../components/CardRepuesto";
import { ToastContainer, toast } from 'react-toastify';

const URI = 'https://localhost:7142/api/Articulos/Existencia';

export default function RepuestosBodega() {
    const [data, setData] = useState([]);

    const notify = () => toast("Wow so easy!") ;

    useEffect(() => {
        fetch(URI)
            .then(response => response.json())
            .then(data => {
                setData(data);
                
            })
            .catch(error => {
                console.error('Error fetching data:', error);
                notify();
            });
    }, []);

    return (
        <>
            <div className="container my-5">
                <div className="row">
                    {data?.map(item => (
                        
                        <CardRepuesto key={item.articulo} repuestos={item} />
                        // <div key={item.articulo}>
                        //     <p>Artículo: {item.articulo}</p>
                        //     <p>Descripción: {item.descripcion}</p>
                        //     <p>En Stock: {item.existencia}</p>
                        //     <p>Precio: {item.venta}$</p>
                        // </div>
                    ))}
                </div>
            </div>
        </>
    );
}