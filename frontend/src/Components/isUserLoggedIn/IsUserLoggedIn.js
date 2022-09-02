import { useEffect, useState } from "react";
import axios from "axios";

async function IsUserLoggedIn(username) {
  await axios
    .post(
      `http://localhost:8800/api/v1/isUserLoggedIn/${username.username}`,
      {}
    )
    .then((resp) => {
      return true;
    })
    .catch((error) => {
      return false;
    });
}
export default IsUserLoggedIn;
