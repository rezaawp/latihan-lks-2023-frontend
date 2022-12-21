// require("dotenv").config();
import React, { useContext } from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./Pages/Login";
import UserProvider from "./Stores/UserProvider";
import Pollings from "./Pages/Pollings";
import IsLogin from "./Middleware/IsLogin";
import Guard from "./Middleware/Guard";
import CreatePolling from "./Pages/CreatePolling";
import Polling from "./Pages/Polling";
import { create, login, polling, pollings, profile } from "./Routes/web";
import Profile from "./Pages/Profile";
import User from "./Stores/User";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <UserProvider>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </UserProvider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
