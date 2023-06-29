import React from "react";
import { createRoot } from "react-dom/client";
import App from "./components/app/App";
import "./style/index.scss";

import { Provider } from "react-redux";
import { store } from "./reducers/index";

createRoot(document.getElementById("root")).render(
  <Provider store={store}>
    <App />
  </Provider>
);
