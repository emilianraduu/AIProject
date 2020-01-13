import React from 'react'
import { AuthContext } from '../components/Auth/AuthContext'
import { useContext } from 'react'
import { WSCLIENT } from './ws-reconnect'
import { WS_URL } from '../config/constants'
import { TournamentsContext } from '../components/Tournaments/TournamentsContext'
import { ActiveTournamentContext } from '../components/Tournaments/view/ActiveTournamentContext'
import { ActiveStaffContext } from '../components/Staff/view/ActiveStaffContext'
import { ActivePlayerContext } from '../components/Players/view/ActivePlayerContext'
import { getTournament } from '../components/Tournaments/view/ActiveTournamentActions'
import { getPlayer } from '../components/Players/view/ActivePlayerActions'
import { getStaff } from '../components/Staff/view/ActiveStaffActions'

export function WsHandle({ authContext, tournamentsContext, activeTournamentContext, activeStaffContext, activePlayerContext }, { type, tournamentId, userId }) {
  switch (type) {
    case 'OPEN_TABLE':
    case 'CLOSE_TABLE':
    case 'UPDATE_TABLE':
    case 'UPDATE_TOURNAMENT':
    case 'PENDING_TOURNAMENT':
    case 'CLOSE_TOURNAMENT':
    case 'ADD_PLAYER_TOURNAMENT':
    case 'ADD_PLAYER_TABLE':
    case 'REMOVE_PLAYER_TABLE':
    case 'KICK_PLAYER_TABLE': {
      const activeTournamentId = activeTournamentContext.state.activeTournament && activeTournamentContext.state.activeTournament.id
      return activeTournamentId === tournamentId && getTournament(authContext, activeTournamentContext, tournamentId)
    }
    case 'UPDATE_USER': {
      const playerUserId = activePlayerContext.state.activePlayer && activePlayerContext.state.activePlayer.id
      if (playerUserId && playerUserId === userId) {
        return getPlayer(authContext, activePlayerContext, userId)
      }
      const staffUserId = activeStaffContext.state.activeStaff && activeStaffContext.state.activeStaff.id
      return staffUserId === userId && getStaff(authContext, activeStaffContext, userId)
    }
    default: {
      return false
    }
  }
}

const wsclient = new WSCLIENT(WS_URL, {
  retryCount: 1, // default is 2
  reconnectInterval: 1 // default is 5
})
wsclient.start()

export function WsConnect({ children }) {
  const authContext = useContext(AuthContext)
  const tournamentsContext = useContext(TournamentsContext)
  const activeTournamentContext = useContext(ActiveTournamentContext)
  const activeStaffContext = useContext(ActiveStaffContext)
  const activePlayerContext = useContext(ActivePlayerContext)

  function handler({ data }) {
    const message = JSON.parse(data)
    WsHandle({
      authContext,
      tournamentsContext,
      activeTournamentContext,
      activeStaffContext,
      activePlayerContext
    }, message)
  }

  const { loggedIn } = authContext.state
  if (loggedIn) {
    wsclient.socket.onmessage = handler
  }
  return (
    <>
      {children}
    </>
  )
}