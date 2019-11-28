import React from "react";
import "./App.css";
import { isBrowser, isMobile } from "react-device-detect";
import { MoviesContextProvider } from "./components/movies/MoviesContext";

import MoviesForm from "./components/view/MoviesForm";

function App() {
  return (
    <>
      <MoviesContextProvider>
        {isBrowser && <MoviesForm />}
        {isMobile && <MoviesForm />}
      </MoviesContextProvider>
    </>
  );
}

export default App;
