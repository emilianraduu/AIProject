import React, { useContext, useEffect } from 'react'
import _ from 'lodash'
import { AuthContext } from '../../../Auth/AuthContext'
import StaffDetailsEditForm from './StaffDetailsEditForm'
import { PageContent } from '../../../../styles/shared/wrapper'
import { BigP } from '../../../../styles/typography/typography'

export const USER_GENDERS = ['male', 'female']

export default function StaffDetailsEdit({ staff, onSubmit, mobile, onClose }) {
  const authContext = useContext(AuthContext)
  useEffect(() => {
  }, [])

  if (staff) {
    return (
      <StaffDetailsEditForm
        onClose={onClose}
        onSubmit={onSubmit}
        staff={staff}
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