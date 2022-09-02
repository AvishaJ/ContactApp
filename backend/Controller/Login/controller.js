const { User } = require("../../View/User.js");
const { DatabaseMongoose } = require("../../Repository/Repository");
const { Credential } = require("../../View/Credential");
const { JWTPayload } = require("../../View/Authentication.js");
async function login(req, resp) {
  const { username, password } = req.body;

  if (username == null || password == null || username == "" || password == "") {
    return resp.status(401).send("please send all required parameters");
  }

  const dbs = await new DatabaseMongoose();
  const user = await User.getUser(username);
  if (user == null) {
    return resp.status(401).send("Invalid Credentials");
  }
  if (!(await Credential.comparePassword(password, user.credential.password))) {
    return resp.status(401).send("Wrong password");
  }
  if (!user.isActive) {
    return resp.status(401).send("User not Active");
  }

  const newPayload = new JWTPayload(user);
  const newToken = newPayload.createToken();

  resp.cookie("myToken", newToken);

  resp.status(200).send(user);
}
module.exports = { login };
