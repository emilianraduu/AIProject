import React, { lazy, useContext } from 'react'
import { AuthContext } from '../Auth/AuthContext'

import { Switch } from 'react-router-dom'
import { PrivateRoute } from '../Global/PrivateRoute'

export const playerRoutes = [

  {
    name: 'Register to tournament',
    path: '/users/register/:userId',
    exact: true,
    component: lazy(() => import('./register/UserView'))
  },
  {
    name: 'Create User',
    path: '/users/create',
    component: lazy(() => import('./create/UserCreate'))
  },
  {
    name: 'Users',
    path: '/users',
    component: lazy(() => import('./listing/UsersListing'))
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
