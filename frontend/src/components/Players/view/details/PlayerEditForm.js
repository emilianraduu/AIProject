import React, { useContext, useEffect } from 'react'
import { FormItem } from '../../../../styles/shared/form'
import { Label } from '../../../../styles/typography/typography'
import { Field, Form } from 'react-final-form'
import { FieldInput } from '../../../Global/Input/FieldInput'
import { PanelClear, PanelFooter } from '../../../Global/Filter/styles/filterMob'
import { SecondaryButton } from '../../../../styles/shared/button'
import { FieldSelect } from '../../../Global/Select/FieldSelect'
import _ from 'lodash'
import CustomField from '../../../Global/Input/CustomField'
import { FieldDatepicker } from '../../../Global/DatePickers/FieldDatePicker'
import { USER_GENDERS } from '../../../Tournaments/view/players/create/firstPart/TournamentPlayerCreate'
import { InfiniteSelect } from '../../../Global/Select/InfiniteSelect'
import moment from 'moment-timezone'
import { applyCountriesFilter, changeCountriesPage, getCountries } from '../../../Countries/CountriesActions'
import { CountriesContext } from '../../../Countries/CountriesContext'
import { AuthContext } from '../../../Auth/AuthContext'
import { DEBOUNCE_MS, nameRegex } from '../../../../config/constants'
import { validityMax, birthDateMin, birthDateMax } from '../../../../helpers/validationHelpers'

const playerValidation = ({ email, identityNumber, identitySeries, identityValidity, firstName, lastName }) => {
  const errors = {}
  // if (!identityNumber) {
  //   errors.identityNumber = 'Insert ID'
  // }
  // if (!identitySeries) {
  //   errors.identitySeries = 'Insert ID Series'
  // }
  if (!firstName) {
    errors.firstName = 'Insert First Name'
  } else {
    if (firstName.length<3) {
      errors.firstName = 'Invalid Name'
    }
  }
  if (!lastName) {
    errors.lastName = 'Insert Last Name'
  } else {
    if (lastName.length<3) {
      errors.lastName = 'Invalid Name'
    }
  }
  return errors
}

export default function PlayerEditForm ({ onSubmit, onClose, player }) {
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
  return (
    <Form
      onSubmit={onSubmit}
      validate={playerValidation}
      initialValues={
        {
          email: player.email,
          // role: { value: player.role, label: _.startCase(player.role) },
          identityNumber: player.identityNumber,
          identitySeries: player.identitySeries,
          firstName: player.firstName,
          lastName: player.lastName,
          gender: player.gender,
          birthDate: player.birthDate && moment(player.birthDate).toDate(),
          address: player.address,
          country: player.country && { value: player.country.id, label: player.country.name },
          citizenship: player.citizenship && { value: player.citizenship.id, label: player.citizenship.code }
      }
      }
      render={({ handleSubmit, pristine, invalid, values }) => (
        <form onSubmit={handleSubmit} style={{ display: 'flex', flexFlow: 'column' }}>
          <div style={{ paddingBottom: 25 }}>

            <FormItem>
              <Label>Identity number</Label>
              <CustomField
                component={FieldInput}
                disabled
                name='identityNumber'
              />
            </FormItem>
            <FormItem>
              <Label>Series/No</Label>
              <Field
                component={FieldInput}
                name='identitySeries'
              />
            </FormItem>
            <FormItem>
              <Label>Firstname</Label>
              <Field
                component={FieldInput}
                name='firstName'
              />
            </FormItem>
            <FormItem>
              <Label>Lastname</Label>
              <Field
                component={FieldInput}
                name='lastName'
              />
            </FormItem>
            <FormItem>
              <Label>Birth date</Label>
              <Field
                min={birthDateMin()}
                max={birthDateMax()}
                component={FieldDatepicker}
                name='birthDate'
              />
            </FormItem>
            <FormItem>
              <Label>Gender</Label>
              <Field
                component={FieldSelect}
                placeholder='Select gender'
                options={USER_GENDERS.map(gender => ({ value: gender, label: _.startCase(gender) }))}
                name='gender'
              />
            </FormItem>
            <FormItem>
              <Label>Citizenship</Label>
              <Field
                component={InfiniteSelect}
                placeholder='Select citizenship'
                onMenuScrollToBottom={onCountriesScrollToBottom}
                onInputChange={_.debounce((e) => {
                  e !== '' && onCitizenshipInputChange(e)
                }, DEBOUNCE_MS)}
                options={countries.map(country => ({ value: country.id, label: country.code }))}
                name='citizenship'
              />
            </FormItem>
            <FormItem>
              <Label>Country</Label>
              <Field
                component={InfiniteSelect}
                placeholder='Select country'
                onMenuScrollToBottom={onCountriesScrollToBottom}
                onInputChange={_.debounce((e) => {
                  e !== '' && onCountriesInputChange(e)
                }, DEBOUNCE_MS)}
                options={_.map(countries, country => ({ value: country.id, label: country.name }))}
                name='country'
              />
            </FormItem>
            <FormItem>
              <Label>Address</Label>
              <Field component={FieldInput} name='address' />
            </FormItem>
            <PanelFooter>
              <PanelClear>
                <SecondaryButton type='button' rightMargin onClick={onClose}>
                  Close
                </SecondaryButton>
                <SecondaryButton filled onClick={handleSubmit} disabled={pristine || invalid}>
                  Apply
                </SecondaryButton>
              </PanelClear>
            </PanelFooter>
          </div>
        </form>
      )}
    />
  )
}
