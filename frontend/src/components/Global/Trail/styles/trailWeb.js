import styled from 'styled-components'
import {
  colorWhite,
  colorWhite60,
  mainTypeface,
  fontSizeMedium,
  spacingX2,
} from '../../../../styles/abstract/variables'

export const TrailWrapper = styled.div`
  display: flex;
  align-items: center;
  & > * {
    &:last-child {
      & a {
        color: ${colorWhite};
        font-weight: bold;
        cursor: default;
      }
      
      & i {
        display: none;
      }
    }
  }
`

export const TrailItem = styled.div`
  display: flex;
  align-items: center;
`

export const TrailILink = styled.div`
  font-family: ${mainTypeface};
  font-size: ${fontSizeMedium};
  font-weight: 500;
  line-height: 1.5;
  color: ${colorWhite60};
  margin-right: ${spacingX2};

  & > a {
     color: ${colorWhite}
     text-decoration: none;
     text-transform: capitalize;
  }
`

export const TrailIcon = styled.span`
  color: ${colorWhite60};
  margin-right: ${spacingX2};

  ${(props) => {
  if (props.active) {
    return `color: ${colorWhite};`
  }
}}
`