import { useContext, useEffect, useState } from "react";
import User from "./User";

const UserProvider = (props) => {
  const [dataUser, setDataUser] = useState(undefined);
  const token =
    localStorage.getItem("ssid_login") !== undefined
      ? localStorage.getItem("ssid_login")
      : "";

  let data = {
    headersApi: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
    token: token,
    data_user: dataUser,
    setDataUser,
  };

  return <User.Provider value={data}>{props.children}</User.Provider>;
};

export default UserProvider;
