import React, { useContext } from "react";
import User from "../Stores/User";

const Home = (props) => {
  const data = useContext(User);

  return (
    <>
      <div className="container">{data.token}</div>
    </>
  );
};

export default Home;
