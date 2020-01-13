import React, { useContext, useEffect, useState } from 'react'
import { BrowserView, MobileView } from 'react-device-detect'
import AccountViewWeb from './AccountViewWeb'
import AccountViewMobile from './AccountViewMobile'
import { AuthContext } from '../Auth/AuthContext'
import { getUser, updateUserDetails } from '../Auth/AuthActions'
import { CountriesContext } from '../Countries/CountriesContext'
import { withRouter } from 'react-router-dom'
import _ from 'lodash'
import { applyCountriesFilter, changeCountriesPage, getCountries } from '../Countries/CountriesActions'
import Resizer from 'react-image-file-resizer'

function AccountView({ history }) {
  const onImageUpload = (e) => {
    let reader = new FileReader()
    if (e.target.files && e.target.files.length) {
      reader.onload = function (e) {
        document.getElementById('profilePicture').setAttribute('style', `background: url(${e.target.result}); background-size: cover; background-repeat: no-repeat;`)
      }
      reader.readAsDataURL(e.target.files[0])

      Resizer.imageFileResizer(
        e.target.files[0],
        300,
        300,
        'JPEG',
        100,
        0,
        uri => setProfilePicture(uri),
        'blob'
      )
    }
  }
  const authContext = useContext(AuthContext)
  const user = authContext.state.user
  const countriesContext = useContext(CountriesContext)
  const [profilePicture, setProfilePicture] = useState(undefined)
  let { countries, pagination, filters } = countriesContext.state
  countries = _.reduce(countries, (a, b) => a.concat(b), [])
  const { page, pageCount } = pagination
  const onSubmit = (values) => {
    let data = new FormData()
    if (profilePicture) {
      data.set('profilePicture', profilePicture)
    }
    data.set('user', JSON.stringify({
      ...values,
      country: values.country.value,
      citizenship: values.citizenship.value,
      gender: values.gender.value
    }))
    updateUserDetails({ userId: user.id, authContext, data })
  }
  useEffect(() => {
    getUser(authContext)
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
  // const breadcrumbAction = () => {
  //   history.push('/staff')
  // }
  return (
    <>
      <BrowserView>
        <AccountViewWeb
          onCitizenshipInputChange={onCitizenshipInputChange}
          onSubmit={onSubmit}
          countries={countries}
          setProfilePicture={setProfilePicture}
          onCountriesInputChange={onCountriesInputChange}
          onCountriesScrollToBottom={onCountriesScrollToBottom}
          type={'web'}
          onImageUpload={onImageUpload}
          user={user}
        />
      </BrowserView>
      <MobileView>
        <AccountViewMobile
          onCitizenshipInputChange={onCitizenshipInputChange}
          onSubmit={onSubmit}
          countries={countries}
          setProfilePicture={setProfilePicture}
          onCountriesInputChange={onCountriesInputChange}
          onCountriesScrollToBottom={onCountriesScrollToBottom}
          onImageUpload={onImageUpload}
          user={user}
        />
      </MobileView>
    </>
  )
}

export default withRouter(AccountView)