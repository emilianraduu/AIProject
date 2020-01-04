import React from "react";
import { FETCH_MOVIES_SUCCESS } from "./MoviesActions";

const initialState = {
  movies: []
};

const reducer = (state, action) => {
  switch (action.type) {
    case FETCH_MOVIES_SUCCESS:
      return {
        ...action.payload
      };
    default:
      return state;
  }
};

const MoviesContext = React.createContext();

function MoviesContextProvider(props) {
  const [state, dispatch] = React.useReducer(reducer, initialState);
  return (
    <MoviesContext.Provider value={{ state, dispatch }}>
      {props.children}
    </MoviesContext.Provider>
  );
}

const MoviesContextConsumer = MoviesContext.Consumer;

export { MoviesContext, MoviesContextProvider, MoviesContextConsumer };
