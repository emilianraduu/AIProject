import React from 'react'
import {CHANGE_TOURNAMENTS_PAGE, FETCH_TOURNAMENTS, FETCH_TOURNAMENTS_SUCCESS} from './RoomsActions'

const initialState = {
    pagination: {
        page: 1,
        pageSize: 10
    },
    tournaments: {},
    loading: true,
    filters: {
        // dateTime: ['>=', '2019-08-08']
    },
    sort: ['dateTime', 'DESC']
}

const reducer = (state, action) => {
    switch (action.type) {
        case FETCH_TOURNAMENTS:
            return {
                ...state,
                loading: true,
            }
        case FETCH_TOURNAMENTS_SUCCESS:
            console.log(action.payload)
            return {
                ...state,
                rooms: action.payload.data,
                loading: false,
            }
        case CHANGE_TOURNAMENTS_PAGE:
            return {
                ...state,
                pagination: {
                    ...state.pagination,
                    page: action.payload.page
                },
                // loading: true
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
