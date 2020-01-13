import React, { useContext } from 'react'
import { TrailWrapper, TrailILink, TrailIcon, TrailItem } from './styles/trailWeb'
import { withRouter, Link } from 'react-router-dom'
import { getBreadcrumbs } from '../../../helpers/breadcrumbsGenerator'
import { ActiveTournamentContext } from '../../Tournaments/view/ActiveTournamentContext'
import { ActiveStaffContext } from '../../Staff/view/ActiveStaffContext'
import { ActivePlayerContext } from '../../Players/view/ActivePlayerContext'
import { ANGLE_RIGHT_ICON_B } from '../../../styles/abstract/variables'

function TrailWeb({ location }) {
  const tournamentsContext = useContext(ActiveTournamentContext)
  const playersContext = useContext(ActivePlayerContext)
  const staffsContext = useContext(ActiveStaffContext)
  const uuidToName = {
    tournaments: {
      source: tournamentsContext.state,
      sourceProperty: 'activeTournament',
      properties: ['name']
    },
    cashgames: {
      source: tournamentsContext.state,
      sourceProperty: 'activeTournament',
      properties: ['name']
    },
    players: {
      source: playersContext.state,
      source2: tournamentsContext.state.activePlayer,
      sourceProperty: 'activePlayer',
      sourcePropertyInner: 'player',
      sourceProperty2: 'user',
      properties: ['firstName', 'lastName']
    },
    staff: {
      source: staffsContext.state,
      sourceProperty: 'activeStaff',
      properties: ['firstName', 'lastName']
    }
  }
  const { pathname } = location
  const breadcrumbs = getBreadcrumbs(pathname, uuidToName)
  return (
    <TrailWrapper>
      {
        breadcrumbs.map((breadcrumb, index) => {
          return <TrailItem key={index}>
            <TrailILink>
              <Link to={breadcrumb.path}>
                {breadcrumb.name}
              </Link>
            </TrailILink>
            <TrailIcon>
              <i className={ANGLE_RIGHT_ICON_B}/>
            </TrailIcon>
          </TrailItem>
        })
      }
    </TrailWrapper>
  )
}

export default withRouter(TrailWeb)
