import React, { useEffect } from 'react'
import { AuthContext } from '../../Auth/AuthContext'
import { useContext } from 'react'
import { Switch } from 'react-router-dom'
import { PrivateRoute } from '../../Global/PrivateRoute'
import { getTournament } from '../../Tournaments/view/ActiveTournamentActions'
import { ActiveTournamentContext } from '../../Tournaments/view/ActiveTournamentContext'
import { extraTournamentRoutes, tournamentRoutes } from '../../Tournaments/view/TournamentRouter'

const type = 'cashgames'
export const cashRoutes = tournamentRoutes(type)
export const extraCashRoutes = extraTournamentRoutes(type)
export default function CashGameRouter({ match }) {
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
          extraCashRoutes.map((route, index) => (
              <PrivateRoute
                key={index} path={route.path}
                allowed={!!loggedIn}
                redirectTo={'/login'}
                component={route.component}
                type={type}
              />
            )
          )
        }
        {
          cashRoutes.map((route, index) => (
              <PrivateRoute
                key={index} path={route.path}
                allowed={!!loggedIn}
                redirectTo={'/login'}
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