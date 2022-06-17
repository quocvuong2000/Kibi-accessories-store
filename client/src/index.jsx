import React from "react";
import ReactDOM from "react-dom/client";
import "./styles.module.scss";
import reportWebVitals from "./reportWebVitals";
import AppLayout from "./layout/AppLayout";
import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";
import { store, persistor } from "./redux/store";
import { GoogleOAuthProvider } from "@react-oauth/google";
import { PersistGate } from "redux-persist/integration/react";
const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <BrowserRouter>
    <GoogleOAuthProvider clientId="364066337147-mv7trqtcmsr8tii5m8483ukmulhf771r.apps.googleusercontent.com">
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          <AppLayout></AppLayout>
        </PersistGate>
      </Provider>
    </GoogleOAuthProvider>
  </BrowserRouter>
);

reportWebVitals();
