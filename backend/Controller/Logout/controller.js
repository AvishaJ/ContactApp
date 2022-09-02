function logout(req, resp) {
  resp.cookie("myToken", "none", {
    expires: new Date(Date.now() + 0 * 1000),
  });
  resp.status(200).send("Log out Successfull");
}
module.exports = { logout };
