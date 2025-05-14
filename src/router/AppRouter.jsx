import React from "react";
import { Routes, Route } from "react-router";
import Home  from "../pages/Home";
import Login from "../pages/Login";
import Signup from "../pages/Signup";
import RutaPrivada from "./RutaPrivada";
import ItemsList from "../pages/ItemsList";
import ItemDetail from "../pages/ItemDetail";
import ItemCreate from "../pages/ItemCreate";
import ItemEdit from "../pages/ItemEdit";
import ItemsListRefugios from "../pages/ItemsListRefugios";
import NotFound from "../pages/NotFound";


const AppRouter = () => {
  return (
    <>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/items" element={<ItemsList />} />
        <Route path="/items-refugios" element={<ItemsListRefugios />} />
        <Route path="/items/create" element={
        <RutaPrivada>
          <ItemCreate />
          </RutaPrivada>
          } />
        <Route path="/items/:id" element={<ItemDetail />} />
        <Route path="/items/:id/edit" element={
        <RutaPrivada>
            <ItemEdit isEdit={true} />
            </RutaPrivada>
            } />
        <Route path="*" element={<NotFound />} />
        
      </Routes>
    </>
        
  );
}

export default AppRouter
