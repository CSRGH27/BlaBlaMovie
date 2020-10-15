import React, { useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { LOG_URL_API } from "../config";

const Connexion = ({ onLogin, history }) => {
  const [credentials, setcredentials] = useState({
    username: "",
    password: "",
  });

  const [error, seterror] = useState("");

  const handleChange = (e) => {
    const value = e.currentTarget.value;
    const name = e.currentTarget.name;

    setcredentials({ ...credentials, [name]: value });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios
        .post(LOG_URL_API, credentials)
        .then((response) => response.data.token)
        .then((token) => {
          seterror("");
          window.localStorage.setItem("authToken", token);
          window.localStorage.setItem("username", credentials.username);
          let username = window.localStorage.getItem("username");
          //   On fill le header evec le token jwt
          axios.defaults.headers["Authorization"] = "Bearer " + token;
          onLogin(true);
          history.replace("/list");
          toast.success(
            "Bonjour " + username + " vous etes maintenant connecte ! 😎"
          );
        });
    } catch (error) {
      if (error.response) {
        seterror(
          "Aucun compte trouve ou les informations ne correspondent pas"
        );
        toast.error("Une erreur est survenue ! 😵");
      }
    }
  };

  return (
    <>
      <h1>Connexion</h1>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="username"></label>
          <input
            value={credentials.username}
            onChange={handleChange}
            id="username"
            className={"form-control" + (error && " is-invalid")}
            placeholder="Votre username"
            name="username"
            type="text"
          />
          {error && <p className="invalid-feedback">{error}</p>}
        </div>
        <div className="form-group">
          <label htmlFor="password"></label>
          <input
            value={credentials.password}
            onChange={handleChange}
            id="password"
            className={"form-control" + (error && " is-invalid")}
            placeholder="Votre mot de passe"
            name="password"
            type="password"
          />
          {error && <p className="invalid-feedback">{error}</p>}
        </div>
        <div className="form-group">
          <button className="btn btn-success" type="submit">
            Connexion
          </button>
        </div>
      </form>
    </>
  );
};

export default Connexion;
