import React, { lazy, useEffect, useContext } from 'react'
import { AuthContext } from '../../Auth/AuthContext'

import { Switch } from 'react-router-dom'
import { PrivateRoute } from '../../Global/PrivateRoute'
import { getTournament } from '../view/ActiveTournamentActions'
import { ActiveTournamentContext } from './ActiveTournamentContext'

export const tournamentRoutes = (type) => [
  {
    name: 'Details',
    path: `/courses/:tournamentId`,
    component: lazy(() => import('./edit/RoomsCreate'))
  }
]

export const extraTournamentRoutes = (type) => [

]

const type = 'tournaments'
export const tourRoutes = tournamentRoutes(type)
export const extraTourRoutes = extraTournamentRoutes(type)
export default function TournamentRouter ({ match }) {
  const authContext = useContext(AuthContext)
  const { loggedIn } = authContext.state
  const tournamentsContext = useContext(ActiveTournamentContext)
  const { tournamentId } = match.params
  useEffect(() => {
    loggedIn && getTournament(authContext, tournamentsContext, tournamentId)
  }, [tournamentId])
  return (
    <>
      <Switch>
        {
          extraTourRoutes.map((route, index) => (
            <PrivateRoute
              key={index} path={route.path}
              allowed={!!loggedIn}
              redirectTo='/login'
              component={route.component}
              type={type}
            />
          )
          )
        }
        {
          tourRoutes.map((route, index) => (
            <PrivateRoute
              key={index} path={route.path}
              allowed={!!loggedIn}
              redirectTo='/login'
              component={route.component}
              type={type}
            />
          )
          )
        }
      </Switch>
    </>
  )
}
