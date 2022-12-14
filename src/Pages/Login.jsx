import React, { useState, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import Loading from "../Components/Loading";
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
    setLoading(false);

    if (res.status === 200) {
      dataUser.setDataUser(res.data.user.name);
      console.log({ user: res.data.user });
      console.log({ context: dataUser.data_user });
      return navigate("/create");
    }
  };

  const loginClick = (e) => {
    doLogin();
  };

  return (
    <>
      {loading && <Loading />}
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
