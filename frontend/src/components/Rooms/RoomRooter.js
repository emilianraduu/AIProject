import React, {lazy, useContext, useEffect} from 'react'
import {AuthContext} from '../Auth/AuthContext'

import {Switch} from 'react-router-dom'
import {PrivateRoute} from '../Global/PrivateRoute'
import {getRoom} from './ActiveRoomActions'
import {ActiveRoomContext} from './ActiveRoomContext'

export const roomRootes = [
    {
        name: 'Rooms',
        path: `/rooms/:id`,
        component: lazy(() => import('./edit/RoomsEdit'))
    }
]


export default function RoomRooter({match}) {
    const authContext = useContext(AuthContext)
    const {loggedIn} = authContext.state
    const roomContext = useContext(ActiveRoomContext)
    const {id} = match.params
    useEffect(() => {
        // loggedIn && getTournament(authContext, tournamentsContext, id)
    }, [id])
    return (
        <>
            <Switch>
                {
                    roomRootes.map((route, index) => (
                            <PrivateRoute
                                key={index} path={route.path}
                                allowed={!!loggedIn}
                                redirectTo='/login'
                                component={route.component}
                            />
                        )
                    )
                }
            </Switch>
        </>
    )
}
