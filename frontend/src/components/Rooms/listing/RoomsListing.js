import React, {useEffect, useContext} from 'react'
import {
    applyTournamentsFilter,
    changeTournamentsPage,
    changeTournamentsSort, clearTournamentsFilters,
    getTournaments, removeTournamentsFilter
} from '../RoomsActions'
import {BrowserView} from 'react-device-detect'
import RoomsListingWeb from './RoomsListingWeb'
import {AuthContext} from '../../Auth/AuthContext'
import {withRouter} from 'react-router-dom'
import { RoomsContext } from '../RoomsContext'

export const TOURNAMENT_LISTING_HEADERS = [
    {
        name: 'name',
        dbName: 'class.name',
    },
    {
        name: 'description',
        dbName: 'class.description',
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

function RoomsListing({match}) {
    const authContext = useContext(AuthContext)
    const tournamentsContext = useContext(RoomsContext)
    console.log(tournamentsContext)
    
    return (
        <>
            <BrowserView>
       
            </BrowserView>
        </>
    )
}

export default withRouter(RoomsListing)
