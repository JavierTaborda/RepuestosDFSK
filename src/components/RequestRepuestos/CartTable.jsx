import React from 'react';
import { toast } from 'react-toastify';
import Spinner from '../forms/Spinner';
import { Link } from 'react-router-dom';
import QuantityControl from "./QuantityControl"
import ImgDefault from '../forms/ImgDefault';

export default function CartTable({ cart, removeFromCart, increaseQuantity, decreaseQuantity, clearCart, isEmpty, carTotal, sendForm }) {
    const totalUnidades = cart.reduce((total, item) => total + item.quantity, 0);
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
                                        {item.urlimagen ? <img className="img-fluid" src={item.urlimagen} alt="imagen" style={{ maxHeight: '120px' }} /> :

                                            <ImgDefault />}
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

                    <p className="text-end">Total Unidades: <span className="fw-bold">{totalUnidades}</span></p>
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