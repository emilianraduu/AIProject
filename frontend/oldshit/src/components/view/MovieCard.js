import React from 'react'
import { MovieCardWrapper} from '../../styles/style'

export default function MovieCard({ movie, setClicked, setMovie }) {
  return (
    <MovieCardWrapper url={movie.Poster} onClick={() => {
      setClicked(true)
      setMovie(movie)}
    }/>
  )
}
