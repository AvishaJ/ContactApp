import axios from "axios";
import Alert from "@mui/material/Alert";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import NavBar from "./navigationBar/NavBar";
import { useNavigate } from "react-router-dom";
import CreateContact from "../createContact/CreateContact";
function UserDashboard() {
  const username = useParams();
  const navigation = new useNavigate();
  const [isLoggedIn, updateIsLoggedIn] = useState("");
  console.log(username);
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
            User not logged in please login by clicking below
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
    </>
  );
}
export default UserDashboard;
