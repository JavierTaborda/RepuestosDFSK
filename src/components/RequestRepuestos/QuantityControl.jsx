import React from 'react';

export default function QuantityControl({ item, increaseQuantity, decreaseQuantity }) {
    return (
        <div className="d-flex justify-content-between align-items-center">
            <button type="button"
                className="btn btn-outline-dark btn-sm"
                onClick={() => decreaseQuantity(item.articulo, item.existencia)}>
                -
            </button>
            <span className="px-2">{item.quantity}</span>
            <button type="button"
                className="btn btn-outline-dark btn-sm"
                onClick={() => increaseQuantity(item.articulo, item.existencia)}>
                +
            </button>
        </div>
    );
}
