import styled from 'styled-components'
import {
  spacingO1,
  colorWhite,
  boxShadow
} from '../abstract/variables'
import { SmallPBold } from '../typography/typography'
import { STATUS_CODES } from '../../components/Tournaments/listing/TournamentsListing'
import { TOURNAMENT_PLAYERS_STATUS } from '../../components/Tournaments/view/players/TournamentPlayersListing'

export const Tag = styled(SmallPBold)`
  text-transform: uppercase;
  position:relative;
  display:flex;
  flex-flow: row;
  height: fit-content;
  line-height: 2;
  word-break: keep-all;
  &:before{
    position: absolute;
    content: '';
    width: 10px;
    height: 10px;
    right: 100%;
    margin-right: ${spacingO1};
    border-radius: 50%;
    align-self: center;
  }
  // color: ${colorWhite};
  ${({ status, space }) => {
  let style = ''
  STATUS_CODES.map((code) => {
    if (status === code.name) {
      style += `color: ${code.color};`
      if (code.before) {
        style += `&:before{ background-color: ${code.color || '#000'};`
      }
    }
    return style
  })
  if (space) {
    style += `
  `
  }
  TOURNAMENT_PLAYERS_STATUS.map((code) => {
    if (status === code.name) {
      style += `color: ${code.color};`
      if (code.before) {
        style += `&:before{ background-color: ${code.color || '#000'};`
      }
    }
    return style
  })
  if (space) {
    style += `
  `
  }
  return style
}
}
    `
export const TagWrapper = styled.div`
  // background-color: ${colorWhite};
  display: flex;
  padding-left: 25px;
  padding-right: 7px;
  width: fit-content;
  // box-shadow: ${boxShadow};
  border-radius: 15px;
  line-height: 2;
  ${({ active, color, noShadow }) => {
  let style = ''
  let colorKey = ''
  if (noShadow) style += 'box-shadow: none;'
  STATUS_CODES.forEach((code) => {
    if (color === code.name) {
      colorKey += code.color
    }
  })
  style += `color: ${colorKey};`
  style += active === 'active' ? `background: ${colorKey}; & > * {  &:before{ background: white; } color:white;} box-shadow: none; border: 1px solid ${colorKey}` : ''
  style += active === 'non-active' ? `background: ${colorKey}; box-shadow: none; opacity: 0.5; border: 1px solid ${colorKey}` : ''

  return style
}
}
  `

export const NotificationTag = styled.div`
  display: flex;
  width: 100%;
  justify-content: space-between;
  
  ${({ mobile }) => mobile && `

  justify-content: flex-start;
  & > * {
    margin-right: ${spacingO1};
  }
`}
`

export const NotificationWrapper = styled.div`
  display:flex;
  flex-flow: column;
  & > * {
    margin-top: 5px;
  }
`
