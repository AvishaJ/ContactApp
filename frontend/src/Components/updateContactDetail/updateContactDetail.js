import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import "./updateContactDetail";
import Alert from "@mui/material/Alert";
import { useLocation } from "react-router-dom";
import NavBar from "../userDashboard/navigationBar/NavBar";
import { Navigate, useNavigate } from "react-router-dom";
function UpdateContactDetail() {
  const [status, updateStatus] = useState("");
  const location = useLocation();
  const [propertTobeUpdated, updatePropertTobeUpdated] = useState("type");
  const [propvalue, updatePropvalue] = useState("");
  const currentUser = useParams();
  const navigation = new useNavigate();
  const [loginStatus, updateLoginStatus] = useState("");
  // const fullname = location.state.fullname;
  console.log(currentUser.username);
  useEffect(() => {
    axios
      .post(
        `http://localhost:8800/api/v1/isUserLoggedIn/${currentUser.username}`,
        {}
      )
      .then((resp) => {
        updateLoginStatus(true);
      })
      .catch((error) => {
        console.log(error.response.data);
        updateLoginStatus(false);
      });
  }, []);

  if (!loginStatus) {
    return (
      <div
        style={{
          width: "100vw",
          height: "100vh",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          flexWrap: "wrap",
          flexDirection: "column",
        }}
      >
        <p style={{ color: "red", fontSize: "20px" }}>
          User not logged in please login by clicking below
        </p>

        <button
          onClick={() => navigation("/")}
          class="btn btn-secondary button"
        >
          login
        </button>
      </div>
    );
  }
  const u = location.state;
  let fullname = location.state;
  if (fullname != null) {
    fullname = location.state.fullname;
    window.sessionStorage.setItem("fullname", fullname);
  }
  fullname = window.sessionStorage.getItem("fullname");
  let type = location.state;
  if (type != null) {
    type = location.state.type;
    window.sessionStorage.setItem("type", type);
  }
  type = window.sessionStorage.getItem("type");

  console.log(fullname);

  const handleSubmit = (e) => {
    e.preventDefault();
    axios
      .post(
        `http://localhost:8800/api/v1/updateContactDetail/${currentUser.username}`,
        { fullname, propertTobeUpdated, propvalue, type }
      )
      .then((resp) => {
        updateStatus(<Alert severity="success">updated!</Alert>);
        navigation(`/userDashboard/getContactDetail/${currentUser.username}`);
      })
      .catch((error) => {
        updateStatus(<Alert severity="error">{error.response.data}</Alert>);
      });
  };
  return (
    <>
      <NavBar username={currentUser.username} />
      <form id="formadmin" onSubmit={handleSubmit}>
        <label class="fw-bold">Property</label>
        <select
          id="propertyTobeUpdated"
          name="propertyTobeUpdated"
          onChange={(e) => {
            updatePropertTobeUpdated(e.target.value);
          }}
        >
          <option value="type">type</option>
          <option value="value">value</option>
        </select>
        <br />
        <label class="fw-bold">Value</label>
        <input
          required
          type="text"
          // value={value}
          onChange={(e) => updatePropvalue(e.target.value)}
        ></input>
        <br />
        <button class="btn btn-primary">Update Contact Detail</button>
        <br />
        <br />
        {status}
      </form>
    </>
  );
}
export default UpdateContactDetail;
