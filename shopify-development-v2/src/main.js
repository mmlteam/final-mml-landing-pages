import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter } from "react-router-dom";
import Loadable from "react-loadable";
import { GoogleReCaptchaProvider } from "react-google-recaptcha-v3";

import App from "./pages/App";
import { ServerDataProvider } from "./state/serverDataContext";

import "./styles/index.scss";

const serverData = window.__SERVER_DATA__;

export const main = () => {
  Loadable.preloadReady().then(() => {
    ReactDOM.hydrate(
      <GoogleReCaptchaProvider reCaptchaKey="6Lct25QsAAAAAIwmTXex1KIJW7i8ddMk0g8gmAwu">
        <ServerDataProvider value={serverData}>
          <BrowserRouter>
            <App />
          </BrowserRouter>
        </ServerDataProvider>
      </GoogleReCaptchaProvider>,
      document.getElementById("root")
    );
  });
};
