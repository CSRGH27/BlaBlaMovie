import React from "react";
import { NavLink } from "react-router-dom";
import authAPi from "../services/authAPi";
import { toast } from "react-toastify";

const Navbar = ({ isAuthenticated, onLogout, history }) => {
  /**
   * Cette fonction appel la fonction de logout puis elle met a jour la props isAuthenticated a false (props passe dans app.js)
   */
  const handleLogout = () => {
    authAPi.logout();
    onLogout(false);
    toast.info("Vous etes desormais deconnecte ! 😎");
    history.push("/connexion");
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
      <a className="navbar-brand title-navbar" href="#/"></a>
      <div className="collapse navbar-collapse" id="navbarColor01">
        <ul className="navbar-nav mr-auto">
          <li className="nav-item active">
            <NavLink className="nav-link" to="/home">
              Classement des films
            </NavLink>
          </li>
          <li className="nav-item">
            <NavLink className="nav-link" to="/list">
              Liste des films
            </NavLink>
          </li>
          <li className="nav-item">
            <NavLink className="nav-link" to="/fav">
              Mes films favoris
            </NavLink>
          </li>
        </ul>
      </div>
      {!isAuthenticated ? (
        <>
          <NavLink to="/inscription" className="btn btn-secondary">
            Inscription
          </NavLink>
          <NavLink to="/connexion" className="btn btn-primary ml-1 ">
            Connexion
          </NavLink>
        </>
      ) : (
        <>
          <span>Bonjour {window.localStorage.getItem("username")}</span>
          <button onClick={handleLogout} className="btn btn-warning ml-1">
            Deconnexion
          </button>
        </>
      )}
    </nav>
  );
};

export default Navbar;
