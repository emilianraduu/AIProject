import React from 'react'
import { PageContent } from '../../../styles/shared/wrapper'
import PlayerCreateForm from './UserCreateForm'

export default function PlayerCreateWeb ({ tournament, onCountriesScrollToBottom, onCitizenshipInputChange, onIdentityNumberInputChange, countries, onCountriesInputChange, user, setSecondPartOfForm, setFormInformations, formInformations, onSubmit, value, setValue }) {
  return (
    <PageContent type='web' flex>
      <PlayerCreateForm
        formInformations={formInformations}
        onCitizenshipInputChange={onCitizenshipInputChange}
        countries={countries}
        onSubmit={onSubmit}
        value={value}
        setValue={setValue}
        onIdentityNumberInputChange={onIdentityNumberInputChange}
        onCountriesInputChange={onCountriesInputChange}
        onCountriesScrollToBottom={onCountriesScrollToBottom}
        setSecondPartOfForm={setSecondPartOfForm}
        setFormInformations={setFormInformations}
        type='web'
        user={user}
      />
    </PageContent>
  )
}
