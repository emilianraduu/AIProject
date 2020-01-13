import React from 'react'
import { PageContent } from '../../../styles/shared/wrapper'
import UserCreateForm from './UserCreateForm'

export default function PlayerCreateMobile ({ tournament, onCountriesScrollToBottom, onCitizenshipInputChange, onIdentityNumberInputChange, countries, page, pageCount, onCountriesInputChange, user, setSecondPartOfForm, setFormInformations, formInformations, onSubmit }) {
  return (
    <PageContent>
      <UserCreateForm
        onCitizenshipInputChange={onCitizenshipInputChange}
        countries={countries}
        onCountriesInputChange={onCountriesInputChange}
        page={page}
        pageCount={pageCount}
        onSubmit={onSubmit}
        onIdentityNumberInputChange={onIdentityNumberInputChange}
        onCountriesScrollToBottom={onCountriesScrollToBottom}
        setSecondPartOfForm={setSecondPartOfForm}
        formInformations={formInformations}
        type='mobile'
        setFormInformations={setFormInformations}
        user={user}
      />
    </PageContent>

  )
}
