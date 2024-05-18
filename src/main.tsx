import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import { MouseDownProvider } from "./Context/MouseContext.tsx";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <MouseDownProvider>
      <App />
    </MouseDownProvider>
  </React.StrictMode>,
);
