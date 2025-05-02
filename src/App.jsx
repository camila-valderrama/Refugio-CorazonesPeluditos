import React from "react";
import AppRouter from "./router/AppRouter";
import { ToastContainer } from "react-toastify";

import Header from './components/Header';
import Footer from './components/Footer';


function App() {
  return (
    <>
    <ToastContainer />
    <Header />
    <AppRouter />
    <Footer />
    </>
  )
}

export default App

