import React, { useState, useContext } from 'react'
import { getMovies } from '../movies/MoviesActions'
import { MoviesContext } from '../movies/MoviesContext'
import {
  BigInput, CenteredInput,
  MovieWrapper,
  PageContent,
  PageHeader,
  PageWrapper
} from '../../styles/style'
import Masonry from 'react-masonry-component'
import MovieCard from './MovieCard'
import HeaderMovieDetails from './HeaderMovieDetails'

export default function MoviesForm() {
  const moviesContext = useContext(MoviesContext)
  const { Search } = moviesContext.state
  const [isClicked, setClicked] = useState(false)
  const [movie, setMovie] = useState()

  return (
    <PageWrapper>
      <PageHeader>
        <CenteredInput>
        <BigInput onChange={(e) => getMovies(moviesContext, e.target.value)} placeholder={'Type Your Request'}/>
        </CenteredInput>
        <HeaderMovieDetails isClicked={isClicked} setClicked={setClicked} movie={movie} setMovie={setMovie}/>
      </PageHeader>

      <PageContent>
        <MovieWrapper>
          <Masonry>
            {Search && Search.map((movie, index) =>
              <div key={index}>

              <MovieCard key={index} movie={movie} setClicked={setClicked} setMovie={setMovie}/>

              </div>
            )}
          </Masonry>

        </MovieWrapper>
      </PageContent>
    </PageWrapper>
  )
}
