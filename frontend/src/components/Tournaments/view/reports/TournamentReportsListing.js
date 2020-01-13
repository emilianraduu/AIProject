import React, { useEffect, useContext, useState } from 'react'
import { ActiveTournamentContext } from '../ActiveTournamentContext'
import {
  applyTournamentReportsFilter,
  changeTournamentReportsPage, changeTournamentReportsSort, clearTournamentReportsFilters,
  getTournamentReports, removeTournamentReportsFilter
} from '../ActiveTournamentActions'
import { BrowserView, MobileView } from 'react-device-detect'
import { AuthContext } from '../../../Auth/AuthContext'
import ReportsListingMobile from './TournamentReportsListingMobile'
import { withRouter } from 'react-router-dom'
import _ from 'lodash'
import TrailMob from '../../../Global/Trail/TrailMob'
import { tournamentRoutes } from '../TournamentRouter'
import SubmenuWeb from '../../../Global/Navbar/SubmenuWeb'
import { FilterMenuMob } from '../../../Global/Filter/FilterMenuMob'
import TournamentReportsWeb from './TournamentReportsListingWeb'
import { DEBOUNCE_MS } from '../../../../config/constants'

export const TOURNAMENT_REPORTS_HEADERS = [
  {
    name: 'user',
    dbName: 'firstName',
    sortable: true
  },
  {
    name: 'cashAmount',
    dbName: 'cashAmount',
    sortable: true
  },
  {
    name: 'cashCount',
    dbName: 'cashCount',
    sortable: true
  },
  {
    name: 'cardAmount',
    dbName: 'cardAmount',
    sortable: true
  },
  {
    name: 'cardCount',
    dbName: 'cardCount',
    sortable: true
  },
  {
    name: 'qualifiedAmount',
    dbName: 'winnerAmount',
    sortable: true
  },
  {
    name: 'qualifiedCount',
    dbName: 'winnerCount',
    sortable: true
  },
  {
    name: 'amount',
    dbName: 'amount',
    sortable: true
  },
  {
    name: 'count',
    dbName: 'count',
    sortable: true
  }
]
export const TOURNAMENT_REPORTS_FILTER_HEADERS = [
  {
    name: 'User',
    dbName: 'user.firstName',
    type: 'text',
    operator: 'like'
  }
]

export function TournamentReportsListing({ match, history, type }) {
  const authContext = useContext(AuthContext)
  const tournamentsContext = useContext(ActiveTournamentContext)
  const { activeTournament: tournament, reports: { list: reports, pagination, sort, filters } } = tournamentsContext.state
  const { tournamentId } = match.params
  let orderBy
  let direction
  orderBy = sort && sort[0]
  direction = sort && sort[1]
  const handlePagination = page => changeTournamentReportsPage(tournamentsContext, tournamentId, page)
  const breadcrumbAction = () => {
    history.push(`/${type}`)
  }
  const replacements = {
    ':tournamentId': tournamentId
  }
  const [expandSort, setExpandedSort] = useState(false)
  const [expandFilter, setExpandedFilter] = useState(false)
  const handleSort = sort => changeTournamentReportsSort(tournamentsContext, tournamentId, sort)
  const handleFilter = filter => applyTournamentReportsFilter(tournamentsContext, tournamentId, filter)
  const clearFilters = () => clearTournamentReportsFilters(tournamentsContext, tournamentId)
  const removeFilter = (filterKey) => removeTournamentReportsFilter(tournamentsContext, filterKey)
  useEffect(() => {
    const timer = setTimeout(() => getTournamentReports(authContext, tournamentsContext, tournamentId, pagination.page, filters, sort), DEBOUNCE_MS)
    return () => clearTimeout(timer)
  }, [pagination.page, tournament, filters, sort])


  return (
    <>
      <BrowserView>
        <SubmenuWeb
          routes={tournamentRoutes(type).slice().reverse()}
          replacements={replacements}/>
        <TournamentReportsWeb
          reports={reports[pagination.page]}
          fields={TOURNAMENT_REPORTS_HEADERS}
          filterFields={TOURNAMENT_REPORTS_FILTER_HEADERS}
          filters={filters}
          pagination={pagination}
          handlePagination={handlePagination}
          direction={direction}
          orderBy={orderBy}
          handleFilter={handleFilter}
          clearFilters={clearFilters}
          removeFilter={removeFilter}
          handleSort={handleSort}
          tournament={tournament}
        />
      </BrowserView>
      <MobileView>
        <TrailMob
          title={tournament && tournament.name}
          action={breadcrumbAction}
          routes={tournamentRoutes(type).slice().reverse()}
          active={expandFilter || expandSort}
          replacements={replacements}/>
        <FilterMenuMob
          under
          fields={TOURNAMENT_REPORTS_HEADERS}
          filterFields={TOURNAMENT_REPORTS_FILTER_HEADERS}
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
          setExpandedFilter={setExpandedFilter}

        />
        <ReportsListingMobile
          reports={_.reduce(reports, (a, b) => a.concat(b), [])}
          pagination={pagination}
          handlePagination={handlePagination}
          tournament={tournament}
        />
      </MobileView>
    </>
  )
}

export default withRouter(TournamentReportsListing)
