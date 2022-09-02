import { useEffect, useState } from "react";
import axios from "axios";

async function IsAdminLoggedIn(username) {
  await axios
    .post(`http://localhost:8800/api/v1/isAdminLoggedIn/${username}`, {})
    .then((resp) => {
      return true;
    })
    .catch((error) => {
      return false;
    });
}
export default IsAdminLoggedIn;
