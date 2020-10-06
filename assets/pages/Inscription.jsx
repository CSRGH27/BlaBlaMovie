import React, { useState } from "react";
import axios from "axios";
import { useHistory } from "react-router-dom";
const Inscription = () => {
  const [user, setuser] = useState({
    username: "",
    password: "",
    passwordConfirm: "",
  });
  const [errors, seterrors] = useState({
    username: "",
    password: "",
    passwordConfirm: "",
  });

  const handleChange = ({ currentTarget }) => {
    const { name, value } = currentTarget;
    setuser({ ...user, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const apiErrors = {};
    if (user.password !== user.passwordConfirm) {
      apiErrors.passwordConfirm = "Vos mots de passe ne correspondent pas";
      seterrors(apiErrors);
      return;
    }

    try {
      await axios.post("https://localhost:8000/api/users", user);

      seterrors({});
    } catch (error) {
      if (error.response) {
        const { violations } = error.response.data;
        if (violations) {
          violations.forEach((violation) => {
            apiErrors[violation.propertyPath] = violation.message;
          });
          seterrors(apiErrors);
        }
      }
    }
  };

  return (
    <>
      <h1>Inscription</h1>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Username</label>
          <input
            type="text"
            className="form-control"
            name="username"
            placeholder="Votre jolie username"
            error={errors.username}
            value={user.username}
            onChange={handleChange}
          />
          <small id="emailHelp" className="form-text text-muted">
            {errors.username}
          </small>
        </div>
        <div className="form-group">
          <label>Mot de passe</label>
          <input
            type="password"
            className="form-control"
            name="password"
            placeholder="Votre mot de passe"
            error={errors.password}
            value={user.password}
            onChange={handleChange}
          />
          <small id="emailHelp" className="form-text text-muted">
            {errors.password}
          </small>
        </div>
        <div className="form-group">
          <label>Mot de passe</label>
          <input
            type="password"
            className="form-control"
            name="passwordConfirm"
            placeholder="Confirmation mot de passe"
            error={errors.passwordConfirm}
            value={user.passwordConfirm}
            onChange={handleChange}
          />
          <small id="emailHelp" className="form-text text-muted">
            {errors.passwordConfirm}
          </small>
        </div>
        <button type="submit" className="btn btn-primary">
          Inscription
        </button>
      </form>
    </>
  );
};

export default Inscription;
