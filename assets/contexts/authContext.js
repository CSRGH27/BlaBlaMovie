import React from "react";

// TODO Voir le context de react pour centraliser des donnes
/**
 * Ici on donne la forme de notre context voir react context
 */
export default React.createContext({
  isAuthenticated: false,
  setIsAuthenticated: (value) => {},
});
