let mongoose = require("mongoose");
const UserSchema = mongoose.Schema(
  {
    userId: { type: String },
    fname: { type: String },
    lname: { type: String },
    isActive: { type: Boolean },
    credential: { type: mongoose.SchemaTypes.ObjectId, unique: true, ref: "Credentials", },
    contacts: { type: [mongoose.SchemaTypes.ObjectId], ref: "Contacts" },
    role: { type: String },
  },
  {
    timestamps: true,
  }
);
let UserModel = new mongoose.model("Users", UserSchema);

module.exports = { UserModel };
