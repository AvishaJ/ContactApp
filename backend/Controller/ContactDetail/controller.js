const { User } = require("../../View/User");
const { Contact } = require("../../View/Contact");
const { ContactDetail } = require("../../View/ContactDetail");
const { JWTPayload } = require("../../View/Authentication.js");
const { getContact } = require("../Contact/controller");
async function createContactDetail(req, resp) {
  const isValidUser = JWTPayload.isValidUser(req, resp);
  if (!isValidUser) {
    return "Please Login";
  }
  const username = req.params.username;

  const { type, value, fullname } = req.body;
  if (username == null || fullname == null || value == null || type == null || username == "" || fullname == "" || value == "" || type == "") {
    return resp.status(400).send("please send all required parameters");
  }

  let user = await User.getUser(username);
  if (user == null) {
    return resp.status(401).send("User not exists");
  }
  let contact = await Contact.getContact(user, fullname);
  if (contact == null) {
    return resp.status(401).send("Contact not exists");
  }
  let contactDetail = await ContactDetail.getContactDetail(user, contact, type);
  if (contactDetail != null) {
    return resp.status(401).send("Contact Detail Already Exists");
  }

  let newContactDetail = await User.createContactDetail(username, fullname, type, value);
  resp.status(201).send(newContactDetail);
}

async function updateContactDetail(req, resp) {
  const isValidUser = JWTPayload.isValidUser(req, resp);
  if (!isValidUser) {
    return "Please Login";
  }
  const username = req.params.username;

  const { fullname, propertTobeUpdated, propvalue, type } = req.body;

  if (username == null || fullname == null || propvalue == null || propertTobeUpdated == null || username == "" || fullname == "" || propvalue == "" || propertTobeUpdated == "") {
    return resp.status(400).send("Please send all required parameters");
  }

  const user = await User.getUser(username);
  if (user == null) {
    return resp.status(401).send("User not exists");
  }
  const contact = await Contact.getContact(user, fullname);
  if (contact == null) {
    return resp.status(401).send("Contact not exists");
  }

  if (propertTobeUpdated == "type") {
    let isContactDetailExists = await ContactDetail.getContactDetail(
      user,
      contact,
      propvalue
    );
    if (isContactDetailExists != null) {
      return resp.status(401).send("Contact already exists");
    }
  }
  let isUpdated = await Contact.updateContactDetail(contact, type, propertTobeUpdated, propvalue);
  if (!isUpdated) return resp.status(400).send("Update not done");
  resp.status(201).send("Updated!!");
}
async function deleteContactDetail(req, resp) {
  const fullname = req.body.fullname;
  const type = req.body.type;
  const username = req.params.username;

  if (fullname == null ||username == null ||fullname == "" ||username == "" ||type == "") {
    return resp.status(400).send("Please send all required parameters");
  }
  const user = await User.getUser(username);
  if (user == null) {
    return resp.status(400).send("Delete not Done");
  }
  
  const contact = await Contact.getContact(user, fullname);
  
  console.log(contact);
  if (contact == null) {
    return resp.status(400).send("Delete not Done");
  }
  
  const contactDetail = await ContactDetail.getContactDetail(user,contact,type);
  console.log(contactDetail);
  if (contactDetail == null) {
    return resp.status(400).send("Delete not Done");
  }

  const update = await Contact.updateContactDetail(contact,type,"isActive",false);
  if (update == null) {
    return resp.status(400).send("Not Done");
  }
  return resp.status(201).send("Update Done");
}

async function getContactDetail(req, resp) {
  const fullname = req.body.fullname;
  const username = req.params.username;

  if (fullname == null ||username == null ||fullname == "" ||username == "") {
    return resp.status(400).send("Please send all required parameters");
  }
  const user = await User.getUser(username);
  if (user == null) {
    return resp.status(400).send("Delete not Done");
  }
  console.log(user);
  const contact = await Contact.getContact(user, fullname);
  const contactDetails = contact.contactDetails;
  let activeContactDetails = [];
  for (let i = 0; i < contactDetails.length; i++) {
    if (contactDetails[i].isActive) {
      activeContactDetails.push(contactDetails[i]);
    }
  }
  return resp.status(201).send(activeContactDetails);
}
module.exports = {createContactDetail,updateContactDetail,deleteContactDetail,getContactDetail};
