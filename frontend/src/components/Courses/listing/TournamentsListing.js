import React, {useEffect, useContext} from 'react'
import {CoursesContext} from '../CoursesContext'
import {
    applyTournamentsFilter,
    changeTournamentsPage,
    changeTournamentsSort, clearTournamentsFilters,
    getTournaments, removeTournamentsFilter
} from '../CoursesActions'
import {FilterMenuMob} from '../../Global/Filter/FilterMenuMob'
import {BrowserView, MobileView} from 'react-device-detect'
import TournamentsListingWeb from './CoursesListing'
import TournamentsListingMobile from './TournamentsListingMobile'
import {AuthContext} from '../../Auth/AuthContext'
import {withRouter} from 'react-router-dom'
import _ from 'lodash'
import {colorBlack, colorDigital, colorFail, colorGreen, colorWarn} from '../../../styles/abstract/variables'
import {CASHGAME_TITLE} from '../view/details/TournamentDetails'

export const tournamentTypes = []

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
export const TOURNAMENT_FILTER_HEADERS = ({festivals}) => {
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

export const URL_TO_TYPE = {}
export const TYPE_TO_URL = {}

function TournamentsListing({match}) {
    const authContext = useContext(AuthContext)
    const tournamentsContext = useContext(CoursesContext)
    const {pagination, courses, filters, sort, loading} = tournamentsContext.state
    const [orderBy, direction] = sort
    const handlePagination = page => changeTournamentsPage(tournamentsContext, page)
    const handleFilter = filter => applyTournamentsFilter(tournamentsContext, filter)
    const handleSort = sort => changeTournamentsSort(tournamentsContext, sort)
    const clearFilters = () => clearTournamentsFilters(tournamentsContext)
    const removeFilter = (filterKey) => removeTournamentsFilter(tournamentsContext, filterKey)
    useEffect(() => {
        getTournaments({authContext, tournamentsContext})
    }, [])
    return (
        <>
            <BrowserView>
                <TournamentsListingWeb
                    direction={direction}
                    orderBy={orderBy}
                    match={match}
                    loading={loading}
                    type={TYPE_TO_URL[URL_TO_TYPE[match.path]]}
                    tournaments={courses}
                    pagination={pagination}
                    handlePagination={handlePagination}
                    handleFilter={handleFilter}
                    removeFilter={removeFilter}
                    clearFilters={clearFilters}
                    filters={filters}
                    handleSort={handleSort}
                />
            </BrowserView>
        </>
    )
}

export default withRouter(TournamentsListing)
