// src/index.jsx
import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";

// Import du provider global
import { FocusProvider } from "./context/FocusContext";

/*
  Point d'entrée de l'application.
  - Enveloppe <App /> avec <FocusProvider> pour fournir le context global.
*/

const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(
  <FocusProvider>
    <App />
  </FocusProvider>
);
