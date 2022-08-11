import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { BrowserRouter } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';

import TimeAgo from "javascript-time-ago";

import en from "javascript-time-ago/locale/en.json";
import { Provider } from "react-redux";
import store from "./app/store";
import 'react-toastify/dist/ReactToastify.css';
// import ru from "javascript-time-ago/locale/ru.json";

TimeAgo.addDefaultLocale(en);
// TimeAgo.addLocale(en);

ReactDOM.render(
  <React.StrictMode>
     <BrowserRouter>
      <Provider store={store}>
        <App />
      </Provider>
    </BrowserRouter>
  </React.StrictMode>,
  document.getElementById("root")
);


reportWebVitals();
