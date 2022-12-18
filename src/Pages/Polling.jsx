import { useContext, useEffect, useState } from "react";
import { useParams, useSearchParams } from "react-router-dom";
import Loading from "../Components/Loading";
import Layout from "../Layouts/Layout";
import User from "../Stores/User";

const Polling = (props) => {
  const { uuid } = useParams();
  const data = useContext(User);
  const API_KEY = process.env.REACT_APP_API_KEY_V1;
  const headersApi = data.headersApi;
  const [polling, setPolling] = useState();
  const [error, setError] = useState(false);
  const [choiseId, setChoiseId] = useState();
  const [loading, setLoading] = useState(false);
  const [responseVote, setResponseVote] = useState();

  const getPolling = async () => {
    setError(false);
    setLoading(true);
    try {
      await fetch(`${API_KEY}/poll/${uuid}`, { headers: headersApi })
        .then((res) => res.json())
        .then((res) => {
          console.log({ res });
          if (res.status !== 200) {
            setError(true);
            return;
          }
          setError(false);
          setPolling(res.data);
          setLoading(false);
        });
    } catch (e) {
      console.log({ err: e });
    }
  };

  const postVote = async (e) => {
    setError(false);
    setLoading(true);
    await fetch(`${API_KEY}/poll/vote`, {
      method: "POST",
      headers: headersApi,
      body: JSON.stringify({
        choice_uuid: choiseId,
        poll_uuid: uuid,
      }),
    })
      .then((res) => res.json())
      .then((res) => {
        if (res.status !== 200) {
          setError(true);
          return;
        }
        setResponseVote(res.data);
        setLoading(false);
        console.log("OK");
      });
  };

  useEffect(() => {
    getPolling();
  }, []);
  return (
    <>
      <Layout>
        {loading && <Loading />}
        <div
          className="container mt-2 d-flex align-items-center"
          style={{
            overflowX: "hidden",
          }}
        >
          <div
            className="container border border-1 rounded p-2"
            style={{ width: "25rem" }}
          >
            <h3 className="fw-bold text-center">{polling?.title}</h3>
            <p className="text-center">{polling?.description}</p>

            {polling?.choises.map((choise, i) => {
              return (
                <div className="form-check" key={i}>
                  <input
                    className="form-check-input"
                    type="radio"
                    name="flexRadioDefault"
                    id={i}
                    value={choise.id}
                    onChange={(e) => {
                      setChoiseId(e.target.value);
                      console.log(`Anda memilih id = ${e.target.value}`);
                    }}
                  />
                  <label className="form-check-label" htmlFor={i}>
                    {choise.choise_name}
                  </label>
                </div>
              );
            })}

            <div className="container-fluid d-flex justify-content-end mt-4">
              <button
                className="btn btn-success btn-sm"
                style={{ width: "70px" }}
                onClick={postVote}
              >
                Vote
              </button>
            </div>
          </div>
        </div>
      </Layout>
    </>
  );
};

export default Polling;
