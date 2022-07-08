import { GoogleOAuthProvider } from "@react-oauth/google";
import ReactDOM from "react-dom/client";
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";
import { PersistGate } from "redux-persist/integration/react";
import MouseContextProvider from "./context/mouse-context";
import AppLayout from "./layout/AppLayout";
import { persistor, store } from "./redux/store";
import reportWebVitals from "./reportWebVitals";
import "./styles.module.scss";

const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(
  <BrowserRouter>
    <GoogleOAuthProvider clientId="364066337147-mv7trqtcmsr8tii5m8483ukmulhf771r.apps.googleusercontent.com">
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          <MouseContextProvider>
            <AppLayout></AppLayout>
          </MouseContextProvider>
        </PersistGate>
      </Provider>
    </GoogleOAuthProvider>
  </BrowserRouter>
);

reportWebVitals();
