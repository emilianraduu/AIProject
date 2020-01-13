import React, { lazy, useContext } from 'react'
import { AuthContext } from '../Auth/AuthContext'

import { Switch } from 'react-router-dom'
import { PrivateRoute } from '../Global/PrivateRoute'

export const cashgameRoutes = [
  {
    name: 'Cash Game',
    path: '/cashgames/create',
    component: lazy(() => import('../Tournaments/create/wizzard/WizzardRouter'))
  },
  {
    name: 'Cash Game',
    path: '/cashgames/:tournamentId',
    component: lazy(() => import('./view/CashGameRouter'))
  },
  {
    name: 'Cash Games',
    path: '/cashgames',
    exact: true,
    component: lazy(() => import('../Tournaments/listing/TournamentsListing'))
  }

]

export default function CashGamesRouter () {
  const authContext = useContext(AuthContext)
  const { loggedIn } = authContext.state
  return (
    <Switch>
      {
        cashgameRoutes.map((route, index) => (
          <PrivateRoute
            key={index} path={route.path}
            exact={route.exact}
            allowed={!!loggedIn}
            redirectTo='/login'
            component={route.component}
            type='cashgames'
          />
        )
        )
      }
    </Switch>
  )
}
