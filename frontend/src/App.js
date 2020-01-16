import React from 'react'
import Router from './config/Router'
import './App.css'
import 'react-toastify/dist/ReactToastify.css'
import {CoursesContextProvider} from './components/Courses/CoursesContext'
import {TimetableContext, TimetableContextProvider} from './components/Timetable/TimetableContext'
import {AuthContextProvider} from './components/Auth/AuthContext'
import {ToastContainer} from 'react-toastify'
import 'react-datepicker/dist/react-datepicker.css'
import {ActiveCourseContextProvider} from './components/Courses/ActiveCourseContext'
import {RoomsContextProvider} from './components/Rooms/RoomsContext'

function App() {
    // return <TVScreen />
    return (
        <AuthContextProvider>
            <CoursesContextProvider>
                <ActiveCourseContextProvider>
                    <TimetableContextProvider>
                        <RoomsContextProvider>
                                <ToastContainer/>
                                <Router/>
                        </RoomsContextProvider>
                    </TimetableContextProvider>
                </ActiveCourseContextProvider>
            </CoursesContextProvider>
        </AuthContextProvider>
    )
}

export default App
