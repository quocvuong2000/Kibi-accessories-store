import React from "react";
import ReactDOM from "react-dom/client";
import "./styles.module.scss"
import reportWebVitals from "./reportWebVitals";
import AppLayout from "./layout/AppLayout";
import { BrowserRouter } from "react-router-dom";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <BrowserRouter>
    <AppLayout></AppLayout>
  </BrowserRouter>
);

reportWebVitals();
