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

    const itemExist=cart.findIndex((repuesto)=>repuesto.articulo===item.articulo)
    if(itemExist>=0)
    {
      const updatedCart=[...cart]
      updatedCart[itemExist].quantity++
      setCart(updatedCart)
    }
    else
    {
      item.quantity=1
      setCart([...cart,item])  
       toast.info("¡Se agregó el producto.!");
    }
 
  }

  return (
    <>
      <BrowserRouter>
        <Header />
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
