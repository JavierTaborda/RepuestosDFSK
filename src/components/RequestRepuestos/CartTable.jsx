import React from 'react';
import { toast } from 'react-toastify';
import Spinner from '../forms/Spinner';
import { Link } from 'react-router-dom';
import QuantityControl from "./QuantityControl"

export default function CartTable({ cart, removeFromCart, increaseQuantity, decreaseQuantity, clearCart, isEmpty, carTotal, sendForm }) {

    return (
        isEmpty ? (

            <>
                <div className="lign-items-center">
                    <p className="text-center"><i className="bi bi-cart-x fs-1"></i></p>
                    <p className="text-center">El carrito esta vacio</p>
                </div>
            </>

        )
            : (
                <>
                    <table className="table ">
                        <thead>
                            <tr>
                                <th>Imagen</th>
                                {sendForm ? <th>Articulos</th> : null}
                                <th>Nombre</th>
                                {sendForm ? <th>Grupo</th> : null}
                                <th>Precio</th>
                                <th>Cantidad</th>
                                <th></th>
                            </tr>
                        </thead>
                        <tbody>
                            {cart?.map(item => (

                                <tr key={item.articulo} className='p-1'>
                                    <td>
                                        {/* <img className="img-fluid" src="./puerta.png" alt="imagen" style={{ maxHeight: '200px', }} /> */}
                                        <svg
                                            viewBox="0 0 16 16"
                                            className="bi bi-image-fill"
                                            fill="currentColor"
                                            height="40"
                                            width="40"

                                        >
                                            <path
                                                d="M.002 3a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v10a2 2 0 0 1-2 2h-12a2 2 0 0 1-2-2V3zm1 9v1a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1V9.5l-3.777-1.947a.5.5 0 0 0-.577.093l-3.71 3.71-2.66-1.772a.5.5 0 0 0-.63.062L1.002 12zm5-6.5a1.5 1.5 0 1 0-3 0 1.5 1.5 0 0 0 3 0z"
                                            ></path>
                                        </svg>
                                    </td>
                                    {sendForm ? <td className=" align-middle">{item.articulo}</td> : null}

                                    <td className="fw-semibold align-middle">{item.descripcion}</td>

                                    {sendForm ? <td className=" align-middle">{item.grupo}</td> : null}

                                    <td className=" align-middle">
                                        ${
                                            sendForm ? (item.venta * item.quantity).toFixed(2).toLocaleString() : item.venta.toFixed(2).toLocaleString()
                                        }
                                    </td>

                                    <td className="align-middle">
                                        <QuantityControl
                                            item={item}
                                            increaseQuantity={increaseQuantity}
                                            decreaseQuantity={decreaseQuantity}
                                        />
                                    </td>
                                    <td className="align-middle">
                                        <button
                                            className="btn btn-danger btn-sm"
                                            type="button"
                                            onClick={() => removeFromCart(item.articulo)}
                                        >
                                            X
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>

                    <p className="text-end">Total pagar: <span className="fw-bold">${carTotal?.toFixed(2).toLocaleString()}</span></p>
                    <div className="d-flex justify-content-center">


                        {sendForm === true ?
                            null
                            :
                            <>  <button className="btn btn-warning  rounded-4   m-2 p-2"
                                    onClick={clearCart}>
                                    <i className="bi bi-bag-x"></i> Cancelar Pedido
                                </button>
                                <Link to="/solicitud" aria-current="page" className="btn btn-success rounded-4  m-2 p-2 ">
                                    <i className="bi bi-ui-checks"></i> Generar Solicitud
                                </Link>
                            </>
                        }

                    </div>




                </>
            )
    )
}