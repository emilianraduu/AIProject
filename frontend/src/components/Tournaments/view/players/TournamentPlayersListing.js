import React, { useEffect, useContext, useState } from 'react'
import { ActiveTournamentContext } from '../ActiveTournamentContext'
import {
  applyTournamentPlayersFilter,
  changeTournamentPlayersPage,
  changeTournamentPlayersSort,
  clearTournamentPlayersFilters,
  getTournamentPlayers,
  removeTournamentPlayersFilter
} from '../ActiveTournamentActions'
import { BrowserView, MobileView } from 'react-device-detect'
import { AuthContext } from '../../../Auth/AuthContext'
import PlayersListingMobile from './TournamentPlayersListingMobile'
import { withRouter } from 'react-router-dom'
import _ from 'lodash'
import TrailMob from '../../../Global/Trail/TrailMob'
import { tournamentRoutes } from '../TournamentRouter'
import SubmenuWeb from '../../../Global/Navbar/SubmenuWeb'
import TournamentPlayersListingWeb from './TournamentPlayersListingWeb'
import { FilterMenuMob } from '../../../Global/Filter/FilterMenuMob'
import { DEBOUNCE_MS } from '../../../../config/constants'
import moment from 'moment-timezone'
import {
  colorBlack40,
  colorDigital,
  colorFail,
  colorGreen,
  colorPrimary,
  colorWarn
} from '../../../../styles/abstract/variables'

export const TOURNAMENT_PLAYERS_HEADERS = [
  {
    name: 'place',
    dbName: 'players.seatNo',
    sortable: true
  },
  {
    name: 'name',
    dbName: 'users_name',
    sortable: true
  },
  {
    name: 'ticketID',
    dbName: 'ticketID',
    sortable: false
  },
  {
    name: 'country',
    dbName: 'country.name',
    sortable: true
  },
  {
    name: 'table',
    dbName: 'table.number',
    sortable: true
  },
  {
    name: 'status',
    dbName: 'players.status',
    sortable: true
  },
  {
    name: 'chips',
    dbName: 'players.chips',
    sortable: true
  },
  {
    name: 'game time',
    dbName: 'players.secondsPlayed',
    sortable: true
  }

]
export const TOURNAMENT_PLAYERS_FILTER_HEADERS = [
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

export const TOURNAMENT_PLAYERS_STATUS = [

  {
    name: 'winner',
    color: colorDigital,
    before: true
  },
  {
    name: 'bust',
    color: colorFail,
    before: true
  },
  {
    name: 'pendingPayment',
    color: colorWarn,
    before: true
  },
  {
    name: 'registered',
    color: colorBlack40,
    before: true
  },
  {
    name: 'waiting',
    color: colorWarn,
    before: true
  },
]


export function TournamentPlayersListing({ match, history, type }) {
  const authContext = useContext(AuthContext)
  const tournamentsContext = useContext(ActiveTournamentContext)
  const { activeTournament: tournament, players: { list: players, pagination, sort, filters }, loading } = tournamentsContext.state
  const { tournamentId } = match.params
  let orderBy
  let direction
  orderBy = sort && sort[0]
  direction = sort && sort[1]
  const handlePagination = page => changeTournamentPlayersPage(tournamentsContext, tournamentId, page)
  const breadcrumbAction = () => {
    history.push(`/${type}`)
  }
  const replacements = {
    ':tournamentId': tournamentId
  }
  const handleSort = sort => changeTournamentPlayersSort(tournamentsContext, tournamentId, sort)
  const handleFilter = filter => applyTournamentPlayersFilter(tournamentsContext, tournamentId, filter)
  const clearFilters = () => clearTournamentPlayersFilters(tournamentsContext, tournamentId)
  const removeFilter = (filterKey) => removeTournamentPlayersFilter(tournamentsContext, filterKey)
  const [expandSort, setExpandedSort] = useState(false)
  const [expandFilter, setExpandedFilter] = useState(false)

  useEffect(() => {
    const timer = setTimeout(() => getTournamentPlayers(authContext, tournamentsContext, tournamentId, pagination.page, filters, sort), DEBOUNCE_MS)
    return () => clearTimeout(timer)
  }, [pagination.page, tournament, filters, sort])
  let isRegistering = false
  if (tournament && tournament.registerStart && tournament.registerEnd) {
    isRegistering = moment().isBetween(tournament.registerStart, tournament.registerEnd)
  }

  return (
    <>
      <BrowserView>
        <SubmenuWeb routes={tournamentRoutes(type).slice().reverse()} replacements={replacements} />
        <TournamentPlayersListingWeb
          tournament={tournament}
          loading={loading}
          players={players[pagination.page]}
          fields={TOURNAMENT_PLAYERS_HEADERS}
          filterFields={TOURNAMENT_PLAYERS_FILTER_HEADERS}
          filters={filters}
          pagination={pagination}
          handlePagination={handlePagination}
          isRegistering={isRegistering}
          direction={direction}
          orderBy={orderBy}
          handleFilter={handleFilter}
          clearFilters={clearFilters}
          removeFilter={removeFilter}
          handleSort={handleSort}
        />
      </BrowserView>
      <MobileView>
        <TrailMob
          title={tournament && tournament.name} action={breadcrumbAction}
          routes={tournamentRoutes(type).slice().reverse()} replacements={replacements}
          active={expandSort || expandFilter}
        />
        <FilterMenuMob
          under
          fields={TOURNAMENT_PLAYERS_HEADERS}
          filterFields={TOURNAMENT_PLAYERS_FILTER_HEADERS}
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
          active={expandSort || expandFilter}
        />
        <PlayersListingMobile
          tournament={tournament}
          loading={loading}
          isRegistering={isRegistering}
          players={_.reduce(players, (a, b) => a.concat(b), [])}
          pagination={pagination}
          handlePagination={handlePagination}
        />
      </MobileView>
    </>
  )
}

export default withRouter(TournamentPlayersListing)
