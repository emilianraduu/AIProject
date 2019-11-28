import React, { useEffect, useContext } from "react";
import { getMovies } from "../movies/MoviesActions";
import { MoviesContext } from "../movies/MoviesContext";

export default function MoviesForm() {
  const moviesContext = useContext(MoviesContext);
  const {Search} = moviesContext.state
  useEffect(() => {
    getMovies(moviesContext);
    console.log(moviesContext.state);
  }, []);
  return (
      <>
      <input></input>
  {    Search && Search.map(movie=><>{movie.Title}</>)}
      </>
  );
}
