
import { ToastContainer, toast } from "react-toastify";
import "./App.css";
import "bootstrap-icons/font/bootstrap-icons.css";
import "react-toastify/dist/ReactToastify.css";
import Header from "./components/Header";
import Footer from "./components/Footer";
import { useCart } from "./hooks/useCart";
import { AuthProvider } from './context/AuthProvider';
import AppRoutes from './routes/AppRoutes';

function App() {

  const {
    cart,
    addToCart,
    removeFromCart,
    increaseQuantity,
    decreaseQuantity,
    clearCart,
    isEmpty,
    carTotal
  } = useCart()

  return (
    <>
      <AuthProvider>
 
          <Header
            cart={cart}
            removeFromCart={removeFromCart}
            increaseQuantity={increaseQuantity}
            decreaseQuantity={decreaseQuantity}
            clearCart={clearCart}
            isEmpty={isEmpty}
            carTotal={carTotal}
          />
          
        <AppRoutes
          cart={cart}
          addToCart={addToCart}
          removeFromCart={removeFromCart}
          increaseQuantity={increaseQuantity}
          decreaseQuantity={decreaseQuantity}
          clearCart={clearCart}
          isEmpty={isEmpty}
          carTotal={carTotal}
        />
          <Footer />
          <ToastContainer position="top-center" draggable />


      </AuthProvider>
    </>
  );
}

export default App;
