import styled from 'styled-components'
import {
  secondaryTypeface,
  colorBlack60,
  radiusX0, colorBlack12, colorFail80, colorPrimary50, colorPrimary, colorWhite, boxShadow
} from '../../../styles/abstract/variables'

export const SelectWrapper = styled.div`
      .react-select__single-value{
        height:100%;
        display:flex;
        align-items:center;
      }
      .react-select__menu {
        z-index:333;
      }
    .react-select__control{
        border-radius: ${radiusX0};
        font-family: ${secondaryTypeface};
        font-size: 16px;
        color: ${colorBlack60};
        outline: none !important;
        height:41px;
        border: 1px solid ${colorBlack12};
        &:hover{
          border: 1px solid ${colorBlack12};
        }
        ${({ error }) => error && `border-bottom:1px solid ${colorFail80}`}
    }
    .css-1pahdxg-control{
        box-shadow: none;
    } 
    .react-select__input input {
      opacity: 1 !important;
    }
`

export const InfiniteSelectOption = styled.div`
  cursor: pointer;
  padding: 15px;
  border: 1px solid ${colorBlack12};
  border-radius:4px;
  margin-top:1px;
  &:hover{
    background: ${colorPrimary50};
  }
  ${({ active }) => active && `background: ${colorPrimary}; color:white;`}
`

export const InputModalWrapper = styled.div`
  position: fixed;
  top: 53px;
  display: flex;
  width: 100%;
  right: 0;
  box-sizing: border-box;
  box-shadow: ${boxShadow};
  background: ${colorWhite};
  padding: 10px;
`
