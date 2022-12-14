// import "../Css/Login.css";
// require("dotenv").config();

import React, { useState, useContext } from "react";
import { BallTriangle, Blocks } from "react-loader-spinner";
import { Link, useNavigate } from "react-router-dom";
import User from "../Stores/User";

const Login = (props) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const dataUser = useContext(User);

  const doLogin = async () => {
    setLoading(true);
    let res = await fetch(`${process.env.REACT_APP_API_KEY_AUTH}/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email,
        password,
      }),
    });

    res = await res.json();

    const setLocalStorage = localStorage.setItem(
      "ssid_login",
      res.data.access_token
    );
    console.log({ localStorage: setLocalStorage, response: res });
    setLoading(false);

    if (res.status === 200) {
      return navigate("/home");
    }
  };

  const loginClick = (e) => {
    doLogin();
  };

  return (
    <>
      {loading && (
        <div
          className="container d-flex align-items-center justify-content-center"
          style={{
            zIndex: 1,
            position: "absolute",
            top: 0,
            bottom: 0,
            right: 0,
            left: 0,
            width: "100% !important",
            height: "100%",
          }}
        >
          <Blocks
            visible={true}
            height="80"
            width="80"
            ariaLabel="blocks-loading"
            wrapperStyle={{}}
            wrapperClass="blocks-wrapper"
          />
        </div>
      )}
      <div
        className="container my-5 border border-1 rounded p-4"
        style={{ marginTop: "100px !important", width: "26rem" }}
      >
        <h1 className="text-center fw-bold mb-4">Login</h1>
        <input
          type="email"
          className="form-control form-control-sm"
          placeholder="Email"
          onChange={(e) => setEmail(e.target.value)}
        />

        <br />

        <input
          type="password"
          className="form-control form-control-sm"
          placeholder="password"
          onChange={(e) => setPassword(e.target.value)}
        />

        <div className="d-flex justify-content-between mt-2">
          <Link to={""} className="fs-6 mt-2">
            Forgot Password
          </Link>
          <button
            onClick={loginClick}
            className="btn btn-primary btn-md"
            style={{ width: "100px" }}
          >
            Login
          </button>
        </div>
      </div>
    </>
  );
};

export default Login;
