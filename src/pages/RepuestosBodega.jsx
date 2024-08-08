import { useState, useEffect } from "react" 
import CardRepuesto from "../components/CardRepuesto";

const URI = 'http://localhost:5116/api/Articulos/Existencia';

export default function RepuestosBodega() {

    const [data,setData]=useState(null)

    useEffect(() => {
        fetch(URI)
        .then((response)=>response.jason())
        .then((data)=> setData(data));
    },[]);

    return (
        <>
            <div className="container">
                <h1 className="text-center py-3">Repuestos ({datos.length})</h1>
                <div className="row">
                    {datos?.map((repuestos) => (
                        <CardRepuesto key={repuestos.articulo} repuestos={repuestos} />
                    ))}
                </div>
            </div>

        </>
    )
}