import React, { lazy, useEffect, useContext } from 'react'
import { AuthContext } from '../../Auth/AuthContext'

import { Switch } from 'react-router-dom'
import { PrivateRoute } from '../../Global/PrivateRoute'
import { getCourse } from './ActiveCourseActions'
import { ActiveCourseContext } from './ActiveCourseContext'

export const tournamentRoutes = [
  {
    name: 'Details',
    path: `/courses/:id`,
    component: lazy(() => import('./edit/CourseEdit'))
  }
]


export default function CourseRouter ({ match }) {
  const authContext = useContext(AuthContext)
  const { loggedIn } = authContext.state
  const tournamentsContext = useContext(ActiveCourseContext)
  const { tournamentId } = match.params
  useEffect(() => {
    loggedIn && getCourse(authContext, tournamentsContext, tournamentId)
  }, [tournamentId])
  return (
    <>
      <Switch>
        {
          tournamentRoutes.map((route, index) => (
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
    </>
  )
}
