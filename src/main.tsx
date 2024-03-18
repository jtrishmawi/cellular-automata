import { withAutomataContext } from "@/context/index.tsx";
import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./index.css";

const EnhancedApp = withAutomataContext(App);

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <EnhancedApp />
  </React.StrictMode>
);
