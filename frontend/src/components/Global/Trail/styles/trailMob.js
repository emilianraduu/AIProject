import styled from 'styled-components'
import {
  colorWhite,
  spacingX2,
  colorBlack80,
  fontSizeSmall,
  colorBlack60, fontSizeNormal, lineHeight, spacingO1, colorBlack12
} from '../../../../styles/abstract/variables'

export const TrailWrapper = styled.div`
  display: flex;
  z-index: 2;
  position: sticky;
  top: 119px;
  padding: ${spacingO1} ${spacingX2};
  background: ${colorWhite};
  justify-content: space-between;
  border-top: 1px solid ${colorBlack12};
  border-bottom: 1px solid ${colorBlack12};
  ${({active})=> active && `z-index: 1;`}
`

export const TrailLeft = styled.div`
  display:flex;
  align-self: center;
  color: ${colorBlack80};
  & * {
    align-self: center;
  }
`

export const TrailRight = styled.div`
  display: flex;
  align-self: center;
  & * {
    align-self: center;
  }
`

export const TrailSelect = styled.div`
  display:flex;
  font-size: ${fontSizeSmall};
  color: ${colorBlack60};
  
  &:hover {
    cursor: pointer;
    color: ${colorBlack80}
  }  
`

export const TrailBack = styled.div`
  font-size: ${fontSizeNormal};
  color: ${colorBlack60};
  font-weight: bold;
  display:flex;
  justify-content: center;
  & *{
    align-self: center;
  }
  line-height: ${lineHeight}
`

export const Overlay = styled.div`
    top:0;
    height: 100vh;
    width:0;
    z-index: 3;
    right:0;
    left:0;
    bottom: 0;
    overflow: hidden;
    position: fixed;
    transition: opacity 0.6s;
    background: black;
    opacity: 0;
    content: '';
    
    ${({ expanded }) => {
  if (expanded) {
    return `
        transition: opacity 0.5s;
        width: 100vw;
        opacity: 0.5;
        `

  }
}}
`