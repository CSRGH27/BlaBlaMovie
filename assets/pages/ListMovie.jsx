import React, { useEffect, useState } from "react";
import axios from "axios";

const ListMovie = () => {
  const [movies, setMovies] = useState([]);
  const [search, setSearch] = useState("");

  const handleChange = (e) => {
    setSearch(e.target.value);
  };
  const callSearchFunction = (e) => {
    e.preventDefault();
    search;
    axios
      .get("https://www.omdbapi.com/?apikey=ced60dbd&type=movie&s=" + search)
      .then((res) => {
        setMovies(res.data.Search);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  useEffect(() => {
    axios
      .get("https://www.omdbapi.com/?apikey=ced60dbd&type=movie&s=digital")
      .then((res) => res.data.Search)
      .then((data) => setMovies(data));
  }, []);

  return (
    <>
      <form className="form-inline my-2 my-lg-0" action="">
        <input
          type="text"
          value={search}
          className="form-control mr-sm-2"
          placeholder="Avengers..."
          onChange={handleChange}
        ></input>
        <button
          className="btn btn-secondary my-2 my-sm-0"
          type="submit"
          onClick={callSearchFunction}
        >
          Search
        </button>
      </form>
      <h1 className="text-red">Movies list</h1>
      <div className="grid_ctn">
        {movies ? (
          movies.map((movie) => (
            <div
              style={{ backgroundImage: `url(${movie.Poster})` }}
              key={movie.imdbID}
              className="card_movie"
            >
              <span className="title_movie">{movie.Title}</span>
            </div>
          ))
        ) : (
          <h2>Aucun resultat pour votre recherche...</h2>
        )}
      </div>
    </>
  );
};

export default ListMovie;
