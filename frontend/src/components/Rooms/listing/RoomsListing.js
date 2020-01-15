import React, {useContext, useEffect} from 'react'

import {BrowserView} from 'react-device-detect'
import {AuthContext} from '../../Auth/AuthContext'
import {withRouter} from 'react-router-dom'
import RoomsListingWeb from "./RoomsListingWeb";
import {RoomsContext} from "../RoomsContext";
import {getRooms} from "../RoomsActions";

export const TOURNAMENT_LISTING_HEADERS = [
    {
        name: 'number',
        dbName: 'class.description',
    },
    {
        name: 'features',
        dbName: 'class.available_from',
    },
    {
        name: 'capacity',
        dbName: 'class.available_to',
    },

]


function RoomsListing({match}) {
    const tournamentsContext = useContext(RoomsContext)
    const authContext = useContext(AuthContext)

    const {rooms} = tournamentsContext.state
    useEffect(() =>{getRooms({authContext,tournamentsContext})}, [])

    return (
        <>
            <BrowserView>
                <RoomsListingWeb rooms={rooms}/>
            </BrowserView>
        </>
    )
}

export default withRouter(RoomsListing)
