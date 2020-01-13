import React from 'react'
import { PageContent } from '../../styles/shared/wrapper'
import AccountForm from './AccountForm'

export default function AccountViewWeb({ user, onSubmit, type, onCountriesScrollToBottom, onCitizenshipInputChange, countries, onCountriesInputChange, mobile, onImageUpload }) {


  return (
    <PageContent type={'web'} flex>
      <AccountForm
        onCitizenshipInputChange={onCitizenshipInputChange}
        onSubmit={onSubmit}
        countries={countries}
        onCountriesInputChange={onCountriesInputChange}
        onCountriesScrollToBottom={onCountriesScrollToBottom}
        onImageUpload={onImageUpload}
        user={user}
        type={'web'}/>
    </PageContent>
  )
}