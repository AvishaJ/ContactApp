import "./CreateContact.css";
import NavBar from "../userDashboard/navigationBar/NavBar";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import IsUserLoggedIn from "../isUserLoggedIn/IsUserLoggedIn";
import Alert from "@mui/material/Alert";
function CreateContact() {
  const username = useParams();
  const navigation = new useNavigate();
  const [isLoggedIn, updateIsLoggedIn] = useState("");
  const [fname, updateFname] = useState("");
  const [lname, updateLname] = useState("");
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
            Please Login 
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
  const handleCreateContact = async (e) => {
    e.preventDefault();
    await axios
      .post(`http://localhost:8800/api/v1/createContact/${username.username}`, {fname,lname,})
      .then((resp) => {
        updateStatus("Contact Created!");
      })
      .catch((error) => {
        updateStatus(error.response.data);
      });
  };
  return (
    <>
      <NavBar username={username.username} />
      <div id="admindashboardform">
        <form id="formadmin" onSubmit={handleCreateContact}>
          <h2>Create Contact</h2>
          <label class="fw-bold">Firstname:</label>
          <input
            type="text" value={fname} onChange={(e) => updateFname(e.target.value)}></input>
          <br />
          <label class="fw-bold">Lastname:</label>
          <input
            type="text" value={lname} onChange={(e) => updateLname(e.target.value)}></input>
          <br />
          <button class="button">Create Contact</button>
          <br />
          <br />
          {status}
        </form>
      </div>
    </>
  );
}
export default CreateContact;
