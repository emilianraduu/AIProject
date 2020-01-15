import { PageContent } from '../../../../styles/shared/wrapper'
import React from 'react'
import RoomsCrateForm from './RoomsCrateForm'

export default function RoomsCreateWeb({ onSubmit, onCountriesScrollToBottom, onCitizenshipInputChange, countries, onCountriesInputChange, setProfilePicture }) {
  return (

    <PageContent type={'web'} flex>
      <RoomsCrateForm
        onCitizenshipInputChange={onCitizenshipInputChange}
        onSubmit={onSubmit}
        countries={countries}
        setProfilePicture={setProfilePicture}
        onCountriesInputChange={onCountriesInputChange}
        onCountriesScrollToBottom={onCountriesScrollToBottom}
        type={'web'}/>
    </PageContent>
  )
}
