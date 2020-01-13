import styled from 'styled-components'
import {
  colorBlack,
  colorPrimary,
  colorWhite,
  fontSizeSmaller,
  spacingX1,
  spacingX4,
  animationIn,
  timeFast
} from '../../../../styles/abstract/variables'

export const PaginatorWrapper = styled.div`
  display: flex;
  justify-content: flex-end;
  margin-top: ${spacingX4};

  & > ul {
    display: flex;
    & > li {
      width: 32px;
      height: 32px;
      display: flex;
      align-items: center;
      justify-content: center;
      border: 1px solid transparent;
      border-radius: 100%;
      margin: 0 ${spacingX1};
      &:hover {
        cursor: pointer;
        border-color: ${colorPrimary};
        transition: border-color ${timeFast} ${animationIn};
        & > a {
          color: ${colorPrimary};
          transition: color ${timeFast} ${animationIn};
        }
      }
  
      & > a {
        font-size: ${fontSizeSmaller};
        line-height: 1.5;
        color: ${colorBlack}; 
        padding: ${spacingX1};
        &:focus {
          outline: none;
        }
      }
              
      &.next, 
      &.previous {
        &:hover {
          border-color: transparent;
        }
      
        & > a {
          font-size: unset;
        }
      }
      
      &.selected {
        background-color: ${colorPrimary};
        & > a {
          color: ${colorWhite};
          font-weight: bold;
        }
      }
    }
  }
`