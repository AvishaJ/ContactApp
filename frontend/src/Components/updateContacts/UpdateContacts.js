import "./UpdateContacts.css";
import NavBar from "../userDashboard/navigationBar/NavBar";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import { Navigate, useNavigate } from "react-router-dom";
import { useLocation } from "react-router-dom";
import Alert from "@mui/material/Alert";
function UpdateContacts() {
  const location = useLocation();
  let fullname = location.state;
  if (fullname != null) {
    fullname = location.state.fullname;
    window.sessionStorage.setItem("fullname", fullname);
  }
  fullname = window.sessionStorage.getItem("fullname");
  const username = useParams();
  const navigation = new useNavigate();
  const [isLoggedIn, updateIsLoggedIn] = useState("");

  const [value, updateValue] = useState("");
  const [propertyTobeUpdated, updatepropertyTobeUpdated] = useState("fname");
  const [status, updateStatus] = useState("");

  useEffect(() => {
    axios
      .post(
        `http://localhost:8800/api/v1/isUserLoggedIn/${username.username}`,
        {}
      )
      .then((resp) => {
        updateIsLoggedIn(true);
      })
      .catch((error) => {
        updateIsLoggedIn(false);
      });
  }, []);
  const handleUpdateUser = async (e) => {
    e.preventDefault();
    await axios
      .put(`http://localhost:8800/api/v1/updateContact/${username.username}`, {
        fullname,
        propertyTobeUpdated,
        value,
      })
      .then((resp) => {
        updateStatus(<Alert severity="success">Contact Updated!</Alert>);
        navigation(`/userDashboard/GetAllContacts/${username.username}`);
      })
      .catch((error) => {
        updateStatus(<Alert severity="error">{error.response.data}</Alert>);
      });
  };
  if (!isLoggedIn) {
    return (
      <>
        <div
          style={{ width: "100vw", height: "100vh", display: "flex", justifyContent: "center", alignItems: "center", flexWrap: "wrap", flexDirection: "column", }}>
          <p style={{ color: "red", fontSize: "20px" }}>
            Please login!!
          </p>

          <button
            onClick={() => navigation("/")}
            class="btn btn-secondary button"
          >
            login
          </button>
        </div>
      </>
    );
  }
  return (
    <>
      <NavBar username={username.username} />
      <div
        style={{
          height: "100vh",
          width: "100vw",
          justifyContent: "center",
          display: "flex",
          alignItems: "center",
        }}
      >
        <div id="admindashboardform">
          <form id="formadmin" onSubmit={handleUpdateUser}>
            <h2>Update Contact</h2> <br></br>
            <label class="fw-bold">Property</label>
            <select
              id="propertyTobeUpdated"
              name="propertyTobeUpdated"
              onChange={(e) => {
                updatepropertyTobeUpdated(e.target.value);
              }}
            >
              <option value="fname">firstname</option>
              <option value="lname">lastname</option>
            </select>
            <br />
            <label class="fw-bold">Value</label>
            <input
              required

              type="text"
              value={value}
              onChange={(e) => updateValue(e.target.value)}
            ></input>
            <br />
            <button class="button">Update</button>
            <br />
            <br />
            {status}
          </form>
        </div>
      </div>
    </>
  );
}
export default UpdateContacts;
