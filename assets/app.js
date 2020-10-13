/*
 * Welcome to your app's main JavaScript file!
 *
 * We recommend including the built version of this JavaScript file
 * (and its CSS file) in your base layout (base.html.twig).
 */

// any CSS you import will output into a single css file (app.css in this case)
import React, { useState } from "react";
import "./styles/app.css";
import ReactDOM from "react-dom";
import Navbar from "./components/Navbar";
import { HashRouter, Switch, Route, withRouter } from "react-router-dom";
import ListMovie from "./pages/ListMovie";
import HomePage from "./pages/HomePage";
import Inscription from "./pages/Inscription";
import Connexion from "./pages/Connexion";
import authAPi from "./services/authAPi";
import authContext from "./contexts/authContext";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

/**
 * On appel la fonxtion setup au start de l'app
 */
authAPi.setup();

const App = () => {
  const [authenticated, setAuthenticated] = useState(authAPi.isAuthenticated());
  /**
   * On cree cette const pour que navbar est les memes propriete qu'une route (ex: history)
   */
  const NavbarWithRouter = withRouter(Navbar);
  
  return (
    <HashRouter>
      <NavbarWithRouter
        isAuthenticated={authenticated}
        onLogout={setAuthenticated}
      />

      <main className="container pt-5">
        <Switch>
          <Route
            path="/connexion"
            render={(props) => (
              <Connexion onLogin={setAuthenticated} {...props} />
            )}
          ></Route>
          <Route path="/inscription" component={Inscription}></Route>
          <Route path="/home" component={HomePage}></Route>
          <Route
            path="/list"
            render={(props) =>(
              <ListMovie  isAuthenticated={authenticated}/>
            )}
          ></Route>
        </Switch>
      </main>
      <ToastContainer position={toast.POSITION.TOP_LEFT} />
    </HashRouter>
  );
};

const rootElement = document.querySelector("#app");
ReactDOM.render(<App />, rootElement);
