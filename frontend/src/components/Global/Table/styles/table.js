import styled from 'styled-components'
import {
  colorBlack12,
  colorBlack60,
  colorBlack80, colorPrimary,
  fontSizeNormal,
  fontSizeSmaller,
  lineHeight, spacingO2, spacingX3,
  animationOut,
  animationIn, timeFast, colorFail, colorWhite
} from '../../../../styles/abstract/variables'
import { P } from '../../../../styles/typography/typography'

export const TableWrapper = styled.div`
  width: 100%;
  position: relative;
  
  & a {
    text-decoration: none;
  }
`

export const TableHeader = styled.div`
  display: flex;
  justify-content: space-between;
  // margin-bottom: ${spacingX3};
  
  ${(props) => {
    if (props.hide) {
      return `display: none;`
    }
  }}
`

export const TableRow = styled.div`
  display: flex;
  justify-content: space-between;
  padding: ${spacingX3} 0;
  border-bottom: 1px solid ${colorBlack12};
  transition: border-bottom-color ${timeFast} ${animationOut};

  &:hover{
    cursor: pointer;
    border-bottom-color: ${colorPrimary};
    transition: border-bottom-color ${timeFast} ${animationIn};
  }
`

export const TableCell = styled.div`
  font-size: ${fontSizeNormal};
  color: ${colorBlack80};
  align-self: center;
  line-height: ${lineHeight};
  
  ${(props) => `flex-basis: ${props.widthBasis}%;`}
  ${(props) => props.bold && `font-weight: bold;`}}
  ${(props) => props.header && `
    font-size: ${fontSizeSmaller};
    text-transform: uppercase;
    color: ${colorBlack60};
  `}}
}}
`

export const EditWrapper = styled.div`
  display: flex;
  position: absolute;
  right: 0px;
  align-self: center;
  z-index:10;
  &:hover{
    color: ${colorWhite};
    background: ${colorFail};
  }
`



export const TableFilter = styled.div`
    display: inline-block;
    padding: ${spacingO2} 0;

    ${(props) => props.active && `
      font-weight: bold;
      color: ${colorPrimary};
      `
  }}
  ${({ sortable }) => sortable && `&:hover {
    cursor: pointer;
    color: ${colorPrimary};
    transition: color ${timeFast} ${animationIn};
  }`}
    
`

export const TableSubHeader = styled(P)`
    font-weight: bold;
    color: ${colorBlack60};
    margin-top: ${spacingX3};

`