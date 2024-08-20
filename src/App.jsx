import { BrowserRouter, Route, Routes } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "./App.css";
import "bootstrap-icons/font/bootstrap-icons.css";
import "react-toastify/dist/ReactToastify.css";
import Header from "./components/Header";
import Footer from "./components/Footer";
import RepuestosBodega from "./pages/RepuestosBodega";
import Inicio from "./pages/Inicio";
import Solicitud from "./pages/Solicitud";
import CrearRepuesto from "./pages/CrearRepuesto";
import {useCart} from  "./components/hooks/useCart";

function App() {

  const {
    cart,
    addToCart,
    removeFromCart,
    increaseQuantity,
    decreaseQuantity,
    clearCart,
  } = useCart()

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
          <Route
            path="/solicitud"
            element={
              <Solicitud
                cart={cart}
                removeFromCart={removeFromCart}
                increaseQuantity={increaseQuantity}
                decreaseQuantity={decreaseQuantity}
                clearCart={clearCart}
              />
            }
          />
          <Route path="/repuestonew" element={<CrearRepuesto />} />
          <Route path="*" element={<Inicio />} />
        </Routes>
        <Footer />
        <ToastContainer position="top-center" draggable />
      </BrowserRouter>
    </>
  );
}

export default App;
