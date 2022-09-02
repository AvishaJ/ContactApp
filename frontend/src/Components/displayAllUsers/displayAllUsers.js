import "./displayAllUsers.css";
import React, { useEffect, useState } from "react";
import FormGroup from "@mui/material/FormGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import Switch from "@mui/material/Switch";
import axios from "axios";
import Alert from "@mui/material/Alert";
import { useNavigate, useParams } from "react-router-dom";
import Pagination from "@mui/material/Pagination";
import Stack from "@mui/material/Stack";
import BootstrapSwitchButton from "bootstrap-switch-button-react";
import NavBar from "../adminDashboard/navigationBar/NavBar";
// import Toggle from "./toggle/toggle";
function DisplayAllUsers() {
  const [allUsers, updateAllUsers] = useState({});
  const [pageNumber, updatePageNumber] = useState(1);
  const [limit, updateLimit] = useState(5);
  const [isLoggedIn, updateIsLoggedIn] = useState("");
  const [allUserCount, updateAllUserCount] = useState(0);
  const currentUser = useParams();
  const navigation = new useNavigate();
  const navToLogin = () => {
    navigation("/");
  };

  useEffect(() => {
    axios
      .post(
        `http://localhost:8800/api/v1/isAdminLoggedIn/${currentUser.username}`,
        {}
      )
      .then((resp) => {
        updateIsLoggedIn(true);
      })
      .catch((error) => {
        updateIsLoggedIn(false);
      });
    getUsers();
    getAllUserCount();
  }, [pageNumber, limit]);
  const toogleActiveFlag = (e) => {
    let username = e.target.id;
    console.log(username);

    axios
      .post("http://localhost:8800/api/v1/toogleActiveFlag", { username })
      .then((resp) => {
        console.log("hi");
        getUsers();
      })
      .catch((error) => {});
  };
  async function getAllUserCount() {
    await axios
      .post("http://localhost:8800/api/v1/getAllUsersCount")
      .then((resp) => {
        updateAllUserCount(parseInt(resp.data));
      })
      .catch((error) => {
        console.log(error.response.data);
      });
  }
  async function getUsers() {
    await axios
      .post("http://localhost:8800/api/v1/getUsers", { limit, pageNumber })
      .then((resp) => {
        updateAllUsers(resp.data);
      })
      .catch((error) => {
        console.log(error.response.data);
      });
  }

  let rowOfUser;

  if (allUsers != null) {
    rowOfUser = Object.values(allUsers).map((u) => {
      return (
        <tr id={u.userId}>
          <td> </td>
          <td>{u.credential.username}</td>
          <td>{u.fname}</td>
          <td>{u.lname}</td>
          <td>{u.role}</td>
          <td>
            <button
              class="btn btn-secondary button"
              onClick={() => {
                navigation(
                  `/adminDashboard/UpdateUser/${currentUser.username}`,
                  { state: u }
                );
              }}
            >
              <b>↻</b>
            </button>
          </td>
          <td id={u.userId}>
            <FormGroup>
              <FormControlLabel
                control={
                  <Switch
                    checked={u.isActive}
                    onChange={toogleActiveFlag}
                    id={u.credential.username}
                  />
                }
              />
            </FormGroup>
          </td>
        </tr>
      );
    });
  }
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
          Please login!!

          </p>
          <button onClick={navToLogin} class="btn btn-secondary">
            Login
          </button>
        </div>
      </>
    );
  }
  return (
    <>
      <NavBar username={currentUser.username} />
      <div className="fill-window"> 
      <div>
        <div className="pagination">
          <label class="fw-bold">Limit:</label>
          <select
            id="role"
            name="role"
            onChange={(e) => {
              updateLimit(e.target.value);
              updatePageNumber(1);
            }}
          >
            <option value="5">5</option>
            <option value="10">10</option>
          </select>
        </div>
        
      </div>
      <div>
        <table class="table table-striped">
          <thead>
            <tr>
              <th scope="col"> </th>
              <th scope="col">Username</th>
              <th scope="col">Firstname</th>
              <th scope="col">Lastname</th>
              <th scope="col">Role</th>
              <th scope="col">Update</th>
              <th scope="col">Active</th>
            </tr>
          </thead>
          <tbody>{rowOfUser}</tbody>
        </table>
      </div>
      <div class="center">
      <div className="pagination">
          <Stack spacing={2}>
            <Pagination
              count={Math.ceil(allUserCount / limit)}
              color="secondary"
              onChange={(e, value) => updatePageNumber(value)}
            />
          </Stack>
        </div>
        </div>
      </div>
    </>
  );
}
export default DisplayAllUsers;
