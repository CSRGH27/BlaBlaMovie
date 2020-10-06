import React, { useState } from "react";
import axios from "axios";

const Connexion = () => {
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
        .post("https://127.0.0.1:8000/api/login_check", credentials)
        .then((response = response));
      seterror("");
      window.localStorage.setItem("authToken", token);
      //   On fill le header evec le token jwt
      axios.defaults.headers["Authorization"] = "Bearer" + token;
    } catch (error) {
      if (error.response) {
        seterror(
          "Aucun compte trouve ou les informations ne correspondent pas"
        );
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
