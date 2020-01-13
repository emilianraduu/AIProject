import React, { lazy } from 'react'
import { AuthContext } from '../Auth/AuthContext'
import { useContext } from 'react'
import { Switch } from 'react-router-dom'
import { PrivateRoute } from '../Global/PrivateRoute'

export const staffRoutes = [
  {
    name: 'Staff',
    exact:true,
    path: '/staff/create',
    component: lazy(() => import('./create/StaffCreate'))
  },
  {
    name: 'Staff',
    path: '/staff/:staffId',
    component: lazy(() => import('./view/StaffRouter'))
  },
  {
    name: 'Staff',
    path: '/staff',
    component: lazy(() => import('./listing/StaffsListing'))
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