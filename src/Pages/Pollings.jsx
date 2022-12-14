import React, { useContext } from "react";
import Layout from "../Layouts/Layout";
import User from "../Stores/User";

const Pollings = (props) => {
  const data = useContext(User);

  return (
    <>
      <Layout>
        <div className="container">{data.token}</div>
      </Layout>
    </>
  );
};

export default Pollings;
