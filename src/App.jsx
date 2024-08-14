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

  //check local storage for cart useState
  const IncialStateCart = () => {
    const localStorageCart = localStorage.getItem("cart")
    return localStorageCart ? JSON.parse(localStorageCart) : []
  }
  const [cart, setCart] = useState(IncialStateCart);

  //save cart in local storage
  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cart))
  }, [cart]);

  function addToCart(item) {
    const itemExist = cart.findIndex((repuesto) => repuesto.articulo === item.articulo)

    if (itemExist >= 0) {
      //TODO:Enviar a incrementar si ya
      if (cart[itemExist].quantity >= item.existencia) return toast.warning("No hay existencia disponible");
      const updatedCart = [...cart];
      updatedCart[itemExist].quantity++;
      setCart(updatedCart);
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

  function clearCart() {
    setCart([])
  }


  return (
    <>
      <BrowserRouter>
        <Header
          cart={cart}
          removeFromCart={removeFromCart}
          increaseQuantity={increaseQuantity}
          decreaseQuantity={decreaseQuantity}
          clearCart={clearCart}
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
        <ToastContainer position="top-center"
          draggable />
      </BrowserRouter>
    </>
  );
}

export default App;
