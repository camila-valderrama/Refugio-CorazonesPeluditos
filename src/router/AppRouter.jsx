import React from "react";
import { Routes, Route } from "react-router-dom";
import { Home }  from "../pages/Home";
import RutaPrivada from "./RutaPrivada";
import { ItemsList } from "../pages/ItemsList";
import { ItemDetail } from "../pages/ItemDetail";
import { ItemCreate } from "../pages/ItemCreate";
import { ItemEdit } from "../pages/ItemEdit";
import { NotFound } from "../pages/NotFound";
import { Login } from "../pages/Login";
import { Signup } from "../pages/Signup";

const AppRouter = () => {
  return (
    
        <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/items" element={<ItemsList />} />
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
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
        </Routes>
  );
}

export default AppRouter
