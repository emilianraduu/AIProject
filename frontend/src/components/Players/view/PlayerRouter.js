import React, { lazy, useEffect, useContext } from 'react'
import { AuthContext } from '../../Auth/AuthContext'

import { Switch } from 'react-router-dom'
import { PrivateRoute } from '../../Global/PrivateRoute'
import { getPlayer } from '../view/ActivePlayerActions'
import { ActivePlayerContext } from './ActivePlayerContext'
import { isMobile } from 'react-device-detect'

export const playerRoutes = [
  {
    name: 'Statistics',
    path: '/players/:playerId/statistics',
    component: lazy(() => import('./statistics/PlayerStatisticsListing')),
    allowed: isMobile,
    redirectTo: './'
  },
  {
    name: 'History',
    path: '/players/:playerId/history',
    component: lazy(() => import('./histories/PlayerHistoriesListing')),
    allowed: isMobile,
    redirectTo: './'
  },
  {
    name: 'Details',
    path: '/players/:playerId',
    component: lazy(() => import('./details/PlayerDetails')),
    allowed: true
  }
]
export default function PlayerRouter ({ match }) {
  const authContext = useContext(AuthContext)
  const { loggedIn } = authContext.state
  const playersContext = useContext(ActivePlayerContext)
  const { playerId } = match.params
  useEffect(() => {
    loggedIn && getPlayer(authContext, playersContext, playerId)
  }, [playerId])
  return (
    <Switch>
      {
        playerRoutes.map((route, index) => (

          <PrivateRoute
            key={index} path={route.path}
            allowed={loggedIn && route.allowed}
            redirectTo={route.redirectTo ? route.redirectTo : '/login'}
            component={route.component}
          />
        )
        )
      }
    </Switch>
  )
}
