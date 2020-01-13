import React, { useEffect, useContext } from 'react'
import {
  applyUsersFilter,
  changeUsersPage,
  changeUsersSort,
  clearUsersFilters,
  getUsers, removeUsersFilter
} from '../UsersActions'
import { BrowserView, MobileView, isMobile } from 'react-device-detect'
import { AuthContext } from '../../Auth/AuthContext'
import UsersListingMobile from './UsersListingMobile'
import UsersListingWeb from './UsersListingWeb'
import _ from 'lodash'
import { FilterMenuMob } from '../../Global/Filter/FilterMenuMob'
import { UsersContext } from '../UsersContext'

export const PLAYERS_LISTING_HEADERS = [
  {
    name: 'name',
    dbName: 'users_name',
    sortable: true
  },

  {
    name: 'identity number',
    dbName: 'users_identityNumber'
  },
  {
    name: 'id photo'
  },
  {
    name: 'country',
    dbName: 'country.name',
    sortable: true
  },
  {
    name: 'actions',
    buttons: [{
      text: 'Register',
      type: 'link',
      to: (id) => `/users/register/${id}`
    }]
  },
  {
    name: ''
  }
]
export const PLAYERS_FILTER_HEADERS = [
  {
    name: 'User',
    dbName: 'users.name',
    type: 'text',
    operator: 'like'
  }
]
export default function PlayersListing (props) {
  const authContext = useContext(AuthContext)
  const { user } = authContext.state
  const usersContext = useContext(UsersContext)
  const { pagination, users, filters, sort, loading } = usersContext.state
  const handlePagination = page => changeUsersPage(usersContext, page)
  const [orderBy, direction] = sort
  const handleFilter = filter => applyUsersFilter(usersContext, filter)
  const handleSort = sort => changeUsersSort(usersContext, sort)
  const clearFilters = () => clearUsersFilters(usersContext)
  const removeFilter = (filterKey) => removeUsersFilter(usersContext, filterKey)

  useEffect(() => {
    getUsers(authContext, usersContext, pagination.page, filters, sort, isMobile)
    // return () => clearTimeout(timer)
  }, [pagination.page, filters, sort])
  return (
    <>
      <BrowserView>
        <UsersListingWeb
          users={users}
          role={user && user.role}
          pagination={pagination}
          loading={loading}
          handlePagination={handlePagination}
          direction={direction}
          orderBy={orderBy}
          fields={PLAYERS_LISTING_HEADERS}
          filters={filters}
          filterFields={PLAYERS_FILTER_HEADERS}
          handleFilter={handleFilter}
          clearFilters={clearFilters}
          removeFilter={removeFilter}
          handleSort={handleSort}
        />
      </BrowserView>
      <MobileView>
        <FilterMenuMob
          pagination={pagination}
          handlePagination={handlePagination}
          direction={direction}
          orderBy={orderBy}
          fields={PLAYERS_LISTING_HEADERS}
          filters={filters}
          filterFields={PLAYERS_FILTER_HEADERS}
          handleFilter={handleFilter}
          clearFilters={clearFilters}
          removeFilter={removeFilter}
          handleSort={handleSort}
        />
        <UsersListingMobile
          users={users}
          pagination={pagination}
          loading={loading}
          handlePagination={handlePagination}
        />
      </MobileView>
    </>
  )
}
