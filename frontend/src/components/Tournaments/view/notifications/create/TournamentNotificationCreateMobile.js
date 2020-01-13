import React from 'react'
import { PageContent } from '../../../../../styles/shared/wrapper'
import TournamentPlayerCreateForm from './TournamentNotificationCreateForm'

export default function NotificationCreateMobile({ onSubmit }) {

  return (
    <PageContent>
      <TournamentPlayerCreateForm
        onSubmit={onSubmit}
        type={'mobile'}
      />
    </PageContent>
  )
}