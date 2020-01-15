import React, { useContext, useState } from 'react'
import { BrowserView, MobileView } from 'react-device-detect'
import StaffViewMobile from './StaffDetailsMobile'
import { withRouter } from 'react-router-dom'
import TrailMob from '../../../Global/Trail/TrailMob'
import { staffRoutes } from '../StaffRouter'
import StaffDetailsWeb from './StaffDetailsWeb'
import { ActiveStaffContext } from '../ActiveStaffContext'
import { updateStaffDetails } from '../ActiveStaffActions'
import { AuthContext } from '../../../Auth/AuthContext'
import _ from 'lodash'
import { FILE_ICON, USER_ICON } from '../../../../styles/abstract/variables'

function StaffDetails({ match, history }) {
  const staffsContext = useContext(ActiveStaffContext)
  const { staffId } = match.params
  const { activeStaff: staff } = staffsContext.state
  const replacements = {
    ':staffId': staffId
  }
  const authContext = useContext(AuthContext)

  const onSubmitDetails = (values) => {

    let data = new FormData()
    data.set('user', JSON.stringify({
      ...values,
      country: values.country.value,
      citizenship: values.citizenship.value,
      gender: values.gender.value
    }))
    updateStaffDetails({ authContext, staffsContext, staffId, data })
    setOpenModalDetails(false)

  }
  const onPressDetails = () => setOpenModalDetails(true)
  const onCloseDetails = () => setOpenModalDetails(false)
  const [openModalDetails, setOpenModalDetails] = useState(false)

  const onSubmitAccount = (values) => {
    let data = new FormData()
    data.set('user', JSON.stringify({
      ...values,
      role: values.role.value
    }))
    updateStaffDetails({ authContext, staffsContext, staffId, data })
    setOpenModalAccount(false)
  }
  const onPressAccount = () => setOpenModalAccount(true)
  const onCloseAcount = () => setOpenModalAccount(false)
  const [openModalAccount, setOpenModalAccount] = useState(false)
  const breadcrumbAction = () => {
    history.push('/staff')
  }
  let staffProfile = {}
  let staffAccount = {}
  let staffDetails = {}
  if (staff) {
    staffAccount = {
      header: {
        title: 'Account details',
        icon: USER_ICON,
        id: 'account'
      },
      info: [
        {
          title: 'Email',
          text: staff.email
        },
        {
          title: 'Role',
          text: _.startCase(staff.role)
        }
      ]
    }
    staffProfile = {
      header: 'staff',
      name: staff.firstName + ' ' + staff.lastName,
      url: staff.profileImage && staff.profileImage.url,
      lastLogin: staff.lastLogin,
      picture: staff.profileImage && staff.profileImage.url,
    }

    staffDetails = {
      header: {
        title: 'Timetable details',
        icon: FILE_ICON,
        id: 'info'
      },
      info: [
        {
          title: 'Identity Number',
          text: staff.identityNumber
        },
        {
          title: 'SERIES/NO',
          text: staff.identitySeries
        },
        {
          title: 'COUNTRY',
          text: staff.country && staff.country.name
        },
        {
          title: 'CITIZENSHIP',
          text: staff.citizenship && staff.citizenship.name
        },
        {
          title: 'ADDRESS',
          text: staff.address
        }
      ]
    }
  }

  return (
    <>
      <BrowserView>
        <StaffDetailsWeb
          staffProfile={staffProfile}
          staffDetails={staffDetails}
          staffAccount={staffAccount}
          staff={staff}
          openModalAccount={openModalAccount}
          onSubmitAccount={onSubmitAccount}
          onCloseAccount={onCloseAcount}
          onPressAccount={onPressAccount}
          openModalDetails={openModalDetails}
          onSubmitDetails={onSubmitDetails}
          onCloseDetails={onCloseDetails}
          onPressDetails={onPressDetails}
        />
      </BrowserView>
      <MobileView>
        <TrailMob
          title={staff && `${staff.firstName} ${staff.lastName}`}
          action={breadcrumbAction}
          routes={staffRoutes.slice().reverse()}
          replacements={replacements}
        />
        <StaffViewMobile
          staffProfile={staffProfile}
          staffDetails={staffDetails}
          staff={staff}
          staffAccount={staffAccount}
          openModalAccount={openModalAccount}
          onSubmitAccount={onSubmitAccount}
          onCloseAccount={onCloseAcount}
          onPressAccount={onPressAccount}
          openModalDetails={openModalDetails}
          onSubmitDetails={onSubmitDetails}
          onCloseDetails={onCloseDetails}
          onPressDetails={onPressDetails}
        />
      </MobileView>
    </>
  )
}

export default withRouter(StaffDetails)
