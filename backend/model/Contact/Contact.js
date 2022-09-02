let mongoose = require("mongoose");
const ContactSchema = mongoose.Schema(
  {
    contactId: { type: String },
    fname: { type: String },
    lname: { type: String },
    isActive: { type: Boolean },
    fullname: { type: String },
    contactDetails: {
      type: [mongoose.SchemaTypes.ObjectId],ref: "ContactDetails"},
  },
  {
    timestamps: true,
  }
);
let ContactModel = new mongoose.model("Contacts", ContactSchema);

module.exports = { ContactModel };
