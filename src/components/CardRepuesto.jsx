import { useState } from "react";
export default function CardRepuesto({ repuestos }) {

    return (

        <>
            <div className="col-md-4 col-lg-3 mb-2" >
                <div className="product-card" title={repuestos.descripcion}>
                    <img src="/puerta.png" alt="Repuesto" className="cardimagen"></img>
                    <div className="card-body">

                        <div className="card-body text-start">
                            <h6 className="cardtext" >{repuestos.descripcion}</h6>
                            <p className="text-success">{repuestos.marca}</p>
                            <h6 className="text-danger">{repuestos.venta.toFixed(0).toLocaleString()}$</h6>
                        </div>
                        <div className="card-footer text-center">
                            <div className="col">
                                <button className="btn btn-danger d-inline-block mx-1 rounded-5">Botón centrado</button>
                                <button className="btn btn-success d-inline-block mx-1 rounded-5"> <i className="bi bi-heart"></i>deta</button>
                                <button className="btn btn-success d-inline-block mx-1 rounded-5"> <i className="bi bi-heart"></i>car</button>
                               
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}