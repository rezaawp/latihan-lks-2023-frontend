import { useState } from "react";
import Loading from "../Components/Loading";
import SuccesPost from "../Components/SuccesPost";
import Layout from "../Layouts/Layout";

const CreatePolling = () => {
  const [title, setTitle] = useState("");
  const [desc, setDesc] = useState("");
  const [deadline, setDeadline] = useState("");
  const [choises, setChoises] = useState();
  const [loading, setLoading] = useState(false);
  const [succesCreate, setSuccessCreate] = useState(false);
  const token =
    localStorage.getItem("ssid_login") === undefined
      ? ""
      : localStorage.getItem("ssid_login");

  const changeChoises = (e) => {
    const array = e.target.value.split("\n");
    setChoises(array);
    console.log({ choises: array });
  };

  const submit = async (e) => {
    setLoading(true);
    setSuccessCreate(false);
    let res = await fetch(`${process.env.REACT_APP_API_KEY_V1}/poll`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify({
        title,
        description: desc,
        deadline,
        choises,
      }),
    });

    res = res.json();
    res.then((res) => {
      if (res.status === 200) {
        setLoading(false);
        console.log("OK");
        setSuccessCreate(true);
      }
    });
  };

  return (
    <>
      {loading && <Loading />}

      {succesCreate && <SuccesPost />}

      <Layout>
        <div
          className="container border border-1 mt-4 rounded"
          style={{ width: "28rem" }}
        >
          <h2 className="text-center fw-bold mt-3">Create Polling</h2>

          <label htmlFor="title" className="">
            Title :
          </label>
          <input
            id="title"
            type="text"
            className="form-control form-control-md"
            placeholder="Title"
            onChange={(e) => setTitle(e.target.value)}
          />

          <label htmlFor="desc" className="">
            Description :
          </label>
          <input
            id="desc"
            type="text"
            className="form-control form-control-md"
            placeholder="Description"
            onChange={(e) => setDesc(e.target.value)}
          />

          <label htmlFor="deadline" className="">
            Deadline :
          </label>
          <input
            id="deadline"
            type="date"
            className="form-control form-control-md"
            placeholder="Deadline"
            onChange={(e) => setDeadline(e.target.value)}
          />

          <label htmlFor="choises">Choises : </label>
          <textarea
            name=""
            id="choises"
            cols="30"
            rows="10"
            className="form-control"
            onChange={changeChoises}
          ></textarea>
          <p>
            <i> ** Untuk choises, setiap baris baru akan menjadi pilihan</i>
          </p>

          <div className="container-fluid d-flex justify-content-end">
            <button
              onClick={submit}
              className="btn btn-primary mb-2"
              style={{ width: "200px" }}
            >
              Create Poll
            </button>
          </div>
        </div>
      </Layout>
    </>
  );
};

export default CreatePolling;
