import styled from 'styled-components'
import {
  boxShadow,
  colorBlack12, colorBlack40, colorBlack60, colorFail, colorGreen, colorPrimary,
  colorSecondaryGradient,
  colorWhite, colorWhite02, fontSizeNormal,
  radiusX0, radiusX1,
  spacingO1, spacingX0, spacingX1, spacingX4
} from '../../../../styles/abstract/variables'

export const TourTable = styled.div`
  margin: 0 ${spacingX4} ${spacingX4} 0;
  position: relative;
  display:flex;
  flex-flow: column;
  width: 250px;
  ${({ mobile }) => mobile && `width:100%; max-width: 350px;`}
  ${({waiting})=> waiting && `margin: 0; margin-top: ${spacingX4}; align-self: center; `}
  ${({sticky})=>sticky && `position: sticky; top: 460px;`}
`

export const TourTableWrapper = styled.div`
  border: 1px solid ${colorBlack12};
  border-radius: ${radiusX1};
  background: ${colorWhite};
  position: relative;
  display:flex;
  flex-flow: column;
  box-shadow: ${boxShadow};
`

export const TourTableHeader = styled.div`
  padding: ${spacingX0};
  background: ${colorWhite02};
  display:flex;
  justify-content: space-between;
`

export const TourTableHeaderLeft = styled.div`
  display:flex;
  & > * {
    margin-right: 5px;
    align-self: center;
  }
`
export const TourTableHeaderRight = styled.div`
  position: relative;
  display:flex;
  & > * {
    align-self:center;
    
  }
  & i {
    color: ${colorBlack60};
    font-size: ${fontSizeNormal};
    cursor: pointer;
  }
`

export const TableMenu = styled.div`
  position: absolute;
  top: 100%;
  right: 0;
  display: none;
  z-index: 1;
  background: ${colorWhite};
  box-shadow: ${boxShadow};
  width: 100px;
  padding: ${spacingX1};
  border-radius: ${radiusX1};
  ${({ visible, top }) => {
  let style = ''
  if (visible) style += `display:block;`
  if (top) style += `top:0;`
  return style
}}   
`

export const TourTableContent = styled.div`
  height: 400px;
  overflow-y: scroll;
  overflow-x: hidden;
  border-radius: ${radiusX1};
  scroll-margin: 2px;
  ${({ mobile }) => mobile && `height: auto;`}
  ::-webkit-scrollbar {
     width: 3px;
     height: 13px;
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
    
`

export const TourTableStatus = styled.div`
    content: '';
    position:absolute;
    top: -8px;
    right:0;
    z-index:0;
    left:0;
    height: 20px;
    border-radius: ${radiusX1} ${radiusX1} 0 0;
    background: ${colorFail};
    ${({ open }) => open && `background: ${colorSecondaryGradient};`}
    ${({color})=>color && `background: ${color};`}
`

export const TablePlayerWrapper = styled.div`
  width:100%;
  display:flex;
  position: relative;
  padding: ${spacingO1};
  ${({ pointer }) => pointer && `cursor:pointer;`}
  ${({ active }) => active && `background: ${colorWhite02};`}
  ${({dealer})=> dealer && `background: ${colorBlack12}; border-bottom: 1px solid ${colorBlack40};`}
`

export const TableNumber = styled.div`
  display:flex;
  flex-flow: column;
  position: fixed;
  height: calc(100vh - 260px);
  overflow-y: scroll;
  
`

export const TableNumberScrollWrapper = styled.div`
 user-select: none;
 cursor: pointer;
  &:nth-child(n+1){
    margin-bottom: ${spacingX0};
  }
  ${({ checked }) => checked && `& > * {
  color: ${colorPrimary};
  font-size:${fontSizeNormal};`}
`

export const TableStatusWrapper = styled.div`
  position: relative;
  &:before{
  ${({ status }) => {
  if (status) return `background: ${colorGreen}`
  if (!status) return `background: ${colorFail}`
}}
    content: '';
    width: 4px;
    border-radius: ${radiusX0};
    height: 100%;
    position: absolute;
    left: 100%;
  }
  
`

export const CustomSwapWrapper = styled.div`
  display: flex;
  & > * {
    align-self:center;
  }
  & > i {
    margin-right: 5px;
    color: ${colorPrimary}
  }
`

export const SwapTag = styled.div`
  position: relative;
  display:flex;
  &:before {
    content: '';
    width: 5px;
    height: 5px;
    position: absolute;
    border-radius: 50%;
    align-self: center;
    background: ${colorPrimary};
    right: calc(100% + 5px);
  }


`