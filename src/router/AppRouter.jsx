import React from "react";
import { Routes, Route } from "react-router-dom";
import { Home }  from "../pages/Home";
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
            <Route path="/items/create" element={<ItemCreate />} />
            <Route path="/items/:id" element={<ItemDetail />} />
            <Route path="/items/:id/edit" element={<ItemEdit isEdit={true} />} />
            <Route path="*" element={<NotFound />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
        </Routes>
  );
}

export default AppRouter
