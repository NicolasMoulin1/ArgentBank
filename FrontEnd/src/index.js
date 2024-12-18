import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./sass/main.scss";
import { Provider } from "react-redux";
import store from "./Redux/store.js";

// const root = ReactDOM.createRoot(document.getElementById("root"));
ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Provider store= {store}>
      <App />
    </Provider>
  </React.StrictMode>,
);
