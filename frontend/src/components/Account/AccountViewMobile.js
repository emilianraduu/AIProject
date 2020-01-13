import React from 'react'
import { PageContent } from '../../styles/shared/wrapper'
import AccountForm from './AccountForm'

export default function AccountViewMobile({ user, onSubmit, type, onCountriesScrollToBottom, onCitizenshipInputChange, countries, onCountriesInputChange, setProfilePicture, mobile, onImageUpload }) {
  return (
    <PageContent>
      <AccountForm
        onCitizenshipInputChange={onCitizenshipInputChange}
        onSubmit={onSubmit}
        countries={countries}
        onCountriesInputChange={onCountriesInputChange}
        onCountriesScrollToBottom={onCountriesScrollToBottom}
        onImageUpload={onImageUpload}
        user={user}
      />
    </PageContent>
  )
}