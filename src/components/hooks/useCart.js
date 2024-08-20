import { useState, useEffect } from "react";
import {  toast } from "react-toastify";
export const useCart = () => {
  //check local storage for cart useState
  const IncialStateCart = () => {
    const localStorageCart = localStorage.getItem("cart");
    return localStorageCart ? JSON.parse(localStorageCart) : [];
  };
  const [cart, setCart] = useState(IncialStateCart);

  //save cart in local storage
  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cart));
  }, [cart]);

  function addToCart(item) {
    const itemExist = cart.findIndex(
      (repuesto) => repuesto.articulo === item.articulo
    );

    if (itemExist >= 0) {
      if (cart[itemExist].quantity >= item.existencia)
        return toast.warning("No hay existencia disponible");
      const updatedCart = [...cart];
      updatedCart[itemExist].quantity++;
      setCart(updatedCart);
    } else {
      if (item.existencia <= 0)
        return toast.warning("No hay existencia disponible");
      item.quantity = 1;
      setCart([...cart, item]);
      toast.info("¡Se agregó el articulo " + item.articulo + "!");
    }
  }

  function removeFromCart(id) {
    setCart((prevCart) => prevCart.filter((item) => item.articulo !== id));
    toast.info("¡Se eliminó el producto " + id + "!");
  }

  function increaseQuantity(id, existencia) {
    const updatedCart = cart.map((item) => {
      if (item.articulo === id)
        if (item.quantity < existencia) {
          return {
            ...item,
            quantity: item.quantity + 1,
          };
        } else {
          toast.warning("No hay existencia disponible");
        }

      return item;
    });
    setCart(updatedCart);
  }

  function decreaseQuantity(id, existencia) {
    const updatedCart = cart.map((item) => {
      if (item.articulo === id) {
        if (item.quantity > 1 && item.quantity <= existencia)
          return {
            ...item,
            quantity: item.quantity - 1,
          };
        else {
          toast.warning(
            "Si no desea el producto solicitar, elimine con el botón X"
          );
        }
      }
      return item;
    });
    setCart(updatedCart);
  }

  function clearCart() {
    setCart([]);
  }

  return {
    cart,
    addToCart,
    removeFromCart,
    increaseQuantity,
    decreaseQuantity,
    clearCart
  };
};
