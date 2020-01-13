import React, { useEffect, useContext } from 'react'
import { StaffsContext } from '../StaffsContext'
import {
  changeStaffsPage,
  getStaffs,
  applyStaffsFilter,
  changeStaffsSort,
  clearStaffsFilters, removeStaffsFilter
} from '../StaffsActions'
import { BrowserView, MobileView } from 'react-device-detect'
import StaffsListingMobile from './StaffsListingMobile'
import StaffsListingWeb from './StaffsListingWeb'
import { AuthContext } from '../../Auth/AuthContext'
import _ from 'lodash'
import { FilterMenuMob } from '../../Global/Filter/FilterMenuMob'
import { STAFF_ROLES } from '../create/StaffCreate'
import { DEBOUNCE_MS } from '../../../config/constants'
import { Loader } from '../../Global/InfiniteScroll'

export const STAFFS_LISTING_HEADERS = [
  {
    name: 'name',
    dbName: 'users_name',
    sortable: true
  },
  {
    name: 'email',
    dbName: 'email',
    sortable: false
  },
  {
    name: 'role',
    dbName: 'role',
    sortable: false
  },
  {
    name: 'date',
    dbName: 'users.createdAt',
    sortable: true
  }
]
export const STAFFS_FILTER_HEADERS = [
  {
    name: 'User',
    dbName: 'users_name',
    type: 'text',
    operator: 'like'
  },
  {
    name: 'Role',
    dbName: 'role',
    type: 'select',
    operator: '=',
    options: STAFF_ROLES
  }
]
export default function StaffsListing() {
  const authContext = useContext(AuthContext)
  const staffsContext = useContext(StaffsContext)
  const { pagination, staffs, filters, sort, loading } = staffsContext.state
  const handlePagination = page => changeStaffsPage(staffsContext, page)
  const [orderBy, direction] = sort
  const handleFilter = filter => applyStaffsFilter(staffsContext, filter)
  const handleSort = sort => changeStaffsSort(staffsContext, sort)
  const clearFilters = () => clearStaffsFilters(staffsContext)
  const removeFilter = (filterKey) => removeStaffsFilter(staffsContext, filterKey)

  useEffect(() => {
    const timer = setTimeout(() => getStaffs(authContext, staffsContext, pagination.page, filters, sort), DEBOUNCE_MS)
    return () => clearTimeout(timer)
  }, [pagination.page, filters, sort])

  return (
    <>
      <BrowserView>
        <StaffsListingWeb
          staffs={staffs[pagination.page]}
          loading={loading}
          pagination={pagination}
          handlePagination={handlePagination}
          direction={direction}
          orderBy={orderBy}
          fields={STAFFS_LISTING_HEADERS}
          filters={filters}
          filterFields={STAFFS_FILTER_HEADERS}
          handleFilter={handleFilter}
          clearFilters={clearFilters}
          removeFilter={removeFilter}
          handleSort={handleSort}
        />
      </BrowserView>
      <MobileView>
        <FilterMenuMob
          direction={direction}
          orderBy={orderBy}
          fields={STAFFS_LISTING_HEADERS}
          filterFields={STAFFS_FILTER_HEADERS}
          filters={filters}
          handleFilter={handleFilter}
          clearFilters={clearFilters}
          removeFilter={removeFilter}
          handleSort={handleSort}
        />
        <StaffsListingMobile
          staffs={_.reduce(staffs, (a, b) => a.concat(b), [])}
          pagination={pagination}
          loading={loading}
          handlePagination={handlePagination}
        />
      </MobileView>
    </>
  )
}