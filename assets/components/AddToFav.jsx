import React, { useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { FAV_URL_API } from "../config";

const AddToFav = ({ title, poster, id }) => {
  const [favoriteMovie, setfavoriteMovie] = useState({
    poster: poster,
    title: title,
    idmovie: id,
  });
  const token = window.localStorage.getItem("authToken");
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      axios.defaults.headers["Authorization"] = "Bearer " + token;
      await axios.post(FAV_URL_API, favoriteMovie);
      toast.success(
        "Le film " + favoriteMovie.title + " a bien ete ajoute a vos favoris"
      );
    } catch (error) {
      console.log(error.response);
      if (error.response) {
        const { violations } = error.response.data;
        if (violations) {
          violations.forEach((violation) => {
            toast.error(violation.message);
          });
        } else {
          toast.error("Oh une erreur est survenu ! 🙁");
        }
      }
    }
  };

  return (
    <>
      <form onSubmit={handleSubmit}>
        <button type="submit" className="btn btn-primary">
          Ajouter aux favoris
        </button>
      </form>
    </>
  );
};

export default AddToFav;
