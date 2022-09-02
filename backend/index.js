const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const app = express();
const { JWTPayload } = require("./View/Authentication");
const cookieParser = require("cookie-parser");
app.use(cors());
app.use(bodyParser.json());
app.use(cookieParser());

const {createContact, getContacts, updateContact, deleteContact, toggleContact, getAllContactsCount, getContact,} = require("./Controller/Contact/controller.js");
const {createUser,updateUser,getUsers,deleteUser,createAdmin,isValidAdmin,toogleActiveFlag,getAllUsersCount,} = require("./Controller/User/controller");
const {createContactDetail,updateContactDetail,deleteContactDetail,getContactDetail,} = require("./Controller/ContactDetail/controller.js");
const { login } = require("./Controller/Login/controller");
const { logout } = require("./Controller/Logout/controller");


app.post("/api/v1/login", (req, resp) => {login(req, resp);});

app.post("/api/v1/createUser", async (req, resp) => {createUser(req, resp);});

app.post("/api/v1/createContact/:username", (req, resp) => {createContact(req, resp);});

app.post("/api/v1/createContactDetail/:username", (req, resp) => {createContactDetail(req, resp);});

app.post("/api/v1/getContacts/:username", (req, resp) => {getContacts(req, resp);});

app.post("/api/v1/getContact/:username", (req, resp) => {getContact(req, resp);});

app.post("/api/v1/getUsers", (req, resp) => {getUsers(req, resp);});

app.post("/api/v1/getAllUsersCount", (req, resp) => {getAllUsersCount(req, resp);});

app.post("/api/v1/deleteUser", (req, resp) => {deleteUser(req, resp);});

app.put("/api/v1/updateContact/:username", (req, resp) => {updateContact(req, resp);});

app.post("/api/v1/deleteContact/:username", (req, resp) => {deleteContact(req, resp);});

app.post("/api/v1/updateContactDetail/:username", (req, resp) => {updateContactDetail(req, resp);});

app.put("/api/v1/updateUser", (req, resp) => {updateUser(req, resp);});

app.post("/api/v1/logout", (req, resp) => {logout(req, resp);});

app.post("/api/v1/toogleActiveFlag", (req, resp) => {("inhere");toogleActiveFlag(req, resp);});

app.post("/api/v1/isAdminLoggedIn/:username", (req, resp) => {JWTPayload.isAdminLoggedIn(req, resp);});

app.post("/api/v1/isUserLoggedIn/:username", (req, resp) => {JWTPayload.isUserLoggedIn(req, resp);});

app.post("/api/v1/toggleContact/:username", (req, resp) => {toggleContact(req, resp);});

app.post("/api/v1/getContactDetail/:username", (req, resp) => {getContactDetail(req, resp);});

app.get("/api/v1/getAllContactsCount/:username", (req, resp) => {getAllContactsCount(req, resp);});

app.post("/api/v1/deleteContactDetail/:username", (req, resp) => {deleteContactDetail(req, resp);});



app.listen(8800, async () => {
  await createAdmin();
  console.log("app started");
});
