import logo from "./logo.svg";
import "./App.css";
import axios from "axios";
import React, { useState } from "react";
import Login from "./Components/Login/Login.js";
import { Route, Routes } from "react-router-dom";
import AdminDashboard from "./Components/adminDashboard/adminDashboard";
import UserDashboard from "./Components/userDashboard/userDashboard";
import DisplayAllUsers from "./Components/displayAllUsers/displayAllUsers";
import CreateContact from "./Components/createContact/CreateContact";
import UpdateContacts from "./Components/updateContacts/UpdateContacts";
import GetAllContacts from "./Components/getAllContacts/GetAllContacts";
import CreateContactDetail from "./Components/createContactDetail/createContactDetail";
import UpdateUser from "./Components/updateUser/updateUser";
import GetContactDetail from "./Components/getContactDetail/getContactDetail";
import UpdateContactDetail from "./Components/updateContactDetail/updateContactDetail";
function App() {
  return (
    <Routes>
      <Route exact path="/" element={<Login />} />
      <Route exact path="/adminDashboard/:username" element={<AdminDashboard />}/>
      <Route exact path="/adminDashboard/displayAllUsers/:username" element={<DisplayAllUsers />}/>
      <Route exact path="/adminDashboard/:username" element={<AdminDashboard />}/>
      <Route exact path="/adminDashboard/UpdateUser/:username" element={<UpdateUser />}/>
      <Route exact path="/userDashboard/createContactDetail/:username" element={<CreateContactDetail />}/>
      <Route exact path="/userDashboard/:username" element={<UserDashboard />}/>
      <Route exact path="/userDashboard/createContacts/:username" element={<CreateContact />}/>    
      <Route exact path="/userDashboard/GetAllContacts/:username" element={<GetAllContacts />}/>
      <Route exact path="/userDashboard/UpdateContacts/:username" element={<UpdateContacts />}/>    
      <Route exact path="/userDashboard/getContactDetail/:username" element={<GetContactDetail />}/>
      <Route exact path="/userDashboard/updateContactDetail/:username" element={<UpdateContactDetail />}/>
    </Routes>
  );
}

export default App;
