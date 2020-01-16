import React, {useContext, useEffect} from 'react'
import {CoursesContext} from '../CoursesContext'
import {
    applyTournamentsFilter,
    changeTournamentsPage,
    changeTournamentsSort,
    clearTournamentsFilters,
    getCourses,
    removeTournamentsFilter
} from '../CoursesActions'
import {BrowserView} from 'react-device-detect'
import CoursesListingWeb from './CoursesListingWeb'
import {AuthContext} from '../../Auth/AuthContext'
import {withRouter} from 'react-router-dom'

export const TOURNAMENT_LISTING_HEADERS = [
    {
        name: 'name',
    },
    {
        name: 'available_from',
    },
    {
        name: 'available_to',
    },
    {
        name: 'duration',
    },
    {
        name: 'no_courses',
    },
    {
        name: 'no_seminars',
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
            },)
        }
    }
    const coursesContext = useContext(CoursesContext)
    const {courses, loading} = coursesContext.state
    useEffect(() => {
        getCourses({authContext, coursesContext})
    }, [])
    return (
        <>
            <BrowserView>
                <CoursesListingWeb
                    match={match}
                    courses={user.isAdmin ? courses : user.classes}
                />
            </BrowserView>
        </>
    )
}

export default withRouter(CoursesListing)
