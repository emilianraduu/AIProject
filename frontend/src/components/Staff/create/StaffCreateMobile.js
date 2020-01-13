import React from 'react'
import { PageContent } from '../../../styles/shared/wrapper'
import StaffCreateForm from './StaffCreateForm'

export default function StaffCreateMobile({onSubmit,onCountriesScrollToBottom, pagination, onCitizenshipInputChange, countries,onCountriesInputChange, setProfilePicture}) {

  return (
    <PageContent>
      <StaffCreateForm
        onCitizenshipInputChange={onCitizenshipInputChange}
        onSubmit={onSubmit}
        countries={countries}
        setProfilePicture={setProfilePicture}
        pagination={pagination}
        onCountriesInputChange={onCountriesInputChange}
        onCountriesScrollToBottom={onCountriesScrollToBottom}
        mobile
      type={'mobile'}/>
    </PageContent>

  )
}