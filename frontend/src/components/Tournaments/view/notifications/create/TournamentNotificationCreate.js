import React, { useContext } from 'react'
import { withRouter } from 'react-router-dom'
import { AuthContext } from '../../../../Auth/AuthContext'
import { createTournamentNotification } from '../../ActiveTournamentActions'
import { BrowserView, MobileView } from 'react-device-detect'
import TournamentNotificationCreateMobile from './TournamentNotificationCreateMobile'
import TournamentNotificationCreateWeb from './TournamentNotificationCreateWeb'
import { ActiveTournamentContext } from '../../ActiveTournamentContext'
import { tournamentRoutes } from '../../TournamentRouter'
import TrailMob from '../../../../Global/Trail/TrailMob'

export const NOTIFICATION_TYPES = ['all', 'tournament', 'staff']

function NotificationCreate({ history, match, type }) {
  const authContext = useContext(AuthContext)
  const tournamentsContext = useContext(ActiveTournamentContext)
  const { activeTournament: tournament } = tournamentsContext.state
  const { tournamentId } = match.params
  const onSubmit = (values) => {
    tournament.id && createTournamentNotification({
      authContext,
      tournamentsContext,
      tournamentId,
      data: { notification: { ...values, type: values.type.value, tournament: tournament.id } },
      history
    })
  }

  const breadcrumbAction = () => {
    history.push(`/${type}/${tournamentId}/notifications`)
  }
  return (
    <>
      {
        tournament &&
        <>
          <BrowserView>
            <TournamentNotificationCreateWeb
              onSubmit={onSubmit}
            />
          </BrowserView>
          <MobileView>
            <TrailMob
              title={'Back to notifications'}
              action={breadcrumbAction}
              routes={tournamentRoutes(type).slice().reverse()}
              noRight
            />
            <TournamentNotificationCreateMobile
              onSubmit={onSubmit}
            />
          </MobileView>
        </>
      }
    </>
  )
}

export default withRouter(NotificationCreate)
