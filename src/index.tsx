import React from "react";
import ReactDOM from "react-dom/client";

import "./styles/index.scss";
import reportWebVitals from "./reportWebVitals";
// import { Provider } from "react-redux";
// import store from "./store/store";
import { Provider } from "mobx-react";
import store from "./store/mobx";
import { BrowserRouter } from "react-router-dom";
import MainRoute from "./routes/index";
import Loading from "./components/Loading";

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
root.render(
  // <React.StrictMode>
  <BrowserRouter>
    <Provider store={store}>
      <Loading>
        <MainRoute />
      </Loading>
    </Provider>
  </BrowserRouter>
  // </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
