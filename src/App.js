import logo from "./logo.svg";
import "./App.css";
import { Route, Routes } from "react-router-dom";
import { useContext } from "react";
import { create, login, polling, pollings, profile } from "./Routes/web";
import CreatePolling from "./Pages/CreatePolling";
import IsLogin from "./Middleware/IsLogin";
import Profile from "./Pages/Profile";
import User from "./Stores/User";
import Pollings from "./Pages/Pollings";
import Guard from "./Middleware/Guard";
import Login from "./Pages/Login";
import Polling from "./Pages/Polling";

function App() {
  const data = useContext(User);

  return (
    <Routes>
      <Route
        path={pollings}
        element={
          <IsLogin>
            <Pollings />
          </IsLogin>
        }
      />

      <Route
        path={login}
        element={
          <Guard>
            <Login />
          </Guard>
        }
      />

      {data.nama !== "" && <Route path={polling} element={<Polling />} />}

      <Route
        path={create}
        element={
          <IsLogin>
            <CreatePolling />
          </IsLogin>
        }
      />

      <Route path={profile} element={<Profile />} />

      <Route path="*" element={<>Halaman tidak ditemukan</>} />
    </Routes>
  );
}

export default App;
