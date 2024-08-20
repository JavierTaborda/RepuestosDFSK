import React from 'react';
import { toast } from 'react-toastify';
import Spinner from './forms/Spinner';
import { Link } from 'react-router-dom';

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
                                        <img className="img-fluid" src="./puerta.png" alt="imagen" style={{ maxHeight: '200px', }} />
                                    </td>
                                    {sendForm ? <td className="fw-bold align-middle">{item.articulo}</td> : null}

                                    <td className="fw-bold align-middle">{item.descripcion}</td>

                                    {sendForm ? <td className="fw-bold align-middle">{item.grupo}</td> : null}

                                    <td className="fw-bold align-middle">
                                        ${
                                            sendForm ? (item.venta * item.quantity).toFixed(2).toLocaleString() : item.venta.toFixed(2).toLocaleString()
                                        }
                                    </td>

                                    <td className="align-middle">
                                        <div className="d-flex justify-content-between align-items-center">
                                            <button type="button"
                                                className="btn btn-outline-dark btn-sm "
                                                onClick={() => decreaseQuantity(item.articulo, item.existencia)}>-

                                            </button>
                                            <span className="px-2">{item.quantity}</span>
                                            <button type="button"
                                                className="btn btn-outline-dark btn-sm"
                                                onClick={() => increaseQuantity(item.articulo, item.existencia)}>+
                                            </button>
                                        </div>
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
                        <button className="btn btn-warning  rounded-4   m-2 p-2"
                            onClick={clearCart}>
                            <i className="bi bi-bag-x"></i> Cancelar Pedido
                        </button>

                        {sendForm === true ?
                            null
                            :
                            <Link to="/solicitud" aria-current="page" className="btn btn-success rounded-4  m-2 p-2 ">
                                <i className="bi bi-ui-checks"></i> Generar Solicitud
                            </Link>
                        }

                    </div>




                </>
            )
    )
}