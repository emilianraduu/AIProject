import React from 'react'
import {
    FETCH_TOURNAMENTS_SUCCESS,
    FETCH_TOURNAMENTS
} from './CoursesActions'

const initialState = {

}

const reducer = (state, action) => {
    switch (action.type) {
        case FETCH_TOURNAMENTS:
            return {
                ...state,
                loading: true,
            }
        case FETCH_TOURNAMENTS_SUCCESS:
            return {
                ...state,
                courses: action.payload.data,
                loading: false,
            }
        default:
            return state
    }
}

const CoursesContext = React.createContext()

function CoursesContextProvider(props) {
    const [state, dispatch] = React.useReducer(reducer, initialState)
    return (
        <CoursesContext.Provider value={{state, dispatch}}>
            {props.children}
        </CoursesContext.Provider>
    )
}

const CoursesContextConsumer = CoursesContext.Consumer

export {CoursesContext, CoursesContextProvider, CoursesContextConsumer}
