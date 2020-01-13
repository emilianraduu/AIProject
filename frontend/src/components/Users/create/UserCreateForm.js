import React, { useContext, memo, useState, useEffect } from 'react'
import _ from 'lodash'
import { Field, Form } from 'react-final-form'
import moment from 'moment-timezone'
import Flag from 'react-world-flags'
import { createValidation } from '../UsersValidation'
import {
  BoxContent,
  BoxHeader,
  BoxWrapper,
  HeaderWithIcon,
  ProfileBoxLeft,
  ProfileBoxRight
} from '../../Global/Box/styles/box'
import {
  BigPBold,
  BigPGreyBold,
  Label,
  SmallP
} from '../../../styles/typography/typography'
import { DualFormWrapper, FormItem } from '../../../styles/shared/form'
import { FieldInput } from '../../Global/Input/FieldInput'
import CustomField from '../../Global/Input/CustomField'
import { FieldDatepicker } from '../../Global/DatePickers/FieldDatePicker'
import {
  FieldAsyncSelect,
  FieldSelect
} from '../../Global/Select/FieldSelect'
import { USER_GENDERS } from './UserCreate'
import { SecondaryButton } from '../../../styles/shared/button'
import { DEBOUNCE_MS } from '../../../config/constants'
import { ATM_CARD_ICON, FILE_ICON } from '../../../styles/abstract/variables'
import {
  birthDateMax,
  birthDateMin
} from '../../../helpers/validationHelpers'
import { CountriesContext } from '../../Countries/CountriesContext'
import { AuthContext } from '../../Auth/AuthContext'
import { UsersContext } from '../../Users/UsersContext'
import { TablePlayerWrapper } from '../../Tournaments/view/tables/style'
import { IDPhoto } from '../../../styles/shared/avatar'

export default memo(PlayerCreateForm)
const formatOptionLabel = ({
  value,
  label,
  firstName,
  lastName,
  identitySeries,
  seatNo,
  profileImage,
  country
}) => (
  <TablePlayerWrapper pointer>
    <div style={{ display: 'flex', width: '100%', marginRight: 5 }}>
      <div style={{ position: 'relative' }}>
        <ProfileBoxLeft small>
          <IDPhoto url={profileImage && profileImage.url} />
        </ProfileBoxLeft>
      </div>

      <ProfileBoxRight>
        <BigPBold>
          {firstName} {lastName}
        </BigPBold>
        <SmallP space>
          {country && (
            <>
              <Flag code={country.code} height={10} />
              {country.name}
            </>
          )}
        </SmallP>
      </ProfileBoxRight>
    </div>
  </TablePlayerWrapper>
)

export function PlayerCreateForm ({
  onCountriesScrollToBottom,
  onCitizenshipInputChange,
  countries,
  onCountriesInputChange,
  onIdentityNumberInputChange,
  type,
  formInformations,
  onSubmit,
  value,
  setValue
}) {
  const countriesContext = useContext(CountriesContext)
  // const authContext = useContext(AuthContext)
  const usersContext = useContext(UsersContext)

  const { playersOptions } = usersContext.state
  const { pagination } = countriesContext.state
  const { page, pageCount } = pagination

  const [ok, setOK] = useState(false)
  const [isDisabled, setDisabled] = useState(false)
  useEffect(() => {
    setOK(true)
    setValue({})
    setDisabled(false)
  }, [])

  // const getPlayersOptions = () => {
  //   const options =
  //     playersOptions &&
  //     playersOptions.map(user => {
  //       return {
  //         value: user.id,
  //         id: user.id,
  //         label: user.firstName,
  //         identityNumber: user.identityNumber,
  //         identitySeries: user.identitySeries,
  //         firstName: user.firstName,
  //         lastName: user.lastName,
  //         birthDate: user.birthDate,
  //         profileImage: user.profileImage,
  //         identityImage: user.identityImage,
  //         gender: user.gender,
  //         citizenship: user.citizenship,
  //         country: user.country,
  //         address: user.address
  //       }
  //     })
  //   return options
  // }

  return (
    <Form
      onSubmit={e => {
        onSubmit(e)
        setDisabled(true)
      }}
      keepDirtyOnReinitialize={ok}
      initialValues={
        value && {
          identityNumber: value.identityNumber,
          identitySeries: value.identitySeries,
          firstName: value.firstName,
          lastName: value.lastName,
          birthDate: value.birthDate && moment(value.birthDate).toDate(),
          gender: { value: value.gender, label: value.gender },
          citizenship: {
            value: value.citizenship && value.citizenship.id,
            label: value.citizenship && value.citizenship.demonym
          },
          country: value && {
            value: value.country && value.country.name,
            label: value.country && value.country.name
          },
          address: value.address
      }
      }
      validate={createValidation}
      render={({ handleSubmit, values }) => (
        <form onSubmit={handleSubmit}>
          <BoxWrapper web={type === 'web'} large={type === 'web'}>
            <BoxHeader>
              <HeaderWithIcon flex={1}>
                <i className={FILE_ICON} />
                <BigPGreyBold>Player details</BigPGreyBold>
              </HeaderWithIcon>
            </BoxHeader>
            <BoxContent>
              {/* <FormItem>
                <Label>Search Player</Label>
                <CustomField
                  component={FieldAsyncSelect}
                  onInputChange={onIdentityNumberInputChange}
                  options={getPlayersOptions()}
                  onChange={e => setValue(e)}
                  onBlur={() => {}}
                  formatOptionLabel={formatOptionLabel}
                  name='searchPlayer'
                  authContext={authContext}
                  usersContext={usersContext}
                  // onBlur={onIdentityNumberInputChange}
                />
              </FormItem> */}
              <FormItem>
                <Label>Identity number</Label>
                <CustomField
                  disabled={value.identityNumber}
                  component={FieldInput}
                  name='identityNumber'
                />
              </FormItem>
              <FormItem>
                <Label>Series/No</Label>
                <Field
                  component={FieldInput}
                  disabled={value.identitySeries}
                  name='identitySeries'
                />
              </FormItem>

              <DualFormWrapper mobile={type === 'mobile'}>
                <FormItem>
                  <Label>Firstname</Label>
                  <Field
                    component={FieldInput}
                    name='firstName'
                    disabled={value.firstName}
                  />
                </FormItem>
                <FormItem>
                  <Label>Lastname</Label>
                  <Field
                    component={FieldInput}
                    name='lastName'
                    disabled={value.lastName}
                  />
                </FormItem>
              </DualFormWrapper>
              <DualFormWrapper mobile={type === 'mobile'}>
                <FormItem>
                  <Label>Birth date</Label>
                  <Field
                    component={FieldDatepicker}
                    name='birthDate'
                    min={birthDateMin()}
                    disabled={value.birthDate}
                    max={birthDateMax()}
                    yearCount={100}
                  />
                </FormItem>
                <FormItem>
                  <Label>Gender</Label>
                  <Field
                    component={FieldSelect}
                    placeholder='Select gender'
                    isDisabled={!!value.gender}
                    options={USER_GENDERS.map(gender => ({
                      value: gender,
                      label: _.startCase(gender)
                    }))}
                    name='gender'
                  />
                </FormItem>
              </DualFormWrapper>
              <DualFormWrapper mobile={type === 'mobile'}>
                <FormItem>
                  <Label>Country</Label>
                  <Field
                    component={FieldSelect}
                    placeholder='Select country'
                    onMenuScrollToBottom={onCountriesScrollToBottom}
                    onInputChange={_.debounce(
                      onCountriesInputChange,
                      DEBOUNCE_MS
                    )}
                    handlePagination={onCountriesScrollToBottom}
                    pagination={{ page, pageCount }}
                    isDisabled={!!value.country}
                    options={countries.map(country => ({
                      value: country.id,
                      label: country.name
                    }))}
                    name='country'
                  />
                </FormItem>
                <FormItem>
                  <Label>Citizenship</Label>
                  <Field
                    component={FieldSelect}
                    placeholder='Select citizenship'
                    onMenuScrollToBottom={onCountriesScrollToBottom}
                    onInputChange={_.debounce(
                      onCitizenshipInputChange,
                      DEBOUNCE_MS
                    )}
                    options={countries.map(country => ({
                      value: country.id,
                      label: country.demonym
                    }))}
                    name='citizenship'
                    isDisabled={!!value.citizenship}
                    handlePagination={onCountriesScrollToBottom}
                    pagination={{ page, pageCount }}
                  />
                </FormItem>
              </DualFormWrapper>
              <FormItem>
                <Label>Address</Label>
                <Field
                  disabled={value.address}
                  component={FieldInput}
                  name='address'
                />
              </FormItem>
              <FormItem>
                <SecondaryButton disabled={isDisabled}>Confirm</SecondaryButton>
              </FormItem>
            </BoxContent>
          </BoxWrapper>
          {value.identityImage && (
            <BoxWrapper web={type === 'web'} large={type === 'web'}>
              <BoxHeader>
                <HeaderWithIcon flex={1}>
                  <i className={ATM_CARD_ICON} />
                  <BigPGreyBold>ID CARD</BigPGreyBold>
                </HeaderWithIcon>
              </BoxHeader>
              <BoxContent>
                <img src={value.identityImage.url} style={{ maxWidth: 550 }} />
              </BoxContent>
            </BoxWrapper>
          )}
        </form>
      )}
    />
  )
}
