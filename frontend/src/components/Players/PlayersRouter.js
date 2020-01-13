import React, { lazy, useContext } from 'react'
import { AuthContext } from '../Auth/AuthContext'

import { Switch } from 'react-router-dom'
import { PrivateRoute } from '../Global/PrivateRoute'

export const playerRoutes = [
  {
    name: 'Player',
    path: '/players/:playerId',
    component: lazy(() => import('./view/PlayerRouter'))
  },
  {
    name: 'Players',
    path: '/players',
    component: lazy(() => import('./listing/PlayersListing'))
  }
]
export default function PlayersRouter () {
  const authContext = useContext(AuthContext)
  const { loggedIn } = authContext.state
  return (
    <Switch>
      {
        playerRoutes.map((route, index) => (
          <PrivateRoute
            key={index} path={route.path}
            allowed={!!loggedIn}
            redirectTo='/login'
            component={route.component}
          />
        )
        )
      }
    </Switch>
  )
}
