import React from "react";
import AppRouter from "./router/AppRouter";
import { ToastContainer } from "react-toastify";
import { BrowserRouter } from "react-router-dom";

import Header from './components/Header';
import Footer from './components/Footer';


function App() {
  return (
    <>
    <BrowserRouter>
    <ToastContainer />
    <Header />
    <AppRouter />
    <Footer />
    </BrowserRouter>
    </>
  )
}

export default App

