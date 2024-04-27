import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./Components/App";
import { BooksProvider } from "./Contexts/BooksContext";
import { CountriesProvider } from "./Contexts/CountriesContext";
import { AuthProvider } from "./Contexts/AuthContext";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <AuthProvider>
      <BooksProvider>
        <CountriesProvider>
          <App />
        </CountriesProvider>
      </BooksProvider>
    </AuthProvider>
  </React.StrictMode>
);
