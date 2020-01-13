import React, { useEffect, useContext, useState } from 'react'
import { ActiveTournamentContext } from '../ActiveTournamentContext'
import {
  applyTournamentNotificationsFilter,
  changeTournamentNotificationsPage,
  changeTournamentNotificationsSort,
  clearTournamentNotificationsFilters,
  getTournamentNotifications, removeTournamentNotificationsFilter
} from '../ActiveTournamentActions'
import { BrowserView, MobileView } from 'react-device-detect'
import { AuthContext } from '../../../Auth/AuthContext'
import TournamentNotificationsListingMobile from './TournamentNotificationsListingMobile'
import _ from 'lodash'
import { withRouter } from 'react-router-dom'
import TrailMob from '../../../Global/Trail/TrailMob'
import { tournamentRoutes } from '../TournamentRouter'
import SubmenuWeb from '../../../Global/Navbar/SubmenuWeb'
import TournamentNotificationsListingWeb from './TournamentNotificationsListingWeb'
import { FilterMenuMob } from '../../../Global/Filter/FilterMenuMob'
import { DEBOUNCE_MS } from '../../../../config/constants'
import EmptyData from '../../../Global/EmptyData/EmptyData'

export const TOURNAMENT_NOTIFICATIONS_HEADERS = [
  {
    name: 'date',
    dbName: 'notifications.createdAt',
    sortable: true
  },
  {
    name: 'target users',
    dbName: 'type',
    sortable: true
  },
  {
    name: 'title',
    dbName: 'title',
    sortable: true
  },
  {
    name: 'message',
    dbName: 'message',
    sortable: true
  }
]
export const TOURNAMENT_NOTIFICATIONS_FILTER_HEADERS = [
  {
    name: 'title',
    dbName: 'title',
    type: 'text',
    operator: 'like'
  },
  {
    name: 'message',
    dbName: 'message',
    type: 'text',
    operator: 'like'
  }
]

function TournamentNotificationsListing({ match, history, type }) {
  const authContext = useContext(AuthContext)
  const tournamentsContext = useContext(ActiveTournamentContext)
  const { activeTournament: tournament, notifications: { list: notifications, pagination, sort, filters }, loading } = tournamentsContext.state

  const { tournamentId } = match.params
  const [expandSort, setExpandedSort] = useState(false)
  const [expandFilter, setExpandedFilter] = useState(false)
  let orderBy
  let direction
  orderBy = sort && sort[0]
  direction = sort && sort[1]
  const handlePagination = page => changeTournamentNotificationsPage(tournamentsContext, tournamentId, page)
  const breadcrumbAction = () => {
    history.push(`/${type}`)
  }
  const replacements = {
    ':tournamentId': tournamentId
  }
  const handleSort = sort => changeTournamentNotificationsSort(tournamentsContext, tournamentId, sort)
  const handleFilter = filter => applyTournamentNotificationsFilter(tournamentsContext, tournamentId, filter)
  const clearFilters = () => clearTournamentNotificationsFilters(tournamentsContext, tournamentId)
  const removeFilter = (filterKey) => removeTournamentNotificationsFilter(tournamentsContext, filterKey)

  useEffect(() => {
    const timer = setTimeout(() => getTournamentNotifications(authContext, tournamentsContext, tournamentId, pagination.page, filters, sort), DEBOUNCE_MS)
    return () => clearTimeout(timer)
  }, [pagination.page, tournament, filters, sort])
  return (
    <>
      <BrowserView>
        <SubmenuWeb routes={tournamentRoutes(type).slice().reverse()} replacements={replacements}/>
        <TournamentNotificationsListingWeb
          notifications={notifications[pagination.page]}
          fields={TOURNAMENT_NOTIFICATIONS_HEADERS}
          filterFields={TOURNAMENT_NOTIFICATIONS_FILTER_HEADERS}
          filters={filters}
          pagination={pagination}
          handlePagination={handlePagination}
          direction={direction}
          orderBy={orderBy}
          handleFilter={handleFilter}
          loading={loading}
          clearFilters={clearFilters}
          removeFilter={removeFilter}
          handleSort={handleSort}
          tournament={tournament}/>
      </BrowserView>
      <MobileView>
        <TrailMob title={tournament && tournament.name} action={breadcrumbAction}
                  active={expandFilter || expandSort}
                  routes={tournamentRoutes(type).slice().reverse()} replacements={replacements}/>
        <FilterMenuMob
          under
          fields={TOURNAMENT_NOTIFICATIONS_HEADERS}
          filterFields={TOURNAMENT_NOTIFICATIONS_FILTER_HEADERS}
          filters={filters}
          pagination={pagination}
          handlePagination={handlePagination}
          direction={direction}
          orderBy={orderBy}
          handleFilter={handleFilter}
          clearFilters={clearFilters}
          removeFilter={removeFilter}
          handleSort={handleSort}
          expandSort={expandSort}
          expandFilter={expandFilter}
          setExpandedSort={setExpandedSort}
          setExpandedFilter={setExpandedFilter}/>
        <TournamentNotificationsListingMobile
          notifications={_.reduce(notifications, (a, b) => a.concat(b), [])}
          pagination={pagination}
          handlePagination={handlePagination}
          tournament={tournament}
          loading={loading}/>
      </MobileView>
    </>
  )
}

export default withRouter(TournamentNotificationsListing)
