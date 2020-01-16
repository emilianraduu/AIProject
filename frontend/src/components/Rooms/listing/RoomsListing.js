import React, {useContext, useEffect} from 'react'
import {BrowserView} from 'react-device-detect'
import {AuthContext} from '../../Auth/AuthContext'
import {withRouter} from 'react-router-dom'
import RoomsListingWeb from "./RoomsListingWeb";
import {RoomsContext} from "../RoomsContext";
import {getRooms} from "../RoomsActions";


function RoomsListing({match}) {
    const roomsContext = useContext(RoomsContext)
    const authContext = useContext(AuthContext)

    const {rooms} = roomsContext.state
    useEffect(() => {
        getRooms({authContext, roomsContext})
    }, [])

    return (
        <>
            <BrowserView>
                <RoomsListingWeb rooms={rooms}/>
            </BrowserView>
        </>
    )
}

export default withRouter(RoomsListing)
