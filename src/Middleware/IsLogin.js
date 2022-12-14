import { useEffect, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import User from "../Stores/User";

const IsLogin = ({ children }) => {
  const navigate = useNavigate();
  const dataUser = useContext(User);
  const token = localStorage.getItem("ssid_login") === undefined ? '' : localStorage.getItem("ssid_login");

  const checkToken = async () => {
    let res = await fetch(`${process.env.REACT_APP_API_KEY_AUTH}/me`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });

    res = await res.json();

    if (res.status === 401) {
      navigate("/login");
    }
  };

  useEffect(() => {
    checkToken();
  }, []);

  return children;
};

export default IsLogin;
