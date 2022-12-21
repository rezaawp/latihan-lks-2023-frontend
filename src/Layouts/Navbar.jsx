import { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { create, pollings, profile } from "../Routes/web";
import User from "../Stores/User";

const Navbar = (props) => {
  const data = useContext(User);
  const navigate = useNavigate();
  const logout = async (e) => {
    try {
      let res = await fetch(`${process.env.REACT_APP_API_KEY_AUTH}/logout`, {
        method: "POST",
        headers: data.headersApi,
      });

      res = await res.json();

      console.log({ res });
      if (res.status === 200) {
        localStorage.removeItem("ssid_login");
        data.token = "";
        data.setDataUser(undefined);
        navigate("/login");
      }
    } catch (e) {
      console.log({ err: e });
    }
  };
  return (
    <>
      <nav className="navbar navbar-expand-lg bg-light">
        <div className="container-fluid">
          <a className="navbar-brand" href="#">
            Pollings
          </a>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarNav"
            aria-controls="navbarNav"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon" />
          </button>
          <div className="collapse navbar-collapse" id="navbarNav">
            <ul className="navbar-nav">
              <li className="nav-item">
                <Link
                  className="nav-link active"
                  aria-current="page"
                  to={pollings}
                >
                  Home
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to={create}>
                  Create Post
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to={profile}>
                  Profile
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" onClick={logout}>
                  Logout
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </>
  );
};

export default Navbar;
