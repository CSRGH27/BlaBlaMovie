import React, { useEffect, useState } from "react";
import axios from "axios";

const ListMovie = () => {
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    axios
      .get(
        "https://www.omdbapi.com/?apikey=ced60dbd&type=movie&s=digital&count=50"
      )
      .then((res) => res.data.Search)
      .then((data) => setMovies(data));
  }, []);
  console.log(movies);
  return (
    <>
      <h1 className="text-red">Movies list</h1>
      <div className="grid_ctn">
        {movies.map((movie) => (
          <div
            style={{ backgroundImage: `url(${movie.Poster})` }}
            key={movie.imdbID}
            className="card_movie"
          ></div>
        ))}
      </div>
    </>
  );
};

export default ListMovie;
