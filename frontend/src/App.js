import React from 'react'
import Router from './config/Router'
import './App.css'
import 'react-toastify/dist/ReactToastify.css'
import {CoursesContextProvider} from './components/Courses/CoursesContext'
import {StaffsContextProvider} from './components/Timetable/StaffsContext'
import {AuthContextProvider} from './components/Auth/AuthContext'
import {ToastContainer} from 'react-toastify'
import 'react-datepicker/dist/react-datepicker.css'
import {ActiveTournamentContextProvider} from './components/Courses/ActiveCourseContext'
import {ActiveStaffContextProvider} from './components/Timetable/view/ActiveStaffContext'
import {RoomsContextProvider} from './components/Rooms/RoomsContext'

function App() {
    // return <TVScreen />
    return (
        <AuthContextProvider>
            <CoursesContextProvider>
                <ActiveTournamentContextProvider>
                    <StaffsContextProvider>
                        <RoomsContextProvider>
                            <ActiveStaffContextProvider>
                                <ToastContainer/>
                                <Router/>
                            </ActiveStaffContextProvider>
                        </RoomsContextProvider>
                    </StaffsContextProvider>
                </ActiveTournamentContextProvider>
            </CoursesContextProvider>
        </AuthContextProvider>
    )
}

export default App
