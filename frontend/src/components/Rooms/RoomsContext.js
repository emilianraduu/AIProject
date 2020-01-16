import React from 'react'
import {FETCH_ROOMS, FETCH_ROOMS_SUCCESS} from './RoomsActions'

const initialState = {}

const reducer = (state, action) => {
    switch (action.type) {
        case FETCH_ROOMS:
            return {
                ...state,
                loading: true,
            }
        case FETCH_ROOMS_SUCCESS:
            return {
                ...state,
                rooms: action.payload.data,
                loading: false,
            }
        default:
            return state
    }
}

const RoomsContext = React.createContext()

function RoomsContextProvider(props) {
    const [state, dispatch] = React.useReducer(reducer, initialState)
    return (
        <RoomsContext.Provider value={{state, dispatch}}>
            {props.children}
        </RoomsContext.Provider>
    )
}

const RoomsContextConsumer = RoomsContext.Consumer

export {RoomsContext, RoomsContextProvider, RoomsContextConsumer}
