
import { useState } from "react";
import "../../styles/CardRepuesto.css";
import "../../styles/ImageCard.css";
import ModalCart from "./ModalCart";
import ImageCard from '../forms/ImageCard';
export default function CardRepuesto({ repuestos, addToCart }) {

    const [showModal, setShowModal] = useState(false);

    const TipoOracion = (str) => {
        return str.toLowerCase().replace(/\b\w/g, (char) => char.toUpperCase());
    };

    const getStockClass = (stock) => {
        if (stock > 100) {
            return 'text-success'; // Verde 
        } else if (stock <= 100 && stock >= 50) {
            return 'text-warning'; // Amarillo
        } else {
            return 'text-danger'; // Rojo
        }
    };
    const handleShowModal = () => setShowModal(true);
    const handleCloseModal = () => setShowModal(false);


    return (
        <>

            <div className="col-md-4 col-lg-3 mb-2">
                <div className="product-card ">
                    <div className="image-container">
                        <ImageCard info={repuestos.descripcion} stock={repuestos.existencia} />

                    </div>
                    {/* <img src="/puerta.png" alt="Repuesto" className="cardimagen"></img> */}

                    <div className="card-body">
                        <div className="card-body text-start">
                            <h6 className="cardtext mb-1" title={repuestos.descripcion}>
                                {repuestos.descripcion}
                            </h6>
                            <p className="text mb-0 mt-0 cardtext" title={TipoOracion(repuestos.marca)}>{TipoOracion(repuestos.marca)}</p>
                            <p className={`mb-0 mt-0 ${getStockClass(repuestos.existencia)}`}>
                                Stock: {repuestos.existencia}
                            </p>
                        </div>

                        <div className="card-footer d-flex justify-content-between align-items-center">

                            <h5 className="text-success mb-0 preciocard">
                                {repuestos.venta.toFixed(2).toLocaleString()}$
                            </h5>

                            <button className="btn btn-outline-success mx-1 rounded-5" onClick={handleShowModal}>
                                +<i className="bi bi-cart3"></i>
                            </button>

                        </div>
                    </div>
                </div>
            </div>

            <ModalCart
                show={showModal}
                handleClose={handleCloseModal}
                repuesto={repuestos}
                addToCard={addToCart}
            />

        </>
    );
}
