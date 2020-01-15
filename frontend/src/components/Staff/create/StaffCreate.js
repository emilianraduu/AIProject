import React, { useContext, useEffect, useState } from 'react'
import { withRouter } from 'react-router-dom'
import { StaffsContext } from '../StaffsContext'
import { AuthContext } from '../../Auth/AuthContext'
import { createStaff } from '../StaffsActions'
import { BrowserView, MobileView } from 'react-device-detect'
import _ from 'lodash'
import StaffCreateMobile from './StaffCreateMobile'
import StaffCreateWeb from './StaffCreateWeb'
import TrailMob from '../../Global/Trail/TrailMob'
import { staffRoutes } from '../StaffsRouter'

export const STAFF_ROLES = ['dealer', 'floorTurnee', 'floorCashGame', 'press', 'register', 'registerManager', 'director']
export const USER_GENDERS = ['male', 'female']

function StaffCreate({ history }) {
  const authContext = useContext(AuthContext)
  const staffsContext = useContext(StaffsContext)
  const [profilePicture, setProfilePicture] = useState(undefined)
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
  }, [])

  return (
    <>
      <BrowserView>
        <StaffCreateWeb
          onSubmit={onSubmit}
          setProfilePicture={setProfilePicture}
        />
      </BrowserView>
      <MobileView>
        <TrailMob
          title={'Back to staff'}
          routes={staffRoutes.slice().reverse()}
          noRight
        />
        <StaffCreateMobile
          onSubmit={onSubmit}
          setProfilePicture={setProfilePicture}
        />
      </MobileView>
    </>

  )
}

export default withRouter(StaffCreate)
