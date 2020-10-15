import axios from "axios";
import { USER_URL_API } from "../config";

function findAll() {
  return axios
    .get(USER_URL_API)
    .then((response) => response.data["hydra:member"]);
}

export default {
  findAll,
};
