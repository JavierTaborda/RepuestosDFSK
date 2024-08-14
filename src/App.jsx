import { useState, useEffect } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "./App.css";
import "bootstrap-icons/font/bootstrap-icons.css";
import "react-toastify/dist/ReactToastify.css";
import Header from "./components/Header";
import Footer from "./components/Footer";
import RepuestosBodega from "./pages/RepuestosBodega";
import Inicio from "./pages/Inicio";

function App() {
  const [cart, setCart] = useState([]);

  function addToCart(item) {
    const itemExist = cart.findIndex(
      (repuesto) => repuesto.articulo === item.articulo
    );
    if (itemExist >= 0) {
      if(cart[itemExist].quantity>=itemExist.existencia) return
      const updatedCart = [...cart];
      updatedCart[itemExist].quantity++;
      setCart();
    } else {
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

  return (
    <>
      <BrowserRouter>
        <Header
          cart={cart}
          removeFromCart={removeFromCart}
          increaseQuantity={increaseQuantity}
          decreaseQuantity={decreaseQuantity}
        />
        <Routes>
          <Route path="/" element={<Inicio />} />
          <Route
            path="/repuestos"
            element={<RepuestosBodega addToCart={addToCart} />}
          />
          <Route path="*" element={<Inicio />} />
        </Routes>
        <Footer />
        <ToastContainer draggable />
      </BrowserRouter>
    </>
  );
}

export default App;
