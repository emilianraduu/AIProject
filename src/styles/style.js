import styled from 'styled-components'
import noPoster from '../components/assets/noPoster.png'
import { NO_POSTER } from '../config/constants'

export const colorBlue = '#4c638a'


export const PageWrapper = styled.div`
  display: flex;
  flex-flow: column;
  box-sizing: border-box;

`

export const PageHeader = styled.div`
  display: flex;
  width: 100vw;
  flex-flow:column;
  background: black;
  justify-content: center;
  box-sizing: border-box;
  position: fixed;
  z-index: 2;
  top: 0;
  left: 0;
  padding: 50px;
`

export const BigInput = styled.input`
  background: ${colorBlue};
  outline: none;
  height: 50px;
  width: 50%;
  border: 3px solid ${colorBlue};
  display: flex;
  justify-content: center;
  color: white;
  text-align: center;
  box-shadow: none;
  min-width: 300px;
  font-size: 1.8em;
  border-radius: 50px;
  &:focus{
    border: 3px solid white;
  }
  
`


export const CenteredInput = styled.div`
  display: flex;
  justify-content:center;
`

export const PageContent = styled.div`
  margin: 15px;
  margin-top: 180px;
  display: flex;
  flex-flow: column;
  flex: 1;
  box-sizing: border-box;
`


export const MovieWrapper = styled.div`
  display: flex;
  width: 100%;
  height: fit-content;
  flex-direction: column;
  position: relative;
`

export const MovieCardWrapper = styled.div`
  background: url(${noPoster});
  width: 300px;
  height: 500px;
  border-radius: 10px;
  margin: 10px;
  transition: 0.5s ease;
  cursor: pointer;
  &:hover{
    transform: scale(1.05);
    box-shadow: 0px 0px 29px 0px rgba(0,0,0,0.49);
  }
  ${({ url }) => url && url !== NO_POSTER && `background-image: url(${url});
    background-size: cover;
    background-repeat: no-repeat;
  `}
`

export const MovieInformationWrapper = styled.div`
  transition: 0.5s ease;
  max-height: 0;
  position: relative;
  width: 100%;
  overflow: hidden;
  ${({ enabled }) => enabled ? `
    height: auto;
    max-height: 700px;
    overflow-y: scroll;
    `
  : `max-height: 0`}

`

export const MoviePoster = styled.div`
  width: 300px;
  height: 500px;  
  background-size: cover;
  background-repeat: no-repeat;
  background: url(${noPoster});

  ${({ url }) => url && url !== NO_POSTER && `background: url(${url});`}
`

export const CloseWrapper = styled.div`
  position: absolute;
  color: white;
  right: 15px;
  cursor: pointer;
  font-size: 50px;
  display: flex;
  flex-flow: column;
  justify-content: center;
  top: 15px;
  &:hover{
    color: red;
  }
  ${({isMobile})=>isMobile && `right: 0; top: 7px;`}
`

export const InfoWrapper = styled.div`
  display: flex;
  color: white;
  ${({ isMobile }) => isMobile && `flex-flow: column;
  
  margin-bottom: 250px;
  `}
`

export const InfoRight = styled.div`
  margin-left: 15px;
`