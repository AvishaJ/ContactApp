let mongoose = require("mongoose");
const ContactDetailSchema = mongoose.Schema(
  {
    contactDetailId: { type: String },
    type: { type: String },
    value: { type: String },
    isActive: { type: Boolean },
  },
  {
    timestamps: true,
  }
);
let ContactDetailModel = new mongoose.model("ContactDetails",ContactDetailSchema);

module.exports = { ContactDetailModel };
