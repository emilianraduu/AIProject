import React from 'react'
import {DELETE_COURSE_SUCCESS, FETCH_COURSE, FETCH_COURSE_SUCCESS} from './ActiveCourseActions'
import _ from 'lodash'

const initialState = {
}

const reducer = (state, action) => {
    switch (action.type) {
        case DELETE_COURSE_SUCCESS:
            let newTables = [...state.activeTournament.tables]
            _.remove(newTables, newTables.find(table => table.id === action.payload))
            return {
                ...state,
                activeTournament: {
                    ...state.activeTournament,
                    tables: newTables
                }
            }
        case FETCH_COURSE:
            return {
                ...state,
                currentTime: action.payload.currentTime,
                loadingTournament: true
            }
        case FETCH_COURSE_SUCCESS:
            return {
                ...state,
                activeCourse: action.payload,
                loadingTournament: false
            }

        default:
            return state
    }
}

const ActiveCourseContext = React.createContext()

function ActiveCourseContextProvider(props) {
    const [state, dispatch] = React.useReducer(reducer, initialState)
    return (
        <ActiveCourseContext.Provider value={{state, dispatch}}>
            {props.children}
        </ActiveCourseContext.Provider>
    )
}

const ActiveTournamentContextConsumer = ActiveCourseContext.Consumer

export {ActiveCourseContext, ActiveCourseContextProvider, ActiveTournamentContextConsumer}
