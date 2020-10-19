import React, { useEffect, useState } from "react";
import axios from "axios";
import { FAV_URL_API } from "../config";
const FavoriteMovies = () => {
  const [favoriteMovies, setfavoriteMovies] = useState([]);

  useEffect(() => {
    console.log("fbhedj");
    axios
      .get(FAV_URL_API)
      .then((response) => response.data["hydra:member"])
      .then((data) => setfavoriteMovies(data));
  }, []);

  return (
    <>
      <h1>Mes films Favoris</h1>
      <div className="grid_ctn">
        {favoriteMovies ? (
          favoriteMovies.map((movie) => (
            <div
              style={{ backgroundImage: `url(${movie.poster})` }}
              key={movie.id}
              className="card_movie"
            >
              <span className="title_movie">{movie.title}</span>
            </div>
          ))
        ) : (
          <h2>Pas de film favoris</h2>
        )}
      </div>
    </>
  );
};

export default FavoriteMovies;
