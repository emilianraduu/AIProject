import React from 'react'
import { CloseWrapper, InfoRight, InfoWrapper, MovieInformationWrapper, MoviePoster } from '../../styles/style'
import _ from 'lodash'
import Icon from '@material-ui/core/Icon'
import { isMobile } from "react-device-detect";

export default function HeaderMovieDetails({ isClicked, movie, setClicked, setMovie }) {
  return (
    <MovieInformationWrapper enabled={isClicked}  isMobile={isMobile}>
      <div style={{ marginTop: 40 }}>
        <InfoWrapper isMobile={isMobile}>
          <MoviePoster url={movie && movie.Poster}/>
          {
            movie &&
            <InfoRight>
              <h2>{movie.Title}</h2>
              <h3>{movie.Type}</h3>
              <h3>{movie.Year}</h3>
              <a href={`https://www.imdb.com/title/${movie.imdbID}`}>IMDB</a>
            </InfoRight>
          }

        </InfoWrapper>
        <CloseWrapper
          isMobile={isMobile}
          onClick={() => {
            setClicked(false)
            _.debounce(() => setMovie(), 500)
          }}>
          <Icon>cancel</Icon>
        </CloseWrapper>
      </div>
    </MovieInformationWrapper>
  )
}