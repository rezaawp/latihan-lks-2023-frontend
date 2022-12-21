import jwtDecode from "jwt-decode";
import { useEffect, useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import User from "../Stores/User";

const IsLogin = ({ children }) => {
  const data = useContext(User);
  const headersApi = data.headersApi;
  const token = data.token;
  // const token = jwtDecode(localStorage.getItem("ssid_login"));
  // const expToken = token.exp;
  // const today = new Date();
  // const todayISO = today.toISOString();
  // // const seconds = new Date(todayISO);

  // const date = new Date(today.toString());

  // const seconds = Math.floor(date.getTime() / 1000);
  const [dataUser, setDataUser] = useState();

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
      setDataUser(res.data);
      data.data_user = res.data;
    }

    if (res.status === 401) {
      setDataUser(res.data);
      data.setDataUser(undefined);
    }
  };

  useEffect(() => {
    checkToken();
  }, []);

  if (data.data_user === undefined) {
    return (
      <>
        <div>Not Found</div>
      </>
    );
  }
  return children;
};

export default IsLogin;
