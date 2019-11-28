import React from 'react'
import './App.css'
import { MoviesContextProvider } from './components/movies/MoviesContext'

import MoviesForm from './components/view/MoviesForm'

function App() {
  return (
    <>
      <link rel="stylesheet" href="https://fonts.googleapis.com/icon?family=Material+Icons"/>
      <MoviesContextProvider>
        <MoviesForm/>
      </MoviesContextProvider>
    </>
  )
}

export default App
