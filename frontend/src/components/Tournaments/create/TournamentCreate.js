import React, { useEffect, useContext } from 'react'
import { BrowserView, MobileView } from 'react-device-detect'
import { withRouter } from 'react-router-dom'
import { AuthContext } from '../../Auth/AuthContext'
import { fetchFestivals } from '../../Festivals/FestivalActions'
import { FestivalContext } from '../../Festivals/FestivalContext'
import TournamentCreateWeb from './TournamentCreateWeb'
import TournamentCreateMobile from './TournamentCreateMobile'
import { tournamentRoutes } from '../view/TournamentRouter'
import TrailMob from '../../Global/Trail/TrailMob'

function TournamentCreate ({ history, type, match, onSubmit, initialValues, renderActions, steps }) {
  const authContext = useContext(AuthContext)
  // const wizzardContext = useContext(WizzardContext)
  const festivalContext = useContext(FestivalContext)
  const { festivals } = festivalContext.state
  useEffect(() => {
    fetchFestivals({ authContext, festivalContext })
  }, [])
  // const onSubmit = (values) => {
  //   customOnSubmit(values)
  //   const data = {
  //     // tournament: {
  //     ...values,
  //     type: TYPE_TO_FORM[type]
  //     // festival: values.festival.__isNew__ ? { name: values.festival.value } : values.festival.value
  //     // }
  //   }
  //   saveTournamentWizzardStep({ wizzardContext, data, type: 'step1' })
  //   // data.tournament.type = TYPE_TO_FORM[type]
  //   // createTournament({
  //   //   authContext,
  //   //   tournamentsContext,
  //   //   history,
  //   //   data,
  //   //   type: TOURNAMENT_TO_TOURNAMENTS[type]
  //   // })
  // }
  const breadcrumbAction = () => {
    history.push(`/${type}`)
  }
  return (
    <>
      <BrowserView style={{ marginTop: 18 }}>
        <TournamentCreateWeb
          initialValues={initialValues}
          onSubmit={onSubmit}
          festivals={festivals}
          type={type}
          steps={steps}
          match={match}
          renderActions={renderActions}

        />
      </BrowserView>
      <MobileView>
        <TrailMob
          title='Back to tournaments'
          action={breadcrumbAction}
          routes={tournamentRoutes(type).slice().reverse()}
          noRight
        />

        <TournamentCreateMobile
          onSubmit={onSubmit}
          initialValues={initialValues}
          steps={steps}
          match={match}
          festivals={festivals}
          type={type}
          renderActions={renderActions}
        />
      </MobileView>
    </>
  )
}

export default withRouter(TournamentCreate)
