import styled from 'styled-components'
import {
  colorBlack12, colorBlack40,
  colorBlack60, colorBlack80, colorBlack90, colorPrimary, colorPrimary50,
  colorWhite, fontSizeNormal,
  fontSizeSmall,
  lineHeight,
  spacingO1, spacingO2, spacingX0, spacingX1,
  spacingX2,
  realHeight,
  animationIn, timeFast, boxShadow, radiusX1
} from '../../../../styles/abstract/variables'
import { ButtonAction } from '../../../../styles/shared/button'

export const PanelWrapper = styled.div`
  display:flex;
  flex-flow: column;
  position: fixed;
  top:0;
  z-index:3;
  overflow: hidden;
  transition: 0.25s all ease;
  height: 100vh;
  height: ${realHeight};
  width: 0;
  background: white;
  right: 0;
  ${({ full }) => full && 'width: 100%'}
  ${({ left }) => left && 'left: 0; '}
  ${({ expanded }) => expanded && 'width:100%; '}
  ${({ web, visible }) => web && visible && 'width:40%;'}
  ${({ web, visible }) => !web && visible && 'width:100%;'}
  ${({ submenu }) => submenu && `
    position: absolute;
    width: 0;
    height: unset;
    top: calc(100% + 1px);
    transition: none;
    display: flex;
    box-shadow: ${boxShadow};
  `}
  ${({ submenu, expanded }) => submenu && expanded && 'width: fit-content;'}
`

export const PanelHeader = styled.div`
  display:flex;
  justify-content:space-between;
  align-items: center;
  padding: ${spacingX2}
  ${({ noBorder }) => noBorder ? '' : `border-bottom: 1px solid ${colorBlack12};`}

`

export const PanelContent = styled.div`
  
  display:flex;
  flex-flow: column;
  position: relative;
  height:92vh;
  overflow-y: scroll;
  overflow-x: hidden;
   ::-webkit-scrollbar {
     width: 3px;
     height: 13px;
    }
  }
  ::-webkit-scrollbar-track {
    background: none; 
    border-radius: ${radiusX1};
    border: solid 4px transparent;
    }
   ::-webkit-scrollbar-thumb {
      background: ${colorBlack12}; 
      border-radius: ${radiusX1};
      border: solid 4px transparent;
    }
  ${({ mobile }) => mobile && `
    overflow-y: scroll;
    height: calc(88vh - 53px);
  `}
`

export const PanelHead = styled.div`
  font-size: ${fontSizeNormal}
  font-weight: bold;
  color: ${colorBlack60};
  
  & > i {
    margin-right: ${spacingX0};
  }
`
export const PanelFooter = styled.div`
  // position: absolute;
  // bottom:0;
  width:100%;
  // background: ${colorBlack80};
  padding: ${spacingO1};
  align-self: flex-end;
`

export const PanelClear = styled.div`
  align-self: flex-end;
  display:flex;
  justify-content: flex-end;
`

export const PanelClose = styled.div`
  color: ${colorBlack40};
  font-size: 20px;
  &:hover {
    cursor: pointer;
    color: ${colorBlack90};
    transition: color ${timeFast} ${animationIn};
  }
`

export const PanelReset = styled.div`
  position: absolute;
  right: 10px;
  align-self: center;
  cursor: pointer;
  flex-flow: column;
  justify-content: center;
  display: flex;
  height: 100%;
  top: 0;
  & > * {
    align-self: center;
  }
  color:${colorBlack60};
  ${({ select, web }) => {
  let style = ''
  if (web) style += `bottom: 0; right:0;`
  if (select) style += `right: 56px;`
  if (web && select) style += `right: -20px;`
  return style
}}
  ${({rightMargin})=>rightMargin && `right: 10px`}
  ${({white})=>white && `color: #fff;`}
`

export const PanelTop = styled.div`
  display:flex;
  padding: ${spacingX2} 
  ${({ active }) => {
  if (active) {
    return `
        background: red;
    `
  }
}}
`

export const PanelElement = styled.div`
    text-transform: capitalize;
    display: flex;
    align-items: center;
    width: 100%;
    font-size: ${fontSizeNormal};
    line-height: ${lineHeight};
    color: ${colorBlack80};
    padding: ${spacingX1} ${spacingX2};
    &:before {
      content: '';
      display: block;
      width: ${spacingO2};
      height: ${spacingO2};
      background-color: ${colorBlack12};
      border: 1px solid: ${colorBlack40};
      border-radius: 100%;
      margin-right: ${spacingX1};
    }
    
    & > a {
      text-decoration: none;
      
    }
    
    ${({ active }) => active && `
      font-weight: bold;
      &:before {
        background-color: ${colorPrimary};
      }
    `}
`

export const PanelOrder = styled(ButtonAction)`
  background-color: transparent;
  border-color: ${colorBlack12};
  margin-right: ${spacingX1};
  & > label {
    color: ${colorBlack40};
  }
  & > input {
    display: none;
  }
  
  ${(props) => props.active && `
    background-color: ${colorPrimary50};
    border-color: ${colorPrimary};
    & > label {
      color: ${colorPrimary};
    }
  `}
`

export const PanelBottom = styled.div`
  display: flex;
  justify-content: space-between;
  margin-top: auto
  background-color: ${colorBlack80};
  padding: ${spacingX2};
  
  & > * {
    flex: 1;
  }
`

export const FilterMenuWrapper = styled.div`
  display: flex;
  z-index: 1;
  position: sticky;
  top: 119px;
  background: ${colorWhite};
  border-bottom: 1px solid ${colorBlack12};
  border-top: 1px solid ${colorBlack12};
  ${({ under }) => under && `top: 162px`}
  ${({ active }) => active && `z-index: 1;`}
`

export const Toggle = styled.div`
  flex: 1;
  padding: ${spacingO1} ${spacingX2}; 
  font-size: ${fontSizeSmall};
  line-height: ${lineHeight};
  font-weight: bold;
  text-transform: uppercase;
  color: ${colorBlack60};
  border-right: 1px solid ${colorBlack12};
`

export const FilterToggle = styled(Toggle)`
  display: flex;
  align-self: center;
  & * {
    align-self: center;
  }
`

export const SortToggle = styled(Toggle)`
  display:flex;
  align-self: center;
  & * {
    align-self: center;
  }
`
