import React from 'react';
import { useState, useEffect, useMemo } from "react"
import { toast } from 'react-toastify';
import Spinner from '../components/forms/Spinner';
import CartTable from '../components/CartTable';

function Solicitud({ cart, removeFromCart, increaseQuantity, decreaseQuantity, clearCart}) {
    const isEmpty = useMemo(() => cart?.length === 0, [cart])
    const carTotal = useMemo(() => cart?.reduce((total, item) => total + (item.venta * item.quantity), 0), [cart])

    return (
        <>
            <div className='container'>
                <div className='row p-4'>
                    <div className='col-md-8 table-responsive'>               
                        <CartTable cart={cart}
                                removeFromCart={removeFromCart}
                                increaseQuantity={increaseQuantity}
                                decreaseQuantity={decreaseQuantity}
                                clearCart={clearCart}
                                sendForm={true} />
                    </div>
                    <div className='col-md-4 bg-light'>
                        <Spinner />
                    </div>
                </div>
            </div>

        </>
    )
}
export default Solicitud