import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { BrowserRouter } from "react-router-dom";
import { FavoritesProvider } from "./context/FavoritesContext"; // ✅ Import it
import "./index.css";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <BrowserRouter>
      <FavoritesProvider> {/* ✅ Wrap the whole app */}
        <App />
      </FavoritesProvider>
    </BrowserRouter>
  </React.StrictMode>
);
