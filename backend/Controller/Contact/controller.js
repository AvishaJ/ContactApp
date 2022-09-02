const { User } = require("../../View/User.js");
const { JWTPayload } = require("../../View/Authentication.js");
const { Contact } = require("../../View/Contact.js");
async function createContact(req, resp) {

  const isValidUser = JWTPayload.isValidUser(req, resp);
  if (!isValidUser) {
    return "please login";
  }
  const username = req.params.username;

  const { fname, lname } = req.body;

  if ( username == null ||fname == null ||lname == null ||username == "" ||fname == "" ||lname == "") {
    return resp.status(400).send("Please fill all parameters properly");
  }

  const contact = await User.createContact(username, fname, lname);
  // console.log(newcontact);
  if (contact == null) {
    resp.status(401).send("Contact already exists");
    return;
  }
  resp.status(201).send(contact);
}
async function toggleContact(req, resp) {
  const fullname = req.body.fullname;
  const username = req.params.username;
  if (
    fullname == null ||
    username == null ||
    fullname == "" ||
    username == ""
  ) {
    return resp.status(400).send("Please fill all parameters properly");
  }
  // let [indexofUser, isUserActive, isUserExists] = User.isUserExists(username);

  // if (!isUserExists || !isUserActive) {
  //   resp.status(400).send("user doesnt exists");
  // }
  // let [indexOfContact, isContactActive, isContactExist] =
  //   User.allUsers[indexofUser].isContactExists(fullname);
  // if (!isContactExist) {
  //   resp.status(400).send("Contact doesnt exists");
  // }
  const user = await User.getUser(username);
  if (user == null) {
    console.log("User doesnt exists");
  }
  const contact = await Contact.getContact(user, fullname);
  if (contact == null) {
    console.log("Contact doesnt exists");
  }

  await User.updateContact(contact._id, "isActive", false);
  resp.status(201).send("Contact toggle button");
  return;
}
async function getAllContactsCount(req, resp) {
  const username = req.params.username;
  const user = await User.getUser(username);
  if (user == null) {
    return resp.status(401).send("User not exists");
  }
  resp.status(201).send(user.contacts.length.toString());
}
async function getContacts(req, resp) {
  const isValidUser = JWTPayload.isValidUser(req, resp);
  if (!isValidUser) {
    return "Please login";
  }
  const username = req.params.username;
  const { limit, pageNumber } = req.body;
  let startIndex = (pageNumber - 1) * limit;
  let endIndex = pageNumber * limit;

  if (username == null || username == "") {
    return resp.status(400).send("please send all required parameters");
  }

  const contacts = await User.getContacts(username);
  let activeContacts = [];
  for (let i = 0; i < contacts.length; i++) {
    if (contacts[i].isActive == true) {
      activeContacts.push(contacts[i]);
    }
  }
  if (contacts == null) {
    return resp.status(400).send("Contact doesnt exists");
  }
  console.log(contacts);
  resp.status(201).send(activeContacts.slice(startIndex, endIndex));
}

async function updateContact(req, resp) {
  const isUser = JWTPayload.isValidUser(req, resp);
  if (!isUser) {
    return "unauthorized access";
  }
  const username = req.params.username;

  const propertTobeUpdated = req.body.propertyTobeUpdated;
  const value = req.body.value;
  const fullname = req.body.fullname;

  if (
    username == null ||
    propertTobeUpdated == null ||
    value == null ||
    fullname == null ||
    username == "" ||
    propertTobeUpdated == "" ||
    value == "" ||
    fullname == ""
  ) {
    return resp.status(400).send("please send all required parameters");
  }

  const user = await User.getUser(username);
  if (user == null) {
    return resp.status(401).send("User not exists");
  }
  let contact = await Contact.getContact(user, fullname);
  if (contact == null) {
    return resp.status(401).send("contact not exists");
  }
  if (propertTobeUpdated == "fname") {
    let isContactExists = await Contact.getContact(
      user,
      value + " " + contact.lname
    );

    if (isContactExists != null) {
      return resp.status(401).send("contact already exists");
    }
  }

  if (propertTobeUpdated == "lname") {
    let isContactExists = await Contact.getContact(
      user,
      contact.fname + " " + value
    );

    if (isContactExists != null) {
      return resp.status(401).send("contact already exists");
    }
  }

  console.log(contact);
  // let user=User.getUser(username)
  let updated = await User.updateContact(
    contact._id,
    propertTobeUpdated,
    value
  );
  if (!updated) {
    return resp.status(504).send("Update failed");
  }
  contact = await Contact.getContact(user, fullname);
  if (contact == null) {
    return resp.status(401).send("Contact not exists");
  }
  updated = await User.updateContact(
    contact._id,
    "fullname",
    contact.fname + " " + contact.lname
  );
  if (!updated) {
    return resp.status(504).send("Update failed");
  }
  resp.status(200).send("Update done");
}
function deleteContact(req, resp) {
  const isValidUser = JWTPayload.isValidUser(req, resp);
  if (!isValidUser) {
    return "Please login";
  }
  const username = req.params.username;
  const { fullname } = req.body;
  if (
    username == null ||
    fullname == null ||
    username == "" ||
    fullname == ""
  ) {
    return resp.status(400).send("Please fill all parameters properly");
  }
  let [indexofUser, isUserActive, isUserExists] = User.isUserExists(username);

  if (!isUserExists || !isUserActive) {
    return resp.status(400).send("User doesnt exists");
  }
  resp.status(201).send(User.allUsers[indexofUser].deleteContact(fullname));
}
async function getContact(req, resp) {
  const isValidUser = JWTPayload.isValidUser(req, resp);
  if (!isValidUser) {
    return "Please Login";
  }
  const username = req.params.username;
  const { fullname } = req.body;

  const user = await User.getUser(username);
  if (user == null) {
    return resp.status(400).send("User doesnt exists");
  }
  const contact = await Contact.getContact(user, fullname);
  if (contact == null) {
    return resp.status(400).send("contact doesnt exists");
  }
  console.log(contact);
  resp.status(201).send(contact);
}
module.exports = { createContact, getContacts, updateContact, deleteContact, toggleContact, getAllContactsCount, getContact };
