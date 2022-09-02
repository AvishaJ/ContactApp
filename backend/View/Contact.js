const uuid = require("uuid");
const { ContactDetail } = require("./ContactDetail.js");
const { DatabaseMongoose } = require("../Repository/Repository");
class Contact {
  constructor(fname, lname) {
    this.contactId = uuid.v4();
    this.fname = fname;
    this.lname = lname;
    this.isActive = true;
    this.fullname = fname + " " + lname;
    this.contactDetails = [];
  }
  findContactDetail(type) {
    for (let index = 0; index < this.contactDetails.length; index++) {
      if (this.contactDetails[index].type === type) {
        return [true, index];
      }
    }
    return [false, -1];
  }
  static async updateContactDetail(
    contact,
    type,
    propertTobeUpdated,
    propvalue
  ) {
    const dbs = await new DatabaseMongoose();
    console.log(contact);
    let UpdateContactDetail = await dbs.updateContactDetail(
      contact.contactDetails,
      type,
      propertTobeUpdated,
      propvalue
    );
    return UpdateContactDetail;

  }
  static async createContactDetail(contact, type, value) {

    let newContactDetail = new ContactDetail(type, value);
    const dbs = await new DatabaseMongoose();
    let contactDetail = await dbs.insertOneContactDetail(newContactDetail);
    if (contactDetail == null) {
      return false;
    }
    const updatedCD = await dbs.insertContactDetailInUserContact(contact, contactDetail);

    return contactDetail;
  }
  deleteContact() {
    if (this.isActive == false) {
      return "invalid Contact";
    }
    this.isActive = false;
    return true;
  }
  static async getContact(user, fullname) {
    const contacts = user.contacts;
    for (let i = 0; i < contacts.length; i++) {
      if (contacts[i].fullname == fullname && contacts[i].isActive == true) {
        const dbs = await new DatabaseMongoose();
        let record = await dbs.getContact(contacts[i]._id);
        return record;
      }
    }

    return null;
  }

  update(propertTobeUpdated, value) {
    if (this.isActive == false) {
      return [false, this, "Invalid contact"];
    }
    switch (propertTobeUpdated) {
      case "firstname": {
        this.fname = value;
        this.UpdateFullname();
        return [true, this, "Firstname updated successfully"];
      }
      case "lastname": {
        this.lname = value;
        this.UpdateFullname();
        return [true, this, "Lastname updated successfully"];
      }
      default:
        return [false, this, "Contact not updated "];
    }
  }

  UpdateFullname() {
    this.fullname = this.fname + " " + this.lname;
  }
}
module.exports = { Contact };
