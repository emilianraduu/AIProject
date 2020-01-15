import React, { lazy, useEffect } from 'react'
import { AuthContext } from '../../Auth/AuthContext'
import { useContext } from 'react'
import { Switch } from 'react-router-dom'
import { PrivateRoute } from '../../Global/PrivateRoute'
import { getStaff } from '../view/ActiveStaffActions'
import { ActiveStaffContext } from './ActiveStaffContext'
import { isMobile } from 'react-device-detect'

export const staffRoutes = [
  {
    name: 'History',
    path: '/staff/:staffId/history',
    component: lazy(() => import('./histories/StaffHistoriesListing')),
    allowed: isMobile,
    redirectTo: './'
  },
  {
    name: 'Details',
    path: '/staff/:staffId',
    component: lazy(() => import('./details/StaffDetails'))
  }
]
export default function StaffRouter({ match }) {
  const authContext = useContext(AuthContext)
  const { loggedIn } = authContext.state
  const staffsContext = useContext(ActiveStaffContext)
  const { staffId } = match.params
  useEffect(() => {
    loggedIn && getStaff(authContext, staffsContext, staffId)
  }, [staffId])
  return (
    <Switch>
      {
        staffRoutes.map((route, index) => (
            <PrivateRoute
              key={index} path={route.path}
              allowed={loggedIn && route.allowed}
              redirectTo={route.redirectTo ? route.redirectTo : '/login'}
              component={route.component}
            />
          )
        )
      }
    </Switch>
  )
}