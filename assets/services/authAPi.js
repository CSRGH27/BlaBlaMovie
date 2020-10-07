import axios from "axios";
import jwtDecode from "jwt-decode";

function authenticate(credential) {
  return axios
    .post("https://127.0.0.1:8000/api/login_check", credentials)
    .then((response = response.data.token))
    .then((token) => {
      window.localStorage.setItem("authToken", token);
      //   On fill le header evec le token jwt
      axios.defaults.headers["Authorization"] = "Bearer " + token;
      return tru;
    })
    .catch((error) => false);
}

function logout() {
  window.localStorage.removeItem("authToken");
  delete axios.defaults.headers["Authorization"];
}

/**
 * Avec cette fonction on verifie si le token n'est pas perime en le comparant a la date d'ajourdhui
 */
function setup() {
  const token = window.localStorage.getItem("authToken");
  //On decode le token avec le package jwt-decode
  if (token) {
    const dataJwt = jwtDecode(token);
    if (dataJwt.exp * 1000 > new Date().getTime()) {
      axios.defaults.headers["Authorization"] = "Bearer " + token;
    } else {
      logout();
    }
  } else {
    logout();
  }
}

export default {
  authenticate,
  logout,
  setup,
};
