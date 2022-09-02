import "./GetAllContacts.css";
import NavBar from "../userDashboard/navigationBar/NavBar";
import { useParams } from "react-router-dom";
import FormGroup from "@mui/material/FormGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import Switch from "@mui/material/Switch";
import axios from "axios";
import Alert from "@mui/material/Alert";
import { useEffect, useState } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import Pagination from "@mui/material/Pagination";
import Stack from "@mui/material/Stack";
function GetAllContacts() {
  const username = useParams();
  const navigation = new useNavigate();
  const [isLoggedIn, updateIsLoggedIn] = useState("");
  const [allContacts, updateAllContacts] = useState([]);
  const [allContactsCount, updateAllContactsCount] = useState(0);
  const [pageNumber, updatePageNumber] = useState(1);
  const [limit, updateLimit] = useState(5);
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
    getContacts();
    getAllContactCount();
  }, [pageNumber, limit]);
  const handleUpdateContact = (u) => {
    navigation(`/userDashboard/UpdateContacts/${username.username}`, {
      state: u,
    });
  };
  async function getAllContactCount() {
    axios
      .get(
        `http://localhost:8800/api/v1/getAllContactsCount/${username.username}`
      )
      .then((resp) => {
        updateAllContactsCount(parseInt(resp.data));
      })
      .catch((error) => {
        console.log(error.response.data);
      });
  }
  async function getContacts() {
    axios
      .post(`http://localhost:8800/api/v1/getContacts/${username.username}`, {
        limit,
        pageNumber,
      })
      .then((resp) => {
        updateAllContacts(resp.data);
        console.log(resp.data);
      })
      .catch((error) => {
        console.log(error.response.data);
      });
  }
  const handleGetContactDetail = (u) => {
    navigation(`/userDashboard/getContactDetail/${username.username}`, {
      state: u,
    });
  };
  const handleCreateContactDetail = (fullname) => {
    navigation(`/userDashboard/createContactDetail/${username.username}`, {
      state: fullname,
    });
  };
  const toogleActiveFlag = (e) => {
    const fullname = e.target.id;
    axios
      .post(`http://localhost:8800/api/v1/toggleContact/${username.username}`, {
        fullname,
      })
      .then((resp) => {
        // updateAllContacts(getContacts());
        getContacts();
      })
      .catch((error) => {
        console.log(error);
      });
  };
  let rowOfContact;
  if (allContacts != null) {
    rowOfContact = Object.values(allContacts).map((u) => {
      return (
        <tr id={u.contactId}  style={{color:"white"}}>
          <td > </td>
          <td style={{ width: "20%" }}>{u.fname}</td>
          <td style={{ width: "20%" }}>{u.lname}</td>
          {/* <td style={{ width: "20%" }}>{u.fullname}</td> */}
          <td style={{ width: "10%" }}>
            <button
              class="btn btn-primary button"
              onClick={() => {
                handleCreateContactDetail(u.fullname);
              }}
            >
              <b>＋</b>
            </button>
          </td>
          <td style={{ width: "10%" }}>
            <button
              class="btn btn-primary button"
              onClick={() => handleGetContactDetail(u)}
            >
              <b>👁</b>
            </button>
          </td>

          <td style={{ width: "10%" }}>
            <button
              class="btn btn-primary button"
              onClick={() => handleUpdateContact(u)}
            >
              <b>↻</b>
            </button>
          </td>

          <td id={u.contactId} style={{ width: "10%" }}>
            <button
              class="btn btn-primary button"
              id={u.fullname}
              onClick={toogleActiveFlag}
            >
              <b>✖</b>
            </button>
            
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
            please login 
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
      <div className="pagination">
        <label class="fw-bold" style={{color:'white'}}>Limit:</label>
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
      
      <div>
        <table class="table table-striped">
          <thead style={{color:"white"}}>
            <tr>
              <th scope="col"> </th>
              <th scope="col">First Name</th>
              <th scope="col">Last Name</th>
              {/* <th scope="col">Full Name</th> */}
              <th scope="col">Create Contact Details</th>
              <th scope="col">View Contact Details</th>
              <th scope="col">Update Contact</th>
              <th scope="col">Delete</th>
            </tr>
          </thead>
          <tbody>{rowOfContact}</tbody>
        </table>
      </div>
      <div class="center">
      <div className="pagination">
        <Stack spacing={2}>
          <Pagination
            count={Math.ceil(allContactsCount / limit)}
            color="secondary"
            onChange={(e, value) => updatePageNumber(value)}
          />
        </Stack>
      </div>
      </div>
    </>
  );
}
export default GetAllContacts;
