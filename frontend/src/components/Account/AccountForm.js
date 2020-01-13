import React, { useState, useContext } from 'react'
import moment from 'moment-timezone'
import {
  DualBoxWrapper,
  DualFormWrapper,
  FormItem, FormWithToggle,
  StaffFormFooter,
  StaffFormWrapper,
  StyledToggle
} from '../../styles/shared/form'
import { BoxContent, BoxHeader, BoxWrapper, ContentText, HeaderWithIcon } from '../Global/Box/styles/box'
import { BigPGreyBold, Label, LabelArrow } from '../../styles/typography/typography'
import { Field, Form } from 'react-final-form'
import { FieldInput } from '../Global/Input/FieldInput'
import { FieldDatepicker } from '../Global/DatePickers/FieldDatePicker'
import { FieldSelect } from '../Global/Select/FieldSelect'
import { USER_GENDERS } from '../Staff/create/StaffCreate'
import _ from 'lodash'
import { InfiniteSelect, PickerSelect } from '../Global/Select/InfiniteSelect'
import { DEBOUNCE_MS } from '../../config/constants'
import { AvatarBig } from '../../styles/shared/avatar'
import { SecondaryButton } from '../../styles/shared/button'
import {
  ARROW_UP_ICON,
  colorBlack12,
  colorPrimary,
  FILE_ICON,
  KEYHOLE_SQUARE_ICON
} from '../../styles/abstract/variables'
import { emailRegex } from '../../config/constants'
import { CountriesContext } from '../Countries/CountriesContext'

export const accountFormValidation = ({ email }) => {
  const errors = {}
  if (email) {
    if (!emailRegex.test(email)) {
      errors.email = 'Invalid Email'
    }
  }
  return errors
}


export default function AccountForm({ user, onSubmit, type, onCountriesScrollToBottom, onCitizenshipInputChange, countries, onCountriesInputChange, setProfilePicture, mobile, onImageUpload }) {
  const [emailToggle, setEmailToggle] = useState(false)
  const [passwordToggle, setPasswordToggle] = useState(false)
  const countriesContext = useContext(CountriesContext)
  const { pagination } = countriesContext.state

  return (
    <Form
      onSubmit={onSubmit}
      // validate={createValidation}
      initialValues={{
        email: user.email,
        identityNumber: user.identityNumber,
        identitySeries: user.identitySeries,
        firstName: user.firstName,
        lastName: user.lastName,
        gender: user.gender,
        birthDate: user.birthDate && moment(user.birthDate).toDate(),
        address: user.address,
        country: user.country && { value: user.country.id, label: user.country.name },
        citizenship: user.citizenship && { value: user.citizenship.id, label: user.citizenship.code }
      }}
      validate={accountFormValidation}
      render={({ handleSubmit }) => (
        <form onSubmit={handleSubmit}>
          <StaffFormWrapper>
            <DualBoxWrapper web={type === 'web'}>
              <BoxWrapper web={type === 'web'} large={type === 'web'}>
                <BoxHeader>
                  <HeaderWithIcon flex>
                    <i className={FILE_ICON} />
                    <BigPGreyBold>Legal details</BigPGreyBold>
                  </HeaderWithIcon>
                </BoxHeader>
                <BoxContent>
                  <FormItem>
                    <Label>Identity number</Label>
                    <Field component={FieldInput} name='identityNumber' disabled={true} />
                  </FormItem>
                    <FormItem>
                      <Label>Series/No</Label>
                      <Field component={FieldInput} name='identitySeries' placeholder={'Type Series/No'} />
                    </FormItem>

                  <DualFormWrapper mobile={type === 'mobile'}>
                    <FormItem>
                      <Label>Firstname</Label>
                      <Field component={FieldInput} name='firstName' placeholder={'Type first name'} />
                    </FormItem>
                    <FormItem>
                      <Label>Lastname</Label>
                      <Field component={FieldInput} name='lastName' placeholder={'Type last name'} />
                    </FormItem>
                  </DualFormWrapper>
                  <DualFormWrapper mobile={type === 'mobile'}>
                    <FormItem>
                      <Label>Birth date</Label>
                      <Field component={FieldDatepicker} name='birthDate' mobile={mobile}
                        placeholder={'Select Birth Date'} />
                    </FormItem>
                    <FormItem>
                      <Label>Gender</Label>
                      <Field
                        component={FieldSelect}
                        placeholder='Select gender'
                        options={USER_GENDERS.map(gender => ({ value: gender, label: _.startCase(gender) }))}
                        name='gender' />
                    </FormItem>
                  </DualFormWrapper>
                  <DualFormWrapper mobile={type === 'mobile'}>
                    <FormItem>
                      <Label>Citizenship</Label>
                      <Field
                        component={InfiniteSelect}
                        placeholder='Select citizenship'
                        handlePagination={onCountriesScrollToBottom}
                        pagination={pagination}
                        onMenuScrollToBottom={onCountriesScrollToBottom}
                        onInputChange={_.debounce((e) => e !== '' && onCitizenshipInputChange(e), DEBOUNCE_MS)}
                        options={countries.map(country => ({ value: country.id, label: country.code }))}
                        name='citizenship'
                      />
                    </FormItem>
                    <FormItem>
                      <Label>Country</Label>
                      <Field
                        component={InfiniteSelect}
                        placeholder='Select country'
                        handlePagination={onCountriesScrollToBottom}
                        pagination={pagination}
                        onMenuScrollToBottom={onCountriesScrollToBottom}
                        onInputChange={_.debounce((e) => e !== '' && onCountriesInputChange(e), DEBOUNCE_MS)}
                        options={countries.map(country => ({ value: country.id, label: country.name }))}
                        name='country' />
                    </FormItem>
                  </DualFormWrapper>
                  <FormItem>
                    <Label>Address</Label>
                    <Field component={FieldInput} name='address' placeholder={'Type address'} />
                  </FormItem>
                </BoxContent>
              </BoxWrapper>


              <BoxWrapper web={type === 'web'}>
                <BoxHeader>
                  <HeaderWithIcon flex>
                    <i className={KEYHOLE_SQUARE_ICON} />
                    <BigPGreyBold>Account</BigPGreyBold>
                  </HeaderWithIcon>
                </BoxHeader>
                <BoxContent>
                  <FormItem image fitContent>
                    <AvatarBig name='profilePicture' id='profilePicture'
                      url={user && user.profileImage && user.profileImage.url} left />
                    <input type={'file'} name='profilePictureUpload' id='profilePictureUpload'
                      onChange={(e) => onImageUpload(e)} />
                    <LabelArrow htmlFor='profilePictureUpload'><i className={ARROW_UP_ICON} />
                    </LabelArrow>
                  </FormItem>
                  <FormItem>
                    <FormWithToggle>
                      <Label>Email</Label>
                      <StyledToggle>
                       
                      </StyledToggle>
                    </FormWithToggle>
                    <Field autocomplete="off" disabled={!emailToggle} component={FieldInput} name='email' />
                  </FormItem>
                  <FormItem>
                    <FormWithToggle>
                      <Label>Password</Label>
                      <StyledToggle>
                      
                      </StyledToggle>
                    </FormWithToggle>
                    <Field autocomplete="off" disabled={!passwordToggle} type={'password'} component={FieldInput}
                      name='password' />
                  </FormItem>
                  <FormItem>
                    <Label>Role</Label>
                    <ContentText>{_.startCase(user.role)}</ContentText>
                  </FormItem>

                </BoxContent>
              </BoxWrapper>
            </DualBoxWrapper>
            <StaffFormFooter>
              <FormItem style={{ width: 'fit-content' }}>
                <SecondaryButton filled type={'submit'}>Save updates</SecondaryButton>
              </FormItem>
            </StaffFormFooter>
          </StaffFormWrapper>
        </form>

      )}
    />
  )
}