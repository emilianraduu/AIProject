import React from 'react'
import {
    ASSIGN_TIMETABLE,
    ASSIGN_TIMETABLE_SUCCESS,
    GET_TIMETABLE,
    GET_TIMETABLE_FAIL,
    GET_TIMETABLE_SUCCESS
} from "./TimetableActions";

const initialState = {}

const reducer = (state, action) => {
    switch (action.type) {
        case ASSIGN_TIMETABLE:
            return {
                ...state,
                loading: true
            }
        case ASSIGN_TIMETABLE_SUCCESS:
            return {
                ...state,
                loading: false,
                assigned: action.payload.data

            }
        case GET_TIMETABLE:
            return {
                ...state,
                loading: true
            }
        case GET_TIMETABLE_SUCCESS:
            return {
                ...state,
                timetable: action.payload.data,
                loading: false
            }
        case GET_TIMETABLE_FAIL:
            return {
                ...state,
                loading: false
            }
        default:
            return state
    }
}

const TimetableContext = React.createContext()

function TimetableContextProvider(props) {
    const [state, dispatch] = React.useReducer(reducer, initialState)
    return (
        <TimetableContext.Provider value={{state, dispatch}}>
            {props.children}
        </TimetableContext.Provider>
    )
}

const TimetableContextConsumer = TimetableContext.Consumer

export {TimetableContext, TimetableContextProvider, TimetableContextConsumer}
