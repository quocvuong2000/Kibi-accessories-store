import { GoogleOAuthProvider } from "@react-oauth/google";
import { createRoot } from "react-dom/client";
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";
import { PersistGate } from "redux-persist/integration/react";
import MouseContextProvider from "./context/mouse-context";
import IntlProviderWrapper from "./intlprovider/IntlProviderWrapper";
import AppLayout from "./layout/AppLayout";
import { persistor, store } from "./redux/store";
import reportWebVitals from "./reportWebVitals";
import "./styles.module.scss";

const container = document.getElementById("root");
const root = createRoot(container);

root.render(
  <BrowserRouter>
    <GoogleOAuthProvider clientId="364066337147-mv7trqtcmsr8tii5m8483ukmulhf771r.apps.googleusercontent.com">
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          <MouseContextProvider>
            <IntlProviderWrapper>
              <AppLayout></AppLayout>
            </IntlProviderWrapper>
          </MouseContextProvider>
        </PersistGate>
      </Provider>
    </GoogleOAuthProvider>
  </BrowserRouter>
);

reportWebVitals();
