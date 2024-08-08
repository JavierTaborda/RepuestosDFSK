import {useState} from "react";
export default function CardRepuesto({repuestos}) {

    return (
        <div class="card">
            <img src="/puerta" alt="Repuesto" className="card-img-top"></img>
            <div class="card-body">
                
                <div className="card-body text-center">
                    <h5>{repuestos.descripcion}</h5>
                    <p className="text-success">{repuestos.marca}</p>
                    <h5 className="text-danger">{repuestos.venta.toFixed(0).toLocaleString()}$</h5>
                </div>
                <div className="card-footer text-center">
                    <button class="btn btn-primary d-block mx-auto rounded-5">Botón centrado</button>
                </div>
            </div>
        </div>
    )
}