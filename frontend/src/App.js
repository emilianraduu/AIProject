import React from 'react'
import Router from './config/Router'
import './App.css'
import 'react-toastify/dist/ReactToastify.css'
import { TournamentsContextProvider } from './components/Courses/CoursesContext'
import { StaffsContextProvider } from './components/Staff/StaffsContext'
import { AuthContextProvider } from './components/Auth/AuthContext'
import { ToastContainer } from 'react-toastify'
import 'react-datepicker/dist/react-datepicker.css'
import { ActiveTournamentContextProvider } from './components/Courses/view/ActiveTournamentContext'
import { ActiveStaffContextProvider } from './components/Staff/view/ActiveStaffContext'

function App () {
  // return <TVScreen />
  return (
    <AuthContextProvider>
        <TournamentsContextProvider>
          <ActiveTournamentContextProvider>
            <StaffsContextProvider>
              <ActiveStaffContextProvider>
                            <ToastContainer />
                            <Router />
              </ActiveStaffContextProvider>
            </StaffsContextProvider>
          </ActiveTournamentContextProvider>
        </TournamentsContextProvider>
    </AuthContextProvider>
  )
}

export default App
