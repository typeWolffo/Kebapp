import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import "./index.css";
import "./fonts/Ubuntu/Ubuntu-Regular.ttf";
import KebappContext from "./contexts/KebappContext";

ReactDOM.render(
  <React.StrictMode>
    <KebappContext>
      <App />
    </KebappContext>
  </React.StrictMode>,
  document.getElementById("root")
);
