import React, { lazy } from 'react'
import { AuthContext } from '../Auth/AuthContext'
import { useContext } from 'react'
import { Switch } from 'react-router-dom'
import { PrivateRoute } from '../Global/PrivateRoute'

export const staffRoutes = [
  {
    name: 'Timetable',
    exact:true,
    path: '/timetable/create',
    component: lazy(() => import('../Courses/create/CourseCreate'))
  },
  {
    name: 'Timetable Edit',
    path: '/timetable/edit',
    component: lazy(() => import('./view/StaffRouter'))
  },
  {
    name: 'Timetable',
    path: '/timetable',
    component: lazy(() => import('./listing/TimetableListing'))
  }
]
export default function StaffsRouter() {
  const authContext = useContext(AuthContext)
  const { loggedIn } = authContext.state
  return (
    <Switch>
      {
        staffRoutes.map((route, index) => (
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