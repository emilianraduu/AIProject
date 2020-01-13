import React, { lazy } from 'react'
import { AuthContext } from '../Auth/AuthContext'
import { useContext } from 'react'
import { Switch } from 'react-router-dom'
import { PrivateRoute } from '../Global/PrivateRoute'

export const statisticRoutes = [
  {
    name: 'Statistics',
    path: '/statistics',
    component: lazy(() => import('./listing/StatisticsListing'))
  }
]
export default function StatisticsRouter() {
  const authContext = useContext(AuthContext)
  const { loggedIn } = authContext.state
  return (
    <Switch>
      {
        statisticRoutes.map((route, index) => (
            <PrivateRoute
              key={index} path={route.path}
              allowed={!!loggedIn}
              redirectTo={'/login'}
              component={route.component}
            />
          )
        )
      }
    </Switch>
  )
}