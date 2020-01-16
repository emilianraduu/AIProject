import React from 'react'
import {FETCH_ROOM_SUCCESS, FETCH_ROOM} from './ActiveRoomActions'

const initialState = {}

const reducer = (state, action) => {
    switch (action.type) {

        case FETCH_ROOM:
            return {
                ...state,
                loadingTournament: true
            }
        case FETCH_ROOM_SUCCESS:
            return {
                ...state,
                room: action.payload,
                loadingTournament: false
            }

        default:
            return state
    }
}

const ActiveRoomContext = React.createContext()

function ActiveRoomContextProvider(props) {
    const [state, dispatch] = React.useReducer(reducer, initialState)
    return (
        <ActiveRoomContext.Provider value={{state, dispatch}}>
            {props.children}
        </ActiveRoomContext.Provider>
    )
}

const ActiveRoomContextConsumer = ActiveRoomContext.Consumer

export {ActiveRoomContext, ActiveRoomContextProvider, ActiveRoomContextConsumer}
