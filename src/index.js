import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";

import SongContextProvider from "./contexts/songContext";
import AuthContextProvider from "./contexts/AuthContext";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  // <React.StrictMode>
  <AuthContextProvider>
    <SongContextProvider>
      <App />
    </SongContextProvider>
  </AuthContextProvider>

  // </React.StrictMode>
);
