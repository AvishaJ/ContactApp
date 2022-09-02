const uuid = require("uuid");
const { Contact } = require("./Contact");
class ContactDetail {
  constructor(type, value) {
    this.contactDetailId = uuid.v4();
    this.type = type;
    this.value = value;
    this.isActive = true;
  }
  static async getContactDetail(user, contact, type) {
   
    const contactDetail = contact.contactDetails;
    for (let i = 0; i < contactDetail.length; i++) {
      if (contactDetail[i].type == type && contactDetail[i].isActive == true) {
        return contactDetail[i];
      }
    }
    return null;
  }
}
module.exports = { ContactDetail };
