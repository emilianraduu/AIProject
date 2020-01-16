import React, { lazy, useEffect, useContext } from 'react'
import { AuthContext } from '../Auth/AuthContext'

import { Switch } from 'react-router-dom'
import { PrivateRoute } from '../Global/PrivateRoute'
import { getCourse } from './ActiveCourseActions'
import { ActiveCourseContext } from './ActiveCourseContext'

export const courseRoutes = [
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
  const { courseId } = match.params
  // useEffect(() => {
  //   loggedIn && getCourse(authContext, tournamentsContext, courseId)
  // }, [courseId])
  return (
    <>
      <Switch>
        {
          courseRoutes.map((route, index) => (
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
