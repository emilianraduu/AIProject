import { PageContent } from '../../../styles/shared/wrapper'
import React from 'react'
import StaffCreateForm from './StaffCreateForm'

export default function StaffCreateWeb({ onSubmit, onCountriesScrollToBottom, onCitizenshipInputChange, countries, onCountriesInputChange, setProfilePicture }) {
  return (

    <PageContent type={'web'} flex>
      <StaffCreateForm
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
