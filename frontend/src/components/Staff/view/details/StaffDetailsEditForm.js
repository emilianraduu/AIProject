import React from 'react'
import moment from 'moment-timezone'
import { FormItem } from '../../../../styles/shared/form'
import { Label } from '../../../../styles/typography/typography'
import { Field, Form } from 'react-final-form'
import { FieldInput } from '../../../Global/Input/FieldInput'
import { FieldDatepicker } from '../../../Global/DatePickers/FieldDatePicker'
import { FieldSelect } from '../../../Global/Select/FieldSelect'
import _ from 'lodash'
import { InfiniteSelect } from '../../../Global/Select/InfiniteSelect'
import { DEBOUNCE_MS } from '../../../../config/constants'
import { PanelClear, PanelFooter } from '../../../Global/Filter/styles/filterMob'
import { SecondaryButton } from '../../../../styles/shared/button'
import { USER_GENDERS } from './StaffDetailsEdit'
import {nameRegex} from '../../../../config/constants'

const staffDetailsValidate = ({ identityNumber, identitySeries, identityValidity, firstName, lastName }) => {
  const errors = {}
  if (!identityNumber) {
    errors.identityNumber = 'Insert ID'
  }
  if (!identitySeries) {
    errors.identitySeries = 'Insert ID Series'
  }
  if (!firstName) {
    errors.firstName = 'Insert First Name'
  } else {
    if (!nameRegex.test(firstName)) {
      errors.firstName = 'Invalid Name'
    }
  }
  if (!lastName) {
    errors.lastName = 'Insert Last Name'
  } else {
    if (!nameRegex.test(lastName)) {
      errors.lastName = 'Invalid Name'
    }
  }
  return errors
}

const validityMax = () => {
  let currDate = new Date()
  let year = currDate.getFullYear()
  let month = currDate.getMonth()
  let day = currDate.getDate()
  return new Date(year + 10, month, day)
}

const birthDateMax = () => {
  let currDate = new Date()
  let year = currDate.getFullYear()
  let month = currDate.getMonth()
  let day = currDate.getDate()
  return new Date(year - 18, month, day)
}
const birthDateMin = () => {
  let currDate = new Date()
  let year = currDate.getFullYear()
  let month = currDate.getMonth()
  let day = currDate.getDate()
  return new Date(year - 100, month, day)
}

export default function StaffDetailsEditForm({ onSubmit, staff, onCountriesScrollToBottom, onCountriesInputChange, countries, mobile, onCitizenshipInputChange, onClose }) {
  return (
    <Form
      onSubmit={onSubmit}
      initialValues={
        {
          identityNumber: staff.identityNumber,
          identitySeries: staff.identitySeries,
          firstName: staff.firstName,
          lastName: staff.lastName,
          gender: staff.gender,
          birthDate: staff.birthDate && moment(staff.birthDate).toDate(),
          address: staff.address,
          country: staff.country && { value: staff.country.id, label: staff.country.name },
          citizenship: staff.citizenship && { value: staff.citizenship.id, label: staff.citizenship.name }
        }
      }
      validate={staffDetailsValidate}
      render={({ handleSubmit, pristine, invalid, values }) => (
        <form onSubmit={handleSubmit} style={{ display: 'flex', flexFlow: 'column' }}>
          <div style={{ paddingBottom: 25 }}>
            <FormItem>
              <Label upper>Identity number</Label>
              <Field component={FieldInput} name='identityNumber' disabled={true} placeholder={'Type identity number'}/>
            </FormItem>

            <FormItem>
              <Label upper>Series/No</Label>
              <Field component={FieldInput} name='identitySeries' placeholder={'Type Series/No'}/>
            </FormItem>

            <FormItem>
              <Label upper>Firstname</Label>
              <Field component={FieldInput} name='firstName' placeholder={'Type first name'}/>
            </FormItem>

            <FormItem>
              <Label upper>Lastname</Label>
              <Field component={FieldInput} name='lastName' placeholder={'Type last name'}/>
            </FormItem>

            <FormItem>
              <Label upper>Birth date</Label>
              <Field component={FieldDatepicker} yearCount={100} min={birthDateMin()} max={birthDateMax()} name='birthDate' mobile={mobile} placeholder={'Select Birth Date'}/>
            </FormItem>

            <FormItem>
              <Label upper>Gender</Label>
              <Field
                component={FieldSelect}
                placeholder='Select gender'
                options={USER_GENDERS.map(gender => ({ value: gender, label: _.startCase(gender) }))}
                name='gender'/>
            </FormItem>

            <FormItem>
              <Label upper>Citizenship</Label>
              <Field
                component={InfiniteSelect}
                placeholder='Select citizenship'
                onMenuScrollToBottom={onCountriesScrollToBottom}
                onInputChange={_.debounce((e) => {
                  e !== '' && onCitizenshipInputChange(e)
                }, DEBOUNCE_MS)}
                options={_.map(countries, country => ({ value: country.id, label: country.name }))}
                name='citizenship'
              />
            </FormItem>

            <FormItem>
              <Label upper>Country</Label>
              <Field
                component={InfiniteSelect}
                placeholder='Select country'
                onMenuScrollToBottom={onCountriesScrollToBottom}
                onInputChange={_.debounce((e) => {
                  e !== '' && onCountriesInputChange(e)
                }, DEBOUNCE_MS)}
                options={_.map(countries, country => ({ value: country.id, label: country.name }))}
                name='country'/>
            </FormItem>

            <FormItem>
              <Label upper>Address</Label>
              <Field component={FieldInput} name='address' placeholder={'Type address'}/>
            </FormItem>

            <PanelFooter>
              <PanelClear>
                <SecondaryButton type={'button'} rightMargin onClick={onClose}>
                  Close
                </SecondaryButton>
                <SecondaryButton filled onClick={handleSubmit} disabled={pristine || invalid}>
                  Apply
                </SecondaryButton>
              </PanelClear>
            </PanelFooter>
          </div>
        </form>
      )}/>
  )
}