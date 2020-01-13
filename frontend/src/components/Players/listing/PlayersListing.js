import React, { useEffect, useContext } from 'react'
import { PlayersContext } from '../PlayersContext'
import {
  applyPlayersFilter,
  changePlayersPage,
  changePlayersSort,
  clearPlayersFilters,
  getPlayers, removePlayersFilter
} from '../PlayersActions'
import { BrowserView, MobileView, isMobile } from 'react-device-detect'
import { AuthContext } from '../../Auth/AuthContext'
import UsersListingMobile from './UsersListingMobile'
import UsersListingWeb from './UsersListingWeb'
import { FilterMenuMob } from '../../Global/Filter/FilterMenuMob'

export const PLAYERS_LISTING_HEADERS = [
  {
    name: 'name',
    dbName: 'users_name',
    sortable: true
  },
  {
    name: 'email',
    dbName: 'email',
    sortable: true
  },
  {
    name: 'id photo',
    dbName: 'country.name',
    sortable: true
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
      to: (id) => `/players/register/${id}`
    }]
  },
  {
    name: 'tournaments',
    dbName: 'users_playersCount',
    sortable: true
  },
  {
    name: 'since',
    dbName: 'users.createdAt',
    sortable: true
  },
  {
    name: 'wins',
    dbName: 'users_prizesCount',
    sortable: true
  },
  {
    name: 'buy-in',
    dbName: 'users_totalBuyIn',
    sortable: true
  }
]
export const PLAYERS_FILTER_HEADERS = [
  {
    name: 'User',
    dbName: 'users_name',
    type: 'text',
    operator: 'like'
  },
  {
    name: 'Country',
    dbName: 'country.name',
    type: 'text',
    operator: 'like'
  }
]
export default function PlayersListing (props) {
  const authContext = useContext(AuthContext)
  const { user } = authContext.state
  const playersContext = useContext(PlayersContext)
  const { pagination, players, filters, sort, loading } = playersContext.state
  const handlePagination = page => changePlayersPage(playersContext, page)
  const [orderBy, direction] = sort
  const handleFilter = filter => applyPlayersFilter(playersContext, filter)
  const handleSort = sort => changePlayersSort(playersContext, sort)
  const clearFilters = () => clearPlayersFilters(playersContext)
  const removeFilter = (filterKey) => removePlayersFilter(playersContext, filterKey)

  useEffect(() => {
    getPlayers(authContext, playersContext, pagination.page, filters, sort, isMobile)
    // return () => clearTimeout(timer)
  }, [pagination.page, filters, sort])
  return (
    <>
      <BrowserView>
        <UsersListingWeb
          players={players}
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
          players={players}
          pagination={pagination}
          loading={loading}
          handlePagination={handlePagination}
        />
      </MobileView>
    </>
  )
}
