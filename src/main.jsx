import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { MascotasProvider } from "./context/MascotasContext";


ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <MascotasProvider>
        <App />
    </MascotasProvider>
  </React.StrictMode>
);
