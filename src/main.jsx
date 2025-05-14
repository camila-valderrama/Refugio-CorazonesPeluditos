import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { BrowserRouter } from "react-router-dom";
import { MascotasProvider } from "./context/MascotasContext";
import { AuthProvider } from "./context/AuthContext";
import { RefugiosProvider } from "./context/RefugiosContext.jsx";


ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <BrowserRouter>
    <RefugiosProvider>
      <AuthProvider>
        <MascotasProvider>
          <App />
        </MascotasProvider>   
      </AuthProvider>
    </RefugiosProvider>
    </BrowserRouter>
  </React.StrictMode>
);
