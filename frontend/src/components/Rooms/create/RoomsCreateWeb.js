import { PageContent } from '../../../styles/shared/wrapper'
import React from 'react'
import RoomsCrateForm from './RoomsCrateForm'

export default function RoomsCreateWeb({ onSubmit, users }) {
  return (

    <PageContent type={'web'} flex>
      <RoomsCrateForm
        onSubmit={onSubmit}
        teachers={users}
        type={'web'}/>
    </PageContent>
  )
}
