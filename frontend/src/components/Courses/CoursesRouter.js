import React, { lazy, useContext } from 'react'
import { AuthContext } from '../Auth/AuthContext'

import { Switch } from 'react-router-dom'
import { PrivateRoute } from '../Global/PrivateRoute'

export const tournamentRoutes = [
  {
    name: 'Courses',
    path: '/courses/create',
    component: lazy(() => import('../Staff/create/StaffCreate'))
  },
  {
    name: 'Courses',
    path: '/courses/:tournamentId',
    component: lazy(() => import('./view/TournamentRouter'))
  },
  {
    name: 'Courses',
    path: '/courses',
    exact: true,
    component: lazy(() => import('./listing/TournamentsListing'))
  }

]
export default function CoursesRouter () {
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
