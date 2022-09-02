const { Contact } = require("./Contact.js");
const { Credential } = require("./Credential");
const { DatabaseMongoose } = require("../Repository/Repository");
const uuid = require("uuid");
const { response } = require("express");
class User {
  static allUsers = [];
  constructor(fname, lname, credential, role) {
    this.userId = uuid.v4();
    this.fname = fname;
    this.lname = lname;
    this.role = role;
    this.isActive = true;
    this.credential = credential;
    this.contacts = [];
  }
  static async createAdmin() {
    const userName = "avj";
    const password = "123";
    const fname = "Avisha";
    const lname = "Jain";
    const role = "admin";

    const [flag, message, newCredential] = Credential.createCredential(userName, password);
    if (!flag) {
      return message;
    }
    newCredential.password = await newCredential.getHashOfPassword();
    const dbs = await new DatabaseMongoose();

    let newRecord = await dbs.insertOneCredential(newCredential);
    if (!newRecord) {
      return [null, "Credential not created"];
    }
    const newUser = new User(fname, lname, newRecord._id, role);

    newRecord = await dbs.insertOneUser(newUser);
    if (!newRecord) {
      return [null, "user not created"];
    }
    const admin = new User(fname, lname, newCredential, role);
    return [admin, "Admin created Successfully"];
  }
  static async createUser(fname, lname, username, password, role) {

    const newCredential = new Credential(username, password);
    newCredential.password = await newCredential.getHashOfPassword();
    const dbs = await new DatabaseMongoose();
    // console.log(newCredential);
    let newRecord = await dbs.insertOneCredential(newCredential);
    if (!newRecord) {
      return [null, "Username Already Exists please choose other"];
    }
    // console.log(newRecord);
    const newUser = new User(fname, lname, newRecord._id, role);

    newRecord = await dbs.insertOneUser(newUser);
    if (!newRecord) {
      return [null, "User not created"];
    }
    User.allUsers.push(newUser);
    return [newUser, "New User created"];
  }

  static async createContact(username, fname, lname) {

    const user = await User.getUser(username);
    // console.log(user);
    const isContactExists = await Contact.getContact(user, fname + " " + lname);
    // console.log(isContactExists);
    let newcontact = new Contact(fname, lname);
    // console.log(newcontact.fullname);
    if (isContactExists != null) {
      return null;
    }
    const dbs = await new DatabaseMongoose();
    const contact = await dbs.insertOneContact(newcontact);
    // console.log(contact);
    if (contact == null) {
      return null;
    }
    const record = await dbs.insertOneContactInUser(user, contact);
    if (record == null) {
      return null;
    }
    // console.log(record);
    return newcontact;
  }
  static async getUser(username) {
    const dbs = await new DatabaseMongoose();
    let record = await dbs.getCredential(username);
    // console.log(record);
    if (record == null) {
      return null;
    }
    record = await dbs.getUser(record._id);
    // console.log(record);
    return record;
  }

  static async getAllUsers() {
    const dbs = await new DatabaseMongoose();
    let record = await dbs.getAllUsers();
    // console.log(record);
    if (record == null) {
      return null;
    }
    return record;
  }

  displayContact() {
    let tempcontacts = [];
    for (let i = 0; i < this.contacts.length; i++)
      if (this.contacts[i].isActive) tempcontacts.push(this.contacts[i]);
    return tempcontacts;
  }

  static displayUsers() {
    let tempusers = [];
    for (let i = 0; i < User.allUsers.length; i++)
      if (User.allUsers[i].isActive) tempusers.push(User.allUsers[i]);
    return tempusers;
  }

  deleteContact(fullname) {
    let [indexofcontact, isContactActive, isContactExists] =
      this.isContactExists(fullname);
    if (!isContactExists) {
      return "Contact does not exists";
    }
    if (!isContactActive) {
      return "Contact is not active";
    }
    let isContactDeleted = this.contacts[indexofcontact].deleteContact();
    if (isContactDeleted) {
      return "Contact deleted";
    }
  }
  static async createContactDetail(username, fullname, type, value) {
    const user = await User.getUser(username);
    const contact = await Contact.getContact(user, fullname);
    let newContactDetail = await Contact.createContactDetail(
      contact,
      type,
      value
    );
    // console.log(newContactDetail);
    if (newContactDetail == false) {
      return false;
    }

    return newContactDetail;
  }
  static isUserExists(username) {
    // console.log(username);

    for (let i = 0; i < User.allUsers.length; i++) {
      // console.log(username);

      if (username === User.allUsers[i].credential.username) {
        return [i, User.allUsers[i].isActive, true];
      }
    }
    return [null, false, false];
  }
  static isUserIdExists(userId) {
    for (let i = 0; i < User.allUsers.length; i++) {
      if (userId === User.allUsers[i].userId) {
        return [i, User.allUsers[i].isActive, true];
      }
    }
    return [null, false, false];
  }

  static async updateContact(contactId, propertyToUpdate, value) {
    const dbs = await new DatabaseMongoose();
    // Contact.getContact()
    const update = await dbs.updateContact(contactId, propertyToUpdate, value);
    if (update == null) {
      return false;
    }

    return true;

  }

  deleteUser(username) {
    // console.log(username);
    if (this.role == "admin") {
      let [indexofUser, isUserActive, isUserExists] =
        User.isUserExists(username);
  
      User.allUsers[indexofUser].isActive = false;
    }
    return "Only admin can delete users";
  }
  isContactExists(fullname) {
    for (let i = 0; i < this.contacts.length; i++) {
      if (fullname === this.contacts[i].fullname) {
        return [i, this.contacts[i].isActive, true];
      }
    }
    return [null, false, false];
  }

  static async updateUser(userId, propertyToUpdate, value) {
    const dbs = await new DatabaseMongoose();
    const update = await dbs.updateUser(userId, propertyToUpdate, value);
    if (update == null) {
      return false;
    }
    return true;

  }
  static async getContacts(username) {
    const dbs = await new DatabaseMongoose();
    const user = await User.getUser(username);
    return user.contacts;
  }
}
module.exports = { User };
