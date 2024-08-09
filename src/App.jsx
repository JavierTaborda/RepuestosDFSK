import { useState } from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css'
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
      </BrowserRouter>
    </>
  )
}

export default App
