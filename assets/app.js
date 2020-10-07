/*
 * Welcome to your app's main JavaScript file!
 *
 * We recommend including the built version of this JavaScript file
 * (and its CSS file) in your base layout (base.html.twig).
 */

// any CSS you import will output into a single css file (app.css in this case)
import React from "react";
import "./styles/app.css";
import ReactDOM from "react-dom";
import Navbar from "./components/Navbar";
import { HashRouter, Switch, Route } from "react-router-dom";
import ListMovie from "./pages/ListMovie";
import HomePage from "./pages/HomePage";
import Inscription from "./pages/Inscription";
import Connexion from "./pages/Connexion";
import authAPi from "./services/authAPi";

/**
 * On appel la fonxtion setup au start de l'app
 */
authAPi.setup();

const App = () => {
  return (
    <HashRouter>
      <Navbar />

      <main className="container pt-5">
        <Switch>
          <Route path="/connexion" component={Connexion}></Route>
          <Route path="/inscription" component={Inscription}></Route>
          <Route path="/home" component={HomePage}></Route>
          <Route path="/list" component={ListMovie}></Route>
        </Switch>
      </main>
    </HashRouter>
  );
};

const rootElement = document.querySelector("#app");
ReactDOM.render(<App />, rootElement);
// Need jQuery? Install it with "yarn add jquery", then uncomment to import it.
// import $ from 'jquery';
