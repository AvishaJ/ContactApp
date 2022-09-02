import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Menu from "@mui/material/Menu";
import MenuIcon from "@mui/icons-material/Menu";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import Tooltip from "@mui/material/Tooltip";
import MenuItem from "@mui/material/MenuItem";
import AdbIcon from "@mui/icons-material/Adb";
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import axios from "axios";

import { Navigate, useNavigate, useParams } from "react-router-dom";

const pages = ["Create Contacts", "Get Contacts", "Blog"];
const settings = ["Profile", "Account", "Dashboard", "Logout"];

const ResponsiveAppBar = (props) => {
  const username = props.username;
  const [anchorElNav, setAnchorElNav] = React.useState(null);
  const [anchorElUser, setAnchorElUser] = React.useState(null);
  const navigation = new useNavigate();

  const handleCreateContact = () => {
    console.log("hiiii");
    navigation(`/userDashboard/createContacts/${username}`);
  };

  const handleGetAllContact = () => {
    navigation(`/userDashboard/GetAllContacts/${username}`);
  };
  const handleCreateContactDetail = () => {
    navigation(`/userDashboard/createContactDetail/${username}`);
  };
  const handleMyLogout = async () => {
    await axios.post("http://localhost:8800/api/v1/logout").then(() => {
      navigation("/");
    });
  };
  return (
    <>
      <Navbar className="fixed-top" bg="dark" variant="dark">
        <Container>
          <Navbar.Brand href="#home">Contact App</Navbar.Brand>
          <Nav className="me-auto">
            <div className='pull-right' >
              <ul class="nav navbar-nav">

                <button onClick={handleCreateContact} className="btn btn-primary" style={{ backgroundColor: "pink", display: "inlineBlock" }}>Create</button>


                <button onClick={handleGetAllContact} className="btn btn-primary" style={{ backgroundColor: "pink", display: "inlineBlock" }}>View</button>
                

                <button onClick={handleMyLogout} className="btn btn-primary" style={{ backgroundColor: "pink", display: "inlineBlock" }}>Logout</button>

              </ul>
            </div>
          </Nav>
        </Container>
      </Navbar>
      <br />
    </>
  );
};
export default ResponsiveAppBar;
