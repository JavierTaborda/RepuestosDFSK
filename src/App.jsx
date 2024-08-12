import { useState } from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import './App.css'
import 'bootstrap-icons/font/bootstrap-icons.css';
import 'react-toastify/dist/ReactToastify.css';
import Header from './components/Header'
import Footer from './components/Footer'
import RepuestosBodega from './pages/RepuestosBodega'
import Inicio from './pages/Inicio'

function App() {

  return (
    <>
      <BrowserRouter>
        <Header />      
        <Routes>         
          <Route path="/" element={<Inicio/>} />
          <Route path="/repuestos" element={<RepuestosBodega/>} />
          <Route path="*" element={<Inicio />} />
        </Routes>
        <Footer />
        <ToastContainer            
          draggable />
      </BrowserRouter>
    </>
  )
}

export default App
