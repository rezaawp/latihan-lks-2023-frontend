import { useContext, useEffect, useState } from "react";
import { headersApi } from "../Helpers/GetUseContext";
import Layout from "../Layouts/Layout";
import User from "../Stores/User";

const Profile = () => {
  const [user, setUser] = useState();
  const API_KEY = process.env.REACT_APP_API_KEY_AUTH;
  const data = useContext(User);
  const headersApi = data.headersApi;
  const getUser = async () => {
    try {
      let res = await fetch(`${API_KEY}/me`, {
        method: "POST",
        headers: headersApi,
      });
      res = res.json();
      //   data.push(res);
      setUser(res.data);
    } catch (e) {
      console.log({ err: e });
    }
  };

  useEffect(() => {
    getUser();
  }, []);
  return (
    <>
      <Layout>
        <div className="container">
          <div className="container-fluid d-flex justify-content-center mt-3">
            <img
              src="data:image/jpeg;base64,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"
              alt="..."
              className="bg-light rounded-circle"
            />
          </div>

          <h4>{}</h4>
        </div>
      </Layout>
    </>
  );
};

export default Profile;
