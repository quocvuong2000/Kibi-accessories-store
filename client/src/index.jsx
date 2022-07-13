import { GoogleOAuthProvider } from "@react-oauth/google";
import { createRoot } from "react-dom/client";
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";
import { PersistGate } from "redux-persist/integration/react";
import MouseContextProvider from "./context/mouse-context";
import AppLayout from "./layout/AppLayout";
import { persistor, store } from "./redux/store";
import reportWebVitals from "./reportWebVitals";
import "./styles.module.scss";
import { IntlProvider, FormattedMessage } from "react-intl";

const container = document.getElementById("root");
const root = createRoot(container);

root.render(
  <BrowserRouter>
    <GoogleOAuthProvider clientId="364066337147-mv7trqtcmsr8tii5m8483ukmulhf771r.apps.googleusercontent.com">
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          <MouseContextProvider>
            {/* <IntlProvider locale="us" messages={}> */}
            <AppLayout></AppLayout>
            {/* </IntlProvider> */}
          </MouseContextProvider>
        </PersistGate>
      </Provider>
    </GoogleOAuthProvider>
  </BrowserRouter>
);

reportWebVitals();
