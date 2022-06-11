import React from "react";
import ReactDOM from "react-dom/client";
import "./styles.module.scss";
import reportWebVitals from "./reportWebVitals";
import AppLayout from "./layout/AppLayout";
import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";
import { store } from "./redux/store";
import { GoogleAuthProvider } from "./redux/googleAuth";
const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <BrowserRouter>
    <GoogleAuthProvider>
      <Provider store={store}>
        <AppLayout></AppLayout>
      </Provider>
    </GoogleAuthProvider>
  </BrowserRouter>
);

reportWebVitals();
