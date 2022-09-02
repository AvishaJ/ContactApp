import React, { useEffect, useState } from "react";
import axios from "axios";
import NavBar from "../adminDashboard/navigationBar/NavBar";
import { Navigate, useNavigate, useParams } from "react-router-dom";
import { useLocation } from "react-router-dom";
import Alert from "@mui/material/Alert";
function UpdateUser() {
  const [statusOfUpdateUser, updateStatusOfUpdateUser] = useState("");
  const [propertyToUpdate, updatepropertyToUpdate] = useState("username");
  const [value, updateValue] = useState("");
  const currentUser = useParams();
  const navigation = new useNavigate();
  const location = useLocation();

  const u = location.state;
  const [isLoggedIn, updateIsLoggedIn] = useState("");
  useEffect(() => {
    axios
      .post(
        `http://localhost:8800/api/v1/isUserLoggedIn/${currentUser.username}`,
        {}
      )
      .then((resp) => {
        updateIsLoggedIn(true);
      })
      .catch((error) => {
        updateIsLoggedIn(false);
      });
  }, []);
  if (!isLoggedIn) {
    return (
      <>
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
            Login
          </button>
        </div>
      </>
    );
  }
  let username = u.credential.username;
  if (username != null) {
    window.sessionStorage.setItem("username", username);
  }
  username = window.sessionStorage.getItem("username");
  // console.log(currentUser.username);

  const handleUpdateUserSubmit = async (e) => {
    e.preventDefault();
    const resp = await axios
      .put("http://localhost:8800/api/v1/updateUser", {
        username,
        propertyToUpdate,
        value,
      })
      .then((resp) => {
        updateStatusOfUpdateUser(
          "user updated!"
        );
        navigation(`/adminDashboard/displayAllUsers/${currentUser.username}`);
      })
      .catch((error) => {
        console.log(error);
        updateStatusOfUpdateUser(
          error.response.data
        );
      });
  };

  return (
    <>
      <NavBar username={currentUser.username} />
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
          <form onSubmit={handleUpdateUserSubmit} id="formadmin">
          <br/><h2>Update Form</h2><br/>
            <label for="property" class="fw-bold">
              Property:
            </label>
            <select
              id="property"
              name="property"
              onChange={(e) => {
                updatepropertyToUpdate(e.target.value);
              }}
            >
              <option value="username">User name</option>
              <option value="fname">First name</option>
              <option value="lname">Last name</option>
            </select>
            <br />
            <label class="fw-bold">Value:</label>
            <input
              required
              type="text"
              // minLength={3}
              value={value}
              onChange={(e) => {
                updateValue(e.target.value);
              }}
            ></input>
            <br />

            <button class="btn btn-secondary button">Update User</button>
            <br />
            <br />
            {statusOfUpdateUser}
          </form>
        </div>
      </div>
    </>
  );
}
export default UpdateUser;
