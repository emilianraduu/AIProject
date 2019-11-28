import { API_URL, API_KEY } from "../../config/constants";

export const FETCH_MOVIES_SUCCESS = "FETCH_MOVIES_SUCCESS";
export const FETCH_MOVIES_FAIL = "FETCH_MOVIES_FAIL";
export const FETCH_MOVIES = "FETCH_MOVIES";
export const getMovies = async moviesContext => {
  moviesContext.dispatch({ type: FETCH_MOVIES });
  let response = await fetch(`${API_URL}?apikey=${API_KEY}&s=batman`).then((resp)=>resp.json());
  if (response) {
      moviesContext.dispatch({
        type: FETCH_MOVIES_SUCCESS,
        payload: response
      });
  }
};
