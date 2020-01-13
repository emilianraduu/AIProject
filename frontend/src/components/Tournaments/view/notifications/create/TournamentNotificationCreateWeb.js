import { PageContent } from '../../../../../styles/shared/wrapper'
import React from 'react'
import TournamentPlayerCreateForm from './TournamentNotificationCreateForm'

export default function NotificationCreateWeb({ onSubmit }) {
  return (

    <PageContent type={'web'} flex>
      <TournamentPlayerCreateForm
        onSubmit={onSubmit}
        type={'web'}
      />
    </PageContent>
  )
}
