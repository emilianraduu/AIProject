import React from 'react'
import Router from './config/Router'
import './App.css'
import 'react-toastify/dist/ReactToastify.css'
import 'react-big-calendar/lib/sass/styles.scss'
import {CoursesContextProvider} from './components/Courses/CoursesContext'
import {TimetableContextProvider} from './components/Timetable/TimetableContext'
import {AuthContextProvider} from './components/Auth/AuthContext'
import {ToastContainer} from 'react-toastify'
import 'react-datepicker/dist/react-datepicker.css'
import {ActiveCourseContextProvider} from './components/Courses/ActiveCourseContext'
import {RoomsContextProvider} from './components/Rooms/RoomsContext'
import {ActiveRoomContextProvider} from "./components/Rooms/ActiveRoomContext";

function App() {
    return (
        <AuthContextProvider>
            <CoursesContextProvider>
                <ActiveCourseContextProvider>
                    <TimetableContextProvider>
                        <ActiveRoomContextProvider>
                            <RoomsContextProvider>
                                <ToastContainer/>
                                <Router/>
                            </RoomsContextProvider>
                        </ActiveRoomContextProvider>
                    </TimetableContextProvider>
                </ActiveCourseContextProvider>
            </CoursesContextProvider>
        </AuthContextProvider>
    )
}

export default App
