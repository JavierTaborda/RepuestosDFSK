import React from 'react'
import CartTable from "./CartTable";

export const CartView = ({ cart, removeFromCart, increaseQuantity, decreaseQuantity, clearCart, isEmpty, carTotal }) => {
    return (
        <>
            <div className="dropdown mx-2 my-2">
                <button className="btn btn-outline-danger dropdown-toggle rounded-5" type="button" data-bs-toggle="dropdown" data-bs-display="static" aria-expanded="false" data-bs-auto-close="false">
                    <i className="bi bi-cart3"></i>
                </button>
                <div className="dropdown-menu dropdown-menu-end p-3 shadow" style={{ maxHeight: '57vh', overflowY: 'auto', maxWidth: '95vw', overflowX: 'auto' }}>
                    <CartTable cart={cart} removeFromCart={removeFromCart} increaseQuantity={increaseQuantity} decreaseQuantity={decreaseQuantity} clearCart={clearCart} isEmpty={isEmpty} carTotal={carTotal} sendForm={false} />
                </div>
            </div>
        </>
    )
}

export default CartView;