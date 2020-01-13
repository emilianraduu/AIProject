import React, { useEffect, useContext, useState } from 'react'
import { ActiveTournamentContext } from '../ActiveTournamentContext'
import {
  applyTournamentLogsFilter,
  changeTournamentLogsPage,
  changeTournamentLogsSort,
  clearTournamentLogsFilters,
  getTournamentLogs, removeTournamentLogsFilter
} from '../ActiveTournamentActions'
import { BrowserView, MobileView } from 'react-device-detect'
import { AuthContext } from '../../../Auth/AuthContext'
import TournamentLogsListingMobile from './TournamentLogsListingMobile'
import _ from 'lodash'
import { withRouter } from 'react-router-dom'
import TrailMob from '../../../Global/Trail/TrailMob'
import { tournamentRoutes } from '../TournamentRouter'
import SubmenuWeb from '../../../Global/Navbar/SubmenuWeb'
import TournamentLogsListingWeb from './TournamentLogsListingWeb'
import { FilterMenuMob } from '../../../Global/Filter/FilterMenuMob'
import { DEBOUNCE_MS } from '../../../../config/constants'
import EmptyData from '../../../Global/EmptyData/EmptyData'

export const TOURNAMENT_LOGS_HEADERS = [
  {
    name: 'date',
    dbName: 'logs.createdAt',
    sortable: true
  },
  {
    name: 'user',
    dbName: 'user.firstName',
    sortable: true
  },
  {
    name: 'role',
    dbName: 'user.role',
    sortable: true
  },
  {
    name: 'action',
    dbName: 'type.name',
    sortable: true
  },
  {
    name: 'description',
    dbName: 'logs.description',
    sortable: true
  },
  {
    name: 'other',
    dbName: 'logs.other',
    sortable: true
  }
]
export const TOURNAMENT_LOGS_FILTER_HEADERS = [
  {
    name: 'User',
    dbName: 'user.firstName',
    type: 'text',
    operator: 'like'
  },
  {
    name: 'Description',
    dbName: 'logs.description',
    type: 'text',
    operator: 'like'
  }
]

function TournamentLogsListing({ match, history, type }) {
  const authContext = useContext(AuthContext)
  const tournamentsContext = useContext(ActiveTournamentContext)
  const { activeTournament: tournament, logs: { list: logs, pagination, sort, filters }, loading } = tournamentsContext.state
  const [expandSort, setExpandedSort] = useState(false)
  const [expandFilter, setExpandedFilter] = useState(false)
  const { tournamentId } = match.params

  let orderBy
  let direction
  orderBy = sort && sort[0]
  direction = sort && sort[1]
  const handlePagination = page => changeTournamentLogsPage(tournamentsContext, tournamentId, page)
  const breadcrumbAction = () => {
    history.push(`/${type}`)
  }
  const replacements = {
    ':tournamentId': tournamentId
  }
  const handleSort = sort => changeTournamentLogsSort(tournamentsContext, tournamentId, sort)
  const handleFilter = filter => applyTournamentLogsFilter(tournamentsContext, tournamentId, filter)
  const clearFilters = () => clearTournamentLogsFilters(tournamentsContext, tournamentId)
  const removeFilter = (filterKey) => removeTournamentLogsFilter(tournamentsContext, filterKey)

  useEffect(() => {
    const timer = setTimeout(() => getTournamentLogs(authContext, tournamentsContext, tournamentId, pagination.page, filters, sort), DEBOUNCE_MS)
    return () => clearTimeout(timer)
  }, [pagination.page, tournament, filters, sort])
  return (
    <>
      <BrowserView>
        <SubmenuWeb routes={tournamentRoutes(type).slice().reverse()} replacements={replacements}/>
        <TournamentLogsListingWeb
          logs={logs[pagination.page]}
          loading={loading}
          fields={TOURNAMENT_LOGS_HEADERS}
          filterFields={TOURNAMENT_LOGS_FILTER_HEADERS}
          filters={filters}
          pagination={pagination}
          handlePagination={handlePagination}
          direction={direction}
          orderBy={orderBy}
          handleFilter={handleFilter}
          clearFilters={clearFilters}
          removeFilter={removeFilter}
          handleSort={handleSort}
        />
      </BrowserView>
      <MobileView>
        <TrailMob title={tournament && tournament.name} action={breadcrumbAction}
                  routes={tournamentRoutes(type).slice().reverse()} replacements={replacements}
                  active={expandSort || expandFilter}
        />
        <FilterMenuMob
          under
          fields={TOURNAMENT_LOGS_HEADERS}
          filterFields={TOURNAMENT_LOGS_FILTER_HEADERS}
          filters={filters}
          pagination={pagination}
          handlePagination={handlePagination}
          direction={direction}
          orderBy={orderBy}
          handleFilter={handleFilter}
          clearFilters={clearFilters}
          removeFilter={removeFilter}
          handleSort={handleSort}
          expandFilter={expandFilter}
          expandSort={expandSort}
          setExpandedFilter={setExpandedFilter}
          setExpandedSort={setExpandedSort}
        />
        <TournamentLogsListingMobile
          logs={_.reduce(logs, (a, b) => a.concat(b), [])}
          loading={loading}
          pagination={pagination}
          handlePagination={handlePagination}
        />
      </MobileView>
    </>
  )
}

export default withRouter(TournamentLogsListing)
