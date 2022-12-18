import React, { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Loading from "../Components/Loading";
import Layout from "../Layouts/Layout";
import User from "../Stores/User";

const Pollings = (props) => {
  const data = useContext(User);
  const [pollings, setPollings] = useState([]);
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);
  const API_KEY = process.env.REACT_APP_API_KEY_V1;
  const headersApi = data.headersApi;
  const navigate = useNavigate();

  const getAllPollings = () => {
    try {
      setError(false);
      setLoading(true);
      fetch(`${API_KEY}/polls`, {
        headers: headersApi,
      })
        .then((res) => res.json())
        .then((res) => {
          if (res.status !== 200) {
            setError(true);
            return;
          }
          setLoading(false);
          setPollings(res.data);
          console.log({ res });
        });
    } catch (e) {
      console.log({ err: e });
    }
  };

  const toPolling = (e) => {
    const id = e.target.value;
    navigate(`/polling/${id}`);
  };

  useEffect(() => {
    getAllPollings();
  }, []);

  return (
    <>
      <Layout>
        {loading && <Loading />}
        <div className="container mt-2" style={{ overflowX: "hidden" }}>
          <div className="row border border-1 rounded d-flex justify-content-center p-2 gap-4">
            {pollings.map((poll, i) => {
              return (
                <div
                  key={i}
                  className="col-md-6 border border-1 rounded p-2"
                  style={{ maxWidth: "25rem" }}
                >
                  <h3 className="fw-bold text-center">{poll.title}</h3>
                  <div className="container-fluid d-flex justify-content-center mb-2">
                    <span>{poll.description}</span>
                  </div>
                  <p>Choises : </p>
                  <ul>
                    <li>Choise 1</li>
                    <li>Choise 1</li>
                    <li>Choise 1</li>
                    <li>More</li>
                  </ul>

                  <div className="d-flex justify-content-end p-1">
                    <button
                      className="btn btn-primary btn-sm"
                      value={poll.id}
                      onClick={toPolling}
                      style={{ width: "120px" }}
                    >
                      Vote
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </Layout>
    </>
  );
};

export default Pollings;
