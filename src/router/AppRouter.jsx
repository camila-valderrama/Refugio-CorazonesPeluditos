import React from "react";
import { Routes, Route } from "react-router-dom";
import { Home }  from "../pages/Home";
import { ItemsList } from "../pages/ItemsList";
import { ItemDetail } from "../pages/ItemDetail";
import { ItemForm } from "../pages/ItemForm";
import { NotFound } from "../pages/NotFound";

const AppRouter = () => {
  return (
    
        <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/items" element={<ItemsList />} />
            <Route path="/items/create" element={<ItemForm />} />
            <Route path="/items/:id" element={<ItemDetail />} />
            <Route path="/items/:id/edit" element={<ItemForm isEdit={true} />} />
            <Route path="*" element={<NotFound />} />
        </Routes>
  );
}

export default AppRouter
