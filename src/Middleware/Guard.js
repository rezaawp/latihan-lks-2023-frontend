import { useEffect, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";

const Guard = ({ children }) => {
  const navigate = useNavigate();
  const token =
    localStorage.getItem("ssid_login") === undefined
      ? ""
      : localStorage.getItem("ssid_login");

  const checkToken = async () => {
    let res = await fetch(`${process.env.REACT_APP_API_KEY_AUTH}/me`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });

    res = await res.json();

    if (res.status === 200) {
      navigate("/home");
    }
  };

  useEffect(() => {
    checkToken();
  }, []);

  return children;
};

export default Guard;
