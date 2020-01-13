import React, { lazy, useContext } from 'react'
import { AuthContext } from '../Auth/AuthContext'

import { Switch } from 'react-router-dom'
import { PrivateRoute } from '../Global/PrivateRoute'

export const tournamentRoutes = [
  {
    name: 'Tournaments',
    path: '/tournaments/create',
    component: lazy(() => import('./create/wizzard/WizzardRouter'))
  },
  {
    name: 'Cash Games',
    exact: true,
    path: '/cashgames/create',
    component: lazy(() => import('./create/TournamentCreate'))
  },
  {
    name: 'Tournament',
    path: '/tournaments/:tournamentId',
    component: lazy(() => import('./view/TournamentRouter'))
  },
  {
    name: 'Tournaments',
    path: '/tournaments',
    exact: true,
    component: lazy(() => import('./listing/TournamentsListing'))
  }

]
export default function TournamentsRouter () {
  const authContext = useContext(AuthContext)
  const { loggedIn } = authContext.state
  return (
    <>
      <Switch>

        {
          tournamentRoutes.map((route, index) => (
            <PrivateRoute
              key={index} path={route.path}
              exact={route.exact}
              allowed={!!loggedIn}
              redirectTo='/login'
              component={route.component}
              type='tournament'
            />
          )
          )
        }
      </Switch>
    </>

  )
}
