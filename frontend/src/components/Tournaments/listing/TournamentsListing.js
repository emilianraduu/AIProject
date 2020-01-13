import React, { useEffect, useContext } from 'react'
import { TournamentsContext } from '../TournamentsContext'
import {
  applyFestivalFilter,
  applyTournamentsFilter,
  changeTournamentsPage,
  changeTournamentsSort, clearTournamentsFilters,
  getTournaments, removeTournamentsFilter
} from '../TournamentsActions'
import { FilterMenuMob } from '../../Global/Filter/FilterMenuMob'
import { BrowserView, MobileView } from 'react-device-detect'
import TournamentsListingWeb from './TournamentsListingWeb'
import TournamentsListingMobile from './TournamentsListingMobile'
import { AuthContext } from '../../Auth/AuthContext'
import { withRouter } from 'react-router-dom'
import _ from 'lodash'
import { DEBOUNCE_MS } from '../../../config/constants'
import { colorBlack, colorDigital, colorFail, colorGreen, colorWarn } from '../../../styles/abstract/variables'
import { CASHGAME_TITLE } from '../view/details/TournamentDetails'
import { applyCountriesFilter, changeCountriesPage } from '../../Countries/CountriesActions'
import { fetchFestivals } from '../../Festivals/FestivalActions'
import { FestivalContext } from '../../Festivals/FestivalContext'

export const tournamentTypes = [
  {
    name: 'Tournament',
    value: 'tournament'
  },
  {
    name: 'Cash Game',
    value: 'cashGame'
  }
]

export const STATUS_CODES = [
  {
    name: 'closed',
    color: colorFail,
    before: true
  },
  {
    name: 'announced',
    color: colorBlack,
    before: true
  },
  {
    name: 'live',
    color: colorGreen,
    before: true
  },
  {
    name: 'paused',
    color: colorWarn,
    before: true
  },
  {
    name: 'register',
    color: colorWarn,
    before: true
  },
  {
    name: 'Open table',
    color: colorGreen,
    before: true
  },
  {
    name: 'Close table',
    color: colorFail,
    before: true
  },
  {
    name: 'Cash in',
    color: colorGreen,
    before: true
  },
  {
    name: 'hidden',
    color: colorDigital,
    before: true
  },
  {
    name: 'Add player table',
    color: colorDigital,
    before: true
  },
  {
    name: 'Add player tournament',
    color: colorFail,
    before: true
  },
  {
    name: 'Remove player table',
    color: colorBlack,
    before: true
  },
  {
    name: 'Online payment',
    color: colorGreen,
    before: true
  }
]

export const TOURNAMENT_LISTING_HEADERS = (type) => {
  if (type !== CASHGAME_TITLE) {
    return [
      {
        name: 'festival',
        dbName: 'festival.name',
        sortable: true
      },
      {
        name: 'date',
        dbName: 'tournaments.dateTime',
        sortable: true
      },
      {
        name: 'name',
        dbName: 'tournaments.name',
        sortable: true
      },
      {
        name: 'status',
        dbName: 'tournaments.status',
        sortable: true
      },
      {
        name: 'players',
        dbName: 'tournaments_playersCount',
        sortable: true
      },
      {
        name: 'tables',
        dbName: 'tournaments.numberOfTables',
        sortable: true
      },
      {
        name: 'buy-in',
        dbName: 'tournaments.buyIn',
        sortable: true
      },
      {
        name: 'prizes',
        dbName: 'tournaments_totalPrizes',
        sortable: true
      }
    ]
  } else {
    return [
      {
        name: 'festival',
        dbName: 'festival.name',
        sortable: true
      },
      {
        name: 'date',
        dbName: 'tournaments.dateTime',
        sortable: true
      },
      {
        name: 'name',
        dbName: 'tournaments.name',
        sortable: true
      },
      {
        name: 'status',
        dbName: 'tournaments.status',
        sortable: true
      },
      {
        name: 'players',
        dbName: 'tournaments_playersCount',
        sortable: true
      },
      {
        name: 'tables',
        dbName: 'tournaments.numberOfTables',
        sortable: true
      },
      {
        name: 'Minimum Buy In',
        dbName: 'tournaments.buyIn',
        sortable: true
      },
      {
        name: 'blinds',
        dbName: 'tournaments_blinds',
        sortable: true
      }
    ]
  }
}
export const TOURNAMENT_FILTER_HEADERS = ({ festivals }) => {
  return [
    {
      name: 'festival',
      dbName: 'festival.name',
      type: 'select',
      operator: '=',
      options: _.map(festivals, festival => festival.name)
    },
    {
      name: 'name',
      dbName: 'tournaments.name',
      type: 'text',
      operator: 'like'
    },
    {
      name: 'dateFrom',
      dbName: 'dateFrom',
      type: 'datetime',
      operator: '>='
    },
    {
      name: 'dateTo',
      dbName: 'dateTo',
      type: 'datetime',
      operator: '<='
    }
  ]
}

export const URL_TO_TYPE = { '/tournaments': tournamentTypes[0].value, '/cashgames': tournamentTypes[1].value }
export const TYPE_TO_URL = { tournament: 'tournaments', cashGame: 'cashgames' }
export const TYPE_TO_FORM = { tournaments: 'tournament', cashgames: 'cashGame' }
export const TOURNAMENT_TO_TOURNAMENTS = { tournament: 'tournaments', cashgames: 'cashgames' }

function TournamentsListing ({ match }) {
  const authContext = useContext(AuthContext)
  const festivalContext = useContext(FestivalContext)
  const tournamentsContext = useContext(TournamentsContext)
  const { pagination, tournaments, filters, sort, loading } = tournamentsContext.state
  const [orderBy, direction] = sort
  const handlePagination = page => changeTournamentsPage(tournamentsContext, page)
  const handleFilter = filter => applyTournamentsFilter(tournamentsContext, filter)
  const handleSort = sort => changeTournamentsSort(tournamentsContext, sort)
  const clearFilters = () => clearTournamentsFilters(tournamentsContext)
  const removeFilter = (filterKey) => removeTournamentsFilter(tournamentsContext, filterKey)
  const { festivals } = festivalContext.state
  useEffect(() => {
    const timer = setTimeout(() => getTournaments({
      authContext,
      tournamentsContext,
      page: pagination.page,
      filters,
      sort,
      type: URL_TO_TYPE[match.path]
    }), DEBOUNCE_MS)
    fetchFestivals({ authContext, festivalContext })
    return () => clearTimeout(timer)
  }, [pagination.page, filters, sort])
  return (
    <>
      <BrowserView>
        <TournamentsListingWeb
          direction={direction}
          orderBy={orderBy}
          match={match}
          loading={loading}
          type={TYPE_TO_URL[URL_TO_TYPE[match.path]]}
          tournaments={tournaments[pagination.page]}
          pagination={pagination}
          handlePagination={handlePagination}
          handleFilter={handleFilter}
          removeFilter={removeFilter}
          clearFilters={clearFilters}
          filterFields={TOURNAMENT_FILTER_HEADERS({ festivals })}
          filters={filters}
          handleSort={handleSort}
        />
      </BrowserView>
      <MobileView>
        <FilterMenuMob
          direction={direction}
          orderBy={orderBy}
          fields={TOURNAMENT_LISTING_HEADERS(match)}
          filterFields={TOURNAMENT_FILTER_HEADERS({ festivals })}
          filters={filters}
          handleFilter={handleFilter}
          clearFilters={clearFilters}
          removeFilter={removeFilter}
          handleSort={handleSort}
        />
        <TournamentsListingMobile
          tournaments={_.reduce(tournaments, (a, b) => a.concat(b), [])}
          pagination={pagination}
          loading={loading}
          type={TYPE_TO_URL[URL_TO_TYPE[match.path]]}
          match={match}
          handlePagination={handlePagination}
        />
      </MobileView>
    </>
  )
}

export default withRouter(TournamentsListing)
