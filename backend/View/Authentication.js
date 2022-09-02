const jwt = require("jsonwebtoken");

class JWTPayload {
  static secratekey = "Password123";
  constructor(user) {
    this.username = user.credential.username;
    this.role = user.role;
    this.firstName = user.firstName;
    this.isActive = user.isActive;
  }
  createToken() {
    return jwt.sign(JSON.stringify(this), JWTPayload.secratekey);
  }
  static verifyCookie(token) {
    return jwt.verify(token, JWTPayload.secratekey);
  }
  static isValidUser(req, resp) {
    const myToken = req.cookies["myToken"];

    if (!myToken) {
      resp.status(401).send("Login required");
      return false;
    }

    const newPayload = JWTPayload.verifyCookie(myToken);

    if (!newPayload.isActive) {
      resp.status(400).send("User not active");
      return false;
    }
    if (newPayload.username != req.params.username) {
      resp.status(401).send("Unauthorized user");
      return false;
    }
    return true;
  }
  static isUserLoggedIn(req, resp) {
    const myToken = req.cookies["myToken"];

    if (!myToken) {
      resp.status(401).send("Login required");
      return false;
    }

    const newPayload = JWTPayload.verifyCookie(myToken);

    if (!newPayload.isActive) {
      resp.status(400).send("User not active");
      return false;
    }
    if (newPayload.username != req.params.username) {
      resp.status(401).send("Unauthorized user");
      return false;
    }
    resp.status(201).send("Valid user");
    return true;
  }

  static isAdminLoggedIn(req, resp) {
    // console.log(req.cookies["myToken"]);
    const myToken = req.cookies["myToken"];
    // console.log(myToken + "{}");
    if (!myToken) {
      resp.status(401).send("Login required");
      return false;
    }

    const newPayload = JWTPayload.verifyCookie(myToken);
    if (newPayload.role != "admin") {
      resp.status(401).send("Admin Login Required");
      return false;
    }

    if (newPayload.username != req.params.username) {
      resp.status(401).send("Unauthorized");
      return false;
    }
    resp.status(201).send("Valid user");
    return true;
  }
  static isValidAdmin(req, resp) {
    const myToken = req.cookies["myToken"];
    if (!myToken) {
      resp.status(401).send("Login required");
      return false;
    }

    const newPayload = JWTPayload.verifyCookie(myToken);
    if (newPayload.role != "admin") {
      resp.status(401).send("Admin Login Required");
      return false;
    }
    return true;
  }
}
module.exports = { JWTPayload };
