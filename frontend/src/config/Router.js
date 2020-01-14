import { Route, Switch, Redirect, BrowserRouter } from 'react-router-dom'
import React, { Suspense, lazy, useContext, useEffect } from 'react'
import Layout from '../components/Layout/Layout'
import LayoutAuth from '../components/Layout/LayoutAuth'
import { AuthContext } from '../components/Auth/AuthContext'
import { PrivateRoute } from '../components/Global/PrivateRoute'
import { getUser } from '../components/Auth/AuthActions'
import { WsConnect } from '../ws/WsConnect'
import { BrowserView, MobileView } from 'react-device-detect'
import HeaderWeb from '../components/Global/Header/HeaderWeb'
import HeaderMob from '../components/Global/Header/HeaderMob'
import getUserRoutes from './UserRoutes'

export const routes = [
  {
    name: 'Tournaments',
    path: '/tournaments',
    component: lazy(() => import('../components/Tournaments/TournamentsRouter'))
  },
  {
    name: 'Cash Games',
    path: '/cashgames',
    component: lazy(() => import('../components/CashGames/CashGamesRouter'))
  },
  {
    name: 'Staff',
    path: '/staff',
    component: lazy(() => import('../components/Staff/StaffsRouter'))
  },
  {
    name: 'Users',
    path: '/users',
    component: lazy(() => import('../components/Users/UsersRouter'))
  },
  {
    name: 'Archive',
    path: '/archive',
    component: lazy(() => import('../components/Tournaments/TournamentsRouter'))
  },
  {
    name: 'Statistics',
    path: '/statistics',
    component: lazy(() => import('../components/Statistics/StatisticsRouter'))
  }
]

export const extraRoutes = [
  {
    name: 'Login',
    path: '/login',
    component: lazy(() => import('../components/Auth/Login'))
  }
]

export const accountRoute = [
  {
    name: 'My Account',
    path: '/account',
    component: lazy(() => import('../components/Account/AccountView'))
  }
]

export default function Router() {
  const authContext = useContext(AuthContext)
  const { loggedIn, user } = authContext.state
  useEffect(() => {
    loggedIn && getUser(authContext)
  }, [loggedIn])
  console.log(user)
  return (
    <BrowserRouter>
      <WsConnect/>
      {
        loggedIn ? (
            <>
              <BrowserView>
                <HeaderWeb role={user && user.role}/>
                <RouterContent loggedIn={loggedIn} role={user && user.role}/>
              </BrowserView>
              {/* to do - on mobile a screen that shows a message that this website isnt available on mobile */}
              {/*<MobileView>*/}
              {/*  <HeaderMob/>*/}
              {/*  <RouterContent loggedIn={loggedIn} role={user && user.role}/>*/}
              {/*</MobileView>*/}
            </>)
          :
          (
            <>
              <BrowserView>
                <RouterContent loggedIn={loggedIn} role={user && user.role}/>
              </BrowserView>
              {/* to do - on mobile a screen that shows a message that this website isnt available on mobile */}
              {/*<MobileView>*/}
              {/*  <RouterContent loggedIn={loggedIn} role={user && user.role}/>*/}
              {/*</MobileView>*/}
            </>)
      }

    </BrowserRouter>
  )
}

export function RouterContent({ loggedIn, role }) {
  let selectedRoutesByRole = getUserRoutes(role)
  return (
    <Suspense fallback={<div/>}>
      <Switch>
        {
          selectedRoutesByRole.map((route, index) => (
              <PrivateRoute
                key={index} path={route.path}
                allowed={!!loggedIn}
                redirectTo='/login'
                render={(props) => (
                  <Layout {...props} Content={route.component}/>
                )}
              />
            )
          )
        }
        {
          accountRoute.map((route, index) => (
            <PrivateRoute
              key={index} path={route.path}
              allowed={!!loggedIn}
              redirectTo='/login'
              render={(props) => (
                <Layout {...props} Content={route.component}/>
              )}
            />
          ))
        }
        {
          extraRoutes.map((route, index) => (
            <PrivateRoute
              key={index} path={route.path}
              allowed={!loggedIn}
              redirectTo={role === 'register' ? '/users' : '/tournaments'}
              render={(props) => (
                <LayoutAuth {...props} Content={route.component}/>

              )}
            />
          ))
        }
        <Route path='' render={() => <Redirect to='/login'/>}/>
      </Switch>
    </Suspense>
  )
}
