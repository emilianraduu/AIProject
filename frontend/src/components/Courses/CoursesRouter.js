import React, { lazy, useContext } from 'react'
import { AuthContext } from '../Auth/AuthContext'

import { Switch } from 'react-router-dom'
import { PrivateRoute } from '../Global/PrivateRoute'

export const coursesRoutes = [
  {
    name: 'Courses',
    path: '/courses/create',
    component: lazy(() => import('./create/CourseCreate'))
  },
  {
    name: 'Courses',
    path: '/courses/:id',
    component: lazy(() => import('./CourseRouter'))
  },
  {
    name: 'Courses',
    path: '/courses',
    exact: true,
    component: lazy(() => import('./listing/CoursesListing'))
  }

]
export default function CoursesRouter () {
  const authContext = useContext(AuthContext)
  const { loggedIn } = authContext.state
  return (
    <>
      <Switch>
        {
          coursesRoutes.map((route, index) => (
            <PrivateRoute
              key={index} path={route.path}
              exact={route.exact}
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
