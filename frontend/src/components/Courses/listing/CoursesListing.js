import React, {useContext, useEffect} from 'react'
import {CoursesContext} from '../CoursesContext'
import {
    applyTournamentsFilter,
    changeTournamentsPage,
    changeTournamentsSort,
    clearTournamentsFilters,
    getTournaments,
    removeTournamentsFilter
} from '../CoursesActions'
import {BrowserView} from 'react-device-detect'
import CoursesListingWeb from './CoursesListingWeb'
import {AuthContext} from '../../Auth/AuthContext'
import {withRouter} from 'react-router-dom'

export const TOURNAMENT_LISTING_HEADERS = [
    {
        name: 'name',
        dbName: 'class.name',
    },

    {
        name: 'available_from',
        dbName: 'class.available_from',
    },
    {
        name: 'available_to',
        dbName: 'class.available_to',
    },
    {
        name: 'duration',
        dbName: 'class.duration',
    },
    {
        name: 'no_courses',
        dbName: 'class.no_courses',
    },
    {
        name: 'no_seminars',
        dbName: 'class.no_seminars',
    },
]

export const URL_TO_TYPE = {}
export const TYPE_TO_URL = {}

function CoursesListing({match}) {
    const authContext = useContext(AuthContext)
    const {user} = authContext.state
    if (user.isAdmin) {
        if(!TOURNAMENT_LISTING_HEADERS.find((t)=>t.name === 'teacher')) {
            TOURNAMENT_LISTING_HEADERS.push({
                name: 'teacher',
                dbName: 'user.teacher',
            },)
        }
    }
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
                <CoursesListingWeb
                    direction={direction}
                    orderBy={orderBy}
                    match={match}
                    loading={loading}
                    type={TYPE_TO_URL[URL_TO_TYPE[match.path]]}
                    courses={user.isAdmin ? courses : user.classes}
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

export default withRouter(CoursesListing)
