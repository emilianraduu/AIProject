import React, { useEffect, useState } from 'react'
import { createValidation } from '../StaffValidation'
import { BoxContent, BoxHeader, BoxWrapper, HeaderWithIcon } from '../../Global/Box/styles/box'
import { BigPGreyBold, Label, ProfileImage } from '../../../styles/typography/typography'
import {
  DualBoxWrapper,
  DualFormWrapper,
  FormItem,
  StaffFormFooter,
  StaffFormWrapper
} from '../../../styles/shared/form'
import { Field, Form } from 'react-final-form'
import { FieldInput } from '../../Global/Input/FieldInput'
import { FieldDatepicker } from '../../Global/DatePickers/FieldDatePicker'
import { FieldSelect } from '../../Global/Select/FieldSelect'
import { STAFF_ROLES, USER_GENDERS } from './StaffCreate'
import _ from 'lodash'
import { InfiniteSelect, MobileInfiniteSelect } from '../../Global/Select/InfiniteSelect'
import { SecondaryButton, SecondaryButtonDiv } from '../../../styles/shared/button'
import { DEBOUNCE_MS } from '../../../config/constants'
import Resizer from 'react-image-file-resizer'
import { FILE_ICON } from '../../../styles/abstract/variables'
import { birthDateMax, birthDateMin } from '../../../helpers/validationHelpers'
import Camera from 'react-html5-camera-photo'
import 'react-html5-camera-photo/build/css/index.css'

export default function StaffCreateForm({ onSubmit,pagination, onCountriesScrollToBottom, onCitizenshipInputChange, countries, onCountriesInputChange, setProfilePicture, type, mobile }) {
  const dataURLtoFile = (dataurl, filename) => {
    var arr = dataurl.split(',')
    var mime = arr[0].match(/:(.*?);/)[1]
    var bstr = atob(arr[1])
    var n = bstr.length
    var u8arr = new Uint8Array(n)
    while (n--) {
      u8arr[n] = bstr.charCodeAt(n)
    }
    return new File([u8arr], filename, { type: mime })
  }
  useEffect(() => {
    setCameraEnable(true)
  }, [])

  const [photo, setPhoto] = useState()
  const [isCameraEnable, setCameraEnable] = useState(false)
  const onImageUpload = (e) => {
    setPhoto(e)
    setProfilePicture(dataURLtoFile(e, 'file'))
  }
  return (
    <Form
      onSubmit={onSubmit}
      validate={createValidation}
      render={({ handleSubmit, pristine, invalid, values }) => (
        <form onSubmit={handleSubmit}>
          <StaffFormWrapper>
            <DualBoxWrapper web={type === 'web'}>
              <BoxWrapper web={type === 'web'} large={type === 'web'}>
                <BoxHeader>
                  <HeaderWithIcon flex>
                    <i className={FILE_ICON}/>
                    <BigPGreyBold>Staff details</BigPGreyBold>
                  </HeaderWithIcon>
                </BoxHeader>
                <BoxContent>
                  <FormItem>
                    <Label>Identity number</Label>
                    <Field component={FieldInput} name='identityNumber' placeholder={'Type identity number'}/>
                  </FormItem>
                    <FormItem>
                      <Label>Series/No</Label>
                      <Field component={FieldInput} name='identitySeries' placeholder={'Type Series/No'}/>
                    </FormItem>

                  <DualFormWrapper mobile={type === 'mobile'}>
                    <FormItem>
                      <Label>Firstname</Label>
                      <Field component={FieldInput} name='firstName' placeholder={'Type first name'}/>
                    </FormItem>
                    <FormItem>
                      <Label>Lastname</Label>
                      <Field component={FieldInput} name='lastName' placeholder={'Type last name'}/>
                    </FormItem>
                  </DualFormWrapper>
                  <DualFormWrapper mobile={type === 'mobile'}>
                    <FormItem>
                      <Label>Birth date</Label>
                      <Field component={FieldDatepicker} name='birthDate' mobile={mobile}
                             max={birthDateMax()}
                             min={birthDateMin()}
                             placeholder={'Select Birth Date'}/>
                    </FormItem>
                    <FormItem>
                      <Label>Gender</Label>
                      <Field
                        component={FieldSelect}
                        placeholder='Select gender'
                        options={USER_GENDERS.map(gender => ({ value: gender, label: _.startCase(gender) }))}
                        name='gender'/>
                    </FormItem>
                  </DualFormWrapper>
                  <DualFormWrapper mobile={type === 'mobile'}>
                    <FormItem>
                      <Label>Citizenship</Label>
                      <Field
                        component={type==='web' ? InfiniteSelect : MobileInfiniteSelect}
                        placeholder='Search'
                        title={'Select citizenship'}
                        pagination={pagination}
                        handlePagination={onCountriesScrollToBottom}
                        onInputChange={_.debounce(onCitizenshipInputChange, DEBOUNCE_MS)}
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
                        pagination={pagination}
                        handlePagination={onCountriesScrollToBottom}
                        onInputChange={_.debounce(onCountriesInputChange, DEBOUNCE_MS)}
                        options={countries.map(country => ({ value: country.id, label: country.name }))}
                        name='country'/>
                    </FormItem>
                  </DualFormWrapper>
                  <FormItem>
                    <Label>Address</Label>
                    <Field component={FieldInput} name='address' placeholder={'Type address'}/>
                  </FormItem>
                </BoxContent>
              </BoxWrapper>
              <BoxWrapper web={type === 'web'}>
                <BoxHeader>
                  <HeaderWithIcon flex>
                    <i className={FILE_ICON}/>
                    <BigPGreyBold>Account</BigPGreyBold>
                  </HeaderWithIcon>
                </BoxHeader>
                <BoxContent>
                  <FormItem>
                    <Label>Email</Label>
                    <Field autocomplete="off" component={FieldInput} name='email'/>
                  </FormItem>
                  <FormItem>
                    <Label>Password</Label>
                    <Field autocomplete="off" type={'password'} component={FieldInput} name='password'/>
                  </FormItem>
                  <FormItem>
                    <Label>Role</Label>
                    <Field
                      component={FieldSelect}
                      placeholder='Select role'
                      options={STAFF_ROLES.map(role => ({ value: role, label: _.startCase(role) }))}
                      name='role'/>
                  </FormItem>
                  <FormItem image>
                    <Label>Profile image</Label>
                    {photo ? (
                        <div>
                          <img
                            src={photo}
                            style={{
                              width: '250px',
                              marginBottom: 15,
                              alignSelf: 'center'
                            }}
                          />
                          <SecondaryButtonDiv onClick={() => {
                            setCameraEnable(true)
                            setPhoto()
                          }}>
                            Take another photo
                          </SecondaryButtonDiv>
                        </div>
                      ) :
                      isCameraEnable &&
                      <Camera
                        style={{ width: '250px' }}
                        onTakePhoto={dataUri => {
                          onImageUpload(dataUri)
                        }}
                      />
                    }
                  </FormItem>

                </BoxContent>

              </BoxWrapper>
            </DualBoxWrapper>
            <StaffFormFooter>
              <FormItem style={{ width: 'fit-content' }}>
                <SecondaryButton filled type={'submit'} disabled={pristine || invalid}>Create</SecondaryButton>
              </FormItem>
            </StaffFormFooter>
          </StaffFormWrapper>
        </form>

      )}
    />
  )
}
