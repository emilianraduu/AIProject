import React from 'react'
import moment from 'moment'
import styled from 'styled-components'
import ReceiptLogo from './assets/receipt_logo.png'
import Router from './config/Router'
import './App.css'
import 'react-toastify/dist/ReactToastify.css'
import { PlayersContextProvider } from './components/Players/PlayersContext'
import { TournamentsContextProvider } from './components/Tournaments/TournamentsContext'
import { StaffsContextProvider } from './components/Staff/StaffsContext'
import { AuthContextProvider } from './components/Auth/AuthContext'
import { StatisticsContextProvider } from './components/Statistics/StatisticsContext'
import { ToastContainer } from 'react-toastify'
import { CountriesContextProvider } from './components/Countries/CountriesContext'
import 'react-datepicker/dist/react-datepicker.css'
import { FestivalContextProvider } from './components/Festivals/FestivalContext'
import { ActiveTournamentContextProvider } from './components/Tournaments/view/ActiveTournamentContext'
import { ActiveStaffContextProvider } from './components/Staff/view/ActiveStaffContext'
import { ActivePlayerContextProvider } from './components/Players/view/ActivePlayerContext'
import { UsersContextProvider } from './components/Users/UsersContext'
import { WizzardContextProvider } from './components/Tournaments/create/wizzard/WizzardContext'
import TVScreen from './tv-module/MainScreen'

function App () {
  // return <TVScreen />
  return (
    <AuthContextProvider>
      <UsersContextProvider>
        <TournamentsContextProvider>
          <ActiveTournamentContextProvider>
            <StaffsContextProvider>
              <ActiveStaffContextProvider>
                <PlayersContextProvider>
                  <ActivePlayerContextProvider>
                    <StatisticsContextProvider>
                      <CountriesContextProvider>
                        <FestivalContextProvider>
                          <WizzardContextProvider>
                            <ToastContainer />
                            <Router />
                          </WizzardContextProvider>
                        </FestivalContextProvider>
                      </CountriesContextProvider>
                    </StatisticsContextProvider>
                  </ActivePlayerContextProvider>
                </PlayersContextProvider>
              </ActiveStaffContextProvider>
            </StaffsContextProvider>
          </ActiveTournamentContextProvider>
        </TournamentsContextProvider>
      </UsersContextProvider>
    </AuthContextProvider>
  )
}

export default App
