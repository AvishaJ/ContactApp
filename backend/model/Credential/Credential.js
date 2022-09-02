let mongoose = require("mongoose");
const CredentialSchema = mongoose.Schema(
  {
    credentialId: { type: String },
    username: { type: String, unique: true },
    password: { type: String },
  },
  {
    timestamps: true,
  }
);
let CredentialModel = new mongoose.model("Credentials", CredentialSchema);

module.exports = { CredentialModel };
