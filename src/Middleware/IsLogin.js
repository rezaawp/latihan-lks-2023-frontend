import { useEffect, navi } from "react";
import { Link, useNavigate } from "react-router-dom";

const IsLogin = ({ children }) => {
  const navigate = useNavigate();

  const checkToken = async () => {
    let res = await fetch(`${process.env.REACT_APP_API_KEY_AUTH}/me`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
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
