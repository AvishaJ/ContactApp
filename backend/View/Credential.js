const uuid = require("uuid");
const bcrypt = require("bcrypt");

class Credential {
  static allCredentials = [];
  constructor(userName, password) {
    this.username = userName;
    this.password = password;
    this.credentialId = uuid.v4();
  }
  async getHashOfPassword() {
    return bcrypt.hash(this.password, 10);
  }

  static finduserName(userName) {
    for (let index = 0; index < Credential.allCredentials.length; index++) {
      if (Credential.allCredentials[index].username == userName) {
        return [true, index];
      }
    }
    return [false, -1];
  }

  static createCredential(userName, password) {
    let [isuserNameExist, indexOfuserName] = Credential.finduserName(userName);
    if (isuserNameExist) {
      return [false, "UserName Already Exist", null];
    }

    let newCredential = new Credential(userName, password);
    Credential.allCredentials.push(newCredential);
    return [true, "Credential Created", newCredential];
  }
  static async comparePassword(password, encyptedPassword) {
    return await bcrypt.compare(password, encyptedPassword);
  }
}
module.exports = { Credential };
