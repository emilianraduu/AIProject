import React, { useEffect, useContext } from 'react'
import { changeStaffHistoriesPage, getStaffHistories } from '../ActiveStaffActions'
import { BrowserView, MobileView } from 'react-device-detect'
import { AuthContext } from '../../../Auth/AuthContext'
import StaffHistoriesListingMobile from './StaffHistoriesListingMobile'
import _ from 'lodash'
import { withRouter } from 'react-router-dom'
import TrailMob from '../../../Global/Trail/TrailMob'
import { staffRoutes } from '../StaffRouter'
import { ActiveStaffContext } from '../ActiveStaffContext'
import StaffHistoriesListingWeb from './StaffHistoriesListingWeb'
import { DEBOUNCE_MS } from '../../../../config/constants'
import SubmenuWeb from '../../../Global/Navbar/SubmenuWeb'

export const STAFF_HISTORY_HEADERS = [
  {
    name: 'name',
    dbName: 'staff.name',
    sortable: true
  },
  {
    name: 'actions',
    dbName: 'staff.actions',
    sortable: true
  },
  {
    name: 'cashed-in',
    dbName: 'staff.cashedIn',
    sortable: true
  }
]

function StaffHistoriesListing({ match, history, secondaryPage }) {
  const authContext = useContext(AuthContext)
  const staffsContext = useContext(ActiveStaffContext)
  const { histories: { list: histories, pagination }, activeStaff: staff } = staffsContext.state
  const { staffId } = match.params
  const handlePagination = page => changeStaffHistoriesPage(staffsContext, page)
  const breadcrumbAction = () => {
    history.push('/staff')
  }
  const replacements = {
    ':staffId': staffId
  }
  useEffect(() => {
    const timer = setTimeout(() => getStaffHistories(authContext, staffsContext, staffId, pagination.page), DEBOUNCE_MS)
    return () => clearTimeout(timer)
  }, [pagination.page, staff])
  return (
    <>
      <BrowserView style={{ width: '100%' }}>
        { !secondaryPage && <SubmenuWeb routes={staffRoutes.slice().reverse()} replacements={replacements} />}
        <StaffHistoriesListingWeb
          histories={histories[pagination.page]}
          pagination={pagination}
          secondaryPage={secondaryPage}
          handlePagination={handlePagination}
        />
      </BrowserView>
      <MobileView>
        <TrailMob title={staff && `${staff.firstName} ${staff.lastName}`} action={breadcrumbAction}
                  routes={staffRoutes.slice().reverse()} replacements={replacements}/>
        <StaffHistoriesListingMobile
          histories={_.reduce(histories, (a, b) => a.concat(b), [])}
          pagination={pagination}
          handlePagination={handlePagination}
        />
      </MobileView>
    </>
  )
}

export default withRouter(StaffHistoriesListing)
