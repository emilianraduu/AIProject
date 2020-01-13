import React, { useContext, useEffect } from 'react'
import moment from 'moment'
import { AuthContext } from '../../../Auth/AuthContext'
import { FestivalContext } from '../../../Festivals/FestivalContext'
import TournamentCreateForm from '../../create/TorunamentCreateForm'
import { PanelFooter, PanelClear } from '../../../Global/Filter/styles/filterMob'
import { SecondaryButton } from '../../../../styles/shared/button'
import { updateTournamentInfo } from '../ActiveTournamentActions'
import { ActiveTournamentContext } from '../ActiveTournamentContext'
import { fetchFestivals } from '../../../Festivals/FestivalActions'
import { tournamentTypes } from '../../listing/TournamentsListing'

export default function InfoForm({ onClose }) {
  const authContext = useContext(AuthContext)
  const tournamentsContext = useContext(ActiveTournamentContext)
  const { activeTournament } = tournamentsContext.state
  const festivalContext = useContext(FestivalContext)
  const { festivals } = festivalContext.state
  useEffect(() => {
    fetchFestivals({ authContext, festivalContext })
  }, [])
  const onSubmit = (values) => {
    let data = {
      ...values,
      status: values.status.value,
      festival: values.festival && values.festival.value
    }
    if (values.type) {
      data.type = values.type.value
    }
    updateTournamentInfo({
      data,
      successFunction: onClose,
      authContext,
      tournamentsContext
    })
  }

  const renderActions = ({ handleSubmit, pristine, invalid }) => (
    <PanelFooter>
      <PanelClear>
        <SecondaryButton type={'button'} rightMargin onClick={onClose}>
          Close
        </SecondaryButton>
        <SecondaryButton filled onClick={handleSubmit} disabled={pristine || invalid}>
          Apply
        </SecondaryButton>
      </PanelClear>
    </PanelFooter>
  )
  return (
    <TournamentCreateForm
      edit={true}
      onSubmit={onSubmit}
      initialValues={{
        name: activeTournament.name,
        description: activeTournament.description,
        dateTime: moment(activeTournament.dateTime).toDate(),
        festival: {
          value: activeTournament.festival.id,
          label: activeTournament.festival.name
        },
        receiptDescription: activeTournament.receiptDescription,
        status: { label: activeTournament.status, value: activeTournament.status }
      }}
      initialStatus={activeTournament.status}
      festivals={festivals}
      title='Edit info'
      renderActions={renderActions}
      tournamentTypes={tournamentTypes}
    />
  )
}
