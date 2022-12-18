import { useState } from "react";
import User from "./User";

const UserProvider = (props) => {
  const [user, setUser] = useState({});
  const data = {
    user,
    token: localStorage.getItem("ssid_login"),
    headersApi: {
      Authorization: `Bearer ${localStorage.getItem("ssid_login")}`,
      'Content-Type': `application/json`
    }
  };

  const loginHandler = (token) => {
    setUser({ token });
  };

  return <User.Provider value={data}>{props.children}</User.Provider>;
};

export default UserProvider;
