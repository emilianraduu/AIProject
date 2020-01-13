import React, { useContext, useEffect, useState } from 'react'
import { withRouter } from 'react-router-dom'
import { StaffsContext } from '../StaffsContext'
import { AuthContext } from '../../Auth/AuthContext'
import { createStaff } from '../StaffsActions'
import { BrowserView, MobileView } from 'react-device-detect'
import _ from 'lodash'
import { CountriesContext } from '../../Countries/CountriesContext'
import { applyCountriesFilter, changeCountriesPage, getCountries } from '../../Countries/CountriesActions'
import StaffCreateMobile from './StaffCreateMobile'
import StaffCreateWeb from './StaffCreateWeb'
import TrailMob from '../../Global/Trail/TrailMob'
import { staffRoutes } from '../StaffsRouter'

export const STAFF_ROLES = ['dealer', 'floorTurnee', 'floorCashGame', 'press', 'register', 'registerManager', 'director']
export const USER_GENDERS = ['male', 'female']

function StaffCreate({ history }) {
  const authContext = useContext(AuthContext)
  const staffsContext = useContext(StaffsContext)
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
      role: values.role.value,
      country: values.country.value,
      citizenship: values.citizenship.value,
      gender: values.citizenship.gender
    }))

    createStaff({
      authContext,
      staffsContext,
      history,
      data
    })
  }

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
  const breadcrumbAction = () => {
    history.push('/staff')
  }
  return (
    <>
      <BrowserView>
        <StaffCreateWeb
          onCitizenshipInputChange={onCitizenshipInputChange}
          onSubmit={onSubmit}
          countries={countries}
          setProfilePicture={setProfilePicture}
          onCountriesInputChange={onCountriesInputChange}
          onCountriesScrollToBottom={onCountriesScrollToBottom}
        />
      </BrowserView>
      <MobileView>
        <TrailMob
          title={'Back to staff'}
          action={breadcrumbAction}
          routes={staffRoutes.slice().reverse()}
          noRight
        />
        <StaffCreateMobile
          onCitizenshipInputChange={onCitizenshipInputChange}
          onSubmit={onSubmit}
          countries={countries}
          pagination={pagination}
          setProfilePicture={setProfilePicture}
          onCountriesInputChange={onCountriesInputChange}
          onCountriesScrollToBottom={onCountriesScrollToBottom}
        />
      </MobileView>
    </>

  )
}

export default withRouter(StaffCreate)
