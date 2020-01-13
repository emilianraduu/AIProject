import React, { useContext, useEffect } from 'react'
import _ from 'lodash'
import { CountriesContext } from '../../../Countries/CountriesContext'
import { applyCountriesFilter, changeCountriesPage, getCountries } from '../../../Countries/CountriesActions'
import { AuthContext } from '../../../Auth/AuthContext'
import StaffDetailsEditForm from './StaffDetailsEditForm'
import { PageContent } from '../../../../styles/shared/wrapper'
import { BigP } from '../../../../styles/typography/typography'

export const USER_GENDERS = ['male', 'female']

export default function StaffDetailsEdit({ staff, onSubmit, mobile, onClose }) {
  const countriesContext = useContext(CountriesContext)
  const authContext = useContext(AuthContext)
  let { countries, pagination, filters } = countriesContext.state
  countries = _.reduce(countries, (a, b) => a.concat(b), [])
  const { page, pageCount } = pagination
  useEffect(() => {
    getCountries(authContext, countriesContext, page, filters)
  }, [page, filters])

  const onCountriesScrollToBottom = () => {
    // page < pageCount && changeCountriesPage(countriesContext, { selected: page })
  }
  const onCountriesInputChange = (text) => {
    // applyCountriesFilter(countriesContext, {
    //   name: 'name',
    //   operator: 'like',
    //   value: `%${text}%`
    // })
  }
  const onCitizenshipInputChange = (text) => {
    applyCountriesFilter(countriesContext, {
      name: 'code',
      operator: 'like',
      value: `%${text}%`
    })
  }
  if (staff) {
    return (
      <StaffDetailsEditForm
        onClose={onClose}
        onSubmit={onSubmit}
        onCitizenshipInputChange={onCitizenshipInputChange}
        onCountriesInputChange={onCountriesInputChange}
        onCountriesScrollToBottom={onCountriesScrollToBottom}
        staff={staff}
        countries={countries}
      />
    )
  } else {
    return (
      <PageContent type={'web'} flex details>
        <BigP>ERROR</BigP>
      </PageContent>
    )
  }
}