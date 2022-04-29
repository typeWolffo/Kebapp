import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import "./fonts/Ubuntu/Ubuntu-Regular.ttf";
import { Provider } from "react-redux";
import * as serviceWorkerRegistration from "./serviceWorkerRegistration";
import store from "./store/store";
import App from "./App";

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>,
  document.getElementById("root")
);
serviceWorkerRegistration.register();
