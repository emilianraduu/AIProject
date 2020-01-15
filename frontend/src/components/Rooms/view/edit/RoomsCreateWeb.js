import { PageContent } from '../../../../styles/shared/wrapper'
import React from 'react'
import CourseCrateForm from './RoomsCrateForm'

export default function CourseCreateWeb({ onSubmit, onCountriesScrollToBottom, onCitizenshipInputChange, countries, onCountriesInputChange, setProfilePicture }) {
  return (

    <PageContent type={'web'} flex>
      <CourseCrateForm
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
