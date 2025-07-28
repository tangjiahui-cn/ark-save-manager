import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import Index from "./pages/index";
import "./global.module.less";
// import "antd/dist/antd.min.css";
// import './index.css'

import "./demos/ipc";
// If you want use Node.js, the`nodeIntegration` needs to be enabled in the Main process.
// import './demos/node'

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  // <React.StrictMode>
  <Index />,
  // </React.StrictMode>,
);

postMessage({ payload: "removeLoading" }, "*");
