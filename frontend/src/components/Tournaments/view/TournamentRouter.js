import React, { lazy, useEffect, useContext } from 'react'
import { AuthContext } from '../../Auth/AuthContext'

import { Switch } from 'react-router-dom'
import { PrivateRoute } from '../../Global/PrivateRoute'
import { getTournament } from '../view/ActiveTournamentActions'
import { ActiveTournamentContext } from './ActiveTournamentContext'

export const tournamentRoutes = (type) => [
  {
    name: 'Statistics',
    path: `/${type}/:tournamentId/statistics`,
    component: lazy(() => import('./statistics/TournamentStatisticsListing'))
  },
  {
    name: 'Reports',
    path: `/${type}/:tournamentId/reports`,
    component: lazy(() => import('./reports/TournamentReportsListing'))
  },
  {
    name: 'Audit',
    path: `/${type}/:tournamentId/audit`,
    component: lazy(() => import('../view/logs/TournamentLogsListing'))
  },
  {
    name: 'Players',
    path: `/${type}/:tournamentId/players`,
    component: lazy(() => import('../view/players/TournamentPlayersListing'))
  },
  {
    name: 'Notifications',
    path: `/${type}/:tournamentId/notifications`,
    component: lazy(() => import('./notifications/TournamentNotificationsListing'))
  },
  {
    name: 'Tables',
    path: `/${type}/:tournamentId/tables`,
    component: lazy(() => import('../view/tables/TournamentTablesListing'))
  },
  {
    path: `/${type}/:tournamentId/tv`,
    name: 'TV',
    component: lazy(() => import('../../../tv-module/MainScreen')),
    exact: true
  },
  {
    name: 'Details',
    path: `/${type}/:tournamentId`,
    component: lazy(() => import('./details/TournamentDetails'))
  }
]

export const extraTournamentRoutes = (type) => [
  {
    name: 'Add Notification',
    path: `/${type}/:tournamentId/notifications/create`,
    component: lazy(() => import('../view/notifications/create/TournamentNotificationCreate'))
  }
]

const type = 'tournaments'
export const tourRoutes = tournamentRoutes(type)
export const extraTourRoutes = extraTournamentRoutes(type)
export default function TournamentRouter ({ match }) {
  const authContext = useContext(AuthContext)
  const { loggedIn } = authContext.state
  const tournamentsContext = useContext(ActiveTournamentContext)
  const { tournamentId } = match.params
  useEffect(() => {
    loggedIn && getTournament(authContext, tournamentsContext, tournamentId)
  }, [tournamentId])
  return (
    <>
      <Switch>
        {
          extraTourRoutes.map((route, index) => (
            <PrivateRoute
              key={index} path={route.path}
              allowed={!!loggedIn}
              redirectTo='/login'
              component={route.component}
              type={type}
            />
          )
          )
        }
        {
          tourRoutes.map((route, index) => (
            <PrivateRoute
              key={index} path={route.path}
              allowed={!!loggedIn}
              redirectTo='/login'
              component={route.component}
              type={type}
            />
          )
          )
        }
      </Switch>
    </>
  )
}
