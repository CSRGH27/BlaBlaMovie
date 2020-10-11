import React, { useEffect, useState } from "react";
import axios from "axios";
import Pagination from "../components/Pagination";

const ListMovie = (isAuthenticated) => {
    const [movies, setMovies] = useState([]);
    const [search, setSearch] = useState("digital");
    const [length, setlength] = useState('')
    const [currentPage, setcurrentPage] = useState('1')

    const handleChange = (e) => {
        setSearch(e.target.value);
    };


    /**
     * Gstion de la pagination
     * 
     * @param {number} page 
     */
    const handlePage =  (page) => {
        axios
            .get("https://www.omdbapi.com/?apikey=ced60dbd&type=movie&s=" + search + "&page=" + page)
            .then((res) => { 
                setMovies(res.data.Search);
                setcurrentPage(page);
            })
    }

    const callSearchFunction = (e) => {
        e.preventDefault();
        axios
            .get("https://www.omdbapi.com/?apikey=ced60dbd&type=movie&s=" + search + "&page=1" )
            .then((res) => {
                
                setMovies(res.data.Search);
                setcurrentPage(1)
            })
            .catch((error) => { });
    };

    useEffect(() => {
        axios
            .get("https://www.omdbapi.com/?apikey=ced60dbd&type=movie&s=" + search + "&page=" + currentPage)
            .then((res) => {
                setlength(res.data.totalResults)
                setMovies(res.data.Search)
            })

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
                            {!isAuthenticated ? (
                                <>
                                    <button type="button" class="btn btn-danger add_to_favorite">
                                        Ajouter a vos films favoris
                  </button>
                                </>
                            ) : (
                                    ""
                                )}

                            <span className="title_movie">{movie.Title}</span>
                        </div>
                    ))
                ) : (
                        <h2>Aucun resultat pour votre recherche...</h2>
                    )}
            </div>
            <Pagination length={length} currentPage={currentPage} onPageChange={handlePage} />
        </>
    );
};

export default ListMovie;
