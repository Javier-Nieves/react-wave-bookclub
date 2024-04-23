import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./Components/App";
import { BooksProvider } from "./Contexts/BooksContext";
import { CountriesProvider } from "./Contexts/CountriesContext";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <BooksProvider>
      <CountriesProvider>
        <App />
      </CountriesProvider>
    </BooksProvider>
  </React.StrictMode>
);
