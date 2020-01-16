import React from 'react'
import {CREATE_COURSE_SUCCESS, FETCH_COURSES, FETCH_COURSES_SUCCESS} from './CoursesActions'

const initialState = {}

const reducer = (state, action) => {
    switch (action.type) {
        case FETCH_COURSES:
            return {
                ...state,
                loading: true,
            }
        case FETCH_COURSES_SUCCESS:
            return {
                ...state,
                courses: action.payload.data,
                loading: false,
            }
        case CREATE_COURSE_SUCCESS:
            return {
                ...state,
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
