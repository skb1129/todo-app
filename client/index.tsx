import React from "react";
import { render } from "react-dom";
import { BrowserRouter } from "react-router-dom";

import App from "./src/App";
import { TodoProvider } from "./src/contexts/TodoContext";

import "./index.scss";

render(
  <BrowserRouter>
    <TodoProvider>
      <App />
    </TodoProvider>
  </BrowserRouter>,
  document.getElementById("root")
);
