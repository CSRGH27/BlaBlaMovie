import React, { useState } from "react";
import { useParams } from "react-router-dom/cjs/react-router-dom.min";
import axios from "axios";
const Inscription = () => {
  const [user, setuser] = useState({
    pseudo: "",
    password: "",
    passwordConfirm: "",
  });
  const [errors, seterrors] = useState({
    pseudo: "",
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
      const response = await axios.post(
        "https://localhost:8000/api/users",
        user
      );
      history.replace("/list");
      seterrors({});
    } catch (error) {
      const { violations } = error.response.data;
      if (violations) {
        const apiErrors = {};
        violations.forEach((violation) => {
          apiErrors[violation.propertyPath] = violation.message;
        });
        seterrors(apiErrors);
      }
    }
  };

  return (
    <>
      <h1>Inscription</h1>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Pseudo</label>
          <input
            type="text"
            className="form-control"
            name="pseudo"
            placeholder="Votre jolie pseudo"
            error={errors.pseudo}
            value={user.pseudo}
            onChange={handleChange}
          />
          <small id="emailHelp" className="form-text text-muted">
            {errors.pseudo}
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
