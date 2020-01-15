import React, { useContext } from 'react'
import { TrailWrapper, TrailILink, TrailIcon, TrailItem } from './styles/trailWeb'
import { withRouter, Link } from 'react-router-dom'
import { getBreadcrumbs } from '../../../helpers/breadcrumbsGenerator'
import { ActiveTournamentContext } from '../../Courses/view/ActiveTournamentContext'
import { ActiveStaffContext } from '../../Timetable/view/ActiveStaffContext'
import { ANGLE_RIGHT_ICON_B } from '../../../styles/abstract/variables'

function TrailWeb({ location }) {
  const tournamentsContext = useContext(ActiveTournamentContext)
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
